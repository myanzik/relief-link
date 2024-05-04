import { getSigners, fetchContracts } from "./common"


const buyPolicy = async () => {
    const { victim1 } = await getSigners()
    const { apiCallOracle, reliefToken, reliefLink } = await fetchContracts()

    const balance = await reliefToken.balanceOf(reliefLink.target)
    console.log("balance in relieflink: " + balance.toString())
    console.log({ victim1: victim1.address })
    const tx = await reliefLink.connect(victim1).buyPolicy("23", "43")

    console.log(tx)
}

buyPolicy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })