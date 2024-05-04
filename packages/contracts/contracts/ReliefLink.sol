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
import "./IApiCallOracle.sol";

contract ReliefLink is AccessControl, Multicall {
	// Add the library methods
	using EnumerableSet for EnumerableSet.AddressSet;

	struct victimData {
		string lat;
		string lon;
		bool hasClaimed;
	}

	// Declare a set state variable
	EnumerableSet.AddressSet private victims;
	mapping(address => victimData) public victimDetails;

	IApiCallOracle public apiCallOracle;
	IERC20 public reliefToken;
	bool public hasTriggered;

	uint256 public minAmount = 10; // 10 token

	uint64 public subscriptionId;

	constructor(
		address[] memory _admins,
		address _reliefToken,
		address _apiCallOracle,
		uint64 _subscriptionId
	) {
		// assign the role of admin to the addresses passed in the constructor
		for (uint256 i = 0; i < _admins.length; i++) {
			_grantRole(DEFAULT_ADMIN_ROLE, _admins[i]);
		}
		reliefToken = IERC20(_reliefToken);

		apiCallOracle = IApiCallOracle(_apiCallOracle);
		subscriptionId = _subscriptionId;
	}

	modifier onlyAdmin() {
		require(
			hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
			"Restricted to admins."
		);
		_;
	}

	//#region manageVictim

	function addVictim(
		address victim,
		string memory lat,
		string memory lon
	) public onlyAdmin {
		victimDetails[victim] = victimData(lat, lon, false);
		victims.add(victim);
		// Add victim to the list of victims
	}

	function buyPolicy(string memory lat, string memory lon) public {
		//check if user has relief token
		//transfer relief token to contract

		//require(reliefToken.balanceOf(msg.sender) > 0, "Insufficient balance");
		//reliefToken.transferFrom(msg.sender, address(this), minAmount);

		// Add the victim to the list of victims
		victimDetails[msg.sender] = victimData(lat, lon, false);
		victims.add(msg.sender);
	}

	function getVictimCount() public view returns (uint256) {
		return victims.length();
	}

	function isValidVictim(
		address victim
	) public view returns (bool _isVictim) {
		string[] memory args = new string[](2);
		args[0] = victimDetails[victim].lat;
		args[1] = victimDetails[victim].lon;
		//get from oracle
		//_isVictim = apiCallOracle.sendRequest(subscriptionId, args);
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
	function checkHasTriggered() public view returns (bool) {
		return hasTriggered;
	}

	// function sendRelief(address victim, uint256 amount) public onlyAdmin {
	// 	require(victims.contains(victim), "Victim not found");
	// 	require(
	// 		amount <= reliefToken.balanceOf(address(this)),
	// 		"Insufficient balance"
	// 	);
	// 	reliefToken.transfer(victim, amount);
	// }

	function getReliefAmount() public view returns (uint256) {
		return (
			(reliefToken.balanceOf(address(this)) / (victims.length() * 100))
		);
	}

	function sendReliefToAll() public onlyAdmin {
		for (uint256 i = 0; i < victims.length(); i++) {
			if (
				apiCallOracle.isAddressEligible(victims.at(i)) &&
				!victimDetails[victims.at(i)].hasClaimed
			) {
				victimDetails[victims.at(i)].hasClaimed = true;
				reliefToken.transfer(victims.at(i), getReliefAmount());
			}
		}
	}

	function claimRelief() public {
		require(victims.contains(msg.sender), "You are not a victim");
		require(
			reliefToken.balanceOf(address(this)) > 0,
			"No balance to claim"
		);
		if (!victimDetails[msg.sender].hasClaimed)
			reliefToken.transfer(msg.sender, getReliefAmount());
		victimDetails[msg.sender].hasClaimed = true;
	}
}
