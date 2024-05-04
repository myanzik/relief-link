
import { getSigners, fetchContracts } from "./common"

async function checkIsVictim() {
    const { victim1 } = await getSigners()
    const { apiCallOracle } = await fetchContracts()
    console.log("is address added: " + await apiCallOracle.isAddressAdded(victim1.address))
}


checkIsVictim()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })