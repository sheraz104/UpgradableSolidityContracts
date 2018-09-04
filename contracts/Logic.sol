pragma solidity ^0.4.24;

import "./Storage.sol";

contract Logic is Storage{
    function addTwo() public{
        value = value + 2;
    }
}