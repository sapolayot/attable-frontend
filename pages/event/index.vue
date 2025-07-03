<template>
    <div class="page-wrapper">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <div class="content-wrapper">
            <h1 class="header">
                MY EVENTS
            </h1>
            <div class="tabbar">
                <div
                    class="tablist"
                    v-for="(tab, index) in tabbarChef"
                    :key="index"
                    @click.prevent="tabClicked(index)"
                    :class="tabActive == index ? 'active' : null"
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
            <Items :tabActive="tabActive" :tabsItems="tabs" />
            <div class="create-button" v-if="tabActive == 0">
                <button
                    class="create-event"
                    @click.prevent="$router.push('/event/create')"
                    :disabled="dis"
                >
                    Create new Event
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Items from '~/components/Events/Items'
import eventsAPI from '~/api/graphql/events'
import userAPI from '~/api/graphql/user'
import { mapState } from 'vuex'
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
            // tabActive: 0,
            isLoading: false,
            tabbarChef: [
                { name: 'Upcoming Events' },
                { name: 'Completed Events' },
                { name: 'Cancelled Events' },
                { name: 'Draft Events' },
            ],
            tabsItems: [[], [], [], []],
            events: [],
            tabs: [],
            chef: null,
            dis: true,
        }
    },
    methods: {
        tabClicked(index) {
            this.tabs = this.tabsItems[index]
            // this.tabActive = index
            this.$store.commit('draft/setDraft', index)
        },
        setData() {
            this.isLoading = true
            userAPI.getChefByUserId(this.user.id).then(res => {
                this.chef = res.getChefByUserId
                this.events = this.chef.event
                //console.log(this.events)
                this.tabsItems[0] = this.events.filter(
                    each =>
                        each.subevent.filter(
                            item =>
                                item.status == 'Approved' ||
                                item.status == 'Requesting' ||
                                item.status == 'Pending_for_confirm' ||
                                item.status == 'Reject' ||
                                item.status == 'Clarify_for_review'
                        )[0] != null
                )
                this.tabsItems[1] = this.events.filter(
                    each =>
                        each.subevent.filter(
                            item =>
                                item.status == 'Completed' ||
                                item.status == 'Hold_Payment' ||
                                item.status == 'Pending_for_confirm'
                        )[0] != null
                )
                this.tabsItems[2] = this.events.filter(
                    each =>
                        each.subevent.filter(
                            item =>
                                item.status == 'Cancelled' ||
                                item.status == 'Cancel_Requesting' ||
                                item.status == 'Pending'
                        )[0] != null
                )
                this.tabsItems[3] = this.events.filter(
                    each =>
                        each.subevent.filter(
                            item => item.status == 'Draft'
                        )[0] != null
                )
                this.tabs = this.tabsItems[this.tabActive]
                this.chef.status === 'Approved'
                    ? (this.dis = false)
                    : (this.dis = true)
                this.isLoading = false
                console.log('Event >>>> ', this.tabsItems[this.tabActive])
            })
        },
        checkstatus() {
            for (var i = 0; i < this.tabs.length; i++) {
                console.log(this.tabs.length[i])
            }
        },
    },
    computed: {
        ...mapState({
            user: state => state.auth.auth,
            tabActive: state => state.draft.draft,
        }),
    },
    mounted() {
        this.setData()
        this.tabClicked(this.tabActive)
        //this.checkstatus()
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
                    padding: 20px 0;
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
        .create-button {
            margin: 70px 0;
            // @include respond-to($phone) {
            //     margin: 40px 0;
            // }
            .create-event {
                width: 15%;
                font-size: 16px;
                // @include respond-to($phone) {
                //     width: 50%;
                // }
                &:disabled {
                    background-color: #bf808f;
                    border-color: #bf808f;
                }
            }
        }
    }
}
</style>
