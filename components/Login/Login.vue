<template>
    <section>
        <modal
            name="login"
            :adaptive="true"
            :height="'auto'"
            @closed="close_modal"
        >
            <loading
                :active.sync="isLoading"
                :can-cancel="true"
                :is-full-page="fullPage"
            />
            <section class="main-content">
                <div class="close-btn">
                    <button class="btn" @click.prevent="$modal.hide('login')">
                        <i class="material-icons">close</i>
                    </button>
                </div>
                <div class="logo">
                    <img src="~/assets/logo.png" />
                </div>
                <div class="content">
                    <h2>Log In</h2>
                    <button class="fbtn" @click.prevent="socialFacecbookLogin">
                        <div class="fbtext">
                            <img
                                src="~/assets/facebook.svg"
                                :height="16"
                                class="flogo"
                            />
                            <label>Log in with Facebook</label>
                        </div>
                    </button>
                </div>
                <form class="form" @submit.prevent="login('login')">
                    <Inputs
                        class="Inputs"
                        :class="
                            $v.email.$invalid && showError
                                ? 'error-input'
                                : 'non-error'
                        "
                        holder="Email Address"
                        name="email"
                        v-model="email"
                    />
                    <div class="error" v-if="!$v.email.required && showError">
                        *Email is required.
                    </div>
                    <Inputs
                        class="Inputs"
                        :class="
                            $v.password.$invalid && showError
                                ? 'error-input'
                                : 'non-error'
                        "
                        holder="Password"
                        name="password"
                        v-model="password"
                    />
                    <div
                        class="error"
                        v-if="!$v.password.required && showError"
                    >
                        *Password is required.
                    </div>
                    <div class="error" v-if="email_error">
                        The combination of email address and password you
                        entered does not match.
                    </div>
                    <button type="submit" class="submitbtn">
                        Log in
                    </button>
                </form>
                <div
                    class="forget"
                    @click.prevent="switched('login', 'forget-password-modal')"
                >
                    <label class="lb-forgot">Forget your Password?</label>
                </div>
            </section>
            <div class="footer">
                <label class="foot">
                    Do not have account? Please
                    <a @click.prevent="switched('login', 'signupdiner')">
                        <strong>Sign up here.</strong>
                    </a>
                </label>
            </div>
        </modal>
        <modal
            name="login-mobile"
            :adaptive="true"
            :width="'100%'"
            :height="'auto'"
        >
            <loading
                :active.sync="isLoading"
                :can-cancel="true"
                :is-full-page="fullPage"
            />
            <section class="main-content">
                <div class="close-btn">
                    <button
                        class="btn"
                        @click.prevent="$modal.hide('login-mobile')"
                    >
                        <i class="material-icons">close</i>
                    </button>
                </div>
                <div class="logo">
                    <img src="~/assets/logo.png" />
                </div>
                <div class="content">
                    <h2>Log In</h2>
                    <button class="fbtn" @click.prevent="socialFacecbookLogin">
                        <div class="fbtext">
                            <img
                                src="~/assets/facebook.svg"
                                :height="16"
                                class="flogo"
                            />
                            <label>Log in with Facebook</label>
                        </div>
                    </button>
                </div>
                <form class="form" @submit.prevent="login('login-mobile')">
                    <Inputs
                        class="Inputs"
                        :class="
                            $v.email.$invalid && showError
                                ? 'error-input'
                                : 'non-error'
                        "
                        holder="Email Address"
                        name="email"
                        v-model="email"
                    />
                    <div class="error" v-if="!$v.email.required && showError">
                        *Email is required.
                    </div>
                    <Inputs
                        class="Inputs"
                        :class="
                            $v.password.$invalid && showError
                                ? 'error-input'
                                : 'non-error'
                        "
                        holder="Password"
                        name="password"
                        v-model="password"
                    />
                    <div
                        class="error"
                        v-if="!$v.password.required && showError"
                    >
                        *Password is required.
                    </div>
                    <div class="error" v-if="email_error">
                        The combination of email address and password you
                        entered does not match.
                    </div>
                    <button type="submit" class="submitbtn">
                        Log in
                    </button>
                </form>
                <div
                    class="forget"
                    @click.prevent="
                        switched('login-mobile', 'forget-password-modal')
                    "
                >
                    <label class="lb-forgot">Forget your Password?</label>
                </div>
            </section>
            <div class="footer">
                <label class="foot">
                    Do not have account? Please
                    <a
                        @click.prevent="
                            switched('login-mobile', 'signupdiner-mobile')
                        "
                    >
                        <strong>Sign up here.</strong>
                    </a>
                </label>
            </div>
        </modal>
    </section>
