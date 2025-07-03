<template>
    <div class="page-wrapper">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <div class="content-wrapper">
            <h1 class="header">
                MY BOOKING
            </h1>
            <div class="tabbar" v-if="tabs">
                <div
                    class="tablist"
                    :class="tabActive == index ? 'active' : null"
                    v-for="(tab, index) in tabbar"
                    :key="index"
                    @click.prevent="tabClicked(index)"
                >
                    <div class="tab">
                        <div class="toppic-wrapper">
                            <p>
                                {{ tab.name }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Items :tabsItems="tabs" />
        </div>
    </div>
</template>

<script>
import Items from '~/components/Booking/Items'
import bookingAPI from '~/api/graphql/booking'
import { mapState } from 'vuex'
import userAPI from '~/api/graphql/user'
import moment from 'moment'
import paddingWithZero from '~/utils/paddingWithZero'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    components: {
        Items,
        Loading,
    },
    layout: 'fullHeight',
    data() {
        return {
            tabbar: [
                { name: 'Upcoming Booking' },
                { name: 'Completed Booking' },
                { name: 'Cancelled Booking' },
            ],
            tabsItems: [[], [], []],
            tabs: [
                // { no: "00007", status: "Confirmed Seat", eventName: "ITALIAN SURPRIZE", chefImg: "~/assets/Chef.png", chefId: "1", chefName: "Anandear Wiliam", date: "Monday, 6 May 2019", time: "1PM - 3PM" },
                // { no: "00007", status: "Confirmed Seat", eventName: "ITALIAN SURPRIZE", chefImg: "~/assets/Chef.png", chefId: "1", chefName: "Anandear Wiliam", date: "Monday, 6 May 2019", time: "1PM - 3PM" }
            ],
            tabActive: 0,
            user: {},
            paddingWithZero: paddingWithZero,
            upcoming: null,
            completed: null,
            cancel: null,
            isLoading: false,
        }
    },
    mounted() {
        this.setData()
    },
    methods: {
        tabClicked(index) {
            this.tabs = this.tabsItems[index]
            this.tabActive = index
        },
        setData() {
            this.isLoading = true
            userAPI.getUserById(this.userStore.id).then(res => {
                this.user = res.getUserById
                this.upcoming = this.user.reserve.filter(item => {
                    return (
                        item.status == 'Requesting' ||
                        item.status == 'Confirmed_Seat' ||
                        item.status == 'In_progress' ||
                        item.status == 'Pending_Payment_Review' ||
                        item.status == 'Clarify_for_review_booking'
                    )
                })
                this.completed = this.user.reserve.filter(item => {
                    return item.status == 'Completed'
                })
                this.cancel = this.user.reserve.filter(item => {
                    return (
                        item.status == 'Cancel_Requesting' ||
                        item.status == 'Pending' ||
                        item.status == 'Cancelled' ||
                        item.status == 'Clarify_for_review_refund'
                    )
                })
                this.tabs = this.upcoming.map(item => {
                    return {
                        no: paddingWithZero.paddingWithZero(item.id, 5),
                        status: item.status,
                        eventName: item.subevent.event.eventName,
                        chefImg: item.subevent.event.chef.user.profileImage,
                        chefId: item.subevent.event.chef.user.id,
                        chefName: `${item.subevent.event.chef.user.firstName} ${item.subevent.event.chef.user.lastName}`,
                        date: moment(item.subevent.eventDate).format(
                            'dddd, D MMM YYYY'
                        ),
                        time: `${moment(
                            item.subevent.startTime,
                            'hh:mm:ss'
                        ).format('h:mmA')} - ${moment(
                            item.subevent.endTime,
                            'hh:mm:ss'
                        ).format('h:mmA')}`,
                        id: item.subevent.id,
                        payment: item.payment,
                        review: item.reviewEvent,
                        reserveId: item.id,
                    }
                })
                this.tabsItems[0] = this.tabs
                this.tabsItems[1] = this.completed.map(item => {
                    return {
                        no: paddingWithZero.paddingWithZero(item.id, 5),
                        status: item.status,
                        eventName: item.subevent.event.eventName,
                        chefImg: item.subevent.event.chef.user.profileImage,
                        chefId: item.subevent.event.chef.user.id,
                        chefName: `${item.subevent.event.chef.user.firstName} ${item.subevent.event.chef.user.lastName}`,
                        date: moment(item.subevent.eventDate).format(
                            'dddd, D MMM YYYY'
                        ),
                        time: `${moment(
                            item.subevent.startTime,
                            'hh:mm:ss'
                        ).format('h:mmA')} - ${moment(
                            item.subevent.endTime,
                            'hh:mm:ss'
                        ).format('h:mmA')}`,
                        id: item.subevent.id,
                        payment: item.payment,
                        review: item.reviewEvent,
                        reserveId: item.id,
                    }
                })
                this.tabsItems[2] = this.cancel.map(item => {
                    return {
                        no: paddingWithZero.paddingWithZero(item.id, 5),
                        status: item.status,
                        eventName: item.subevent.event.eventName,
                        chefImg: item.subevent.event.chef.user.profileImage,
                        chefId: item.subevent.event.chef.user.id,
                        chefName: `${item.subevent.event.chef.user.firstName} ${item.subevent.event.chef.user.lastName}`,
                        date: moment(item.subevent.eventDate).format(
                            'dddd, D MMM YYYY'
                        ),
                        time: `${moment(
                            item.subevent.startTime,
                            'hh:mm:ss'
                        ).format('h:mmA')} - ${moment(
                            item.subevent.endTime,
                            'hh:mm:ss'
                        ).format('h:mmA')}`,
                        id: item.subevent.id,
                        payment: item.payment,
                        review: item.reviewEvent,
                        reserveId: item.id,
                    }
                })
                this.isLoading = false
            })
        },
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

.page-wrapper {
    justify-content: space-between;
    flex-direction: column;
    display: flex;
    .content-wrapper {
        flex-direction: column;
        position: relative;
        text-align: center;
        display: flex;
        height: inherit;
        .header {
            margin: 10px 0;
            // @include respond-to($phone) {
            //     font-size: 1.5em;
            // }
        }
        .tabbar {
            justify-content: space-between;
            display: flex;
            width: 100%;
            // @include respond-to($phone) {
            //     border-bottom: 1px solid #800020;
            // }
            .tablist {
                cursor: pointer;
                width: 100%;
                margin-left: -1px;
                border: 1px solid $disable;
                background-color: $white;
                .tab {
                    padding: 20px 10px;
                    // border-left: 0;
                }
                &.active {
                    background-color: $light-accent;
                    border: 1px solid $accent;
                    border-top-color: $disable;
                    color: $accent;
                    z-index: 2;
                    // border-bottom: 0;
                }
                &:first-child {
                    border-left: 0;
                    // border-bottom: 0;
                }
                &:last-child {
                    border-right: 0;
                    // border-bottom: 0;
                }
            }
        }
    }
}
</style>
