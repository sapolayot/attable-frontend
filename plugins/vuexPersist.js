import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
    createPersistedState({
        key: 'attable_frontend',
        paths: [ 'auth', 'event', 'globalState', 'reservation' ]
    })(store)
}
