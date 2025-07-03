<template>
    <div class="booking-detail-wrapper">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <h3 class="reservation-number">
            Reservation Number {{ deep(subevent, 'id') }}
        </h3>
        <div class="event-section">
            <div class="status">Status: {{ deep(subevent, 'status') }}</div>
            <div class="event-header">
                <div class="text-wrapper">
                    <h3 class="event-name">
                        {{ deep(subevent, 'subevent.event.eventName') }}
                    </h3>
                    <div class="chef-name">
                        {{
                            deep(subevent, 'subevent.event.chef.user.firstName')
                        }}
                        {{
                            deep(subevent, 'subevent.event.chef.user.lastName')
                        }}
                    </div>
                </div>
                <div
                    class="chef-profile-img"
                    @click.prevent="$router.push('/profile/public/1')"
                >
                    <img
                        :src="
                            deep(
                                subevent,
                                'subevent.event.chef.user.profileImage'
                            )
                        "
                    />
                </div>
            </div>
            <EventDetail
                :startDate="deep(subevent, 'subevent.eventDate')"
                :startTime="deep(subevent, 'subevent.startTime')"
                :endTime="deep(subevent, 'subevent.endTime')"
                :people="deep(subevent, 'join.length')"
                :price="deep(subevent, 'payment.price')"
                :allergic="deep(subevent, 'subevent.event.allergic')"
                :refundable="deep(subevent, 'refundable')"
                :id="deep(subevent, 'subevent.event.id')"
            />
            <div class="refund-wrapper">
                <h3>Bank Account Detail</h3>
                <div class="row">
                    <div class="paragraph">
                        <p>Account Name</p>
                        <input v-model="accountName" />
                        <p
                            class="error-text"
                            v-if="
                                $v.accountName.$error &&
                                    !$v.accountName.required
                            "
                        >
                            * Please fill the required field
                        </p>
                    </div>
                    <div class="paragraph">
                        <p>Account Number</p>
                        <input v-model="accountNumber" />
                        <p
                            class="error-text"
                            v-if="
                                $v.accountNumber.$error &&
                                    !$v.accountNumber.required
                            "
                        >
                            * Please fill the required field
                        </p>
                        <p
                            class="error-text"
                            v-if="
                                $v.accountNumber.$error &&
                                    $v.accountNumber.required
                            "
                        >
                            * Error found! Please recheck
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="paragraph">
                        <p>Bank Name</p>
                        <DropdownSingle
                            :text="bankName"
                            :items="bankNames"
                            @clicked="bankNameClick"
                            overflow="5"
                        />
                        <p
                            class="error-text"
                            v-if="$v.bankName.$error && !$v.bankName.required"
                        >
                            * Please fill the required field
                        </p>
                    </div>
                    <div class="paragraph">
                        <p>Branch</p>
                        <input v-model="branch" />
                        <p
                            class="error-text"
                            v-if="$v.branch.$error && !$v.branch.required"
                        >
                            * Please fill the required field
                        </p>
                    </div>
                </div>
                <div class="row col">
                    <p class="header-text">
                        Please upload one of the following is required (showing
                        your bank account number)
                    </p>
                    <p>
                        - A screenshot of your online bank statement or
                        passbook.
                    </p>
                    <p>- A scan of your official bank statement or passbook.</p>
                    <p>
                        - A image of your official bank statement or passbook.
                    </p>
                </div>
                <div class="upload-input">
                    <input
                        :value="bookBankFileName ? bookBankFileName : ''"
                        readonly
                        :class="
                            `
                        ${
                            !bookBankFileName == '' || !bookBankFileName
                                ? 'require'
                                : null
                        }`
                        "
                    />
                    <label for="file-upload2" class="custom-file-upload">
                        Upload
                    </label>
                    <input
                        id="file-upload2"
                        class="none"
                        type="file"
                        accept="image/*"
                        @change="onFileBookbankSelected"
                    />
                </div>
                <p
                    class="error-text"
                    v-if="$v.bookBankUrl.$error && !$v.bookBankUrl.required"
                >
                    * Please fill the required field
                </p>
            </div>
            <div class="row btn">
                <div class="btn-wrapper">
                    <button class="return" @click="$router.push('/')">
                        Return
                    </button>
                </div>
                <div class="btn-wrapper">
                    <button :disabled="false" @click="sendRefund()">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import EventDetail from '~/components/Booking/EventDetail'
