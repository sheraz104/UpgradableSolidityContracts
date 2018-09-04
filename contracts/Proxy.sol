pragma solidity ^0.4.24;

import "./Storage.sol";

contract Proxy is Storage {
    address public logic;
    address public owner;

    constructor() public{
        owner = msg.sender;
    }

    modifier onlyOwner() { 
        require(msg.sender == owner);
        _;
    }

    function setLogicAddress(address _newLogic) public onlyOwner{
        logic = _newLogic;
    }

    
    function () payable public {
        address target = logic;
        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize)
            let result := delegatecall(gas, target, ptr, calldatasize, 0, 0)
            let size := returndatasize
            returndatacopy(ptr, 0, size)
            switch result
            case 0 { revert(ptr, size) }
            case 1 { return(ptr, size) }
        }
    
    }

}