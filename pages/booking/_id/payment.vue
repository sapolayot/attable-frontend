<template>
    <div class="page-wrapper payment">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <div class="progress-bar">
            <h4 class="title">
                3 Steps to complete booking!
            </h4>
            <ProgressBar :step="currentStep" :stepNames="stepNames" />
        </div>
        <div class="header-section">
            <h4 v-if="currentStep === 1">
                Booking Request
            </h4>
            <h4 v-else-if="currentStep === 2">
                Booking Summary
            </h4>
            <h4 v-else-if="currentStep === 3">
                Payment Detail
            </h4>
        </div>
        <div class="body-section">
            <EventDetail
                :subevent="subevent"
                :sizeDiner="sizeDiner"
                :review="review"
                :reviewerNumber="reviewerNumber"
            />
            <BookingRequest
                v-if="currentStep === 1 && bookDiner"
                :dinerName="`${user.firstName} ${user.lastName}`"
                :dinerMail="user.email"
                :dinerTel="bookDiner.phoneNumber"
                :diners="bookDiner.diners"
                :bookDiner="bookDiner"
                :aboutme="bookDiner.aboutme"
            />
            <BookingSummary
                v-if="currentStep === 2 && bookDiner"
                :dinerMail="user.email"
                :dinerTel="bookDiner.phoneNumber"
                :diners="bookDiner.diners"
                :bookDiner="bookDiner"
                :aboutme="bookDiner.aboutme"
                :subEvent="subevent"
            />
        </div>
        <!-- Out side body section cause width -->
        <PaymentDetail
            ref="child"
            v-if="requestingDate"
            :requestingDate="requestingDate"
            :bookId="bookId"
            :error="$v"
        />
        <!-- End Outside -->
        <div class="button-wrapper body-section">
            <button class="outline" type="button" @click="previousStep">
                Return
            </button>
            <button
                type="button"
                @click="nextStep"
                :disabled="currentStep === 1 && $v.bookDiner.$invalid"
            >
                Confirm
            </button>
        </div>
    </div>
</template>

