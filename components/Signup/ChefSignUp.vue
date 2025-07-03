<template>
    <div>
        <modal
            name="signupchef"
            :adaptive="true"
            height="auto"
            @closed="regisClosed"
            :scrollable="true"
        >
            <loading
                :active.sync="isLoading"
                :can-cancel="true"
                :is-full-page="fullPage"
            />
            <div name="register-content">
                <section class="main-content">
                    <div class="close-btn">
                        <button
                            class="btn"
                            @click.prevent="$modal.hide('signupchef')"
                        >
                            <i class="material-icons">close</i>
                        </button>
                    </div>
                    <div class="logo">
                        <img src="~/assets/logo.png" />
                    </div>
                    <div class="content">
                        <h2>
                            Chef Sign Up
                        </h2>
                        <button
                            class="fbtn"
                            @click.prevent="socialFacecbookLogin"
                        >
                            <div class="fbtext">
                                <img
                                    src="~/assets/facebook.svg"
                                    :height="16"
                                    class="flogo"
                                />
                                <label>
                                    Sign up with Facebook
                                </label>
                            </div>
                        </button>
                    </div>
                    <form class="form">
                        <Inputs
                            class="Inputs fname"
                            :class="
                                $v.user.fname.$invalid && showError
                                    ? 'error-input'
                                    : 'non-error'
                            "
                            holder="First Name"
                            name="fname"
                            v-model="user.fname"
                        />
                        <div
                            class="error"
                            v-if="!$v.user.fname.required && showError"
                        >
                            *Firstname is required.
                        </div>
                        <Inputs
                            class="Inputs lname"
                            :class="
                                $v.user.lname.$invalid && showError
                                    ? 'error-input'
                                    : 'non-error'
                            "
                            holder="Last Name"
                            name="lname"
                            v-model="user.lname"
                        />
                        <div
                            class="error"
                            v-if="!$v.user.lname.required && showError"
                        >
                            *Lastname is required.
                        </div>
                        <Inputs
                            class="Inputs tel"
                            :class="
                                $v.user.tel.$invalid && showError
                                    ? 'error-input'
                                    : 'non-error'
                            "
                            holder="Mobile Phone No."
                            name="tel"
                            v-model="user.tel"
                        />
                        <div
                            class="error"
                            v-if="!$v.user.tel.required && showError"
                        >
                            *Mobile Phone No. is required.
                        </div>
                        <div
                            class="error"
                            v-if="!$v.user.tel.numeric && showError"
                        >
                            *Mobile Phone No. is must be 0-9.
                        </div>
                        <div
                            class="error"
                            v-if="!$v.user.tel.minLength && showError"
                        >
                            *Mobile Phone No. is must at least 10 characters.
                        </div>
                        <div
                            class="error"
                            v-if="!$v.user.tel.maxLength && showError"
                        >
                            *Mobile Phone No. is invalid.
                        </div>
                        <Inputs
                            class="Inputs email"
                            :class="
                                $v.user.email.$invalid && showError
                                    ? 'error-input'
                                    : 'non-error'
                            "
                            holder="Email Address"
                            name="email"
                            v-model="user.email"
                        />
                        <div
                            class="error"
                            v-if="!$v.user.email.required && showError"
                        >
                            *Email is required
                        </div>
                        <div
                            class="error"
                            v-if="!$v.user.email.email && showError"
                        >
                            *Email is invalid
                        </div>
                        <div class="error" v-if="!success && showError">
                            *This email address is already registered
                        </div>
                        <Inputs
                            class="Inputs password"
                            :class="
                                $v.user.password.$invalid && showError
                                    ? 'error-input'
                                    : 'non-error'
                            "
                            holder="Password"
                            name="password"
                            v-model="user.password"
                        />
                        <div
                            class="error"
                            v-if="!$v.user.password.minLength && showError"
                        >
                            *Password is must at least 6 characters.
                        </div>
                        <div
                            class="error"
                            v-if="!$v.user.password.required && showError"
                        >
                            *Password is required.
                        </div>
                        <div class="signupbtn">
                            <button
                                @click.prevent="confirmSignup('signupchef')"
                            >
                                Sign Up
                            </button>
                            <!-- <button @click.prevent="switched('signupchef','termconchef')">
                                Term
                            </button> -->
                        </div>
                    </form>
                    <div class="forget">
                        <strong>
                            <p>
                                By signing up, I accept Terms and Conditions,
                                Diner Charter , Chef Charter, and Trust and
                                Privacy Policy.
                            </p>
                        </strong>
                    </div>
                </section>
                <div class="footer">
                    <label class="foot">
                        Already have account?
                        <a @click.prevent="switched('signupdiner', 'login')">
                            <strong>Log in</strong></a
                        >
                    </label>
                </div>
            </div>
        </modal>
        <modal
            name="signupchef-mobile"
            :adaptive="true"
            height="auto"
            width="100%"
            :scrollable="true"
            @closed="regisClosed"
        >
            <loading
                :active.sync="isLoading"
                :can-cancel="true"
                :is-full-page="fullPage"
            />
            <div name="register-content">
                <section class="main-content">
                    <div class="close-btn">
                        <button
                            class="btn"
                            @click.prevent="$modal.hide('signupchef-mobile')"
                        >
                            <i class="material-icons">close</i>
                        </button>
                    </div>
                    <div class="logo">
                        <img src="~/assets/logo.png" />
                    </div>
                    <div class="content">
                        <h2>Chef Sign Up</h2>
                        <button
                            class="fbtn"
                            @click.prevent="socialFacecbookLogin"
                        >
                            <div class="fbtext">
                                <img
                                    src="~/assets/facebook.svg"
                                    :height="16"
                                    class="flogo"
                                />
                                <label>
                                    Sign up with Facebook
                                </label>
                            </div>
                        </button>
                    </div>
                    <form class="form">
                        <Inputs
                            class="Inputs fname"
                            :class="
                                $v.user.fname.$invalid && showError
                                    ? 'error-input'
                                    : 'non-error'
                            "
                            holder="First Name"
                            name="fname"
                            v-model="user.fname"
                        />
                        <div
                            class="error"
                            v-if="!$v.user.fname.required && showError"
                        >
                            *Firstname is required.
                        </div>
                        <Inputs
                            class="Inputs lname"
                            :class="
                                $v.user.lname.$invalid && showError
                                    ? 'error-input'
                                    : 'non-error'
                            "
                            holder="Last Name"
                            name="lname"
                            v-model="user.lname"
                        />
                        <div
                            class="error"
                            v-if="!$v.user.lname.required && showError"
                        >
                            *Lastname is required.
                        </div>
                        <Inputs
                            class="Inputs tel"
                            :class="
                                $v.user.tel.$invalid && showError
                                    ? 'error-input'
                                    : 'non-error'
                            "
                            holder="Mobile Phone No."
                            name="tel"
                            v-model="user.tel"
                        />
                        <div
                            class="error"
                            v-if="!$v.user.tel.required && showError"
                        >
                            *Mobile Phone No. is required.
                        </div>
                        <div
                            class="error"
                            v-if="!$v.user.tel.numeric && showError"
                        >
                            *Mobile Phone No. is must be 0-9.
                        </div>
                        <div
                            class="error"
                            v-if="!$v.user.tel.minLength && showError"
                        >
                            *Mobile Phone No. is must at least 10 characters.
                        </div>
                        <div
                            class="error"
                            v-if="!$v.user.tel.maxLength && showError"
                        >
                            *Mobile Phone No. is invalid.
                        </div>
                        <Inputs
                            class="Inputs email"
                            :class="
                                $v.user.email.$invalid && showError
                                    ? 'error-input'
                                    : 'non-error'
                            "
                            holder="Email Address"
                            name="email"
                            v-model="user.email"
                        />
                        <div
                            class="error"
                            v-if="!$v.user.email.required && showError"
                        >
                            *Email is required
                        </div>
                        <div
                            class="error"
                            v-if="!$v.user.email.email && showError"
                        >
                            *Email is invalid
                        </div>
                        <div class="error" v-if="!success && showError">
                            *This email address is already registered
                        </div>
                        <Inputs
                            class="Inputs password"
                            :class="
                                $v.user.password.$invalid && showError
                                    ? 'error-input'
                                    : 'non-error'
                            "
                            holder="Password"
                            name="password"
                            v-model="user.password"
                        />
                        <div
                            class="error"
                            v-if="!$v.user.password.minLength && showError"
                        >
                            Password is must at least 6 characters.
                        </div>
                        <div
                            class="error"
                            v-if="!$v.user.password.required && showError"
                        >
                            *Password is required.
                        </div>
                        <div class="signupbtn">
                            <button
                                @click.prevent="
                                    confirmSignup('signupchef-mobile')
                                "
                            >
                                Sign Up
                            </button>
                            <!-- <button @click.prevent="switched('signupchef-mobile','termconchef')">
                                Term
                            </button> -->
                        </div>
                    </form>
                    <div class="forget">
                        <strong>
                            <p>
                                By signing up, I accept Terms and Conditions,
                                Diner Charter , Chef Charter, and Trust and
                                Privacy Policy.
                            </p>
                        </strong>
                    </div>
                </section>
                <div class="footer">
                    <label class="foot">
                        Already have account?
                        <a
                            @click.prevent="
                                switched('signupchef-mobile', 'login-mobile')
                            "
                            >Log in</a
                        >
                    </label>
                </div>
            </div>
        </modal>
        <modal
            name="thankyouChef"
            @closed="closed"
            :adaptive="true"
            :width="maxWidth > 480 ? '40%' : '80%'"
        >
            <div class="close-btn">
                <button
                    class="btn"
                    @click.prevent="$modal.hide('thankyouChef')"
                >
                    <i class="material-icons">close</i>
                </button>
            </div>
            <div class="logo-signup-thankyou">
                <img src="~/assets/logo.png" />
            </div>
            <label class="signup-modal">
                <p>Thank you for signing up with At Table.</p>
                <P>Please check your inbox for email confirmation.</P>
            </label>
        </modal>
        <modal
            name="termconchef"
            :adaptive="true"
            :height="maxWidth <= 480 ? '100%' : maxWidth < 1440 ? '80%' : '80%'"
            :width="maxWidth >= 480 ? '80%' : '95%'"
            :scrollable="maxWidth <= 480 ? true : false"
        >
            <loading
                :active.sync="isLoading"
                :can-cancel="true"
                :is-full-page="fullPage"
            />
            <div class="close-btn">
                <button class="btn" @click.prevent="$modal.hide('termconchef')">
                    <i class="material-icons">close</i>
                </button>
            </div>
            <div class="term-modal-wrapper">
                <div class="logo-signup">
                    <img src="~/assets/logo.png" />
                </div>
                <div class="termcon-content">
                    <Term :termtext="'termconchef'" />
                </div>
                <div class="footer-wrapper">
                    <div class="confirm">
                        <input type="checkbox" name="check" v-model="check" />
                        <p>
                            I accept Terms and Conditions, Diner Charter , Chef
                            Charter, and Trust and Privacy Policy.
                        </p>
                    </div>
                    <div class="btn-wrapper">
                        <button
                            class="return"
                            @click.prevent="
                                maxWidth > 480
                                    ? switched('termconchef', 'signupchef')
                                    : switched(
                                          'termconchef',
                                          'signupchef-mobile'
                                      )
                            "
                        >
                            return
                        </button>
                        <button
                            :disabled="!check"
                            @click.prevent="toggleModal('termconchef')"
                        >
                            confirm
                        </button>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import Inputs from '~/components/Inputs/Inputs.vue'
