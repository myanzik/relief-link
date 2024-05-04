// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IApiCallOracle {
	function sendRequest(
		uint64 subscriptionId,
		string[] calldata args,
		address _victimAddress
	) external returns (bytes32);
}