</template>

<script>
import Inputs from '~/components/Inputs/Inputs.vue'
import api from '~/api/rest/api'
// import firebase from 'firebase'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import moment from 'moment'
export default {
    props: ['toggleModal', 'switched'],
    data() {
        return {
            email: '',
            password: '',
            isLoading: false,
            fullPage: true,
            showError: false,
            email_error: false,
            password_error: null,
        }
    },
    validations: {
        email: {
            required,
        },
        password: {
            required,
        },
    },
    components: {
        Inputs,
        Loading,
    },
    methods: {
        login(modalName) {
            if (!this.$v.$invalid) {
                this.isLoading = true
                api.signIn({
                    email: this.email,
                    password: this.password,
                })
                    .then(response => {
                        if (response && response.accessToken) {
                            const user = {
                                id: response.id,
                                accessToken: response.accessToken,
                                ...response.user,
                            }
                            if (user.status === 'Pending_for_approval') {
                                this.isLoading = false // stop loading
                                this.$modal.hide(modalName) // hide modal before change page
                                return this.$router.push('/please-verify')
                            }
                            this.$store.commit('auth/setAuth', user)
                            this.email = ''
                            this.password = ''
                            this.$modal.hide(modalName)
                        } else if (response && response.message) {
                            this.email_error = !response.success
                            this.showError = true
                        }
                        this.isLoading = false
                    })
                    .catch(err => {
                        this.isLoading = false
                        this.email = ''
                        this.password = ''
                        console.error(err)
                    })
            } else {
                this.showError = true
            }
        },
        close(modalName) {
            this.$modal.toggle(modalName)
        },
        // socialFacecbookLogin() {
        //     const provide = new firebase.auth.FacebookAuthProvider()
        //     //provide.addScope('user_birthday')
        //     firebase
        //         .auth()
        //         .signInWithPopup(provide)
        //         .then(result => {
        //             if (!result.additionalUserInfo.profile.email) {
        //                 alert('Cannot sign in with this Facebook')
        //                 this.$modal.hide('login-mobile')
        //                 this.$modal.hide('login')
        //             } else {
        //                 const firebaseCredentail = firebase.auth.FacebookAuthProvider.credential(
        //                     result.credential.accessToken
        //                 )
        //                 firebase
        //                     .auth()
        //                     .signInWithCredential(firebaseCredentail)
        //                     .then(firebaseResponse => {
        //                         firebaseResponse.user
        //                             .getIdToken()
        //                             .then(idToken => {
        //                                 let obj = {
        //                                     uid: firebaseResponse.user.uid,
        //                                     firstName:
        //                                         result.additionalUserInfo
        //                                             .profile.first_name,
        //                                     lastName:
        //                                         result.additionalUserInfo
        //                                             .profile.last_name,
        //                                     email:
        //                                         result.additionalUserInfo
        //                                             .profile.email,
        //                                     // birthday:
        //                                     //     moment(result.additionalUserInfo.profile.birthday, "MM/DD/YYYY").format("DD-MM-YYYY"),
        //                                     token: idToken,
        //                                     profileImage:
        //                                         result.user.photoURL +
        //                                         '?height=500',
        //                                     roleName: 'ROLE_DINER',
        //                                 }
        //                                 this.signUpWithFacebook(obj)
        //                             })
        //                     })
        //             }
        //         })
        //         .catch(err => {
        //             alert(err.message)
        //         })
        // },
        signUpWithFacebook(obj) {
            this.isLoading = true
            api.fbAuth(obj).then(response => {
                if (response && response.success) {
                    this.$modal.hide('login-mobile')
                    this.$modal.hide('login')
                    this.$modal.show('signup')
                    alert(response.message)
                    this.signUpWithFacebook(obj)
                }
                if (response && response.accessToken) {
                    const item = {
                        accessToken: response.accessToken,
                        tokenType: response.tokenType,
                        ...response.user,
                    }
                    this.$store.commit('auth/setAuth', item)
                    this.$modal.hide('login-mobile')
                    this.$modal.hide('login')
                    // alert('Login successful')
                    if (
                        this.user.status == 'Pending_for_approval' &&
                        this.user.facebookUser &&
                        this.user.roles[0].roleName == 'ROLE_CHEF'
                    ) {
                        this.$router.push('/profile/chef/update')
                    }
                } else {
                    console.log(response)
                }
                this.isLoading = false
            })
        },
        close_modal() {
            this, (this.showError = false)
        },
    },
    computed: {
        ...mapState({
            user: state => state.auth.auth,
        }),
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

h2 {
    @include title-text(1.5em);
    font-weight: 600;
}
.footer {
    background-color: $footer-color;
    justify-content: center;
    text-align: center;
    display: flex;
    width: 100%;
    font-size: 14px;
    height: 48px;
    align-items: center;
    .foot {
        a:hover {
            // color: $primary;
            cursor: pointer;
        }
    }
}
a {
    cursor: pointer;
}
.main-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    margin: 0 auto;
    @include respond-to($phone) {
        width: 85%;
    }
}
.content {
    padding: 32px 0 32px 0;
    text-align: center;
    font-weight: 600;
    border-bottom: 1px solid $accent;
}
.loginbtn {
    padding: 32px 0 32px 0;
    text-align: center;
    font-weight: 600;
}
.forget {
    text-align: center;
    margin-bottom: 24px;
    margin-top: 18px;
}
.logo {
    justify-content: center;
    text-align: center;
    margin-top: 32px;
    display: flex;
    width: 100%;
}
.login {
    padding-top: 32px;
    display: flex;
    justify-content: center;
    text-align: center;
}
.close-btn {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    right: 0;
    .btn {
        background-color: transparent;
        padding: 16px 16px 0 0;
        border: 0;
        color: $primary;
        .material-icons {
            font-size: 18px;
        }
    }
}
.fbtn {
    background-color: $facebook;
    margin-top: 32px;
    border: 0;
    width: 100%;
    padding: 10px 20px;
    height: auto;
    .fbtext {
        justify-content: flex-start;
        padding: 8px 0 8px 0;
        align-items: center;
        display: flex;
        .flogo {
            margin-right: 14px;
            width: 22px;
            height: 22px;
        }
    }
}

.form {
    text-align: center;
    width: 100%;
    padding: 0 10px;
    button {
        @include button;
        width: 100%;
        margin-top: 30px;
    }
    .submitbtn {
        width: 152px;
        padding: 10px 36px;
        border-radius: 4px !important;
    }
}
.forget {
    .lb-forgot {
        color: $accent;
        &:hover {
            cursor: pointer;
            // color: $primary;
        }
    }
}

.Inputs {
    padding: 16px 0 0 0;
    width: 100%;
}
.error {
    color: $accent;
    font-size: 12px;
    text-align: left;
    justify-content: left;
}
</style>

//Inputs Component
<style lang="scss">
@use '@/styles/mixins.scss' as *;

.error-input {
    @include error-input;
}
.non-error {
    input {
        @include input;
    }
}
</style>
