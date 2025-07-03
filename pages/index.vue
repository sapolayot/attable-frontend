<template>
    <div class="page-wrapper">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <div class="banner-slider">
            <Banner :banners="banners" />
        </div>
        <section class="at-table">
            <div class="input-search">
                <img src="~/assets/search.svg" />
                <input
                    type="text"
                    placeholder="Search for city, chef name , event type , event name"
                    v-model="searchText"
                />
            </div>
            <h3 class="headline">
                What is At Table?
            </h3>
            <div class="content-blocks">
                <div class="block">
                    <div class="img-wrapper">
                        <img src="~/assets/attable/good.svg" />
                    </div>
                    <p class="content">
                        Experience unique meals by your selected Chef at his
                        exclusive place.
                    </p>
                </div>
                <div class="block">
                    <div class="img-wrapper">
                        <img src="~/assets/attable/idea.svg" />
                    </div>
                    <p class="content">
                        Witness Chef’s best creativity and the advance concept
                        of “Dining”.
                    </p>
                </div>
                <div class="block">
                    <div class="img-wrapper">
                        <img src="~/assets/attable/guarantee.svg" />
                    </div>
                    <p class="content">
                        Enjoy fine quality menu, freshly cooked and served.
                    </p>
                </div>
                <div class="block">
                    <div class="img-wrapper">
                        <img src="~/assets/attable/chef.svg" />
                    </div>
                    <p class="content">
                        Be part in developing the community of talented Chefs.
                    </p>
                </div>
            </div>
        </section>
        <section class="upcomming-events">
            <h3 class="headline">
                Featured Events
            </h3>
            <div class="content-blocks">
                <carousel
                    class="carousel"
                    :perPageCustom="[
                        [0, 1],
                        [481, 2],
                        [1025, 3],
                    ]"
                    :paginationEnabled="true"
                >
                    <slide
                        class="slide"
                        v-for="(event,
                        index) in eventListWithApprovedAndFeatured"
                        :key="index"
                    >
                        <EventCard class="card" :event="event" />
                    </slide>
                </carousel>
                <nuxt-link
                    :to="{
                        path: '/events',
                        query: { title: 'Featured Events', id: 0 },
                    }"
                    class="viewmore"
                >
                    <label>VIEW MORE</label>
                </nuxt-link>
            </div>
        </section>
        <section class="upcomming-events">
            <h3 class="headline">
                Upcoming Events
            </h3>
            <div class="content-blocks">
                <carousel
                    :perPageCustom="[
                        [0, 1],
                        [481, 2],
                        [1025, 3],
                    ]"
                    :paginationEnabled="true"
                >
                    <slide
                        class="slide"
                        v-for="(event,
                        index) in eventListWithApprovedAndUpcoming"
                        :key="index"
                    >
                        <EventCard class="card" :event="event" />
                    </slide>
                </carousel>
                <nuxt-link
                    :to="{
                        path: '/events',
                        query: { title: 'Upcoming Events', id: 1 },
                    }"
                    class="viewmore"
                >
                    <label>VIEW MORE</label>
                </nuxt-link>
            </div>
        </section>
        <section class="upcomming-events">
            <h3 class="headline">
                Special Tables
            </h3>
            <div class="content-blocks">
                <carousel
                    :perPageCustom="[
                        [0, 1],
                        [481, 2],
                        [1025, 3],
                    ]"
                    :paginationEnabled="false"
                >
                    <slide
                        class="slide"
                        v-for="(event,
                        index) in eventListWithApprovedAndSpecial"
                        :key="index"
                    >
                        <EventCard class="card" :event="event" />
                    </slide>
                </carousel>
                <nuxt-link
                    :to="{
                        path: '/events',
                        query: { title: 'Special Tables', id: 2 },
                    }"
                    class="viewmore"
                >
                    <label>VIEW MORE</label>
                </nuxt-link>
            </div>
        </section>
        <section class="diner">
            <h3 class="headline">
                How To Dine At Table?
            </h3>
            <div class="content-blocks">
                <div class="block">
                    <div class="img-wrapper">
                        <img src="~/assets/diner/find-my-friend.svg" />
                    </div>
                    <p class="content">
                        Search Chef through our hand-picked list to meet your
                        preference.
                    </p>
                </div>
                <div class="block">
                    <div class="img-wrapper">
                        <img src="~/assets/diner/online-booking.svg" />
                    </div>
                    <p class="content">
                        Compare and book Chef’s event of your choice instantly.
                    </p>
                </div>
                <div class="block">
                    <div class="img-wrapper">
                        <img src="~/assets/diner/handshake.svg" />
                    </div>
                    <p class="content">
                        Confirm the event and proceed the payment.
                    </p>
                </div>
                <div class="block">
                    <div class="img-wrapper">
                        <img src="~/assets/diner/rating.svg" />
                    </div>
                    <p class="content">
                        Help advance our Chefs by giving review and feedback.
                    </p>
                </div>
            </div>
        </section>
        <div class="discover-wrapper">
            <div class="discover-event">
                <h4>Start your first dining experience</h4>
                <button
                    class="discover-btn"
                    @click.prevent="$router.push('/events')"
                >
                    Discover Events
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import EventCard from '~/components/Events/EventCard'
import Banner from '~/components/Banner/Banner'
import sampleAPI from '~/api/graphql/sample'
import eventsAPI from '~/api/graphql/events'
import eventsWithSearch from '~/mixins/eventsWithSearch'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    scrollToTop: true,
    mixins: [eventsWithSearch],
    data() {
        return {
            banners: [
                {
                    id: 1,
                    path: 'images/slide1.png',
                    type: 'images',
                },
                {
                    id: 2,
                    path: 'images/slide2.png',
                    type: 'images',
                },
                {
                    id: 3,
                    path: 'images/slide3.png',
                    type: 'images',
                },
            ],
        }
    },
    components: {
        EventCard,
        Banner,
        Loading,
    },
    mounted() {
        this.$store.commit('controlNevbar/showNevbar')
        if (this.$route.query.isLoginPopup) {
            this.$modal.show('login')
        }
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
.card {
    cursor: pointer;
}
h3 {
    font-size: 3em;
}
svg {
    width: 50px;
    height: 50px;
    margin-top: 100px;
    fill: $white;
}
.md-card-media {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    & .swiper-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        height: 115%;
        & .swiper-wrapper {
            background-color: #000 !important;
            width: 100%;
        }
    }
}
.page-wrapper {
    .banner-slider {
        width: 100%;
    }
    .input-search {
        display: flex;
        width: 50%;
        border: 1px solid $accent;
        padding: 8px 20px;
        border-radius: 30px;
        margin: 0 auto 24px;
        @include respond-to($phone) {
            width: 100%;
            padding: 5px 10px;
        }
        img {
            padding-right: 5px;
        }
        input {
            border: none;
            width: 80%;
            @include respond-to($phone) {
                width: 100%;
                font-size: 10px;
            }
        }
    }
    .viewmore {
        font-weight: 600;
        color: #800020;
        text-decoration: underline;
        font-size: 18px;
        label:hover {
            text-decoration: underline;
            cursor: pointer;
        }
        @include respond-to($phone) {
            font-size: 14px;
        }
    }
    section {
        &.at-table,
        &.upcomming-events,
        &.diner {
            width: 1200px;
            margin: 80px auto 56px;
            .headline {
                text-transform: uppercase;
                text-align: center;
                margin-bottom: 24px;
            }
            .content-blocks {
                display: flex;
                flex-wrap: wrap;
                .block {
                    width: 25%;
                    padding: 8px 24px;
                    .img-wrapper {
                        text-align: center;
                        margin: 20px auto;
                        width: 60%;
                        @include respond-to($phone) {
                            margin: 10px auto;
                            width: 64px;
                            height: 64px;
                        }
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .content {
                        text-align: center;
                    }
                }
            }
        }
    }

    & .upcomming-events {
        & .content-blocks {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }
        & .see-more-text {
            font-weight: bolder;
        }
    }
    .discover-wrapper {
        width: 100%;
        height: 400px;
        display: flex;
        flex-direction: column;
        background-image: url('./../assets/discover.png');
        background-size: cover;
        background-position: center;
        @include respond-to($phone) {
            height: 200px;
        }
        .discover-event {
            display: flex;
            flex-direction: column;
            margin: auto;
            h4 {
                font-weight: 600;
                color: $white;
                text-align: center;
                @include respond-to($phone) {
                    font-size: 18px;
                }
            }
            .discover-btn {
                background-color: transparent;
                border-color: $white;
                height: 49px;
                margin: 30px auto 0;
                @include respond-to($phone) {
                    width: 115px;
                }
            }
        }
    }
}
</style>

//Responsive
<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
@include respond-to($phone) {
    .page-wrapper {
        .banner-slider {
            img {
                width: 100%;
            }
        }
        section {
            &.at-table,
            &.upcomming-events,
            &.diner {
                width: 90%;
                margin: 32px auto;
                .headline {
                    @include title-text(1.425em);
                    text-align: center;
                    margin-bottom: 10px;
                }
                .content-blocks {
                    display: flex;
                    flex-wrap: wrap;
                    .block {
                        padding: 20px 0;
                        width: 50%;
                        @include body-text(12px);
                    }
                }
            }
            @include respond-to($phone) {
                &.diner {
                    .content-blocks {
                        flex-direction: column;
                        align-items: center;
                        .block {
                            width: 70%;
                        }
                    }
                }
            }
        }
        & .upcomming-events {
            & .content-blocks {
                .carousel {
                    width: 100%;
                }
            }
            & .see-more-text {
                font-weight: bolder;
            }
        }
    }
}
.VueCarousel {
    width: 100% !important;
}
.VueCarousel-slide {
    margin-top: 32px;
    @include respond-to($phone) {
        margin-top: 24px;
        padding: 0 10px;
    }
}
</style>
