<template>
    <div class="page-wrapper">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <div class="content-wrapper" v-if="event && event.subevent">
            <div class="header-page">
                <div class="upper">
                    <p class="title">
                        Event Number
                        {{ paddingWithZero.paddingWithZero(event.id, 5) }}
                        {{
                            tabs.length > 1
                                ? `(${tabs.length}  Events)`
                                : '(1 Event)'
                        }}
                    </p>
                    <button
                        @click.prevent="
                            $router.push(`/event/mainevent/${$route.params.id}`)
                        "
                    >
                        View Event
                    </button>
                </div>
                <p>{{ event.eventName }}</p>
            </div>
            <Items
                v-if="tabs[0] && price"
                :tabsItems="tabs"
                :id="$route.params.id"
                :cancel="$route.query.cancel"
                :price="price"
                :active="$route.query.tabActive"
            />
        </div>
    </div>
</template>

<script>
import paddingWithZero from '~/utils/paddingWithZero'
import Items from '~/components/Sub_event/Items'
import eventAPI from '~/api/graphql/events'
import { mapState } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    components: {
        Items,
        Loading,
    },
    data() {
        return {
            paddingWithZero: paddingWithZero,
            tabs: [],
            event,
            price: null,
            status: null,
            isLoading: false,
        }
    },
    mounted() {
        this.isLoading = true
        const status = {
            0: ['Approved', 'In_progress'],
            1: ['Completed', 'Pending_for_confirm', 'Hold_Payment'],
            2: ['Cancel_Requesting', 'Pending', 'Cancelled'],
        }
        const active = this.$route.query.tabActive
        const eventId = this.$route.params.id
        eventAPI.getEventById(eventId).then(res => {
            this.event = res.getEventById
            this.tabs = this.event.subevent
            console.log('Before', this.tabs)
            if (active == 0) {
                this.tabs = this.tabs.filter(each => {
                    return (
                        each.status == 'Approved' ||
                        each.status == 'In_progress'
                    )
                })
            }
            if (active == 1) {
                this.tabs = this.tabs.filter(each => {
                    return each.status == 'Completed'
                })
            }
            if (active == 2) {
                this.tabs = this.tabs.filter(each => {
                    return (
                        each.status == 'Cancel_Requesting' ||
                        each.status == 'Pending' ||
                        each.status == 'Cancelled'
                    )
                })
            }
            this.price = this.event.pricePerSeat
            this.isLoading = false
            console.log('After => ', this.tabs)
        })
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

p {
    font-size: 24px;
}
.header-page {
    text-align: left;
    padding: 0 140px;
    .title {
        color: $accent;
        font-weight: 600;
    }
    .upper {
        display: flex;
        margin: 12px 0;
        align-items: center;
        > button {
            background-color: $white;
            color: $accent;
            font-weight: 600;
            font-size: 14px;
            margin-left: 46px;
        }
    }
}
.status {
    display: flex;
    font-size: 20px;
    justify-content: flex-end;
    p {
        color: $accent;
        font-weight: 100;
    }
}
</style>
