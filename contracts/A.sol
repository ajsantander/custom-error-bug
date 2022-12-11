// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "./B.sol";

contract A {
    error CustomErrorA(address addr);

    B private _contractB;
    uint private _value;

    constructor(address addressB) {
        _contractB = B(addressB);
    }

    function returnString() external pure returns (string memory) {
        return "hello";
    }

    function throwError() external {
        _value += 1;

        revert CustomErrorA(address(this));
    }

    function callB() external {
        _contractB.throwError();
    }
}
