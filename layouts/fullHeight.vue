<template>
    <div class="full-container">
        <div class="mainbody-wrapper">
            <Navbar :method="toggleModal" />
            <ChefSignUp :method="toggleModal" />
            <DinerSignUp :toggleModal="toggleModal" :switched="switched" />
            <Login :toggleModal="toggleModal" :switched="switched" />
            <ForgetPasswordModal
                :toggleModal="toggleModal"
                :switched="switched"
            />
            <CancelEventModal :toggleModal="toggleModal" :switched="switched" />
            <nuxt class="body" />
        </div>
        <Footer />
    </div>
</template>

<script>
import DinerSignUp from '~/components/Signup/DinerSignUp.vue'
import Navbar from '~/components/Layouts/Navbar.vue'
import Login from '~/components/Login/Login.vue'
import ChefSignUp from '~/components/Signup/ChefSignUp.vue'
import Footer from '~/components/Layouts/Footer.vue'
import ForgetPasswordModal from '~/components/ForgetPassword/ForgetPasswordModal'
import CancelEventModal from '~/components/CancelEvent/CancelEventModal'
import api from '~/api/rest/api'
import { mapState } from 'vuex'

export default {
    components: {
        Navbar,
        Login,
        DinerSignUp,
        ChefSignUp,
        Footer,
        ForgetPasswordModal,
        CancelEventModal,
    },
    data() {
        return {
            timer: '',
        }
    },
    methods: {
        toggleModal(modalName) {
            this.$modal.toggle(modalName)
        },
        switched(modalName1, modalName2) {
            this.$modal.toggle(modalName1)
            this.$modal.toggle(modalName2)
        },
        setTimer() {
            this.timer = setInterval(this.checkLogin, 10000)
        },
        checkLogin() {
            if (this.user) {
                const data = {
                    token: this.user.accessToken,
                    email: this.user.email,
                }
                api.validateToken(data)
                    .then(response => {
                        if (!response.success) {
                            alert('Login time out')
                            console.log(response)
                            this.$store.commit('auth/resetAuth')
                            this.$router.push('?isLoginPopup=1')
                            setTimeout(() => {
                                this.$router.go()
                            }, 1000)
                        }
                    })
                    .catch(err => {
                        alert('Login time out')
                        console.log(err)
                        this.$store.commit('auth/resetAuth')
                        this.$router.push('?isLoginPopup=1')
                        setTimeout(() => {
                            this.$router.go()
                        }, 1000)
                    })
            }
        },
        cancelAutoUpdate() {
            clearInterval(this.timer)
        },
    },
    created() {
        this.setTimer()
    },
    beforeDestroy() {
        this.cancelAutoUpdate()
    },
    computed: {
        ...mapState({
            user: state => state.auth.auth,
        }),
    },
}
</script>

<style lang="scss">
@use '@/styles/global.scss' as *;
.full-container {
    overflow-y: auto;
    overflow-x: hidden;
    justify-content: space-between;
    flex-direction: column;
    display: flex;
    height: 100%;
}
</style>