<script>
import ProgressBar from '~/components/Payment/ProgressBar'
import BookingRequest from '~/components/Payment/BookingRequest'
import BookingSummary from '~/components/Payment/BookingSummary'
import PaymentDetail from '~/components/Payment/PaymentDetail'
import EventDetail from '~/components/Payment/EventDetail'
import apiConfig from '~/config/endpoint'
import eventAPI from '~/api/graphql/events'
import reviewAPI from '~/api/graphql/review'
import bookingAPI from '~/api/graphql/booking'
import ReservationAPI from '~/api/graphql/booking'
import { mapState } from 'vuex'
import moment from 'moment'
import axios from 'axios'
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
        ProgressBar,
        BookingRequest,
        BookingSummary,
        PaymentDetail,
        EventDetail,
        Loading,
    },
    data() {
        return {
            // currentStep: this.$route.query.currentStep ? this.$route.query.currentStep : 1,
            isLoading: false,
            currentStep: 0,
            stepNames: ['Fill Info', 'Summary', 'Payment'],
            diners: null,
            bookDiner: null,
            requestingDate: null,
            bookId: null,
            subevent: null,
            totalPrice: 0,
            sizeDiner: 0,
            paymentError: true,
            payment: {},
            review: 0,
            reviewerNumber: 0,
            // reServation: null
            // requestDate: ''
        }
    },
    validations: {
        bookDiner: {
            diners: {
                required,
                $each: {
                    fullName: {
                        required,
                    },
                    foodRestriction: {
                        required,
                    },
                },
            },
            phoneNumber: {
                required,
                numeric,
            },
        },
        payment: {
            paymentMethod: {
                required,
            },
            transferDate: {
                required,
            },
            fileUpload: {
                required,
            },
            nameOnCard: {
                required,
            },
            cardNumber: {
                required,
                numeric,
                minLength: minLength(12),
            },
            expiryDate: {
                required,
                minLength: minLength(4),
            },
            cvc: {
                required,
                numeric,
                minLength: minLength(3),
            },
        },
    },
    mounted() {
        this.isLoading = true
        this.sizeDiner = parseInt(this.$route.query.number)
        this.bookId = this.$route.params.id
        const subeventId = this.$route.query.subeventId
            ? this.$route.query.subeventId
            : null
        eventAPI.getSubEventById(this.$route.query.subeventId).then(res => {
            this.subevent = res.getSubEventById
            this.totalPrice = this.subevent.event.pricePerSeat * this.sizeDiner
            reviewAPI
                .getReviewByChefId(1, 10000000, this.subevent.event.chef.id)
                .then(res => {
                    res.getReviewByChefId.reviewevents.map(item => {
                        this.review += item.rate1
                        this.review += item.rate2
                        this.review += item.rate3
                        this.review += item.rate4
                        this.review += item.rate5
                        this.review += item.rate6
                        this.review += item.rate7
                    })
                    this.reviewerNumber =
                        res.getReviewByChefId.reviewevents.length
                    this.isLoading = false
                })
        })
        const tempArray = Array.apply(null, {
            length: this.$route.query.number,
        }).map(Number.call, Number)
        this.diners = tempArray.map(item => {
            return {
                fullName: '',
                foodRestriction: [],
            }
        })
        this.bookDiner = {
            diners: this.diners,
            phoneNumber: this.user.phoneNumber,
            aboutme: null,
        }
        this.currentStep = this.$route.query.currentStep
            ? this.$route.query.currentStep
            : 1
        if (this.currentStep == 3) {
            this.getDate()
        }
        var scriptTag = document.createElement('script')
        scriptTag.src = 'https://cdn.omise.co/omise.js'
        scriptTag.id = 'omise'
        document.getElementsByTagName('head')[0].appendChild(scriptTag)
    },
    methods: {
        previousStep() {
            if (this.currentStep != 3 && this.currentStep > 1) {
                this.currentStep--
            } else {
                this.$router.go(-1)
            }
        },
        nextStep() {
            if (this.currentStep == 2) {
                const data = {
                    aboutYou: this.bookDiner.aboutme,
                    user: {
                        id: this.user.id,
                    },
                    subevent: {
                        id: this.$route.query.subeventId,
                    },
                    join: this.diners.map(item => {
                        return {
                            firstName: item.fullName.split(' ')[0],
                            lastName: item.fullName.split(' ')[1]
                                ? item.fullName.split(' ')[1]
                                : '',
                            allergic: item.foodRestriction.map(res => {
                                return {
                                    ...res,
                                }
                            }),
                        }
                    }),
                }
                this.isLoading = true
                ReservationAPI.bookingEvent(data).then(res => {
                    this.bookId = res.bookingEvent.reserve.id
                    this.getDate()
                    this.currentStep++
                })
            } else if (this.currentStep == 3) {
                this.isLoading = true
                this.payment = this.$refs.child
                this.$v.$touch()
                if (this.$v.payment.paymentMethod.$error) {
                    return false
                }
                const data = {
                    paymentMethod: this.payment.paymentMethod,
                    paymentDate: moment(this.payment.transferDate).format(
                        'DD-MM-YYYY HH:mm:ss'
                    ),
                    bankName: this.payment.transferTo,
                    price: this.totalPrice,
                    slipUrl: this.payment.fileUpload,
                    reserve: {
                        id: this.bookId,
                    },
                }
                if (this.payment.paymentMethod == 'BANK_TRANSFER') {
                    if (
                        this.$v.payment.transferDate.$error ||
                        this.$v.payment.fileUpload.$error
                    ) {
                        return false
                    }
                }
                if (this.payment.paymentMethod == 'CREDIT_CARD') {
                    if (
                        this.$v.payment.nameOnCard.$error ||
                        this.$v.payment.cardNumber.$error ||
                        this.$v.payment.expiryDate.$error ||
                        this.$v.payment.cvc.$error
                    ) {
                        return false
                    } else {
                        Omise.setPublicKey('pkey_test_5gwxqp61b4a3d6t86d8')
                        Omise.api_secret = 'skey_test_5gwxqp61kiy214mn2la'
                        var card = {
                            name: this.payment.nameOnCard,
                            number: '4242424242424242',
                            expiration_month: '02',
                            expiration_year: '2020',
                            security_code: '111',
                        }
                        Omise.createToken(
                            'card',
                            card,
                            (statusCode, response) => {
                                if (response.object == 'error') {
                                    var message_text =
                                        'SET YOUR SECURIsTY CODE CHECK FAILED MESSAGE'
                                    if (response.object == 'error') {
                                        message_text = response.message
                                    }
                                } else {
                                    const charge = {
                                        amount: this.totalPrice * 100,
                                        token: response.id,
                                        reserveId: this.bookId,
                                    }
                                    axios
                                        .post(
                                            apiConfig.ENDPOINT_OMISE,
                                            charge,
                                            {
                                                headers: {
                                                    'Content-Type':
                                                        'application/json',
                                                    Authorization:
                                                        'Bearer ' +
                                                        this.user.accessToken,
                                                },
                                            }
                                        )
                                        .then(res => {
                                            this.$router.push('/booking')
                                            this.isLoading = false
                                        })
                                }
                            }
                        )
                    }
                    return
                }
                ReservationAPI.paymentBooking(data).then(() => {
                    this.$router.push('/booking')
                    this.isLoading = false
                })
            } else {
                this.currentStep++
            }
        },
        timeRemaining(date) {
            return moment(date)
                .toDate()
                .formNow()
        },
        getDate() {
            bookingAPI.getReservationById(this.bookId).then(res => {
                const reserve = res.getReservationById
                this.requestingDate = reserve.requestingDate
                this.sizeDiner = reserve.join.length
                this.event = res.getReservationById.subevent.event
                this.totalPrice = this.event.pricePerSeat * this.sizeDiner
                this.isLoading = false
            })
        },
    },
    computed: {
        ...mapState({
            user: state => state.auth.auth,
            //payment: state => state.payment.payment
        }),
    },
}
</script>
<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;

