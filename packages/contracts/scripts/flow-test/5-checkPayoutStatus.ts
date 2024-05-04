import { getSigners, fetchContracts } from "./common"


const sendPayout = async () => {
    const { victim1 } = await getSigners()
    const { apiCallOracle, reliefToken, reliefLink } = await fetchContracts()

    const balance = await reliefToken.balanceOf(victim1.address)

    console.log(balance.toString())
}

sendPayout()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })