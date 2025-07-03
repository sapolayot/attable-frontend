<template>
    <div class="event-wrapper">
        <div
            class="thumnbail-wrap pointer"
            :style="
                `background-image: url(' ${
                    event.media && event.media[0] ? event.media[0].path : null
                }')`
            "
            @click.prevent="cardClick"
        />
        <div class="event-details">
            <span class="event-type">{{ event.eventType }}</span>
            <div class="event-name pointer">
                <span
                    class="pointer"
                    :title="event.eventName"
                    @click.prevent="cardClick"
                >
                    {{ getEventName }}
                </span>
            </div>
            <div class="chef-detail">
                <div class="profile" @click.prevent="chefClick">
                    <img
                        :src="
                            this.event.chef
                                ? event.chef.user.profileImage
                                    ? getAvatar
                                    : require('~/assets/images/profile.svg')
                                : require('~/assets/images/profile.svg')
                        "
                        class="chef-avatar"
                    />
                </div>
                <div class="column">
                    <span class="chef-name"
                        >{{
                            this.event.chef
                                ? event.chef.user.firstName
                                : 'Lorem Name'
                        }}
                        {{
                            this.event.chef
                                ? event.chef.user.lastName
                                : 'Lorem Lastname'
                        }}</span
                    >
                    <div class="star-content-wraper">
                        <Score
                            :init="Math.round(review / (7 * reviewerNumber))"
                        />
                        <label class="total-score"
                            >({{ reviewerNumber }})</label
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import reviewAPI from '~/api/graphql/review'
import Score from '~/components/Score/Score'
export default {
    props: {
        event: {
            type: Object,
            default: () => ({}),
        },
        pagenumber: {
            type: Number,
            required: false,
            default: 3,
        },
    },
    components: {
        Score,
    },
    data() {
        return {
            avatarImage: null,
            maxWidth: Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
            ),
            review: 0,
            reviewerNumber: 0,
        }
    },
    mounted() {
        reviewAPI
            .getReviewByChefId(1, 10000000, this.event.chef.id)
            .then(res => {
                res.getReviewByChefId.reviewevents.map(item => {
                    this.review += item.rate1
                    this.review += item.rate2
                    this.review += item.rate3
                    this.review += item.rate4
                    this.review += item.rate5
                    this.review += item.rate6
                    this.review += item.rate7
                })
                this.reviewerNumber = res.getReviewByChefId.reviewevents.length
            })
    },
    computed: {
        getAvatar() {
            return this.event.chef
                ? this.event.chef &&
                      this.event.chef.user &&
                      this.event.chef.user.profileImage
                : null
        },
        getEventName() {
            if (this.event.eventName.length >= 36) {
                if (this.maxWidth <= 480) {
                    return this.event.eventName.substring(0, 26) + '...'
                }
                return this.event.eventName.substring(0, 36) + '...'
            } else {
                return this.event.eventName.substring(0, 40)
            }
        },
    },
    methods: {
        cardClick() {
            this.$router.push(`/booking/${this.event.id}`)
        },
        chefClick() {
            this.$router.push(`/profile/public/${this.event.chef.user.id}`)
        },
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/responsive.scss' as *;
@use '@/styles/mixins.scss' as *;
.pointer {
    cursor: pointer;
    height: 2.5em;
}
.event-wrapper {
    box-shadow: 1px 3px 3px 0px rgba(51, 51, 51, 0.4);
    border-radius: 6.90748px;
    background-color: #fff;
    justify-content: center;
    flex-direction: column;
    position: relative;
    display: flex;
    margin: 40px auto;
    width: 350px;
    @include respond-to($phone) {
        width: 100%;
        margin: 35px auto;
    }
    .thumnbail-wrap {
        box-shadow: 0px 8px 20px #858585;
        border-radius: 6.90748px;
        text-align: center;
        height: 220px;
        width: 92%;
        margin: 0 auto;
        position: relative;
        margin-top: -42px;
        background-size: cover;
        background-position: center;
        @include respond-to($phone) {
            height: 170px;
        }
    }
    .event-details {
        display: flex;
        flex-direction: column;
        margin: 30px 20px;
        .event-type {
            color: #800020;
        }
        .event-name {
            // height: 3.5em;
            & > span {
                text-transform: uppercase;
                font-size: 20px;
                font-weight: bold;
                min-width: 300px;
                word-break: break-word;
            }
        }
        .star-content-wraper {
            margin-top: 5px;
            display: flex;
            .star-wraper {
                display: flex;
                align-items: center;
                .star {
                    width: 20px;
                    height: 20px;
                    margin-right: 3px;
                }
            }
            .score-average {
                font-size: 13px;
            }
        }
        .chef-detail {
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            .chef-avatar {
                border-radius: 360px;
                width: 40px;
                height: 40px;
                max-width: 40px;
                max-height: 40px;
                margin-right: 1em;
                object-fit: cover;
            }
        }
    }
}
</style>
