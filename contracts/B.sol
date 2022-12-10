// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract B {
    error ErrorB();

    uint private _value;

    function throwError() external {
        _value += 1;

        revert ErrorB();
    }
}
