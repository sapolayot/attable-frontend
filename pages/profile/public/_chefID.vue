<template>
    <div class="public-chef-wrapper">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <div class="page-wrapper" v-if="chef.user && chef.event">
            <div class="banner-wrapper">
                <BannerPublic :banners="banners" class="banner" />
            </div>
            <div class="chef-wrapper">
                <div class="chef">
                    <div class="chefimg img-wrapper">
                        <img :src="deep(chef, 'user.profileImage')" />
                    </div>
                    <div class="chef-detail">
                        <div class="chef-name-wrapper">
                            <p class="chef-name">
                                {{ chef.user.firstName }}
                                {{ chef.user.lastName }}
                            </p>
                        </div>
                        <div class="score">
                            <Score
                                :init="
                                    Math.round(review / (7 * reviewerNumber))
                                "
                            />
                            <label class="total-score"
                                >({{ reviewerNumber }})</label
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-wrapper">
                <div class="header-spacer about">
                    <p class="header-text chefnames">
                        about
                        <span>
                            {{ chef.user.firstName }} {{ chef.user.lastName }}
                        </span>
                    </p>
                </div>
                <div class="about-content">
                    <p>{{ chef.user.aboutMe ? chef.user.aboutMe : '-' }}</p>
                </div>
                <div class="event-card-wrapper">
                    <p class="header-text chefEventHeader">
                        {{ chef.user.firstName }} {{ chef.user.lastName }}'s
                        Event
                    </p>
                    <section class="upcomming-events">
                        <div class="content-blocks">
                            <carousel
                                :perPageCustom="[
                                    [0, 1],
                                    [481, 2],
                                    [1025, 3],
                                    [1441, 4],
                                ]"
                                :paginationEnabled="false"
                            >
                                <slide
                                    v-for="(event, index) in chef.event"
                                    :key="index"
                                >
                                    <EventCard
                                        class="card"
                                        :event="event"
                                        number="4"
                                    />
                                </slide>
                            </carousel>
                            <div class="viewmore">
                                <label>VIEW MORE</label>
                            </div>
                            <!-- <nuxt-link
                            :to="{path: '/events',query:{title: 'Special Tables'}, id: 2}"
                            class="viewmore"
                        >
                            <label>VIEW MORE</label>
                        </nuxt-link> /-->
                        </div>
                    </section>
                </div>
                <div class="comment" v-if="deep(chef, 'id')">
                    <Comment :id="deep(chef, 'id')" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Comment from '~/components/Comment/Comment'
import EventCard from '~/components/Events/EventCard'
import Score from '~/components/Score/Score'
import BannerPublic from '~/components/Banner/BannerPublic'
import userAPI from '~/api/graphql/user'
import eventsAPI from '~/api/graphql/events'
import reviewAPI from '~/api/graphql/review'
import _ from 'lodash'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    components: {
        Comment,
        EventCard,
        BannerPublic,
        Score,
        Loading,
    },
    data() {
        return {
            isLoading: false,
            maxscore: 5,
            total_score: 125,
            page: 1,
            pagesize: 100,
            chef: {},
            review: 0,
            reviewerNumber: 0,
            banners: [],
        }
    },
    mounted() {
        this.getChefByUserId()
    },
    methods: {
        getChefByUserId() {
            this.isLoading = true
            userAPI.getChefByUserId(this.$route.params.chefID).then(res => {
                this.chef = res.getChefByUserId
                console.log('chef >>>>> ', this.chef)
                this.chef.event = this.chef.event.filter(each => {
                    return each.status == 'Approved'
                })
                this.chef.event.forEach(each => {
                    each.media.forEach(item => {
                        this.banners.push(item)
                    })
                })
                reviewAPI
                    .getReviewByChefId(1, 10000000, this.chef.id)
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
                        this.reviewerNumber =
                            res.getReviewByChefId.reviewevents.length
                        this.isLoading = false
                    })
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
p {
    font-size: 24px;
    @include respond-to($phone) {
        font-size: 18px;
    }
}
label {
    font-size: 18px;
}
.page-wrapper {
    .banner-wrapper {
        height: 246px;
        background-color: $disable;
        @include respond-to($phone) {
            height: 130px;
        }
        .banner {
            height: 100%;
        }
    }
    .chef-wrapper {
        display: flex;
        justify-content: center;
        margin-top: 32px;
        .chef {
            display: flex;
            .img-wrapper {
                width: 118px;
                height: 118px;
                border-radius: 100%;
                overflow: hidden;
                flex-shrink: 0;
                flex-grow: 0;
                @include respond-to($phone) {
                    width: 86px;
                    height: 86px;
                }
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .chef-detail {
                padding-left: 40px;
                .chef-name-wrapper {
                    .chef-name {
                        font-weight: 600;
                        text-transform: capitalize;
                    }
                }
                .score {
                    display: flex;
                    margin-top: 12px;
                    .star {
                        color: #fbb03b;
                    }
                    .total-score {
                        color: $dark-grey;
                        padding-left: 8px;
                    }
                }
            }
        }
    }
    .content-wrapper {
        width: 80%;
        margin: 0 auto;
        .header-spacer {
            border-bottom: 1px solid $accent;
            padding-bottom: 8px;
            text-align: center;
            width: 100%;
            .header-text {
                color: $accent;
                font-weight: 600;
                font-size: 20px;
                span {
                    text-transform: capitalize;
                }
            }
        }
        .event-card-wrapper {
            margin-top: 48px;
            .upcomming-events {
                margin-top: 50px;
            }
            .header-text {
                color: $accent;
                font-weight: 600;
                text-transform: capitalize;
            }
            .viewmore {
                color: $accent;
                font-weight: 600;
                display: flex;
                justify-content: center;
                label {
                    cursor: pointer;
                }
            }
        }
        .comment-wrapper {
            padding: 16px 0 0;
        }
        .about-content {
            padding: 24px 0;
        }
        .comment {
            margin-top: 31px;
            margin-bottom: 138px;
        }
    }
}
</style>
