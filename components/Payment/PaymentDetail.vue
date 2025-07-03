<template>
    <div class="payment-wrapper">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <div class="header-section">
            <h4>
                Payment Mode Selection
            </h4>
        </div>
        <div class="body-section">
            <p>
                Time remaining <span>{{ counterTime }}</span> minutes
            </p>
            <div class="credit-card">
                <RadioWithLabel
                    label="Pay by credit card"
                    data="CREDIT_CARD"
                    v-model="paymentMethod"
                />
                <div class="detail" v-if="paymentMethod === 'CREDIT_CARD'">
                    <p>
                        All payment data is fully encrypted and protected. Enter
                        your payment details
                    </p>
                    <div class="form">
                        <div class="nameoncard input-content-wrapper">
                            <Inputs
                                holder="Name on card"
                                v-model="nameOnCard"
                            />
                            <span
                                class="error-text"
                                v-if="error.payment.nameOnCard.$error"
                                >* Please fill the required field</span
                            >
                        </div>
                        <div class="cardNumber input-content-wrapper">
                            <cleave
                                placeholder="Card Number"
                                v-model="cardNumber"
                                :options="numberOptions"
                                class="input-text"
                                name="card"
                            />
                            <span
                                class="error-text"
                                v-if="error.payment.cardNumber.$error"
                                >* Please fill the required field</span
                            >
                        </div>
                        <div class="expire-date input-content-wrapper">
                            <cleave
                                placeholder="Expire date"
                                v-model="expiryDate"
                                :options="expireOption"
                                class="input-text"
                                name="card"
                            />
                            <span
                                class="error-text"
                                v-if="error.payment.expiryDate.$error"
                                >* Please fill the required field</span
                            >
                        </div>
                        <div class="cvc input-content-wrapper">
                            <cleave
                                placeholder="CVC"
                                v-model="cvc"
                                :options="cvcOption"
                                class="input-text"
                                name="card"
                            />
                            <span
                                class="error-text"
                                v-if="error.payment.cvc.$error"
                                >* Please fill the required field</span
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div class="credit-card">
                <RadioWithLabel
                    label="Pay by bank transfer"
                    data="BANK_TRANSFER"
                    v-model="paymentMethod"
                />
                <div class="detail" v-if="paymentMethod === 'BANK_TRANSFER'">
                    <div class="qr-wrapper">
                        <!-- <img
                            :src="qrcode"
                            alt="QR Code"
                        > -->
                        <promptpay-qr id="01055621273" :amount="totalBaht" />
                        <p>scan QR Code to pay</p>
                    </div>
                    <div class="form">
                        <!-- <DropdownSingle
                            :items="bankNames"
                            @clicked="bankNameClick"
                            overflow="5"
                        /> -->
                        <!-- <Inputs
                            holder="Transfer To"
                            v-model="transferTo"
                        /> -->
                        <Inputs
                            name="datetime-local"
                            holder="Transfer Date"
                            v-model="transferDate"
                        />
                        <span
                            class="error-text"
                            v-if="error.payment.transferDate.$error"
                            >* Please fill the required field</span
                        >
                        <p>THB {{ totalBaht.toLocaleString() }}</p>
                        <div class="upload-container">
                            <input
                                placeholder="Browse"
                                :value="slipFileName ? slipFileName : ''"
                                readonly
                            />
                            <label class="upload" for="file-upload">
                                <div class="upload-icon">
                                    <div class="icon" />
                                </div>
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                @change="onFileUploadSlipSelected"
                                v-show="false"
                            />
                        </div>
                    </div>
                    <span
                        class="error-text"
                        v-if="error.payment.fileUpload.$error"
                        >* Please fill the required field</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import RadioWithLabel from '~/components/RadioWithLabel'
