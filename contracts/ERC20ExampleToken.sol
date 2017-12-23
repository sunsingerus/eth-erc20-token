pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract ERC20ExampleToken is StandardToken {
    string public name = 'ERC20ExampleToken';
    string public symbol = 'EXT';
    uint8 public decimals = 2;
    uint public INITIAL_SUPPLY = 10000;

    function ERC20ExampleToken() public {
        totalSupply = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }
}