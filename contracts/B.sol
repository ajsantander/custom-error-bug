// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract B {
    error CustomErrorB(address addr);

    uint private _value;

    function throwError() external {
        _value += 1;

        revert CustomErrorB(address(this));
    }
}
