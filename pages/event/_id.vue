<template>
    <div class="page-wrapper">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <div
            class="page-wrapper"
            v-if="
                subEvent.event &&
                    subEvent.event.chef &&
                    subEvent.event.chef.user &&
                    subEvent.event.allergic
            "
        >
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
                                    v-for="(photo, photo_index) in subEvent
                                        .event.media"
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
                            {{ subEvent.event.eventType }}
                        </p>
                        <div class="name-and-share">
                            <h1 class="event-name">
                                {{ subEvent.event.eventName }}
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
                                    {{
                                        deep(
                                            subEvent,
                                            'event.chef.user.firstName'
                                        )
                                    }}
                                    {{
                                        deep(
                                            subEvent,
                                            'event.chef.user.lastName'
                                        )
                                    }}
                                </p>
                                <div class="score">
                                    <Score
                                        :init="
                                            Math.round(
                                                review / (7 * reviewerNumber)
                                            )
                                        "
                                    />
                                    <p>({{ reviewerNumber }})</p>
                                </div>
                            </div>
                            <div
                                class="right-img-chef img-wrapper"
                                @click.prevent="
                                    $router.push(
                                        `/profile/public/${subEvent.event.chef.user.id}`
                                    )
                                "
                            >
                                <img
                                    :src="
                                        subEvent.event.chef.user.profileImage
                                            ? subEvent.event.chef.user
                                                  .profileImage
                                            : null
                                    "
                                />
                            </div>
                        </div>
                        <div class="icon-group-wrapper">
                            <div class="time icon-group">
                                <div class="time img-wrapper">
                                    <img :src="icon.time" />
                                </div>
                                <p>{{ dateFormatter(subEvent.eventDate) }}</p>
                                <p>
                                    {{ timeFormatter(subEvent.startTime) }} -
                                    {{ timeFormatter(subEvent.endTime) }}
                                </p>
                            </div>
                            <div class="icon-display">
                                <div class="money icon-group">
                                    <div class="time img-wrapper">
                                        <img :src="icon.price" />
                                    </div>
                                    <p>
                                        THB
                                        {{
                                            CurrencyFormatter.CurrencyFormatter(
                                                subEvent.event.pricePerSeat
                                            )
                                        }}
                                    </p>
                                </div>
                                <div class="people icon-group">
                                    <div class="time img-wrapper">
                                        <img :src="icon.people" />
                                    </div>
                                    <p>
                                        {{
                                            CurrencyFormatter.CurrencyFormatter(
                                                subEvent.reserve.join.length
                                            )
                                        }}
                                        Diners
                                    </p>
                                </div>
                                <div class="icon-group-wrapper2">
                                    <div class="location icon-group">
                                        <div class="time img-wrapper">
                                            <img :src="icon.place" />
                                        </div>
                                        <p>
                                            {{ subEvent.event.homeNo }}
                                            {{ subEvent.event.street }}
                                            {{ subEvent.event.subDistrict }},
                                            {{ subEvent.event.district }}
                                            {{ subEvent.event.postalCode }}
                                            {{ subEvent.event.city }}
                                        </p>
                                    </div>
                                </div>
                                <div class="danger icon-group">
                                    <div class="time img-wrapper">
                                        <img :src="icon.danger" />
                                    </div>
                                    <div class="food-restiction">
                                        <p
                                            v-for="(a, index) in subEvent.event
                                                .allergic
                                                ? subEvent.event.allergic
                                                : null"
                                            :key="index"
                                        >
                                            {{ a.allergicName }}
                                        </p>
                                    </div>
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
                        {{ subEvent.event.eventDetail }}
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
                        subEvent.event.menu[0]
                            ? subEvent.event.menu[0].subMenu.length > 0
                            : null
                    "
                >
                    <div class="menu-type">
                        <p>STARTER</p>
                    </div>
                    <div class="menu-content-wrap">
                        <div
                            class="menu-content"
                            v-for="(menu, index) in subEvent.event.menu[0]
                                ? subEvent.event.menu[0].subMenu
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
                        subEvent.event.menu[1]
                            ? subEvent.event.menu[1].subMenu.length > 0
                            : null
                    "
                >
                    <div class="menu-type">
                        <p>MAIN COURSE</p>
                    </div>
                    <div class="menu-content-wrap">
                        <div
                            class="menu-content"
                            v-for="(menu, index) in subEvent.event.menu[1]
                                ? subEvent.event.menu[1].subMenu
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
                        subEvent.event.menu[2]
                            ? subEvent.event.menu[2].subMenu.length > 0
                            : null
                    "
                >
                    <div class="menu-type">
                        <p>DESSERT</p>
                    </div>
                    <div class="menu-content-wrap">
                        <div
                            class="menu-content"
                            v-for="(menu, index) in subEvent.event.menu[2]
                                ? subEvent.event.menu[2].subMenu
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
                        subEvent.event.menu[3]
                            ? subEvent.event.menu[3].subMenu.length > 0
                            : null
                    "
                >
                    <div class="menu-type">
                        <p>DRINKS & BEVERAGES</p>
                    </div>
                    <div class="menu-content-wrap">
                        <div
                            class="menu-content"
                            v-for="(menu, index) in subEvent.event.menu[3]
                                ? subEvent.event.menu[3].subMenu
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
                                {{ subEvent.event.rule }}
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
                            v-for="(amenitiesPlace, index) in subEvent.event
                                .amenitiesPlace"
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
                        ref="mapEventDetail"
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
                <div class="about-chef">
                    <div class="head-spacer">
                        <h4>
                            about
                            {{ deep(subEvent, 'event.chef.user.firstName') }}
                            {{ deep(subEvent, 'event.chef.user.lastName') }}
                        </h4>
                    </div>
                    <div class="about-content">
                        <p>{{ subEvent.event.chef.user.aboutMe }}</p>
                    </div>
                </div>
                <div class="comment" v-if="deep(subEvent, 'event.chef.id')">
                    <Comment :id="deep(subEvent, 'event.chef.id')" />
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
                            <span style="font-size:10px">{{ link }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import Comment from '~/components/Comment/Comment'
import Score from '~/components/Score/Score'
import eventAPI from '~/api/graphql/events'
import _ from 'lodash'
import moment from 'moment'
import reviewAPI from '~/api/graphql/review'
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
    data() {
        return {
            link: '',
            isLoading: false,
            CurrencyFormatter: CurrencyFormatter,
            icon: {
                time: require('~/assets/Clock.png'),
                people: require('~/assets/people.png'),
                place: require('~/assets/place.png'),
                price: require('~/assets/Price.png'),
                danger: require('~/assets/danger.png'),
            },
            startLocation: {
                lat: 0,
                lng: 0,
            },
            //date: new Date(),
            number: 0,
            pictureList: [],
            eventName: null,
            subEvent: {},
            review: 0,
            reviewerNumber: 0,
        }
    },
    methods: {
        share() {
            var dummy = document.createElement('input'),
                text = window.location.href
            this.link = text
            document.body.appendChild(dummy)
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
            this.number++
        },
        decreseNum() {
            if (this.number > 0) {
                this.number--
            }
        },
        getEventData() {
            this.isLoading = true
            const subEventId = this.$route.params.id
            eventAPI.getSubEventById(subEventId).then(res => {
                this.subEvent = res.getSubEventById
                console.log(this.subEvent)
                // this.startLocation.lat = this.subEevent.event.lat
                // this.startLocation.lng = this.subEevent.event.lng
                this.setMap()
                reviewAPI
                    .getReviewByChefId(1, 10000000, this.subEvent.event.chef.id)
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
        setMap() {
            this.startLocation = {
                lat: this.subEvent.event.lat,
                lng: this.subEvent.event.lng,
            }
        },
        deep(item, path) {
            return _.get(item, path)
        },
        dateFormatter(date) {
            return moment(date).format('dddd, D MMM YYYY')
        },
        timeFormatter(time) {
            return moment(time, 'hh:mm:ss').format('h:mmA')
        },
        onlyDateFormat(date) {
            return moment().format('DD')
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
    },
    mounted() {
        this.getEventData()
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;

p {
    font-size: 24px;
    @include respond-to($phone) {
        font-size: 15px;
    }
}
.food-restiction {
    flex-wrap: wrap;
    display: flex;
    flex: 0.9;
}
.page-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 auto;
    justify-content: center;
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
                    // display: flex;
                    justify-content: space-between;
                    margin-top: 24px;
                    flex-wrap: wrap;
                    .icon-group-wrapper2 {
                        justify-content: space-between;
                        flex-wrap: wrap;
                    }
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
                    .icon-display {
                        display: flex;
                        flex-wrap: wrap;
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
        .head-spacer {
            border-bottom: 1px solid $accent;
            text-align: center;
            margin-top: 48px;
            @include respond-to($phone) {
                margin: 18px;
            }
        }
        .detail-content {
            margin-top: 24px;
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
                    align-items: center;
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
            flex-direction: column;
            text-align: center;
            margin-top: 90px;
            height: 350px;
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
