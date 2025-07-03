<template>
    <div class="page-wrapper">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <section>
            <h1 class="headline">
                Contact us
            </h1>
            <div class="content">
                <modal name="Thankyou">
                    <div class="close-btn">
                        <button
                            class="btn"
                            @click.prevent="toggleModal('Thankyou')"
                        >
                            <i class="material-icons">close</i>
                        </button>
                    </div>
                    <div class="logo">
                        <img src="~/assets/logo.png" />
                    </div>
                    <label class="Thankyou">
                        Thank you for your message.
                        <br />
                        Please wait for our team to contact you back.
                    </label>
                </modal>
                <div class="contact-text-wrapper">
                    <p>
                        607/125, Trok Wat Chan Nai, Bang Khlo Sub-district, Bang
                        Kho Laem District Bangkok 10120
                    </p>
                    <div class="tel-wrapper">
                        <p>Tel:&nbsp;</p>
                        <a href="tel:0802215565"> 0802215565</a>
                    </div>
                </div>
                <h3 class="sub-title">
                    Please leave us a message.
                </h3>
                <form class="form">
                    <Inputs
                        class="input"
                        holder="Name*"
                        name="name"
                        v-model="inquiry.name"
                    />
                    <p
                        class="error-text"
                        v-if="
                            !$v.inquiry.name.required && $v.inquiry.name.$error
                        "
                    >
                        *Please fill the required field
                    </p>
                    <Inputs
                        class="input"
                        holder="Email Address*"
                        name="email"
                        v-model="inquiry.email"
                    />
                    <p
                        class="error-text"
                        v-if="
                            !$v.inquiry.email.required &&
                                $v.inquiry.email.$error
                        "
                    >
                        *Please fill the required field
                    </p>
                    <p
                        class="error-text"
                        v-if="
                            $v.inquiry.email.$error && $v.inquiry.email.required
                        "
                    >
                        *Error found! Please recheck
                    </p>
                    <Inputs
                        class="input"
                        holder="Phone No.*"
                        name="phone"
                        v-model="inquiry.phoneNumber"
                    />
                    <p
                        class="error-text"
                        v-if="
                            !$v.inquiry.phoneNumber.required &&
                                $v.inquiry.phoneNumber.$error
                        "
                    >
                        *Please fill the required field
                    </p>
                    <p
                        class="error-text"
                        v-if="
                            $v.inquiry.phoneNumber.$error &&
                                $v.inquiry.phoneNumber.required
                        "
                    >
                        *Error found! Please recheck
                    </p>
                    <Inputs
                        class="input"
                        holder="Subject*"
                        name="subject"
                        v-model="inquiry.subject"
                    />
                    <p
                        class="error-text"
                        v-if="
                            !$v.inquiry.subject.required &&
                                $v.inquiry.subject.$error
                        "
                    >
                        *Please fill the required field
                    </p>
                    <Inputs
                        class="input"
                        holder="Message*"
                        name="message"
                        v-model="inquiry.message"
                    />
                    <p
                        class="error-text"
                        v-if="
                            !$v.inquiry.message.required &&
                                $v.inquiry.message.$error
                        "
                    >
                        *Please fill the required field
                    </p>
                    <div class="contact">
                        or visit our
                        <nuxt-link to="/faq">
                            FAQ page
                        </nuxt-link>
                    </div>
                    <input
                        class="submit-contact"
                        type="submit"
                        value="Submit Now"
                        @click.prevent="AddContact('Thankyou')"
                    />
                </form>
            </div>
        </section>
    </div>
</template>

<script>
import Inputs from '~/components/Inputs/Inputs.vue'
import userAPI from '~/api/graphql/user'
import axios from 'axios'
import apiConfig from '~/config/endpoint'
import eventAPI from '~/api/graphql/events'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import {
    required,
    minLength,
    email,
    maxLength,
    numeric,
    minValue,
    maxValue,
} from 'vuelidate/lib/validators'

export default {
    components: {
        Inputs,
        Loading,
    },
    layout: 'detail',
    data() {
        return {
            isLoading: false,
            inquiry: {
                name: '',
                email: '',
                phoneNumber: '',
                subject: '',
                message: '',
            },
        }
    },
    validations: {
        inquiry: {
            name: {
                required,
            },
            email: {
                email,
                required,
            },
            phoneNumber: {
                required,
                numeric,
                maxLength: maxLength(10),
                minLength: minLength(10),
            },
            subject: {
                required,
            },
            message: {
                required,
            },
        },
    },
    methods: {
        toggleModal(modalName) {
            this.$modal.toggle(modalName)
        },
        AddContact(modalName, inquiry) {
            this.$v.$touch()
            if (this.$v.$error) {
                return false
            }
            const event = {
                contactUs: {
                    name: this.inquiry.name,
                    email: this.inquiry.email,
                    phoneNumber: this.inquiry.phoneNumber,
                    messages: this.inquiry.message,
                    subject: this.inquiry.subject,
                },
            }
            this.isLoading = true
            userAPI.createInquiry(event).then(response => {
                this.$modal.toggle(modalName)
                setTimeout(() => {
                    this.isLoading = false
                    this.$router.push('/')
                }, 3000)
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.page-wrapper {
    section {
        .logo {
            width: 100%;
            display: flex;
            justify-content: center;
            text-align: center;
        }
        .Thankyou {
            padding-top: 64px;
            width: 100%;
            display: flex;
            justify-content: center;
            text-align: center;
        }
        .close-btn {
            display: flex;
            justify-content: flex-end;
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
        .headline {
            padding-top: 32px;
            text-align: center;
            font-weight: 600;
        }
        .content {
            padding: 0px 30% 32px 30%;
            .contact-text-wrapper {
                padding-top: 40px;
                .tel-wrapper {
                    display: flex;
                    align-items: center;
                }
            }
        }
        .sub-title {
            margin-top: 48px;
            text-align: center;
            font-size: 18px;
            color: black;
        }
        .form {
            padding: 32px 0px 64px 0px;
            .submit-contact {
                width: 112px;
                display: flex;
                justify-content: center;
                margin: 0 auto;
                border-radius: 4px;
                padding: 10px 15px;
            }
        }
        .input {
            margin-bottom: 32px;
        }
        .text {
            display: none;
        }
        .is-show.text {
            display: block;
        }
        .contact {
            padding: 16px 0px 32px 0px;
            font-size: 20px;
        }
    }
}
.textarea {
    height: 300px;
}
</style>
