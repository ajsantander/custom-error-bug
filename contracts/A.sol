// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./B.sol";

contract A {
    error ErrorA();

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

        revert ErrorA();
    }

    function callB() external {
        _contractB.throwError();
    }
}
