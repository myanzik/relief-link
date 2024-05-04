// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { FunctionsClient } from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import { ConfirmedOwner } from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import { FunctionsRequest } from "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
import { IApiCallOracle } from "./IApiCallOracle.sol";

/**
 * @title ApiCallOracle
 * @notice A contract that uses the Chainlink FunctionsClient to make external API calls
 * @dev
 */

contract ApiCallOracle is IApiCallOracle, FunctionsClient, ConfirmedOwner {
	using FunctionsRequest for FunctionsRequest.Request;

	// State variables to store the last request ID, response, and error
	bytes32 public s_lastRequestId;
	bytes public s_lastResponse;
	bytes public s_lastError;

	// Custom error type
	error UnexpectedRequestID(bytes32 requestId);

	// Event to log responses
	event Response(
		bytes32 indexed requestId,
		string character,
		bytes response,
		bytes err
	);

	// Router address - Hardcoded for Base Sepolia
	address router = 0xf9B8fc078197181C841c296C876945aaa425B278;

	// JavaScript source code
	// Fetch character name from the Star Wars API.
	// Documentation: https://swapi.info/people
	string source =
		"const characterId = args[0];"
		"const apiResponse = await Functions.makeHttpRequest({"
		"url: `https://swapi.info/api/people/${characterId}/`"
		"});"
		"if (apiResponse.error) {"
		"throw Error('Request failed');"
		"}"
		"const { data } = apiResponse;"
		"return Functions.encodeString(data.name);";

	//Callback gas limit
	uint32 gasLimit = 300000;

	// donID - Hardcoded for Base Sepolia
	bytes32 donID =
		0x66756e2d626173652d7365706f6c69612d310000000000000000000000000000;

	// State variable to store the returned character information
	string public character;

	/**
	 * @notice Initializes the contract with the Chainlink router address and sets the contract owner
	 */
	constructor() FunctionsClient(router) ConfirmedOwner(msg.sender) {}

	/**
	 * @notice Sends an HTTP request for character information
	 * @param subscriptionId The ID for the Chainlink subscription
	 * @param args The arguments to pass to the HTTP request
	 * @return requestId The ID of the request
	 */
	function sendRequest(
		uint64 subscriptionId,
		string[] calldata args
	) external onlyOwner returns (bytes32 requestId) {
		FunctionsRequest.Request memory req;
		req.initializeRequestForInlineJavaScript(source); // Initialize the request with JS code
		if (args.length > 0) req.setArgs(args); // Set the arguments for the request

		// Send the request and store the request ID
		s_lastRequestId = _sendRequest(
			req.encodeCBOR(),
			subscriptionId,
			gasLimit,
			donID
		);

		return s_lastRequestId;
	}

	/**
	 * @notice Callback function for fulfilling a request
	 * @param requestId The ID of the request to fulfill
	 * @param response The HTTP response data
	 * @param err Any errors from the Functions request
	 */
	function fulfillRequest(
		bytes32 requestId,
		bytes memory response,
		bytes memory err
	) internal override {
		if (s_lastRequestId != requestId) {
			revert UnexpectedRequestID(requestId); // Check if request IDs match
		}
		// Update the contract's state variables with the response and any errors
		s_lastResponse = response;
		character = string(response);
		s_lastError = err;

		// Emit an event to log the response
		emit Response(requestId, character, s_lastResponse, s_lastError);
	}
}
