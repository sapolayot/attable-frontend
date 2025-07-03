<template>
    <section>
        <form class="error-wrapper" @submit.prevent="submitRepassword">
            <h2>Please set your new password</h2>
            <div class="input-wrapper">
                <p>New password</p>
                <Inputs
                    v-model="newPassword"
                    :class="
                        $v.newPassword.$invalid && showError
                            ? 'error-input'
                            : 'non-error'
                    "
                    holder="new password"
                    name="password"
                />
                <div class="error" v-if="!$v.newPassword.required && showError">
                    *Password is required.
                </div>
                <div class="error" v-if="!this.$v.newPassword.minLength">
                    *Password 6 characters minimum.
                </div>
            </div>
            <div class="input-wrapper">
                <p>Confirm New password</p>
                <Inputs
                    v-model="confirmNewPassword"
                    :class="
                        $v.confirmNewPassword.$invalid && showError
                            ? 'error-input'
                            : 'non-error'
                    "
                    holder="confirm new password"
                    name="password"
                />
                <div
                    class="error"
                    v-if="!$v.confirmNewPassword.required && showError"
                >
                    *Confirm New password.
                </div>
                <div
                    class="error"
                    v-if="
                        $v.newPassword.$model !== $v.confirmNewPassword.$model
                    "
                >
                    The combination of new password and confirm new password you
                    entered does not match.
                </div>
            </div>
            <button type="submit">
                Submit
            </button>
        </form>
        <modal
            name="repassmodal"
            :adaptive="true"
            :width="maxWidth > 480 ? '40%' : '90%'"
            @closed="$router.push('/')"
        >
            <loading
                :active.sync="isLoading"
                :can-cancel="false"
                :is-full-page="fullPage"
            />
            <div class="close-btn">
                <button class="btn" @click.prevent="$modal.hide('repassmodal')">
                    <i class="material-icons">close</i>
                </button>
            </div>
            <div class="logo-forgot">
                <img src="~/assets/logo.png" />
            </div>
            <label class="forgot-modal">
                <p>Thank you! Your password has been reset!</p>
            </label>
        </modal>
    </section>
</template>
<script>
import Inputs from '~/components/Inputs/Inputs.vue'
import userAPI from '~/api/graphql/user'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import {
    required,
    minLength,
    email,
    maxLength,
    numeric,
} from 'vuelidate/lib/validators'

export default {
    components: {
        Loading,
        Inputs,
    },
    data() {
        return {
            isLoading: false,
            newPassword: null,
            confirmNewPassword: null,
            showError: false,
            fullPage: true,
            maxWidth: Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
            ),
        }
    },
    validations: {
        newPassword: {
            required,
            minLength: minLength(6),
        },
        confirmNewPassword: {
            required,
        },
    },
    methods: {
        submitRepassword() {
            if (
                this.$v.$invalid == false &&
                this.$v.newPassword.$model === this.$v.confirmNewPassword.$model
            ) {
                this.isLoading = true
                userAPI
                    .changePassword(
                        this.$route.query.token,
                        this.$route.query.email,
                        this.newPassword
                    )
                    .then(res => {
                        if (res.changePassword.success) {
                            this.$modal.show('repassmodal')
                        }
                    })
            } else {
                this.showError = true
            }
            this.isLoading = false
        },
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;

.error-input {
    @include error-input;
}
.non-error {
    input {
        @include input;
    }
}
.input-wrapper {
    width: 100%;
    margin-top: 10px;

    .error {
        color: $accent;
        font-size: 12px;
        text-align: left;
        justify-content: left;
    }

    @include respond-to($phone) {
        width: 90%;
        text-align: left;
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
}
section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - #{$footerHeight + $navbarHeight});
    .error-wrapper {
        width: 500px;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        @include respond-to($phone) {
            height: auto;
            justify-content: center;
            h2 {
                font-size: 1.25em;
                margin-bottom: 20px;
            }
        }
    }

    button {
        border: 1px solid #800020;
        padding: 10px 30px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 600;
        color: #800020;
        background-color: #fff;
        margin-top: 30px;
        @include respond-to($phone) {
            padding: 8px 8px;
        }
        &:hover {
            background: #800020;
            color: white;
        }
    }
}
</style>
