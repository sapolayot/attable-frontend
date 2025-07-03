export const state = () => ({
    payment: {}
})

export const mutations = {
    setPayment(state, payload) {
        state.payment = payload
    },
    resetPayment(state) {
        state.payment = null
    },
}
