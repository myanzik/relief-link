// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { FunctionsClient } from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import { ConfirmedOwner } from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import { FunctionsRequest } from "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";

/**
 * @title ApiCallOracle
 * @notice A contract that uses the Chainlink FunctionsClient to make external API calls
 * @dev
 */

contract ApiCallOracle is FunctionsClient, ConfirmedOwner {
	using FunctionsRequest for FunctionsRequest.Request;
}
