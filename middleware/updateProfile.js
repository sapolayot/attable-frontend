export default ({ route, redirect, store }) => {
    const auth = store.state.auth.auth
    if (auth) {
        if (!auth.birthday && !route.query.facebook && !route.query.token && auth.roles[0].id == 3) {
            return redirect(`/profile/chef/update/`, { facebook: true, token: auth.accessToken })
        }
        if (!auth.profileImage && !auth.allergic && !route.query.facebook && !route.query.token && auth.roles[0].id == 2) {
            return redirect(`/profile/diner/update/`, { facebook: true, token: auth.accessToken })
        }
    }
}


