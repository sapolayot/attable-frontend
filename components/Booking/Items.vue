<template>
    <div class="component-wrapper">
        <div
            class="tab-items"
            v-for="(tabiItem, index) in tabsItems"
            :key="index"
        >
            <div class="tab-item">
                <div
                    class="left content"
                    @click.prevent="
                        rotePage(
                            tabiItem.payment,
                            parseInt(tabiItem.no),
                            tabiItem.status,
                            tabiItem.id
                        )
                    "
                >
                    <div class="center-item">
                        <p class="top-label">
                            Reservation Number {{ tabiItem.no }}
                        </p>
                        <p class="bottom-label">
                            Status:
                            {{
                                tabiItem.status.replace(/_/g, ' ') == 'Pending'
                                    ? 'Cancel Pending'
                                    : tabiItem.status.replace(/_/g, ' ')
                            }}
                        </p>
                    </div>
                </div>
                <div class="center content">
                    <div class="center-item">
                        <p class="top-label">
                            {{ tabiItem.eventName }}
                        </p>
                        <div
                            class="chef"
                            @click.prevent="goPublic(tabiItem.chefId)"
                        >
                            <div class="chef-img">
                                <img :src="tabiItem.chefImg" />
                            </div>
                            <p class="bottom-label">
                                {{ tabiItem.chefName }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="right content">
                    <div class="right-item">
                        <div class="icon">
                            <img src="~/assets/Clock.png" />
                        </div>
                        <div class="label">
                            <p class="top-label">
                                {{ tabiItem.date }}
                            </p>
                            <p class="middle-label">
                                {{ tabiItem.time }}
                            </p>
                            <div class="btn-wrapper">
                                <button
                                    class="view-button"
                                    @click.prevent="
                                        $router.push(`/event/${tabiItem.id}`)
                                    "
                                >
                                    View Event
                                </button>
                                <button
                                    class="view-button"
                                    v-if="tabiItem.status === 'Pending'"
                                    @click.prevent="
                                        $router.push(
                                            `/refund/${parseInt(tabiItem.no)}`
                                        )
                                    "
                                >
                                    Upload Book Bank
                                </button>
                                <button
                                    class="view-button"
                                    v-if="
                                        tabiItem.status ===
                                            'Pending_Payment_Review'
                                    "
                                    @click.prevent="
                                        $router.push(
                                            `/evidence/${parseInt(tabiItem.no)}`
                                        )
                                    "
                                >
                                    Upload Payment
                                </button>
                                <button
                                    class="view-button"
                                    v-if="
                                        tabiItem.status === 'Completed' &&
                                            !tabiItem.review
                                    "
                                    @click.prevent="
                                        $router.push(
                                            `/review/?reserveId=${tabiItem.reserveId}&chefId=${tabiItem.chefId}`
                                        )
                                    "
                                >
                                    Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['tabsItems'],
    methods: {
        goSub(index) {
            this.$router.push(`/event/sub_event/${this.$route.params.id}`)
        },
        goPublic(chefId) {
            this.$router.push(`/profile/public/${chefId}`)
        },
        rotePage(payment, id, status, sub_id) {
            if (status == 'Pending_Payment_Review') {
                return
            }
            if (status != 'Cancel') {
                if (!payment) {
                    this.$router.push({
                        path: `/booking/${id}/payment`,
                        query: {
                            currentStep: 3,
                            id: id,
                            subeventId: sub_id,
                        },
                    })
                } else {
                    this.$router.push(`/booking/detail/${id}`)
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
// .component-wrapper{
//     overflow: scroll;
// }
button {
    background-color: transparent;
    font-weight: 600;
    color: $accent;
    width: 155px;
    align-self: flex-end;
    margin: 10px;
    @include respond-to($phone) {
        align-self: center;
        margin: 10px;
        height: 36px;
        width: 110px;
    }
    &:hover {
        background-color: $accent;
        color: white;
    }
}
.tab-items {
    border-bottom: 1px solid $border-color;
    display: flex;
    cursor: pointer;
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
        padding: 46px 0 10px;
        display: flex;
        @include respond-to($phone) {
            padding: 10px;
            //flex-direction: column;
            width: 100%;
        }
        .content {
            width: 33.33%;
            .top-label {
                margin-bottom: 12px;
                @include respond-to($phone) {
                    margin-right: 8px;
                    margin-bottom: 0;
                }
            }
        }
        .left.content {
            text-align: left;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: $accent;
            cursor: pointer;
            .top-label {
                font-weight: 600;
                @include respond-to($phone) {
                    margin-bottom: 10px;
                }
            }
        }
        .center.content {
            text-align: left;
            display: flex;
            justify-content: center;
            .center-item {
                width: 80%;
            }
            .chef {
                display: flex;
                cursor: pointer;
                align-items: center;
                @include respond-to($phone) {
                    margin-top: 10px;
                }
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
            .right-item {
                display: flex;
                justify-content: center;
            }
            @include respond-to($phone) {
                align-items: center;
                .label {
                    display: flex;
                    margin-left: 8px;
                    flex-direction: column;
                }
            }
            .icon {
                margin-right: 14px;
                height: 24px;
                width: 24px;
                @include respond-to($phone) {
                    margin: 0;
                }
                img {
                    object-fit: contain;
                    width: 100%;
                    height: 100%;
                }
            }
            .bottom-label {
                color: $dark-grey;
            }
            .label {
                .btn-wrapper {
                    display: flex;
                    flex-direction: column;
                    .view-button {
                        padding: 10px 0px;
                        @include respond-to($phone) {
                            padding: 10px 0px;
                        }
                    }
                }
            }
        }
    }
}
</style>
