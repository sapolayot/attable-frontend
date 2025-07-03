export const state = () => ({
    auth: null
})

export const mutations = {
    setAuth(state, payload) {
        state.auth = payload
    },
    resetAuth(state) {
        state.auth = null
    }
}
