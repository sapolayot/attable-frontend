const pathWithOutAuth = [
    '',
    '/',
    '/faq',
    '/contact',
    '/applytochef',
    '/events',
    '/profile/public/:chefID?',
    '/please-verify',
    '/re-password',
    '/booking/:id',
    '/refund'
]
export default ({ route, store, redirect }) => {
    const auth = store.state.auth.auth
    if (!auth) {
        if (!pathWithOutAuth.includes(route.matched[0].path) && !route.query.token) {
            return redirect('/?isLoginPopup=1')
        }
    }
}
