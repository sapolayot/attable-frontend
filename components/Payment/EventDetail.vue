<template>
    <div class="event-detail-card" v-if="subevent">
        <h4 class="event-name">
            {{ subevent.event.eventName }}
        </h4>
        <div class="chef-detail" v-if="subevent.event.chef">
            <div class="chef-profile">
                <p class="chef-name">
                    {{ subevent.event.chef.user.firstName }}
                    {{ subevent.event.chef.user.lastName }}
                </p>
                <div class="score">
                    <Score :init="Math.round(review / (7 * reviewerNumber))" />
                    <p>({{ reviewerNumber }})</p>
                </div>
            </div>
            <div class="profile-image">
                <img :src="subevent.event.chef.user.profileImage" />
            </div>
        </div>
        <div class="event-detail">
            <div class="detail-item date">
                <div class="icon">
                    <img :src="icon.time" />
                </div>
                {{ dateFormatter(subevent.eventDate) }},
                {{ timeFormatter(subevent.startTime) }} -
                {{ timeFormatter(subevent.endTime) }}
            </div>
            <div class="detail-item seat">
                <div class="icon">
                    <img :src="icon.people" />
                </div>
                {{ sizeDiner }} diners
            </div>
            <div class="detail-item restriction">
                <div class="icon">
                    <img :src="icon.allergic" />
                </div>
                <p>
                    {{
                        subevent.event.allergic
                            .map(each => each.allergicName)
                            .toString()
                    }}
                </p>
            </div>
        </div>
        <div class="price">
            <div class="icon">
                <img :src="icon.price" />
            </div>
            THB
            {{
                CurrencyFormatter.CurrencyFormatter(
                    subevent.event.pricePerSeat * this.sizeDiner
                )
            }}
        </div>
    </div>
</template>

<script>
import eventAPI from '~/api/graphql/events'
import bookingAPI from '~/api/graphql/booking'
import moment from 'moment'
import CurrencyFormatter from '~/utils/currencyFormatter'
import Score from '~/components/Score/Score'

export default {
    props: ['sizeDiner', 'subevent', 'reviewerNumber', 'review'],
    data() {
        return {
            CurrencyFormatter: CurrencyFormatter,
            chef: {
                chefName: 'Anandear Wiliam',
                rating: 125,
            },
            icon: {
                time: require('~/assets/Clock.png'),
                people: require('~/assets/people.png'),
                allergic: require('~/assets/danger.png'),
                price: require('~/assets/Price.png'),
            },
        }
    },
    components: {
        Score,
    },
    methods: {
        dateFormatter(date) {
            return moment(date).format('dddd, D MMM YYYY')
        },
        timeFormatter(time) {
            return moment(time, 'hh:mm:ss').format('h:mmA')
        },
    },
    mounted() {},
}
</script>
<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
.event-detail-card {
    width: 100%;
    border: 1px solid $accent;
    border-radius: 6px;
    padding: 40px 24px;
    @include respond-to($phone) {
        padding: 16px;
    }
    .event-name {
        color: $primary;
        text-transform: uppercase;
        font-size: 1.5em;
        font-weight: bold;
        min-width: 300px;
        word-break: break-word;
        width: 60%;
        margin-bottom: 16px;
        @include respond-to($phone) {
            font-size: 1em;
            width: 100%;
            min-width: unset;
        }
    }
    .chef-detail {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        .chef-profile {
            .chef-name {
                text-transform: capitalize;
                margin-bottom: 8px;
            }
            .score {
                display: flex;
                & > i.material-icons {
                    color: $star;
                }
                p {
                    font-size: 16px;
                    margin-left: 16px;
                }
            }
        }
        .profile-image {
            $desktop-size: 66px;
            width: $desktop-size;
            height: $desktop-size;
            overflow: hidden;
            border-radius: 50%;
            @include respond-to($phone) {
                $phone-size: 46px;
                width: $phone-size;
                height: $phone-size;
            }
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    .event-detail {
        display: flex;
        flex-flow: wrap;
        border-bottom: 1px solid $accent;
        .detail-item {
            &:first-child {
                width: 100%;
            }
            width: 50%;
            display: flex;
            align-items: center;
            margin-bottom: 24px;
            @include respond-to($phone) {
                margin-bottom: 8px;
            }
            .icon {
                $icon-size: 32px;
                width: $icon-size;
                height: $icon-size;
                margin-right: 16px;
                img {
                    width: 100%;
                }
            }
        }
    }
    .price {
        display: flex;
        align-items: center;
        margin-top: 24px;
        @include respond-to($phone) {
            margin-top: 8px;
        }
        .icon {
            $icon-size: 32px;
            width: $icon-size;
            height: $icon-size;
            margin-right: 16px;
        }
    }
}
</style>
