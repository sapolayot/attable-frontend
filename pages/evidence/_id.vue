<template>
    <div class="booking-detail-wrapper">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <h1 class="header">
            MY BOOKING
        </h1>
        <h3 class="reservation-number">
            Reservation Number {{ deep(reserve, 'id') }}
        </h3>
        <div class="event-section">
            <div class="status">Status: {{ deep(reserve, 'status') }}</div>
            <div class="event-header">
                <div class="text-wrapper">
                    <h3 class="event-name">
                        {{ deep(reserve, 'subevent.event.eventName') }}
                    </h3>
                    <div class="chef-name">
                        {{
                            deep(reserve, 'subevent.event.chef.user.firstName')
                        }}
                        {{ deep(event, 'subevent.event.chef.user.lastName') }}
                    </div>
                </div>
                <div
                    class="chef-profile-img"
                    @click.prevent="$router.push('/profile/public/1')"
                >
                    <img
                        :src="
                            deep(
                                reserve,
                                'subevent.event.chef.user.profileImage'
                            )
                        "
                    />
                </div>
            </div>
            <EventDetail
                :startDate="deep(reserve, 'subevent.eventDate')"
                :startTime="deep(reserve, 'subevent.startTime')"
                :endTime="deep(reserve, 'subevent.endTime')"
                :people="deep(reserve, 'join.length')"
                :price="deep(reserve, 'payment.price')"
                :allergic="deep(reserve, 'subevent.event.allergic')"
                :refundable="deep(reserve, 'refundable')"
                :id="deep(reserve, 'subevent.event.id')"
            />
            <div class="booking-detail-section diner">
                <h4 class="headline">
                    Bank Account Detail
                </h4>
                <div class="body">
                    <div class="qr-wrapper">
                        <promptpay-qr id="01055621273" :amount="totalBaht" />
                        <!-- <img
                            :src="qrcode"
                            alt="QR Code"
                        > -->
                        <p>scan QR Code to pay</p>
                    </div>
                    <div class="form">
                        <Inputs
                            name="datetime-local"
                            holder="Transfer Date"
                            v-model="transferDate"
                        />
                        <p>THB {{ totalBaht }}</p>
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
                        <div class="button-wrapper">
                            <button @click="uploadEvidence">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EventDetail from '~/components/Booking/EventDetail'
import bookingAPI from '~/api/graphql/booking'
import _ from 'lodash'
import eventAPI from '~/api/graphql/events'
import Inputs from '~/components/Inputs/Inputs'
import apiConfig from '~/config/endpoint'
import axios from 'axios'
import moment from 'moment'
import { mapState } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    components: {
        EventDetail,
        Inputs,
        Loading,
    },
    data() {
        return {
            isLoading: false,
            totalBaht: 0,
            fileUpload: null,
            slipFileName: null,
            qrcode: null,
            reserve: null,
            transferDate: null,
        }
    },
    mounted() {
        this.getReservation()
        //this.getGenerateQrcode()
    },
    methods: {
        deep(item, path) {
            return _.get(item, path)
        },
        getReservation() {
            this.isLoading = true
            bookingAPI.getReservationById(this.$route.params.id).then(res => {
                this.reserve = res.getReservationById
                this.totalBaht =
                    this.reserve.join.length *
                    this.reserve.subevent.event.pricePerSeat
                this.isLoading = false
            })
        },
        // getGenerateQrcode() {
        //     this.qrcode = `${
        //         apiConfig.ENDPOINT_GENERATE_QR_CODE_PHONE
        //     }?paymentAmount=${this.totalBaht}`
        // },
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
                        Authorization: 'Bearer ' + this.user.accessToken,
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
        uploadEvidence() {
            const data = {
                paymentMethod: 'BANK_TRANSFER',
                paymentDate: moment(this.transferDate).format(
                    'DD-MM-YYYY HH:mm:ss'
                ),
                price: this.totalBaht,
                slipUrl: this.fileUpload,
                reserve: {
                    id: this.$route.params.id,
                },
            }
            bookingAPI.paymentBooking(data).then(() => {
                this.$router.push('/booking')
            })
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

$leftSide: 55%;
$status: (
    refund: $success,
    non-refund: $not-allow,
);

.logo-signup {
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
.term-modal-wrapper {
    height: 100%;
    padding: 4% 6%;
    @include respond-to($phone) {
        padding: 4% 4%;
    }
    * {
        margin: 10px 0;
    }
    .termcon-content {
        height: 48%;
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
        margin-top: 30px;
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
            margin: 40px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            * {
                margin: 0 10px;
            }
            .return {
                padding: 10px 30px;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 600;
                color: #800020;
                background-color: #fff;
            }
            button {
                padding: 10px 30px;
            }
        }
    }
}

.booking-detail-wrapper {
    width: 60%;
    margin: 0 auto;
    padding: 40px 8px;
    @include respond-to($phone) {
        width: 100%;
        padding: 24px 20px;
    }
    .header {
        text-align: center;
        margin-bottom: 24px;
        @include respond-to($phone) {
            display: none;
        }
    }
    h3 {
        font-size: 1.5em;
        @include respond-to($phone) {
            font-size: 14px;
        }
    }
    .reservation-number {
        font-weight: bold;
        margin-bottom: 16px;
    }
    .event-section {
        .status {
            color: $accent;
            @include respond-to($phone) {
                font-size: 12px;
            }
        }
        .event-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
            @include respond-to($phone) {
                margin-bottom: 16px;
            }
            .text-wrapper {
                width: $leftSide;
                @include respond-to($phone) {
                    width: 80%;
                }
                .event-name {
                    color: $black;
                    font-weight: bold;
                }
                .chef-name {
                    color: $dark-grey;
                }
            }
            .chef-profile-img {
                width: 66px;
                height: 66px;
                flex-shrink: 0;
                flex-grow: 0;
                margin-left: 8px;
                overflow: hidden;
                border-radius: 50%;
                @include respond-to($phone) {
                    width: 32px;
                    height: 32px;
                }
                img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .booking-detail-section {
            padding-bottom: 24px;
            .headline {
                color: $accent;
                font-size: 20px;
                font-weight: bold;
                text-align: center;
                border-bottom: 1px solid $accent;
                padding: 0 0 8px;
                @include respond-to($phone) {
                    font-size: 1em;
                }
            }
            .body {
                padding: 12px 0 0;
                .qr-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
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
                .button-wrapper {
                    margin-top: 16px;
                    display: flex;
                }
            }
        }
        .footer-section {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            margin-bottom: 10px;
            button {
                margin-bottom: 20px;
            }
            .policy {
                color: $dark-grey;
                font-weight: bold;
                cursor: pointer;
                border-bottom: 1px solid;
                // &:hover {
                //     color: $accent;
                // }
            }
        }
    }
}
</style>
