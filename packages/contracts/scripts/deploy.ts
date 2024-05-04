/* Deploy the ERC-20 smart contract */

import { ethers } from "hardhat"
import path from 'path'
import fs from 'fs'

async function main() {
	const admins = ['0x4bD2EC53D9d374F1a61D325b3Bc7BB00b42B5992']
	const contractClassName = "ApiCallOracle"
	const ReliefLink = "ReliefLink"
	const ReliefToken = "ReliefToken"
	const signers = await ethers.getSigners();

	console.log("Deploying contracts with the account:", signers[0].address)
	console.log("Deploying Oracle");
	const apiCallOracle = await ethers.deployContract(contractClassName)
	await apiCallOracle.waitForDeployment()

	console.log("Deploying Relief Token");
	const reliefToken = await ethers.deployContract(ReliefToken);
	await reliefToken.waitForDeployment()

	console.log("Deploying Relief Link");
	const reliefLinkContract = await ethers.deployContract(ReliefLink, [admins, reliefToken.target, apiCallOracle.target])
	await reliefLinkContract.waitForDeployment()

	console.log("Contract Deployed at", {
		oracleAddress: apiCallOracle.target,
		reliefTokenAddress: reliefToken.target,
		reliefLinkAddress: reliefLinkContract.target
	},)
	//save address to file

	const filePath = path.join(__dirname, 'deployedAddress.json')
	fs.writeFileSync
		(
			filePath,
			JSON.stringify
				(
					{
						oracleAddress: apiCallOracle.target,
						reliefTokenAddress: reliefToken.target,
						reliefLinkAddress: reliefLinkContract.target
					},
					null,
					2
				)
		)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
