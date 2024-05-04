import { getSigners, fetchContracts } from "./common"


const sendPayout = async () => {
    const { victim1 } = await getSigners()

    const { apiCallOracle, reliefToken, reliefLink } = await fetchContracts()
    console.log({ victim1: victim1.address })
    console.log(victim1.provider)
    const tx = await reliefLink.sendReliefToAll()

    console.log(tx)
}

sendPayout()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })