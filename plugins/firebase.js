import Vue from 'vue'
import firebase from 'firebase'

Vue.config.productionTip = false

const config = {
    apiKey: "AIzaSyC3LeufYmtkgBD6UZ0a6rTOvs-XBiQg43c",
    authDomain: "attable-992d5.firebaseapp.com",
    databaseURL: "https://attable-992d5.firebaseio.com",
    projectId: "attable-992d5",
    storageBucket: "",
    messagingSenderId: "214559002132",
    appId: "1:214559002132:web:8bbe5cf745f77f1c436101"
}

firebase.initializeApp(config)

Vue.use(firebase)
