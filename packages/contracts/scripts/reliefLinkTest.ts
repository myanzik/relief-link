/* Deploy the ERC-20 smart contract */

import { ethers } from "hardhat"
//get the contract address from the deployedAddress.json file
import path from 'path'
import fs from 'fs'


const getSigners = async () => {
    const [deployer, admin, victim1, victim2, funder1, funcder2] = await ethers.getSigners()
    return { deployer, admin, victim1, victim2, funder1, funcder2 }
}

async function fetchContracts() {
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
    return { apiCallOracle, reliefToken, reliefLink }

}
async function buyPolicy() {
    const { victim1 } = await getSigners()
    const { apiCallOracle, reliefToken, reliefLink } = await fetchContracts()
    console.log({ victim1: victim1.address })
    console.log(victim1.provider)
    const tx = await reliefLink.connect(victim1).buyPolicy('23', '43')


    console.log(tx)

}

async function main() {
    const { apiCallOracle, reliefToken, reliefLink } = await fetchContracts()
    const owner = await apiCallOracle.owner()
    const tokenSupply = await reliefToken.totalSupply()
    const reliefLinkOwner = await reliefLink.getVictimCount()
    console.log("apicall owner: " + owner)
    console.log("token supply: " + tokenSupply)
    console.log("reliefLink owner: " + reliefLinkOwner)

    //buy Policy
    await buyPolicy();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
