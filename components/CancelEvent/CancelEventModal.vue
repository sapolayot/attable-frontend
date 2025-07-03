<template>
    <div class="cancel-wrapper">
        <modal
            name="cancel-event-modal"
            classes="forget-password-modal-wrapper"
            :adaptive="true"
            width="50%"
            height="auto"
        >
            <loading
                :active.sync="isLoading"
                :can-cancel="false"
                :is-full-page="true"
            />
            <section class="main-content">
                <div class="close-btn">
                    <button
                        class="btn"
                        @click.prevent="$modal.hide('forget-password-modal')"
                    >
                        <i class="material-icons">close</i>
                    </button>
                </div>
                <div class="logo">
                    <img src="~/assets/logo.png" />
                    <!-- <h4>Cancel?</h4> -->
                    <p>
                        You are about to cancel your approved event.
                    </p>
                </div>
                <form class="form" @submit.prevent="forgotPassword">
                    <p>Please click below button to confirm</p>
                    <button type="submit" class="cancelbtn">
                        Return
                    </button>
                    <button
                        type="submit"
                        class="submitbtn"
                        @click.prevent="CancelEvent"
                    >
                        Send
                    </button>
                </form>
            </section>
        </modal>
        <modal
            name="forgetmodal"
            :adaptive="true"
            classes="thank-modal-wrapper"
            width="50%"
            :height="'auto'"
        >
            <section class="main-content">
                <div class="close-btn">
                    <button
                        class="btn"
                        @click.prevent="$modal.hide('forgetmodal')"
                    >
                        <i class="material-icons">close</i>
                    </button>
                </div>
                <div class="logo-forgot">
                    <img src="~/assets/logo.png" />
                </div>
                <label class="forgot-modal">
                    <p>
                        Thank you! You will receive an email with a link to
                        reset your password.
                    </p>
                </label>
            </section>
        </modal>
    </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { required } from 'vuelidate/lib/validators'
import Inputs from '~/components/Inputs/Inputs.vue'
import userAPI from '~/api/graphql/user'

export default {
    props: ['toggleModal', 'switched'],
    components: {
        // Inputs,
        Loading,
    },
    data() {
        return {
            isLoading: false,
            showError: false,
            email: '',
            maxWidth: Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
            ),
        }
    },
    validations: {
        email: { required },
    },
    methods: {
        CancelEvent() {
            this.$router.push('/event/cancel_event/1')
        },
        forgotPassword() {
            if (!this.$v.$invalid) {
                this.isLoading = true
                userAPI.forgetPassword(this.email).then(res => {
                    if (res.forgetPassword.success) {
                        this.$modal.hide('forget-password-modal')
                        this.$modal.show('forgetmodal')
                    }
                    this.isLoading = false
                })
            } else {
                this.showError = true
            }
        },
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
}
a {
    cursor: pointer;
}
.main-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 75%;
    margin: 0 auto;
    margin-bottom: 24px;
    @include respond-to($phone) {
        width: 90%;
    }
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
.logo-forgot {
    display: flex;
    justify-content: center;
    text-align: center;
    padding-top: 60px;
}
.forgot-modal {
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    @include respond-to($phone) {
        padding: 15px 0;
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
.logo {
    justify-content: center;
    flex-direction: column;
    //text-align: center;
    margin-top: 32px;
    display: flex;
    width: 100%;
    img {
        margin-bottom: 20px;
    }
    h4 {
        color: $accent;
    }
    p {
        text-align: center;
    }
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
    margin-top: 28px;
    button {
        @include button;
        width: 100%;
        margin-top: 30px;
    }
    label {
        float: left;
    }
    .submitbtn {
        width: 152px;
        padding: 10px 36px;
        border-radius: 4px !important;
    }
    .cancelbtn {
        width: 152px;
        padding: 10px 36px;
        border-radius: 4px !important;
        background: #ffffff;
        color: #800020;
    }
}
.forget {
    .lb-forgot {
        color: $accent;
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
<style lang="scss">
@use '@/styles/responsive.scss' as *;
// Modal Style without scope for overwrite style
.forget-password-modal-wrapper {
    background: #fff;
    border-radius: 6px;
    height: 100% !important;
    @include respond-to($phone) {
        width: 100% !important;
        min-height: auto !important;
        left: 0 !important;
    }
}
.thank-modal-wrapper {
    background: #fff;
    border-radius: 6px;
    height: 100% !important;
    @include respond-to($phone) {
        width: 80% !important;
        min-height: auto !important;
        left: 10% !important;
        right: 10% !important;
    }
}
</style>
