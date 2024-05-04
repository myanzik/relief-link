/* Deploy the ERC-20 smart contract */

import { ethers } from "hardhat"
//get the contract address from the deployedAddress.json file
import path from 'path'
import fs from 'fs'


async function main() {
    const ApiCallOracle = "ApiCallOracle"
    const ReliefLink = "ReliefLink"
    const ReliefToken = "ReliefToken"
    const filePath = path.join(__dirname, 'deployedAddress.json')
    const data = fs.readFileSync(filePath
        , 'utf-8')
    const jsonData = JSON.parse(data)

    const apiCallOracle = await ethers.getContractAt(ApiCallOracle, jsonData.oracleAddress)
    const reliefToken = await ethers.getContractAt(ReliefToken, jsonData.reliefTokenAddress)
    const reliefLink = await ethers.getContractAt(ReliefLink, jsonData.reliefLinkAddress)

    const owner = await apiCallOracle.owner()
    const tokenSupply = await reliefToken.totalSupply()
    const reliefLinkOwner = await reliefLink.getVictimCount()
    console.log("apicall owner: " + owner)
    console.log("token supply: " + tokenSupply)
    console.log("reliefLink owner: " + reliefLinkOwner)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
