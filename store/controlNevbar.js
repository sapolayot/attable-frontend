export const state = () => ({
    statusNevbar: true
})

export const mutations = {
    showNevbar(state) {
        state.statusNevbar = true
    },
    hiddenNevbar(state) {
        state.statusNevbar = false
    },
}
