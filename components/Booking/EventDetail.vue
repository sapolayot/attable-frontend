<template>
    <div class="event-detail">
        <div class="detail-section">
            <div class="detail-item event-date">
                <div class="icon">
                    <img :src="icon.time" />
                </div>
                <p>
                    {{ dateFormatter(startDate) }},
                    {{ timeFormatter(startTime) }} -
                    {{ timeFormatter(endTime) }}
                </p>
            </div>
            <div class="detail-item diner">
                <div class="icon">
                    <img :src="icon.people" />
                </div>
                <p>{{ people }} diners</p>
            </div>
            <div
                :class="
                    `detail-item restrictions ${allergic > 1 ? 'many' : ''}`
                "
            >
                <div class="icon">
                    <img :src="icon.allergic" />
                </div>
                <p>
                    <span v-for="(restriction, index) in allergic" :key="index">
                        {{ restriction.allergicName }}
                    </span>
                </p>
            </div>
            <div class="detail-item diner">
                <div class="icon">
                    <img :src="icon.price" />
                </div>
                <p>THB {{ cur.CurrencyFormatter(price) }}</p>
            </div>
        </div>
        <div class="action-section">
            <div class="cancellation">
                <p>Cancellation is</p>
                <p :class="`status ${refundable ? 'refundable' : ''}`">
                    <span v-if="refundable">
                        fully refundable
                    </span>
                    <span v-if="!refundable">
                        non-refundable
                    </span>
                </p>
            </div>
            <button
                class="outline"
                @click.prevent="$router.push(`/event/${id}`)"
            >
                View Event
            </button>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import CurrencyFormatter from '~/utils/currencyFormatter'
export default {
    props: {
        startDate: null,
        startTime: null,
        endTime: null,
        people: null,
        price: null,
        allergic: null,
        refundable: Boolean,
        id: null,
    },
    data() {
        return {
            icon: {
                time: require('~/assets/Clock.png'),
                people: require('~/assets/people.png'),
                allergic: require('~/assets/danger.png'),
                price: require('~/assets/Price.png'),
            },
            cur: CurrencyFormatter,
        }
    },
    computed: {
        reserveJoinLength() {
            return this.subevent.reduce((count, each) => {
                let sum = 0
                each.reserve.forEach(item => {
                    sum += item.join.length
                })

                return count + sum
            }, 0)
        },
    },
    methods: {
        deep(item, path) {
            return _.get(item, path)
        },
        dateFormatter(date) {
            return moment(date).format('dddd, D MMM YYYY')
        },
        timeFormatter(time) {
            return moment(time, 'hh:mm:ss').format('h:mmA')
        },
    },
    // mounted(){
    //     console.log()
    // }
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
$leftSide: 55%;
.event-detail {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
    .detail-section {
        width: $leftSide;
        display: flex;
        flex-flow: row wrap;
        @include respond-to($phone) {
            width: 80%;
        }
        .detail-item {
            display: flex;
            align-items: center;
            &:not(.event-date) {
                width: 50%;
            }
            @include respond-to($phone) {
                align-items: flex-start;
                &.restrictions {
                    width: 100%;
                }
            }
            p {
                @include respond-to($phone) {
                    font-size: 12px;
                }
            }
            .icon {
                width: 32px;
                height: 32px;
                margin-right: 18px;
                flex-grow: 0;
                flex-shrink: 0;
                @include respond-to($phone) {
                    width: 20px;
                    height: 20px;
                    margin-right: 12px;
                }
                img {
                    width: 100%;
                }
            }
            &.many.restrictions {
                p {
                    & > span:not(:last-child) {
                        &:after {
                            width: 2px;
                            height: 1em;
                            content: ',';
                            display: inline;
                        }
                    }
                }
            }
        }
    }
    .action-section {
        padding-left: 8px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        @include respond-to($phone) {
            width: 100px;
            flex-shrink: 0;
        }
        .cancellation {
            color: #707070;
            // display: flex;
            // flex-direction: column;
            // align-self: flex-end;
            text-align: right;
            font-size: 18px;
            & > .status {
                color: $not-allow;
                &.refundable {
                    color: $success;
                }
            }
        }
    }
}
</style>
