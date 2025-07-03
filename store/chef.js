export const state = () => ({
    chef: null
})

export const mutations = {
    setChef(state, payload) {
        state.chef = payload
    },
    resetChef(state) {
        state.chef = null
    }
}