import Term from '~/components/Term/Term.vue'
import {
    required,
    minLength,
    email,
    maxLength,
    numeric,
} from 'vuelidate/lib/validators'
import api from '~/api/rest/api'
// import firebase from 'firebase'
import Loading from 'vue-loading-overlay'
import userAPI from '~/api/graphql/user'
import sampleAPI from '~/api/graphql/sample'
import 'vue-loading-overlay/dist/vue-loading.css'
import moment from 'moment'
export default {
    // props: [ "switched" ],
    data() {
        return {
            check: null,
            showError: false,
            user: {
                fname: null,
                lname: null,
                tel: null,
                email: null,
                password: null,
            },
            success: true,
            errMessage: '',
            isLoading: false,
            fullPage: true,
            maxWidth: Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
            ),
            temp: null,
        }
    },
    computed: {
        signup: function() {
            return {
                firstName: this.user.fname,
                lastName: this.user.lname,
                phoneNumber: this.user.tel,
                password: this.user.password,
                email: this.user.email,
                roleName: 'ROLE_CHEF',
            }
        },
    },
    validations: {
        user: {
            fname: {
                required,
                maxLength: maxLength(30),
                minLength: minLength(1),
            },
            lname: {
                required,
                maxLength: maxLength(30),
                minLength: minLength(1),
            },
            tel: {
                required,
                numeric,
                maxLength: maxLength(10),
                minLength: minLength(10),
            },
            email: {
                required,
                email,
                maxLength: maxLength(40),
            },
            password: {
                maxLength: maxLength(20),
                minLength: minLength(6),
                required,
            },
        },
    },
    components: {
        Inputs,
        Loading,
        Term,
    },
    methods: {
        switched(modalName1, modalName2) {
            this.$modal.toggle(modalName1)
            this.$modal.toggle(modalName2)
        },
        confirmSignup(modalName) {
            userAPI.checkDupplicateEmail(this.user.email).then(res => {
                const emailNotDupplicate = res.checkDupplicateEmail.success
                if (emailNotDupplicate && !this.$v.$invalid) {
                    const signup = {
                        ...this.signup,
                    }
                    this.$modal.hide(modalName)
                    this.$modal.show('termconchef')
                    this.temp = signup
                    this.check = false
                }
                if (!emailNotDupplicate) {
                    this.success = false
                    this.showError = true
                } else {
                    this.showError = true
                }
            })
        },
        toggleModal(modalName) {
            const signup = {
                ...this.temp,
            }
            this.isLoading = true
            api.signUp(signup)
                .then(response => {
                    if (response && response.success) {
                        this.success = true
                        this.$modal.hide(modalName)
                        this.$modal.show('thankyouChef')
                        this.temp = null
                    } else {
                        this.success = false
                    }
                    this.isLoading = false
                })
                .catch(err => {
                    this.isLoading = false
                })
        },
        closed() {
            this.$router.push('/applytochef')
        },
        regisClosed() {
            this.user = {
                fname: null,
                lname: null,
                tel: null,
                email: null,
                password: null,
            }
            this.showError = false
        },
        // socialFacecbookLogin() {
        //     const provide = new firebase.auth.FacebookAuthProvider()
        //     // provide.addScope('user_birthday')
        //     firebase
        //         .auth()
        //         .signInWithPopup(provide)
        //         .then(result => {
        //             if (!result.additionalUserInfo.profile.email) {
        //                 alert('Cannot sign in with this Facebook')
        //                 this.$modal.hide('signupchef')
        //                 this.$modal.hide('signupchef-mobile')
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
        //                                     roleName: 'ROLE_CHEF',
        //                                 }

        //                                 this.signUpWithFacebook(obj)
        //                             })
        //                     })
        //             }
        //         })
        // },
        signUpWithFacebook(obj) {
            this.isLoading = true
            api.fbAuth(obj).then(response => {
                if (response && response.success) {
                    this.$modal.hide('signupchef')
                    this.$modal.hide('signupchef-mobile')
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
                    this.$modal.hide('signupchef')
                    this.$modal.hide('signupchef-mobile')
                    // alert('Login success !')
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
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
.term-modal-wrapper {
    height: 100%;
    padding: 0 6%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @include respond-to($phone) {
        padding: 4% 4%;
    }
    * {
        margin: 10px 0;
    }
    .termcon-content {
        height: 50%;
        @include respond-to($phone) {
            height: 235px;
        }
        .term-wrapper {
            height: 100%;
            overflow-y: auto;
            padding: 0 10px;
        }
    }
    .footer-wrapper {
        border-top: 1px solid $accent;
        margin-top: 24px;
        .confirm {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            @include respond-to($phone) {
                input {
                    margin: 0;
                    padding: 8px;
                }
            }
            * {
                margin: 0 10px;
            }
        }
        .btn-wrapper {
            padding: 40px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            @include respond-to($phone) {
                padding: 10px;
            }
            * {
                margin: 0 10px;
            }
            .return {
                border: 1px solid #800020;
                padding: 10px 30px;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 600;
                color: #800020;
                background-color: #fff;
                @include respond-to($phone) {
                    padding: 0;
                }
            }
            button {
                padding: 10px 30px;
                @include respond-to($phone) {
                    padding: 0;
                }
            }
        }
    }
}
.logo-signup-thankyou {
    display: flex;
    justify-content: center;
    text-align: center;
    padding-top: 60px;
}
.logo-signup {
    display: flex;
    justify-content: center;
    text-align: center;
}
.signup-modal {
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
}
h2 {
    @include title-text(1.5em);
    font-weight: 600;
}
a {
    cursor: pointer;
}
.accept {
    color: $accent;
    font-weight: 600;
}
.footer {
    background-color: $footer-color;
    justify-content: center;
    text-align: center;
    display: flex;
    width: 100%;
    height: 48px;
    align-items: center;
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
.signupbtn {
    padding: 32px 0 32px 0;
    text-align: center;
    font-weight: 600;
    button {
        width: 140px;
        padding: 10px 36px;
        border-radius: 4px !important;
    }
}
.forget {
    text-align: center;
    margin-bottom: 24px;
    font-size: 12px;
    font-weight: 700;
}
.logo {
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    padding-top: 18px;
}
.login {
    padding-top: 64px;
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
    margin-top: 32px;
    background-color: $facebook;
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

.Inputs {
    padding: 16px 0 0 0;
    width: 100%;
}
.form {
    width: 100%;
    padding: 0 10px;
}
.error {
    color: $accent;
    font-size: 12px;
}
.register-content {
    display: flex;
    justify-content: space-between;
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
