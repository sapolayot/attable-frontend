<template>
    <div class="page-wrapper">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <div class="page" v-if="event">
            <div class="info-wrapper">
                <div class="event-info">
                    <div class="left-info">
                        <div class="info-image-wrapper">
                            <!-- <img :src="event.media[0].path?event.media[0].path:null"> -->
                            <carousel
                                :perPageCustom="[
                                    [0, 1],
                                    [481, 1],
                                    [1025, 1],
                                ]"
                                :paginationEnabled="true"
                            >
                                <slide
                                    class="slide-wrapper"
                                    v-for="(photo, photo_index) in event.media"
                                    :key="photo_index"
                                >
                                    <div
                                        class="img-food"
                                        :style="
                                            `background-image: url('${photo.path}');`
                                        "
                                    />
                                </slide>
                            </carousel>
                        </div>
                    </div>
                    <div class="right-info">
                        <p class="event-type">
                            {{ event.eventType }}
                        </p>
                        <div class="name-and-share">
                            <h1 class="event-name">
                                {{ deep(event, 'eventName') }}
                            </h1>
                            <i
                                class="material-icons-outlined share-icon"
                                style="cursor: pointer"
                                @click="share()"
                            >
                                share
                            </i>
                        </div>
                        <div class="chef-part">
                            <div class="left-chef">
                                <p>
                                    {{ event.chef.user.firstName }}
                                    {{ event.chef.user.lastName }}
                                </p>
                                <div class="score">
                                    <Score
                                        :init="
                                            Math.round(
                                                review / (7 * reviewerNumber)
                                            )
                                        "
                                    />
                                    <p>
                                        ({{
                                            CurrencyFormatter.CurrencyFormatter(
                                                reviewerNumber
                                            )
                                        }})
                                    </p>
                                </div>
                            </div>
                            <div
                                class="right-img-chef img-wrapper"
                                @click.prevent="
                                    $router.push(
                                        `/profile/public/${event.chef.user.id}`
                                    )
                                "
                            >
                                <img :src="event.chef.user.profileImage" />
                            </div>
                        </div>
                        <div class="icon-group-wrapper">
                            <div class="time icon-group">
                                <div class="time img-wrapper">
                                    <img :src="icon.time" />
                                </div>
                                <p>
                                    {{
                                        deep(event, 'subevent') &&
                                            dateFormatingDate(
                                                deep(event, 'startDate')
                                            )
                                    }}
                                    -
                                    {{
                                        deep(event, 'subevent') &&
                                            dateFormating(
                                                deep(event, 'endDate')
                                            )
                                    }}
                                </p>
                            </div>
                            <div class="money icon-group">
                                <div class="time img-wrapper">
                                    <img :src="icon.price" />
                                </div>
                                <p>
                                    THB
                                    {{
                                        CurrencyFormatter.CurrencyFormatter(
                                            event.pricePerSeat
                                        )
                                    }}
                                </p>
                            </div>
                            <div class="people icon-group">
                                <div class="time img-wrapper">
                                    <img :src="icon.people" />
                                </div>
                                <p>Available</p>
                            </div>
                            <div class="location icon-group">
                                <div class="time img-wrapper">
                                    <img :src="icon.place" />
                                </div>
                                <p>
                                    {{ event.homeNo }} {{ event.street }}
                                    {{ event.subDistrict }},
                                    {{ event.district }} {{ event.postalCode }}
                                    {{ event.city }}
                                </p>
                            </div>
                            <div class="icon-group danger">
                                <div class="time img-wrapper">
                                    <img :src="icon.danger" />
                                </div>
                                <div
                                    class="food-restiction"
                                    v-for="(a, index) in event.allergic
                                        ? event.allergic
                                        : null"
                                    :key="index"
                                >
                                    <p>{{ a.allergicName }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-wrapper">
                <div class="head-spacer">
                    <h4>
                        Event Detail
                    </h4>
                </div>
                <div class="detail-content">
                    <p>
                        {{ event.eventDetail }}
                    </p>
                </div>
                <div class="head-spacer">
                    <h4>
                        Menu
                    </h4>
                </div>
                <div
                    class="menu-wrapper"
                    v-if="
                        event.menu[0] ? event.menu[0].subMenu.length > 0 : null
                    "
                >
                    <div class="menu-type">
                        <p>STARTER</p>
                    </div>
                    <div class="menu-content-wrap">
                        <div
                            class="menu-content"
                            v-for="(menu, index) in event.menu[0]
                                ? event.menu[0].subMenu
                                : null"
                            :key="index"
                        >
                            <div class="menu-title">
                                <p>{{ menu.subMenuName }}</p>
                            </div>
                            <div
                                class="menu-discription"
                                v-if="menu.subMenuDescription"
                            >
                                <p>{{ menu.subMenuDescription }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="menu-wrapper"
                    v-if="
                        event.menu[1] ? event.menu[1].subMenu.length > 0 : null
                    "
                >
                    <div class="menu-type">
                        <p>MAIN COURSE</p>
                    </div>
                    <div class="menu-content-wrap">
                        <div
                            class="menu-content"
                            v-for="(menu, index) in event.menu[1]
                                ? event.menu[1].subMenu
                                : null"
                            :key="index"
                        >
                            <div class="menu-title">
                                <p>{{ menu.subMenuName }}</p>
                            </div>
                            <div
                                class="menu-discription"
                                v-if="menu.subMenuDescription"
                            >
                                <p>{{ menu.subMenuDescription }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="menu-wrapper"
                    v-if="
                        event.menu[2] ? event.menu[2].subMenu.length > 0 : null
                    "
                >
                    <div class="menu-type">
                        <p>DESSERT</p>
                    </div>
                    <div class="menu-content-wrap">
                        <div
                            class="menu-content"
                            v-for="(menu, index) in event.menu[2]
                                ? event.menu[2].subMenu
                                : null"
                            :key="index"
                        >
                            <div class="menu-title">
                                <p>{{ menu.subMenuName }}</p>
                            </div>
                            <div
                                class="menu-discription"
                                v-if="menu.subMenuDescription"
                            >
                                <p>{{ menu.subMenuDescription }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="menu-wrapper"
                    v-if="
                        event.menu[3] ? event.menu[3].subMenu.length > 0 : null
                    "
                >
                    <div class="menu-type">
                        <p>DRINKS & BEVERAGES</p>
                    </div>
                    <div class="menu-content-wrap">
                        <div
                            class="menu-content"
                            v-for="(menu, index) in event.menu[3]
                                ? event.menu[3].subMenu
                                : null"
                            :key="index"
                        >
                            <div class="menu-title">
                                <p>{{ menu.subMenuName }}</p>
                            </div>
                            <div
                                class="menu-discription"
                                v-if="menu.subMenuDescription"
                            >
                                <p>{{ menu.subMenuDescription }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ruleAndAmenities">
                    <div class="rule">
                        <div class="head-spacer">
                            <h4>
                                House's Rule
                            </h4>
                        </div>
                        <div class="rule-content">
                            <p>
                                {{ event.rule }}
                            </p>
                        </div>
                    </div>
                    <div class="amenities">
                        <div class="head-spacer">
                            <h4>
                                Place & Amenities
                            </h4>
                        </div>
                        <div
                            class="amenities-content"
                            v-for="(amenitiesPlace,
                            index) in event.amenitiesPlace"
                            :key="index"
                        >
                            <div class="amenities-group">
                                <i class="material-icons">
                                    done
                                </i>
                                <p>{{ amenitiesPlace.amenitiesPlaceName }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="map">
                    <gmap-map
                        ref="mapBookingDetail"
                        :center="startLocation"
                        :zoom="20"
                        style="width: 100%; height: 300px"
                    >
                        <gmap-marker :position="startLocation" />
                    </gmap-map>
                </div>
                <div class="addressCondition">
                    <p>
                        The full address will be provided once the booking is
                        confirmed.
                    </p>
                </div>
                <div class="booking">
                    <h4 class="booking-title">
                        Booking
                    </h4>
                    <div class="form">
                        <div class="booking-date">
                            <div class="input-wrapper">
                                <i class="material-icons">
                                    event
                                </i>
                                <v-date-picker
                                    v-model="date"
                                    locale="en"
                                    color="red"
                                    :popover="{ visibility: 'click' }"
                                    class="date-picker-wrapper"
                                    :available-dates="availiableDate"
                                    :attributes="attrs"
                                    @input="setNum2Zero"
                                >
                                    <input
                                        id="date"
                                        class="date"
                                        placeholder="Select the date"
                                        v-model="dateFormat"
                                        readonly
                                    />
                                </v-date-picker>
                            </div>
                            <div class="condition-wrapper" v-if="currentEvent">
                                <p class="time-condition">
                                    Time for this date is
                                    {{
                                        currentEvent[0]
                                            ? tFormat(currentEvent[0].startTime)
                                            : null
                                    }}-{{
                                        currentEvent[0]
                                            ? eFormat(currentEvent[0].endTime)
                                            : null
                                    }}
                                    |
                                    {{
                                        currentEvent[0]
                                            ? currentEvent[0].currentSeat
                                            : 0
                                    }}
                                    Seat available
                                </p>
                            </div>
                        </div>
                        <div class="people-number">
                            <i class="material-icons">
                                people
                            </i>
                            <div class="number-input">
                                <div class="input-wrapper">
                                    <button>
                                        <i
                                            class="material-icons-outlined"
                                            @click.prevent="decreseNum"
                                        >
                                            remove_circle_outline
                                        </i>
                                    </button>
                                    <input class="number" v-model="number" />
                                    <button>
                                        <i
                                            class="material-icons-outlined"
                                            @click.prevent="increseNum"
                                        >
                                            add_circle_outline
                                        </i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        class="book-button"
                        :disabled="!number > 0"
                        @click.prevent="bookThisEvent()"
                    >
                        Book
                    </button>
                    <p class="charged" style="color:#858585">
                        You won't be charged yet.
                    </p>
                </div>
                <div class="about-chef">
                    <div class="head-spacer">
                        <h4>
                            about {{ event.chef.user.firstName }}
                            {{ event.chef.user.lastName }}
                        </h4>
                    </div>
                    <div class="about-content">
                        <p>{{ event.chef.user.aboutMe }}</p>
                    </div>
                </div>
                <div class="comment" v-if="deep(event, 'chef.id')">
                    <Comment :id="deep(event, 'chef.id')" />
                </div>
            </div>
        </div>
        <modal width="30%" height="30%" name="CopyLink">
            <div class="box-dialog">
                <div class="dialog-close">
                    <a href="#" class="close-button" @click="hideCopyLink">
                        <div class="in">
                            <div class="close-button-block"></div>
                            <div class="close-button-block"></div>
                        </div>
                        <div class="out">
                            <div class="close-button-block"></div>
                            <div class="close-button-block"></div>
                        </div>
                    </a>
                </div>
                <div class="dialog">
                    <div class="dialog-box-content">
                        <div class="dialog-topic">
                            <span>Link Copied :</span>
                        </div>
                    </div>
                    <div class="dialog-box-content">
                        <div class="dialog-content">
                            <span>{{ link }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
        <modal width="70%" height="40%" name="CopyLink-small">
            <div class="box-dialog">
                <div class="dialog-close">
                    <a href="#" class="close-button" @click="hideCopyLinkSmall">
                        <div class="in">
                            <div class="close-button-block"></div>
                            <div class="close-button-block"></div>
                        </div>
                        <div class="out">
                            <div class="close-button-block"></div>
                            <div class="close-button-block"></div>
                        </div>
                    </a>
                </div>
                <div class="dialog">
                    <div class="dialog-box-content">
                        <div class="dialog-topic">
                            <span>Link Copied</span>
                        </div>
                    </div>
                    <div class="dialog-box-content">
                        <div class="dialog-content">
                            <span style="font-size:11px">{{ link }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import Comment from '~/components/Comment/Comment'
import Vue from 'vue'
import eventAPI from '~/api/graphql/events'
import reviewAPI from '~/api/graphql/review'
import moment from 'moment'
import _ from 'lodash'
import Score from '~/components/Score/Score'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import CurrencyFormatter from '~/utils/currencyFormatter'

export default {
    scrollToTop: true,
    components: {
        Comment,
        Score,
        Loading,
    },
    layout: 'detail',
    data() {
        return {
            link: '',
            isLoading: false,
            startLocation: {
                lat: 0,
                lng: 0,
            },
            CurrencyFormatter: CurrencyFormatter,
            icon: {
                time: require('~/assets/Clock.png'),
                people: require('~/assets/people.png'),
                place: require('~/assets/place.png'),
                price: require('~/assets/Price.png'),
                danger: require('~/assets/danger.png'),
            },
            date: null,
            number: 0,
            pictureList: [],
            eventName: null,
            chef: null,
            commentList: [],
            event: null,
            dates_multiple: [],
            review: 0,
            reviewerNumber: 0,
        }
    },
    mounted() {
        // navigator.geolocation.getCurrentPosition(position => {
        //     this.startLocation.lat = position.coords.latitude
        //     this.startLocation.lng = position.coords.longitude
        // })
        this.isLoading = true
        this.getEventData()
    },
    methods: {
        share() {
            var dummy = document.createElement('input'),
                text = window.location.href
            document.body.appendChild(dummy)
            this.link = text
            dummy.value = text
            dummy.select()
            document.execCommand('copy')
            alert('Copied sucessful')
        },
        tabClicked(index) {
            this.tabs = this.tabsItems[index]
            this.tabActive = index
        },
        increseNum() {
            if (!this.currentEvent[0]) {
                return (this.number = 0)
            }
            if (this.number < this.currentEvent[0].currentSeat) {
                this.number++
            }
        },
        decreseNum() {
            if (!this.currentEvent[0]) {
                return (this.number = 0)
            }
            if (this.number > 0) {
                this.number--
            }
        },
        setNum2Zero() {
            this.number = 0
        },
        getEventData() {
            const eventId = this.$route.params.id
            eventAPI.getEventById(eventId).then(res => {
                this.event = res.getEventById ? res.getEventById : this.event
                let temp = []
                this.event.subevent.map(item => {
                    if (
                        temp.indexOf(item.eventDate) == -1 &&
                        item.status == 'Approved'
                    ) {
                        temp.push(item.eventDate)
                        this.dates_multiple.push(
                            moment(
                                moment(item.eventDate).format('YYYY-MM-DD')
                            ).toDate()
                        )
                    }
                })
                this.startLocation.lat = res.getEventById.lat
                this.startLocation.lng = res.getEventById.lng
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
                        this.reviewerNumber =
                            res.getReviewByChefId.reviewevents.length

                        this.isLoading = false
                    })
                this.setMap()
            })
        },
        bookThisEvent() {
            const id = this.event.subevent.filter(item => {
                if (
                    moment(this.date).format('YYYY-MM-DD') ==
                    moment(item.eventDate).format('YYYY-MM-DD')
                ) {
                    return item.id
                }
            })
            this.$router.push({
                path: `/booking/${this.event.id}/payment`,
                query: {
                    number: this.number,
                    event: this.event,
                    reserveDate: moment(this.date).format('DD-MM-YYYY'),
                    subeventId: id[0].id,
                },
            })
        },
        setMap() {
            /// if(this.event){
            //     this.startLocation = {
            //     lat: this.event.lat,
            //     lng: this.event.lng
            //     }
            // }
            this.startLocation = {
                lat: this.event.lat,
                lng: this.event.lng,
            }
        },
        dateFormating(time) {
            return moment(time).format('DD MMM YYYY')
        },
        dateFormatingDate(date) {
            return moment(date).format('DD')
        },
        tFormat(time) {
            return moment(time, 'hh:mm:ss').format('h:mm')
        },
        eFormat(time) {
            return moment(time, 'hh:mm:ss').format('h:mmA')
        },
        deep(item, path) {
            return _.get(item, path)
        },
        showCopyLink() {
            this.$modal.show('CopyLink')
        },
        hideCopyLink() {
            this.$modal.hide('CopyLink')
        },
        showCopyLinkSmall() {
            this.$modal.show('CopyLink-small')
        },
        hideCopyLinkSmall() {
            this.$modal.hide('CopyLink-small')
        },
        locate() {
            console.log('event', this.event)
            let location = {
                homeNo: this.event.homeNo,
                street: this.event.street,
                subDris: this.event.subDistrict,
                district: this.event.district,
                city: this.event.city,
                postalCode: this.event.postalCode,
            }
            console.log(location)
            return location
        },
    },
    computed: {
        dateFormat() {
            if (this.date) {
                return moment(this.date).format('DD MMM YYYY')
            } else {
                return null
            }
        },
        availiableDate() {
            return this.dates_multiple.map(item => {
                return {
                    start: item,
                    end: item,
                }
            })
        },
        currentEvent() {
            this.event
            return this.event.subevent
                ? this.event.subevent.filter(
                      each =>
                          moment(each.eventDate).format('DD-MM-YY') ==
                          moment(this.date).format('DD-MM-YY')
                  )
                : null
        },
        attrs() {
            return [
                {
                    highlight: {
                        color: 'red',
                    },
                    order: 1,
                    dates: this.date,
                },
                {
                    highlight: {
                        color: 'red',
                        fillMode: 'light',
                    },
                    dates: this.dates_multiple,
                },
            ]
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
        font-size: 14px;
    }
}
.page-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 auto;
    justify-content: center;
    @include respond-to($phone) {
        padding: 0;
    }
    .info-wrapper {
        display: flex;
        justify-content: center;
        @include respond-to($phone) {
            width: 100%;
            margin: 0 auto;
        }
        p {
            font-size: 18px;
            @include respond-to($phone) {
                font-size: 15px;
            }
        }
        .event-info {
            justify-content: space-between;
            flex-direction: row;
            margin-top: 42px;
            display: flex;
            width: 80%;
            @include respond-to($phone) {
                justify-content: space-between;
                flex-direction: column;
                margin-top: 42px;
                display: flex;
                width: 80%;
            }
            .left-info {
                flex: 0.45;
                @include respond-to($phone) {
                    width: 100%;
                    height: 200px;
                }
                .info-image-wrapper {
                    width: 730px;
                    height: 400px;
                    @include respond-to($phone) {
                        width: 100%;
                        height: 200px;
                    }
                    .slide-wrapper {
                        width: 730px;
                        height: 400px;
                        @include respond-to($phone) {
                            width: 100%;
                            height: 200px;
                        }
                    }
                    .img-food {
                        background-size: contain;
                        background-repeat: no-repeat;
                        background-position: center;
                        width: 100%;
                        height: 100%;
                        @include respond-to($phone) {
                            width: 100%;
                            height: 200px;
                            background-size: contain;
                            background-repeat: no-repeat;
                            background-position: center;
                        }
                    }
                    > img {
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                    }
                }
            }
            .right-info {
                flex: 0.5;
                .event-type {
                    font-size: 18px;
                    color: $accent;
                }
                .name-and-share {
                    display: flex;
                    justify-content: space-between;
                    .event-name {
                        font-size: 24px;
                        color: $black;
                        word-break: break-word;
                    }
                    .share-icon {
                        color: $accent;
                        font-size: 24px;
                        :hover {
                            cursor: pointer;
                        }
                    }
                }
                .chef-part {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 24px;
                    .score {
                        display: flex;
                        align-items: center;
                        p {
                            font-size: 16px;
                        }
                    }
                    .right-img-chef {
                        width: 48px;
                        height: 48px;
                        border-radius: 100%;
                        &.img-wrapper {
                            overflow: hidden;
                        }
                    }
                }
                .icon-group-wrapper {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 24px;
                    flex-wrap: wrap;
                    .icon-group {
                        flex: 0 50%;
                        display: flex;
                        text-align: center;
                        align-items: center;
                        margin-top: 31px;
                        p {
                            margin-left: 12px;
                        }
                        &.danger {
                            flex: 0 100%;
                        }
                    }
                    .time {
                        display: flex;
                        &.img-wrapper {
                            width: 35px;
                            height: 35px;
                            img {
                                object-fit: contain;
                            }
                        }
                    }
                }
            }
        }
    }
    .content-wrapper {
        width: 80%;
        margin: 0 auto;
        .detail-content {
            margin-top: 24px;
            @include respond-to($phone) {
                margin: 18px;
            }
        }
        .head-spacer {
            border-bottom: 1px solid $accent;
            text-align: center;
            margin-top: 48px;
            @include respond-to($phone) {
                margin: 18px;
            }
        }
        .menu-wrapper {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
            @include respond-to($phone) {
                flex-direction: column;
                margin: 10px 18px;
            }
            .menu-type {
                color: $accent;
                flex: 0.2;
            }
            .menu-content-wrap {
                flex: 0.75;
                .menu-discription {
                    color: $light-grey;
                    margin-bottom: 24px;
                }
            }
        }
        .ruleAndAmenities {
            display: flex;
            justify-content: space-between;
            @include respond-to($phone) {
                flex-direction: column;
                padding: 0 18px;
            }
            .head-spacer {
                margin-bottom: 20px;
                @include respond-to($phone) {
                    margin: 20px 0;
                }
            }
            .rule {
                flex: 0.49;
            }
            .amenities {
                flex: 0.49;
                .amenities-group {
                    display: flex;
                    > i {
                        color: $accent;
                        margin-right: 12px;
                    }
                }
            }
        }
        .map {
            display: flex;
            justify-content: center;
            height: 300px;
            flex-direction: column;
            text-align: center;
            background-color: $disable;
            margin-top: 90px;
            @include respond-to($phone) {
                margin: 18px;
            }
        }
        .addressCondition {
            text-align: center;
            margin-top: 12px;
        }
        .booking {
            margin-top: 82px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: $light-accent;
            @include respond-to($phone) {
                padding: 0 18px;
                margin-top: 20px;
            }
            .booking-title {
                font-weight: 600;
                color: $accent;
                margin-top: 48px;
                @include respond-to($phone) {
                    align-self: self-end;
                    margin-top: 20px;
                }
            }
            .input-wrapper {
                display: flex;
                align-items: center;
                input {
                    background-color: transparent;
                    border-bottom-color: $accent;
                    text-align: center;
                }
            }
            .material-icons,
            .material-icons-outlined {
                color: $accent;
            }
            .number-input {
                border-bottom: 1px solid $accent;
                display: flex;
                justify-content: center;
                width: 100%;
                .input-wrapper {
                    width: 70%;
                }
            }
            .form {
                button {
                    background-color: transparent;
                    border: 0;
                    padding: 0;
                }
            }
            .book-button {
                margin-top: 50px;
            }
            .charged {
                margin-top: 18px;
                margin-bottom: 34px;
            }
        }
        .booking-date {
            display: flex;
            flex-direction: column;
            margin-top: 52px;
            @include respond-to($phone) {
                margin-top: 20px;
            }
            .time-condition {
                color: $accent;
                font-size: 14px;
                font-weight: 600;
            }
            ::placeholder {
                color: $accent;
                font-size: 18px;
            }
            .condition-wrapper {
                text-align: center;
            }
        }
        .people-number {
            display: flex;
            margin-top: 16px;
            align-items: center;
            input {
                border: 0;
            }
        }
        .about-content {
            padding: 24px 0;
        }
        .comment {
            margin-top: 64px;
            margin-bottom: 138px;
            @include respond-to($phone) {
                margin: 18px;
            }
        }
    }
}
.date-picker-wrapper {
    width: 100%;
    .date {
        border-bottom: 1px solid $accent;
        display: flex;
        align-items: center;
    }
}
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
h4 {
    color: $accent;
    font-size: 24px;
    font-weight: 600;
    @include respond-to($phone) {
        font-size: 16px;
    }
}
.dialog-close {
    padding-top: 5px;
    padding-right: 10px;
    background: none;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    padding-bottom: 10px;
    /*background: #ff0000;
        color: #fff;*/
}

/* Button close */
$button-size: 40px;
$close-width: ($button-size / 10);
.close-button {
    display: block;
    width: $button-size;
    height: $button-size;
    position: relative;
    overflow: hidden;
    > div {
        position: relative;
    }
    &-block {
        width: 40px;
        height: 20px;
        position: relative;
        overflow: hidden;
        &:before,
        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: calc(55% - 4px);
            display: block;
            width: 4px;
            height: 25px;
            transform-origin: bottom center;
            background: black;
            transition: all ease-out 280ms;
        }
        &:last-of-type {
            transform: rotate(180deg);
        }
    }
    .in {
        .close-button-block {
            &:before {
                transition-delay: 280ms;
                transform: translateX(20px) translateY(-20px) rotate(45deg);
            }
            &:after {
                transition-delay: 280ms;
                transform: translateX(-22px) translateY(-22px) rotate(-45deg);
            }
        }
    }
    .out {
        position: absolute;
        top: 0;
        left: 0;
        .close-button-block {
            &:before {
                transform: translateX(-5px) translateY(5px) rotate(45deg);
            }
            &:after {
                transform: translateX(5px) translateY(5px) rotate(-45deg);
            }
        }
    }
    &:hover {
        .in {
            .close-button-block {
                &:before {
                    transform: translateX(-5px) translateY(5px) rotate(45deg);
                }
                &:after {
                    transform: translateX(5px) translateY(5px) rotate(-45deg);
                }
            }
        }
        .out {
            .close-button-block {
                &:before {
                    transform: translateX(-20px) translateY(20px) rotate(45deg);
                }
                &:after {
                    transform: translateX(20px) translateY(20px) rotate(-45deg);
                }
            }
        }
    }
}
.box-dialog {
    width: 100%;
    height: 100%;
    background: none;
}
.dialog {
    width: 100%;
    height: 60%;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // flex-direction : column;
    /*background: #ff0000;
    color: #fff;*/
}
.dialog-box-content {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    .dialog-content {
        color: #800020;
        border: 1px solid #a64d63;
        padding: 10px;
    }
    .dialog-topic {
        padding: 10px;
        color: #800020;
        span {
            font-size: 30px;
        }
    }
}
</style>
