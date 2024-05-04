import { getSigners, fetchContracts } from "./common"


const fetchOracle = async () => {
    const { victim1 } = await getSigners()
    const { apiCallOracle } = await fetchContracts()
    const apiCall = await apiCallOracle.sendRequest(
        34, ["90", "0"], victim1.address)
    console.log(apiCall)
}

fetchOracle()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })