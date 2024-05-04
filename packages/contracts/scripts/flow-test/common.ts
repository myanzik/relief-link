/* Deploy the ERC-20 smart contract */

import { ethers } from "hardhat"
//get the contract address from the deployedAddress.json file
import path from "path"
import fs from "fs"

export const getSigners = async () => {
    const [deployer, admin, victim1, victim2, funder1, funcder2] = await ethers.getSigners()
    return { deployer, admin, victim1, victim2, funder1, funcder2 }
}

export const fetchContracts = async () => {
    const ApiCallOracle = "ApiCallOracle"
    const ReliefLink = "ReliefLink"
    const ReliefToken = "ReliefToken"
    const filePath = path.join(__dirname, "../deployedAddress.json")
    const data = fs.readFileSync(filePath, "utf-8")
    const jsonData = JSON.parse(data)
    const apiCallOracle = await ethers.getContractAt(ApiCallOracle, jsonData.oracleAddress)
    const reliefToken = await ethers.getContractAt(ReliefToken, jsonData.reliefTokenAddress)
    const reliefLink = await ethers.getContractAt(ReliefLink, jsonData.reliefLinkAddress)
    return { apiCallOracle, reliefToken, reliefLink }
}



