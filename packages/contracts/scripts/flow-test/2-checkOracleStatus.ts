
import { getSigners, fetchContracts } from "./common"
import { ethers } from "hardhat"

async function checkIsVictim() {
    const { victim1 } = await getSigners()
    const { apiCallOracle } = await fetchContracts()
    console.log("is address added: " + await apiCallOracle.isAddressEligible(victim1.address))
}

async function checkResponse() {
    const { apiCallOracle } = await fetchContracts()
    const response = await apiCallOracle.s_lastResponse()
    const error = await apiCallOracle.s_lastError()
    const requestId = await apiCallOracle.s_lastRequestId()
    console.log("response: " + response)
    console.log("error: " + error)
    console.log("requestId: " + requestId)
    const errData = ethers.decodeBase64(error)
    console.log("error data: " + errData)

}


checkIsVictim()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

//checkResponse()