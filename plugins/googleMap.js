
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAhXf5D7zH1lpkvGNUJN4hBevg5x8HrejY',
        libraries: 'places'
    },
    installComponents: true,
})