.page-wrapper {
    $paddingMock: 12px;
    .left {
        flex: 1;
        padding-right: $paddingMock;
        @include respond-to($phone) {
            padding-right: 0px;
        }
        p {
            margin-top: 14px;
        }
        &.end {
            align-self: flex-end;
            @include respond-to($phone) {
                align-self: stretch;
            }
        }
    }
    .right {
        flex: 1;
        padding-left: $paddingMock;
        @include respond-to($phone) {
            padding-left: 0px;
            margin-top: 6px;
        }
    }
    .label-text {
        display: block;
        color: $accent;
        font-size: 16px;
        margin-bottom: 6px;

        &.small {
            font-size: 0.7em;
            color: #828282;
        }
    }
    .single {
        flex: 1;
        textarea {
            border: 1px solid #bdbdbd;
            width: 100%;
            height: 160px;
        }
    }

    width: 80%;
    margin: 0 auto;
    @include respond-to($phone) {
        width: 100%;
        padding: 0 16px;
    }
    .progress-bar {
        width: 80%;
        margin: 0 auto;
        @include respond-to($phone) {
            width: 100%;
        }
        h4.title {
            @include title-text(1.5rem);
            margin: 72px 0 32px;
            text-transform: uppercase;
            text-align: center;
            @include respond-to($phone) {
                margin: 16px 0;
            }
        }
    }
    .header-section {
        padding: 32px 0 8px;
        border-bottom: 1px solid $accent;
        margin-bottom: 24px;
        @include respond-to($phone) {
            width: 100%;
            margin: 0;
        }
        h4 {
            @include title-text(1.5rem);
            font-weight: bold;
        }
    }
    .body-section {
        @include respond-to($phone) {
            width: 100%;
        }
        padding: 24px 0;
        width: 80%;
        margin: 0 auto;
    }
}

.button-wrapper {
    display: flex;
    justify-content: center;

    button {
        margin: 0 20px;
        @include respond-to($phone) {
            width: 100%;
        }
    }
}
</style>
