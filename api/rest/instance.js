import axios from "axios"
import apiConfig from "~/config/endpoint"

let apiInstance = {
    api: null,
    context: null
}

export const createInstance = context => {
    const { store } = context
    apiInstance.context = context

    const instance = axios.create({
        baseURL:
            apiConfig.ENDPOINT_URL_AUTHEN
    })

    instance.interceptors.request.use(config => {
        const { store } = context
        store.commit("loading/start")
        // do something to set the config
        return config
    })

    instance.interceptors.response.use(
        response => {
            // do someting when get response and return it
            store.commit("loading/end")
            return response
        },
        error => {
            // do someting when error occurs
            store.commit("loading/end")
            return Promise.reject(error)
        }
    )

    apiInstance.api = instance
}

export default apiInstance