import Inputs from '~/components/Inputs/Inputs'
import moment from 'moment'
import { mapState } from 'vuex'
import ReservationAPI from '~/api/graphql/booking'
import paddingWithZero from '~/utils/paddingWithZero'
import DropdownSingle from '~/components/Dropdown/DropdownSingle.vue'
import axios from 'axios'
import apiConfig from '~/config/endpoint'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    props: ['requestingDate', 'bookId', 'error'],
    components: {
        RadioWithLabel,
        Inputs,
        Loading,
    },
    data() {
        return {
            isLoading: false,
            paymentMethod: null,
            nameOnCard: null,
            cardNumber: null,
            expiryDate: null,
            cvc: null,
            transferTo: null,
            transferDate: null,
            totalBaht: 0,
            bankNames: [
                {
                    value: 'Attable kasikorn/125369',
                    value2: '125369',
                },
                {
                    value: 'Attable thaipanit/5415621',
                    value2: '5415621',
                },
                {
                    value: 'Attable krungthai/529626',
                    value2: '529626',
                },
            ],
            fileUpload: null,
            counterTime: null,
            intervalTime: null,
            initialTime: null,
            paddingWithZero: paddingWithZero,
            event: {},
            slipFileName: null,
            qrcode: null,
            numberOptions: {
                creditCard: true,
            },
            expireOption: {
                date: true,
                datePattern: ['m', 'y'],
            },
            cvcOption: {
                numericOnly: true,
                blocks: [3],
            },
        }
    },
    methods: {
        moment,
        updateTime() {
            this.initialTime = this.initialTime - 1000 // ลบออก 1 วิทุกๆครั้ง
            if (this.initialTime === 0) {
                alert('Time Out')
                return this.$router.push('/')
            }
            const durationTime = moment.duration(this.initialTime)
            this.counterTime = `${durationTime.minutes()}:${this.paddingWithZero.paddingWithZero(
                durationTime.seconds(),
                2
            )}`
        },
        onFileUploadSlipSelected(event) {
            this.isLoading = true
            const datafile = event.target.files[0]
            this.slipFileName = datafile.name
            if (this.slipFileName.lastIndexOf('.') <= 0) {
                return alert('Please add image file!')
            }
            let fileData = new FormData()
            fileData.append('image', datafile)
            axios
                .post(apiConfig.ENDPOINT_UPLOAD_DATA, fileData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + this.userStore.accessToken,
                    },
                })
                .then(response => {
                    this.fileUpload = response.data
                    this.isLoading = false
                })
                .catch(error => {
                    console.error('err' + error)
                    this.isLoading = false
                })
        },
        getGenerateQrcode() {
            this.qrcode = `${apiConfig.ENDPOINT_GENERATE_QR_CODE_PHONE}?paymentAmount=${this.totalBaht}`
        },
        bankNameClick(value) {
            this.transferTo = value.value2
        },
        initialTimeMethod() {
            const startMockDate = moment(this.requestingDate)
                .utc()
                .format('YYYY-MM-DD HH:mm:ss')
            const now = moment().format('YYYY-MM-DD HH:mm:ss')
            const checkTime = moment(now).diff(
                moment(startMockDate, 'YYYY-MM-DD HH:mm:ss')
            )
            this.intervalTime = setInterval(() => {
                this.updateTime()
            }, 1000)
            if (checkTime > 900000) {
                alert('Time Out')
                return this.$router.push('/')
            } else {
                this.initialTime = 900000 - checkTime
            }
        },
        getReservationById() {
            ReservationAPI.getReservationById(this.bookId).then(res => {
                const reserve = res.getReservationById
                const event = res.getReservationById.subevent.event
                this.totalBaht = event.pricePerSeat * reserve.join.length
                //this.getGenerateQrcode()
            })
        },
    },
    mounted() {
        this.initialTimeMethod()
        this.getReservationById()
    },
    destroyed() {
        clearInterval(this.intervalTime)
        // ReservationAPI.autoCancelReservation(this.bookId)
    },
    computed: {
        ...mapState({
            userStore: state => state.auth.auth,
        }),
    },
}
</script>
<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
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

    h4 {
        color: $accent;
        font-size: 1.4em;
    }
    p {
        span {
            color: $accent;
            font-size: 2em;
            margin: 0 16px;
        }
    }
    .credit-card {
        margin-top: 16px;
        .detail {
            margin-left: 40px;
            margin-top: 16px;
            @include respond-to($phone) {
                margin: 8px 0px;
            }
            p {
                font-size: 14px;
            }
            .form {
                margin-top: 30px;
                @include respond-to($phone) {
                    margin: 0px;
                }
                display: flex;
                flex-flow: row wrap;
                .input-content-wrapper {
                    width: 100%;
                    margin-top: 24px;
                    &.expire-date {
                        width: 50%;
                        padding-right: 8px;
                    }
                    &.cvc {
                        width: 50%;
                        padding-left: 8px;
                    }
                }
                .input-wrapper {
                    width: 100%;
                }
                p {
                    margin-top: 20px;
                    width: 100%;
                }
                .file-upload {
                    width: 100%;
                    margin-top: 0px;
                }
                .upload-container {
                    display: flex;
                    width: 50%;
                }
                .upload {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 16px;
                    @include respond-to($phone) {
                        width: 100%;
                    }
                    .upload-icon {
                        width: 43px;
                        height: 40px;
                        border-radius: 50%;
                        background: $accent;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .icon {
                            width: 12px;
                            height: 20px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background: white;
                            mask: url('~assets/attachment.svg') no-repeat;
                        }
                    }
                }
            }
        }
    }
}

.qr-wrapper {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px auto;
    text-align: center;
    @include respond-to($phone) {
        width: 100%;
    }
    p {
        text-align: center;
    }
    img {
        height: auto;
        width: inherit;
        align-self: center;
    }
}

.input-text {
    font-size: 18px;
    ::placeholder {
        font-size: 20px;
    }
}
</style>
