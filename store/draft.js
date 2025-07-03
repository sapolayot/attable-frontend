export const state = () => ({
    draft: 0
})

export const mutations = {
    setDraft(state, payload) {
        state.draft = payload
    },
    resetDeaft(state) {
        state.draft = null
    }
}
