const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Custom errors', function () {
  let contractA, contractB;

  let signer;

  before('identify signers', async function () {
    ([signer] = await ethers.getSigners());
  });

  before('deploy contracts', async function () {
    let factory;

    factory = await ethers.getContractFactory('B');
    B = await factory.deploy();

    factory = await ethers.getContractFactory('A');
    A = await factory.deploy(B.address);
  });

  describe('A.returnString()', function () {
    it('returns the expected result', async function () {
      expect(await A.returnString()).to.equal('hello');
    });
  });

  describe('A.throwError()', function () {
    it('reverts with ErrorA', async function () {
      // await A.throwError(); // Uncomment to see custom error in console

      await expect(A.throwError()).to.be.revertedWithCustomError(A, 'ErrorA');
    });
  });

  describe('B.throwError()', function () {
    it('reverts with ErrorB', async function () {
      // await B.throwError(); // Uncomment to see custom error in console

      await expect(B.throwError()).to.be.revertedWithCustomError(B, 'ErrorB');
    });
  });

  describe('A.callB', function () {
    it('reverts with ErrorB', async function () {
      // await A.callB(); // Uncomment to see custom error in console

      await expect(A.callB()).to.be.revertedWithCustomError(B, 'ErrorB');
    });
  });
});
