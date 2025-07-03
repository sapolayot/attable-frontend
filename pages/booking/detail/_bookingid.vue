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
            Reservation Number {{ deep(event, 'id') }}
        </h3>
        <div class="event-section">
            <div class="status">Status: {{ deep(event, 'status') }}</div>
            <div class="event-header">
                <div class="text-wrapper">
                    <h3 class="event-name">
                        {{ deep(event, 'subevent.event.eventName') }}
                    </h3>
                    <div class="chef-name">
                        {{ deep(event, 'subevent.event.chef.user.firstName') }}
                        {{ deep(event, 'subevent.event.chef.user.lastName') }}
                    </div>
                </div>
                <div
                    class="chef-profile-img"
                    @click.prevent="$router.push('/profile/public/1')"
                >
                    <img
                        :src="
                            deep(event, 'subevent.event.chef.user.profileImage')
                        "
                    />
                </div>
            </div>
            <EventDetail
                :startDate="deep(event, 'subevent.eventDate')"
                :startTime="deep(event, 'subevent.startTime')"
                :endTime="deep(event, 'subevent.endTime')"
                :people="deep(event, 'join.length')"
                :price="deep(event, 'payment.price')"
                :allergic="deep(event, 'subevent.event.allergic')"
                :refundable="refundable"
                :id="deep(event, 'subevent.id')"
            />
            <div class="booking-detail-section diner">
                <h4 class="headline">
                    Diner
                </h4>
                <div class="body">
                    <ol>
                        <li
                            v-for="(dinner, index) in deep(event, 'join')"
                            :key="index"
                        >
                            <div class="list-wrapper">
                                <p class="name">
                                    {{ dinner.firstName }} {{ dinner.lastName }}
                                </p>
                                <div
                                    v-for="(allergic, index) in dinner.allergic"
                                    :key="index"
                                >
                                    <p>
                                        {{ allergic.allergicName }}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
            <div class="booking-detail-section about">
                <h4 class="headline">
                    About You
                </h4>
                <div class="body">
                    <p>
                        {{ deep(event, 'aboutYou') }}
                    </p>
                    <p v-if="!deep(event, 'aboutYou')">
                        -
                    </p>
                </div>
            </div>
            <div class="booking-detail-section house-rule">
                <h4 class="headline">
                    Chef's House Rule
                </h4>
                <div class="body">
                    <p>
                        {{ deep(event, 'subevent.event.rule') }}
                    </p>
                </div>
            </div>
            <div class="footer-section">
                <button
                    @click="showConfirm"
                    v-if="this.event.status == 'Confirmed_Seat'"
                >
                    Cancel Booking
                </button>
                <p class="policy" @click="$modal.show('termconcancel')">
                    Click here to view Cancellation Policy
                </p>
            </div>
        </div>
        <modal
            name="termconcancel"
            :adaptive="true"
            :height="
                maxWidth <= 480 ? '80%' : maxWidth <= 1440 ? 'auto' : '60%'
            "
            :width="maxWidth >= 480 ? '60%' : '100%'"
            :scrollable="true"
        >
            <div class="close-btn">
                <button
                    class="btn"
                    @click.prevent="$modal.hide('termconcancel')"
                >
                    <i class="material-icons">close</i>
                </button>
            </div>
            <div class="term-modal-wrapper">
                <div class="logo-signup">
                    <img src="~/assets/logo.png" />
                </div>
                <div class="termcon-content">
                    <Term :termtext="'termconcancel'" />
                </div>
                <div class="footer-wrapper">
                    <div class="btn-wrapper">
                        <button
                            class="return"
                            @click.prevent="$modal.hide('termconcancel')"
                        >
                            return
                        </button>
                    </div>
                </div>
            </div>
        </modal>
        <Confirm :subtitle="subtitle" @clicked="cancelBooking" />
    </div>
</template>

<script>
import Term from '~/components/Term/Term.vue'
import EventDetail from '~/components/Booking/EventDetail'
import Confirm from '~/components/ConfirmModal/Confirm'
import _ from 'lodash'
import bookingAPI from '~/api/graphql/booking'
import eventAPI from '~/api/graphql/events'
import configAPI from '~/api/graphql/config'
import Loading from 'vue-loading-overlay'
import moment from 'moment'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    components: {
        Term,
        Confirm,
        EventDetail,
        Loading,
    },
    data() {
        return {
            isLoading: false,
            subtitle: `<p style="text-align: justify;">All reservations are subject to At Table&rsquo;s cancellation policy, as stated below:</p>
                        <p style="text-align: justify;">&nbsp;</p>
                        <p style="text-align: justify;">If a reservation is cancelled by a diner at least one week (168 hours) prior to the start time of the event, the diner is entitled to reimbursement of the full reservation amount and the chef shall not be paid any of the reservation amount.</p>
                        <p style="text-align: justify;">&nbsp;</p>
                        <p style="text-align: justify;">If a reservation is cancelled by a diner less than one week (168 hours) before the start time of the event, the diner shall not be entitled to any return, credit or reimbursement and the chef will be paid the full seat of the booking.</p>
                        <p style="text-align: justify;">&nbsp;</p>
                        <p style="text-align: justify;">In case a chef cancels a diner&rsquo;s reservation, the diner will be credited with the full reservation amount such diner has paid to At Table.</p>`,
            maxWidth: Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
            ),
            reservationNumber: '',
            bookingStatus: '',
            config: null,
            event: {},
            refundable: '',
        }
    },
    mounted() {
        this.setData()
    },
    methods: {
        setData() {
            this.isLoading = true
            bookingAPI
                .getReservationById(this.$route.params.bookingid)
                .then(res => {
                    this.event = res.getReservationById
                    this.reservationNumber = this.event.id
                    this.refundable = this.event.refundable
                    this.bookingStatus = this.event.status
                    this.isLoading = false
                    console.log(this.event)
                })
        },
        showConfirm() {
            this.$modal.show('confirm')
        },
        cancelBooking() {
            this.isLoading = true
            bookingAPI.cancelBooking(this.$route.params.bookingid).then(res => {
                this.$modal.hide('confirm')
                this.isLoading = false
                this.$router.push('/booking')
            })
        },
        deep(item, path) {
            return _.get(item, path)
        },
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