import banks from '~/json/banks.json'
import bookingAPI from '~/api/graphql/booking'
import refundAPI from '~/api/graphql/refund'
import _ from 'lodash'
import apiConfig from '~/config/endpoint'
import axios from 'axios'
import DropdownSingle from '~/components/Dropdown/DropdownSingle.vue'
import { required, numeric } from 'vuelidate/lib/validators'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    components: {
        EventDetail,
        DropdownSingle,
        Loading,
    },
    data() {
        return {
            isLoading: false,
            score: 0,
            thanksModal: false,
            bankNames: banks.data,
            branch: null,
            photoFileName: null,
            subevent: null,
            datafile: null,
            bookBankFileName: null,
            bookBankUrl: null, //USE THIS
            accountName: null,
            accountNumber: null,
            bankName: null,
        }
    },
    validations: {
        accountName: {
            required,
        },
        accountNumber: {
            required,
            numeric,
        },
        branch: {
            required,
        },
        bookBankUrl: {
            required,
        },
        bankName: {
            required,
        },
    },
    methods: {
        sendRefund() {
            this.$v.$touch()
            if (this.$v.$error) {
                return false
            }
            this.isLoading = true
            refundAPI
                .addBankaccountForRefund(
                    this.$route.params.refundId,
                    this.accountName,
                    this.accountNumber,
                    this.bankName,
                    this.branch,
                    this.bookBankUrl,
                    this.user.accessToken
                )
                .then(res => {
                    this.isLoading = false
                    this.$router.push('/booking')
                })
        },
        getReservation() {
            this.isLoading = true
            bookingAPI
                .getReservationById(this.$route.params.refundId)
                .then(res => {
                    this.subevent = res.getReservationById
                    const accountForRefund = this.subevent.accountForRefund
                    if (accountForRefund) {
                        this.accountName = accountForRefund.accountName
                        this.accountNumber = accountForRefund.accountNumber
                        this.bankName = accountForRefund.bankName
                        this.branch = accountForRefund.branch
                        this.bookBankFileName =
                            accountForRefund.bankStatementUrl
                    }
                    this.isLoading = false
                })
        },
        setScore(number) {
            this.score = number
        },
        bankNameClick(value) {
            this.bankName = value.value
        },
        deep(item, path) {
            return _.get(item, path)
        },
        onFileBookbankSelected(event) {
            this.isLoading = true
            const datafile = event.target.files[0]
            if (datafile) {
                this.bookBankFileName = datafile.name
                if (this.bookBankFileName.lastIndexOf('.') <= 0) {
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
                        this.bookBankUrl = response.data
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log('err' + error)
                        this.isLoading = false
                    })
            }
        },
    },
    computed: {
        ...mapState({
            user: state => state.auth.auth,
        }),
    },
    mounted() {
        this.getReservation()
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;

$leftSide: 55%;
$status: (
    refund: $success,
    non-refund: $not-allow,
);
.row {
    justify-content: space-between;
    display: flex;
    width: 100%;
    .paragraph {
        margin-top: 24px;
        width: 45%;
        p {
            color: $accent;
        }
        .sub-text {
            padding: 5px 0 !important;
        }
    }
    &.col {
        margin: 20px 0;
        flex-direction: column;
        .header-text {
            color: $accent;
        }
    }
    .btn-wrapper {
        justify-content: center;
        margin: 14px;
        display: flex;
        .return {
            background-color: $white;
            color: $accent;
            border-color: $accent;
            // @include respond-to($phone) {
            //     padding: 8px 32px;
            // }
        }
        button {
            padding: 8px 64px;
            justify-content: center;
            align-self: center;
            display: flex;
            width: 100%;
            // @include respond-to($phone) {
            //     padding: 8px 56px;
            // }
        }
    }
    &.btn {
        justify-content: center;
        margin-bottom: 32px;
    }
}
.center {
    display: flex;
    justify-content: center;
}
.row {
    display: flex;
}
.condition {
    margin: 20px 0;
}
.input-group {
    flex: 1;
    &:not(odd) {
        padding-right: 16px;
    }
}
.page-wrapper {
    width: 100%;
    max-width: 970px;
    margin: 30px auto;
    padding: 0 2%;
}

.upload-input {
    display: flex;
    width: 50%;
}
.custom-file-upload {
    background-color: #fff;
    color: #800020;
    border-color: #800020;
    border: 1px solid;
    padding: 10px 35px;
    border-radius: 5px;
}
.none {
    display: none;
}

.booking-detail-wrapper {
    width: 60%;
    margin: 0 auto;
    padding: 40px 8px;
    // @include respond-to($phone) {
    //     width: 100%;
    //     padding: 24px 20px;
    // }
    .header {
        text-align: center;
        margin-bottom: 24px;
        // @include respond-to($phone) {
        //     display: none;
        // }
    }
    h3 {
        font-size: 1.5em;
        // @include respond-to($phone) {
        //     font-size: 14px;
        // }
    }
    .reservation-number {
        font-weight: bold;
        margin-bottom: 16px;
    }
    .event-section {
        .status {
            color: $accent;
            // @include respond-to($phone) {
            //     font-size: 12px;
            // }
        }
        .event-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
            // @include respond-to($phone) {
            //     margin-bottom: 16px;
            // }
            .text-wrapper {
                width: $leftSide;
                // @include respond-to($phone) {
                //     width: 80%;
                // }
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
                // @include respond-to($phone) {
                //     width: 32px;
                //     height: 32px;
                // }
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
                // @include respond-to($phone) {
                //     font-size: 1em;
                // }
            }
            .body {
                padding: 12px 0 0;
                ol {
                    padding: 0 0 0 16px;
                    .list-wrapper {
                        display: flex;
                        justify-content: space-between;
                        .restriction {
                            color: $accent;
                        }
                        .no-restriction {
                            color: $light-grey;
                        }
                    }
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
