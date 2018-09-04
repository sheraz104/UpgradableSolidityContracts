pragma solidity ^0.4.24;

import "./Storage.sol";

contract Logictwo is Storage{
    function addFive() public {
        value += 5;
    }
}