const assert = require('assert');
const { ethers } = require('hardhat');

async function getCustomError(txRequest, contract) {
	const code = await ethers.provider.call(txRequest);

  for (const fragment of Object.values(contract.interface.errors)) {
    try {
      const errorValues = contract.interface.decodeErrorResult(fragment, code);
      return `${fragment.name}(${errorValues.join(',')})`;
    } catch (err) {}
  }
}

async function assertRevert(txRequest, expectedError, contract) {
  let error;

  try {
    const txResponse = await txRequest;
    const txReceipt = await txResponse.wait();
  } catch (err) {
    error = err;
  }

  if (error) {
    let msg = error.toString();

    if (!msg.includes(expectedError)) {
      // Ethers fails to get the revert reason from anvil,
      // though it can be seen in anvil's logging,
      // so try to get the reason manually.
      msg = await getCustomError(txRequest, contract);

      if (!msg.includes(expectedError)) {
        throw new Error(`Transaction was expected to revert with ${expectedError}, but reverted with ${msg}`);
      }
    }
  } else {
    throw new Error('Transaction was expected to revert but it did not');
  }
}

describe('Custom errors', function () {
  let A, B;

  before('deploy contracts', async function () {
    let factory;

    factory = await ethers.getContractFactory('B');
    B = await factory.deploy();

    factory = await ethers.getContractFactory('A');
    A = await factory.deploy(B.address);
  });

  describe('A.returnString()', function () {
    it('returns the expected result', async function () {
      assert.equal(
        await A.returnString(),
        'hello'
      );
    });
  });

  describe('A.throwError()', function () {
    it('reverts with CustomErrorA', async function () {
      await assertRevert(
        A.throwError(),
        'CustomErrorA',
        A
      );
    });
  });

  describe('B.throwError()', function () {
    it('reverts with CustomErrorB', async function () {
      await assertRevert(
        B.throwError(),
        'CustomErrorB',
        B
      );
    });
  });

  describe('A.callB', function () {
    it('reverts with CustomErrorB', async function () {
      await assertRevert(
        A.callB(),
        'CustomErrorB',
        B
      );
    });
  });
});
