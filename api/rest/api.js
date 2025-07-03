import axios from "./instance"

export default {
    signIn: data => {
        return axios.api.post(`/signin`, data).then(
            response => {
                return response.data
            },
            error => {
                return error.response.data
            }
        )
    },
    signUp: data => {
        return axios.api.post(`/signup`, data).then(
            response => {
                return response.data
            },
            error => {
                return error.response.data
            }
        )
    },
    validateToken: data => {
        return axios.api.post(`/validateToken`, data).then(
            response => {
                return response.data
            },
            error => {
                return error.response.data
            }
        )
    },
    fbAuth: data => {
        return axios.api.post(`/fbauth`, data).then(
            response => {
                return response.data
            },
            error => {
                return error.response.data
            }
        )
    }
}
