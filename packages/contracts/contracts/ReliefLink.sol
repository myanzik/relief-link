// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
// import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IApiCallOracle } from "./IApiCallOracle.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Multicall.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ReliefLink is AccessControl, Multicall {
	// Add the library methods
	using EnumerableSet for EnumerableSet.AddressSet;

	// Declare a set state variable
	EnumerableSet.AddressSet private victims;

	IApiCallOracle public apiCallOracle;
	IERC20 public reliefToken;
	bool public hasTriggered;

	constructor(
		address[] memory _admins,
		address _reliefToken,
		address _apiCallOracle
	) {
		// assign the role of admin to the addresses passed in the constructor
		for (uint256 i = 0; i < _admins.length; i++) {
			_grantRole(DEFAULT_ADMIN_ROLE, _admins[i]);
		}
		reliefToken = IERC20(_reliefToken);

		apiCallOracle = IApiCallOracle(_apiCallOracle);
	}

	modifier onlyAdmin() {
		require(
			hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
			"Restricted to admins."
		);
		_;
	}

	//#region manageVictim

	function addVictim(address victim) public onlyAdmin {
		victims.add(victim);
		// Add victim to the list of victims
	}

	function getVictimCount() public view returns (uint256) {
		return victims.length();
	}

	//#enfregion manageVictim

	function getReliefPoolBalance() public view returns (uint256) {
		return reliefToken.balanceOf(address(this));
	}

	function sethasTriggered(bool status) public onlyAdmin {
		// Set the disaster status
		//TODO get from oracle
		hasTriggered = status;
	}

	//Check if the disaster status is true
	function checkhasTriggered() public view returns (bool) {
		return hasTriggered;
	}

	function sendRelief(address victim, uint256 amount) public onlyAdmin {
		require(victims.contains(victim), "Victim not found");
		require(
			amount <= reliefToken.balanceOf(address(this)),
			"Insufficient balance"
		);
		reliefToken.transfer(victim, amount);
	}

	function getReliefAmount() public view returns (uint256) {
		return reliefToken.balanceOf(address(this)) / victims.length();
	}

	function sendReliefToAll() public onlyAdmin {
		require(hasTriggered, "Not Released");

		for (uint256 i = 0; i < victims.length(); i++) {
			reliefToken.transfer(victims.at(i), getReliefAmount());
		}
	}

	function claimRelief() public {
		require(victims.contains(msg.sender), "You are not a victim");
		require(
			reliefToken.balanceOf(address(this)) > 0,
			"No balance to claim"
		);
		require(hasTriggered, "Not Released");
		reliefToken.transfer(msg.sender, getReliefAmount());
	}
}
