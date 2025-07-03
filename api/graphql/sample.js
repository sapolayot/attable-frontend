import apollo from "./instance"
import { getListAllergics } from "./queries/sample"

export default {
    getListAllergics: () => {
        return apollo.client
            .query({
                query: getListAllergics
            })
            .then(response => {
                return response.data
            })
    }
}
