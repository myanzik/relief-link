/* Deploy the ERC-20 smart contract */

import { ethers } from "hardhat"
//get the contract address from the deployedAddress.json file
import path from "path"
import fs from "fs"

async function main() {
	const contractClassName = "ApiCallOracle"
	const filePath = path.join(__dirname, "deployedAddress.json")
	const data = fs.readFileSync(filePath, "utf-8")
	const jsonData = JSON.parse(data)

	const apiCallOracle = await ethers.getContractAt(contractClassName, jsonData.oracleAddress)

	const owner = await apiCallOracle.owner()
	console.log("owner: " + owner)

	console.log("Sending request...")

	// Send a request and get the transaction receipt
	const tx = await apiCallOracle.sendRequest(26, ["1"])
	console.log("Transaction hash:", tx.hash)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
