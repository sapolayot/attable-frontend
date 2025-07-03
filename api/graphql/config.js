import apollo from "./instance"
import { getConfig } from "./queries/config"

export default {
    getConfig: () => {
        return apollo.client
            .query({
                query: getConfig
            })
            .then(response => {
                return response.data
            })
    }
}
