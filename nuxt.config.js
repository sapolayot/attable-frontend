import pkg from './package'

export default {
    mode: 'universal',

    /*
     ** Headers of the page
     */
    head: {
        title: 'AT TABLE',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: pkg.description,
            },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
            },
            { rel: 'script', href: 'https://cdn.omise.co/omise.js' },
        ],
    },
    router: {
        middleware: ['auth', 'updateProfile'],
        scrollBehavior(to, from, savedPosition) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ x: -1, y: -1 })
                }, 10000)
            })
        },
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#105efb' },

    /*
     ** Global CSS
     */
    css: [],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        // { src: '~/plugins/vue-awesome-swiper.js', ssr: true }
        { src: '~/plugins/vue-carousel.js', ssr: true },
        { src: '~/plugins/v-modal.js', ssr: true },
        { src: '~/plugins/v-calendar.js', ssr: true },
        { src: '~/plugins/vuelidate.js', ssr: true },
        { src: '~/plugins/vuexPersist.js', ssr: true },
        { src: '~/plugins/createInstance.js', ssr: true },
        { src: '~/plugins/createRestInstance.js', ssr: true },
        // { src: '~/plugins/firebase.js', ssr: true },
        { src: '~/plugins/qrcode-promptpay.js', ssr: true },
        { src: '~/plugins/hooper.js', ssr: true },
        { src: '~/plugins/googleMap.js', ssr: true },
        { src: '~/plugins/Cleave.js', ssr: true },
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/dotenv',
        [
            'nuxt-gmaps',
            {
                key: 'AIzaSyB11NOmRA-XCeiYCKLu9VmuuL4qpKMuYIs',
            },
        ],
    ],

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        transpile: [/^vue2-google-maps($|\/)/],
        // extend(config, ctx) {
        //     if (ctx.isDev && ctx.isClient) {
        //         config.module.rules.push({
        //             enforce: 'pre',
        //             test: /\.(js|vue)$/,
        //             loader: 'eslint-loader',
        //             exclude: /(node_modules)/,
        //         })
        //     }
        // },
    },
}
