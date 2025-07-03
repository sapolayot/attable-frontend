<template>
    <div class="component-wrapper">
        <div
            class="tab-items"
            v-for="(tabiItem, index) in tabsItems"
            :key="index"
            @click.prevent="routePage(tabiItem)"
        >
            <div class="tab-item">
                <div class="left content">
                    <p class="top-label" v-if="tabActive === 0">
                        Event Number
                        {{ paddingWithZero.paddingWithZero(tabiItem.id, 5) }}
                        {{
                            tabiItem.subevent.length > 1
                                ? `(${getApproved(tabiItem.subevent)}  Events)`
                                : '(1 Event)'
                        }}
                    </p>
                    <p class="top-label" v-if="tabActive === 1">
                        Event Number
                        {{ paddingWithZero.paddingWithZero(tabiItem.id, 5) }}
                        {{
                            tabiItem.subevent.length > 1
                                ? `(${getCompleted(tabiItem.subevent)}  Events)`
                                : '(1 Event)'
                        }}
                    </p>
                    <p class="top-label" v-if="tabActive === 2">
                        Event Number
                        {{ paddingWithZero.paddingWithZero(tabiItem.id, 5) }}
                        {{
                            tabiItem.subevent.length > 1
                                ? `(${getCancelled(tabiItem.subevent)}  Events)`
                                : '(1 Event)'
                        }}
                    </p>
                    <p class="top-label" v-if="tabActive === 3">
                        Event Number
                        {{ paddingWithZero.paddingWithZero(tabiItem.id, 5) }}
                    </p>
                    <p
                        class="bottom-label"
                        v-if="maxWidth > 480 && tabActive == 0"
                    >
                        Status:
                        {{
                            tabiItem.status.replace('_', ' ').replace('_', ' ')
                        }}
                    </p>
                </div>
                <div class="center content eventName">
                    <p class="top-label">
                        {{ tabiItem.eventName }}
                    </p>
                </div>
                <div class="right content">
                    <div class="icon">
                        <img src="~/assets/Clock.png" />
                    </div>
                    <div
                        class="label"
                        @click.prevent="$router.push(`/event/${tabiItem.id}`)"
                    >
                        <p
                            class="top-label"
                            v-if="
                                tabiItem.subevent[0].eventDate !=
                                    tabiItem.subevent[
                                        tabiItem.subevent.length - 1
                                    ].eventDate
                            "
                        >
                            {{
                                `${startDate(
                                    tabiItem.subevent[0].eventDate
                                )} - ${endDate(
                                    tabiItem.subevent[
                                        tabiItem.subevent.length - 1
                                    ].eventDate
                                )}`
                            }}
                        </p>
                        <p
                            class="top-label"
                            v-if="
                                tabiItem.subevent[0].eventDate ==
                                    tabiItem.subevent[
                                        tabiItem.subevent.length - 1
                                    ].eventDate
                            "
                        >
                            {{ `${oneDate(tabiItem.subevent[0].eventDate)}` }}
                        </p>
                        <div class="time">
                            <p class="middle-label">
                                {{
                                    `${timeFormat(
                                        tabiItem.subevent[0]
                                            ? tabiItem.subevent[0].startTime
                                            : null
                                    )} - ${timeFormat(
                                        tabiItem.subevent[0]
                                            ? tabiItem.subevent[0].endTime
                                            : null
                                    )}`
                                }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="status" v-if="maxWidth <= 480">
                    Status: {{ tabiItem.status }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import paddingWithZero from '~/utils/paddingWithZero'
import moment from 'moment'
export default {
    scrollToTop: true,
    props: ['tabsItems', 'tabActive'],
    data() {
        return {
            paddingWithZero: paddingWithZero,
            maxWidth: Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
            ),
        }
    },
    methods: {
        getApproved(subevent) {
            let count = null
            subevent.map(res => {
                if (res.status == 'Approved') {
                    count++
                }
            })
            return count
        },
        getCompleted(subevent) {
            let count = null
            subevent.map(res => {
                if (res.status == 'Completed') {
                    count++
                }
            })
            return count
        },
        getCancelled(subevent) {
            let count = null
            subevent.map(res => {
                if (
                    res.status == 'Pending' ||
                    res.status == 'Cancel_Requesting' ||
                    res.status == 'Cancelled'
                ) {
                    count++
                }
            })
            return count
        },
        goSub(index) {
            this.$router.push(`/event/sub_event/${this.$route.params.id}`)
        },
        goEdit() {
            this.$router.push(`/event/edit/${this.$route.params.id}`)
        },
        startDate(date) {
            return moment(date).format('dddd, D MMM')
        },
        endDate(date) {
            return moment(date).format('D MMM YYYY')
        },
        oneDate(date) {
            return moment(date).format('dddd, D MMM YYYY')
        },
        timeFormat(time) {
            return moment(time, ['h:mm A']).format('h:mm A')
        },
        routePage(event) {
            switch (this.tabActive) {
                case 0:
                    switch (event.status) {
                        case 'Requesting':
                            this.$router.push(
                                `/event/create?eventId=${event.id}`
                            )
                            break
                        // case "Reject":
                        //     this.$router.push(`/event/create?eventId=${event.id}`)
                        //     break
                        case 'Approved':
                            this.$router.push({
                                path: `/event/sub_event/${event.id}`,
                                query: {
                                    tabActive: this.tabActive,
                                },
                            })
                            break
                        case 'In_progress':
                            this.$router.push({
                                path: `/event/sub_event/${event.id}`,
                                query: {
                                    tabActive: this.tabActive,
                                },
                            })
                            break
                        case 'Pending_for_confirm':
                            this.$router.push(
                                `/event/create?eventId=${event.id}`
                            )
                            break
                    }
                    break
                case 1:
                    this.$router.push({
                        path: `/event/sub_event/${event.id}`,
                        query: {
                            cancel: true,
                            tabActive: this.tabActive,
                        },
                    })
                    break
                case 2:
                    this.$router.push({
                        path: `/event/sub_event/${event.id}`,
                        query: {
                            cancel: true,
                            tabActive: this.tabActive,
                        },
                    })
                    break
                case 3:
                    this.$router.push(`/event/create?eventId=${event.id}`)
                    break
            }
        },
        calSubeventCancelled(event) {
            let size = event.filter(element => {
                return (
                    element.status == 'Pending' ||
                    element.status == 'Cancel_Requesting'
                )
            })
            if (size.length === 1) {
                return '(1 Event)'
            }
            if (size.length === 0) {
                return `(${size.length + 1} Event)`
            } else {
                return `(${size.length} Events)`
            }
        },
        checksubstatus(event) {
            console.log('>>>>>', this.tabsItems)
        },
    },
    mounted() {
        this.checksubstatus()
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
// .component-wrapper{
//     overflow: scroll;
// }
.status {
    color: #800020;
    margin-bottom: 60px;
    align-self: start;
    padding-top: 5px;
    @include respond-to($phone) {
        margin-bottom: 8px;
        font-size: 16px;
    }
}
.tab-items {
    border-bottom: 1px solid $border-color;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    @include respond-to($phone) {
        display: flex;
        align-items: center;
        flex-direction: row;
    }
    &:hover {
        background-color: $hover-tab;
    }
    .tab-item {
        justify-content: space-between;
        display: flex;
        padding: 46px 140px;
        @include respond-to($phone) {
            padding: 10px;
            flex-direction: column;
            width: 100%;
        }
        .content {
            width: 40%;
            .top-label {
                margin-bottom: 12px;
                @include respond-to($phone) {
                    margin-right: 8px;
                    margin-bottom: 0;
                    margin: 5px 0;
                }
            }
        }
        .left.content {
            text-align: left;
            color: $accent;
            @include respond-to($phone) {
                width: 100%;
            }
            .top-label {
                font-weight: 600;
            }
        }
        .center.content {
            text-align: left;
            width: 36%;
            @include respond-to($phone) {
                width: 100%;
            }
            p {
                color: black;
                font-size: 16px;
            }
            .chef {
                display: flex;
                .chef-img {
                    height: 24px;
                    width: 24px;
                    img {
                        border-radius: 100%;
                        object-fit: cover;
                        height: 100%;
                        width: 100%;
                    }
                }
                .bottom-label {
                    color: $light-grey;
                    margin-left: 8px;
                }
            }
        }
        .right.content {
            text-align: left;
            display: flex;
            width: 24%;
            @include respond-to($phone) {
                align-items: center;
                width: 100%;
                margin: 4px 0;
            }
            .icon {
                margin-right: 14px;
                height: 24px;
                width: 24px;
                @include respond-to($phone) {
                    margin-right: 4px;
                }
                img {
                    object-fit: contain;
                    width: 100%;
                    height: 100%;
                }
            }
            .label {
                @include respond-to($phone) {
                    display: flex;
                    align-items: center;
                    margin: 0 3px;
                    flex-wrap: wrap;
                    .top-label::after {
                        content: ',';
                    }
                    // .time{
                    //     p::before {
                    //         content: ",";
                    //     }
                    // }
                }
            }
            .bottom-label {
                color: $dark-grey;
            }
            button {
                background-color: $white;
                font-weight: 600;
                color: $accent;
                &:hover {
                    background-color: $accent;
                    color: white;
                }
            }
        }
    }
}
</style>
