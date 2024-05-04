/* Deploy Consumer Contract */
import { ethers } from "hardhat"
import path from "path"
import fs from "fs"

async function main() {
	const contractClassName = "ApiCallOracle"

	const apiCallOracle = await ethers.deployContract(contractClassName)

	await apiCallOracle.waitForDeployment()

	console.log("Contract Deployed at " + apiCallOracle.target)
	//save address to file

	const filePath = path.join(__dirname, "deployedAddress.json")
	fs.writeFileSync(
		filePath,
		JSON.stringify(
			{
				oracleAddress: apiCallOracle.target,
			},
			null,
			2
		)
	)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
