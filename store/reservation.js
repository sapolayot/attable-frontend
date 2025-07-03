export const state = () => ({
    reservation: {}
})

export const mutations = {
    setReservation(state, payload) {
        state.reservation = payload
    },
    resetReservation(state) {
        state.reservation = null
    },
}
