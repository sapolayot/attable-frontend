import eventsAPI from '~/api/graphql/events'

export const state = () => ({
    event: {}
})

export const mutations = {
    setEvent(state, payload) {
        state.event = payload
    },
    resetEvent(state) {
        state.event = null
    },
    pushEvent(state, payload) {
        state.event.push(payload)
    }
}

export const actions = {
    getEvents({ commit }, options) {
        return eventsAPI.getEvents(1, 200)
            .then(respone => {

            })
    }
}
