// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ReliefToken is ERC20, ERC20Permit, Ownable {
	mapping(address => bool) public minters;

	constructor()
		ERC20("Relief Token", "RT")
		ERC20Permit("Relief Token")
		Ownable(msg.sender)
	{
		minters[msg.sender] = true;
		_mint(msg.sender, 1000000 * 10 ** decimals());
	}

	modifier onlyMinter() {
		require(minters[msg.sender], "Restricted to minters.");
		_;
	}

	function mint(address to, uint256 amount) public onlyMinter {
		_mint(to, amount);
	}
}
