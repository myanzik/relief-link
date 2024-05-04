import { getSigners, fetchContracts } from "./common"


const claimRelief = async () => {
    const { victim1 } = await getSigners()

    const { apiCallOracle, reliefToken, reliefLink } = await fetchContracts()
    const releifBalance = await reliefToken.balanceOf(reliefLink.target)
    console.log({ releifBalance })
    console.log({ victim1: victim1.address })
    console.log(victim1.provider)
    const tx = await reliefLink.connect(victim1).claimRelief()

    console.log(tx)
}

claimRelief()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })