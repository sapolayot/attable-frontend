<template>
    <div class="page-wrapper" v-if="finish">
        <div class="header-wrappers">
            <div class="page-header-spacer">
                <h3>
                    Event Number
                    {{
                        paddingWithZero.paddingWithZero(
                            this.$route.params.id,
                            5
                        )
                    }}(1-3)
                </h3>
                <p>Status:{{ event.status }}</p>
            </div>
        </div>
        <div class="form">
            <div class="input-group">
                <p class="input-text">
                    Event Name
                </p>
                <input class="event-name input" v-model="event.eventName" />
            </div>
            <div class="row">
                <div class="input-group inrow">
                    <p class="input-text">
                        Event Type
                    </p>
                    <DropdownSingle
                        class="input type"
                        :text="event.eventType"
                        :items="listEvent"
                        @clicked="eventTypeClicked"
                    />
                </div>
                <div class="input-group inrow">
                    <p class="input-text">
                        Price per seat
                    </p>
                    <input class="cost input" v-model="event.pricePerSeat" />
                </div>
            </div>
            <div class="row">
                <div class="input-group inrow">
                    <p class="input-text">
                        Max no. of seat
                    </p>
                    <input
                        class="max-seat input"
                        v-model="event.maxSeat"
                        type="number"
                    />
                </div>
                <div class="input-group inrow">
                    <p class="input-text">
                        Min no. of seat
                    </p>
                    <input
                        class="min-seat input"
                        v-model="event.minSeat"
                        type="number"
                    />
                </div>
            </div>
            <div class="row timepicker">
                <div class="input-group inrow">
                    <p class="input-text">
                        Time
                    </p>
                    <input
                        class="event-name input"
                        v-model="showTime"
                        readonly
                        @click.prevent="pickTime()"
                    />
                    <Timepicker
                        v-model="showTime"
                        @clicked="clicked"
                        v-if="timepick.active"
                    />
                </div>
            </div>
            <div class="row">
                <div class="input-group inrow">
                    <p class="input-text">
                        Start Date
                    </p>
                    <div
                        class="date-picker-wrapper"
                        :class="!isRepeatOn ? 'disable' : null"
                    >
                        <div class="icon-wrapper">
                            <i class="material-icons date-icon">event</i>
                        </div>
                        <v-date-picker
                            v-model="startedDate"
                            color="red"
                            :popover="{
                                visibility: isRepeatOn ? 'click' : null,
                            }"
                            class="date-picker"
                            :min-date="new Date()"
                        >
                            <input
                                class="date-picker input"
                                :class="!isRepeatOn ? 'disable' : null"
                                id="date"
                                v-model="dateFormat[0]"
                                readonly
                            />
                        </v-date-picker>
                    </div>
                </div>
                <div class="input-group inrow">
                    <p class="input-text">
                        End Date
                    </p>
                    <div
                        class="date-picker-wrapper"
                        :class="!isRepeatOn ? 'disable' : null"
                    >
                        <div class="icon-wrapper">
                            <i class="material-icons date-icon">event</i>
                        </div>
                        <v-date-picker
                            v-model="endedDate"
                            color="red"
                            :popover="{
                                visibility: isRepeatOn ? 'click' : null,
                            }"
                            class="date-picker"
                            :min-date="new Date()"
                        >
                            <input
                                class="date-picker input"
                                :class="!isRepeatOn ? 'disable' : null"
                                id="date"
                                v-model="dateFormat[dateFormat.length - 1]"
                                readonly
                            />
                        </v-date-picker>
                    </div>
                </div>
            </div>
            <div class="input-group inrow">
                <div class="checkbox-wrapper input">
                    <input
                        type="checkbox"
                        class="check repeat-on"
                        :value="true"
                        v-model="isRepeatOn"
                    />
                    <p style="margin-left: 16px">
                        Repeat on
                    </p>
                </div>
                <div class="input-group repeat">
                    <div class="day-wrapper">
                        <button
                            class="day"
                            v-for="(day, index) in days"
                            :key="index"
                            :class="{ selected: day.active && isRepeatOn }"
                            @click.prevent="selectDay(index)"
                        >
                            {{ day.name }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="row datepicker">
                <v-date-picker
                    v-model="dates_multiple"
                    mode="multiple"
                    :color="isRepeatOn && isRanged ? null : 'red'"
                    is-inline
                    is-expanded
                    :columns="$screens({ default: 1, xl: 2 })"
                    :attributes="isRepeatOn && isRanged ? attrs : null"
                    :min-date="new Date()"
                />
            </div>
            <div class="input-group">
                <p class="input-text">
                    Event Detail
                </p>
                <textarea
                    rows="5"
                    cols="60"
                    maxlength="250"
                    name="description"
                    class="event-detail input"
                    v-model="event.eventDetail"
                />
            </div>
        </div>
        <div class="header spacer">
            <h3>Menu</h3>
        </div>
        <div class="form">
            <div class="input-group">
                <p class="input-text">
                    STARTER
                </p>
                <div
                    class="row-input"
                    v-for="(menu, index) in event.menu[0]
                        ? event.menu[0].subMenu
                        : null"
                    :key="index"
                >
                    <input
                        class="menu-name input starter"
                        :class="index"
                        placeholder="Name"
                        v-model="menu.subMenuName"
                    />
                    <input
                        class="menu-description input starter"
                        :class="index"
                        placeholder="Description"
                        v-model="menu.subMenuDescription"
                    />
                    <div class="icon-wrapper">
                        <i
                            class="material-icons delete-menu starter"
                            @click.prevent="deleteMenuStarter(index)"
                        >
                            close
                        </i>
                    </div>
                </div>
                <button class="addmore starter" @click.prevent="addStarter">
                    <p>+ Add more</p>
                </button>
            </div>
            <div class="input-group">
                <p class="input-text">
                    MAIN COURSE
                </p>
                <div
                    class="row-input"
                    v-for="(menu, index) in event.menu[1]
                        ? event.menu[1].subMenu
                        : null"
                    :key="index"
                >
                    <input
                        class="menu-name input main"
                        :class="index"
                        placeholder="Name"
                        v-model="menu.subMenuName"
                    />
                    <input
                        class="menu-description input main"
                        :class="index"
                        placeholder="Description"
                        v-model="menu.subMenuDescription"
                    />
                    <div class="icon-wrapper">
                        <i
                            class="material-icons delete-menu main"
                            @click.prevent="deleteMenuMain(index)"
                        >
                            close
                        </i>
                    </div>
                </div>
                <button class="addmore main" @click.prevent="addMain">
                    <p>+ Add more</p>
                </button>
            </div>
            <div class="input-group">
                <p class="input-text">
                    DESSERT
                </p>
                <div
                    class="row-input"
                    v-for="(menu, index) in event.menu[2]
                        ? event.menu[2].subMenu
                        : null"
                    :key="index"
                >
                    <input
                        class="menu-name input dessert"
                        :class="index"
                        placeholder="Name"
                        v-model="menu.subMenuName"
                    />
                    <input
                        class="menu-description input dessert"
                        :class="index"
                        placeholder="Description"
                        v-model="menu.subMenuDescription"
                    />
                    <div class="icon-wrapper">
                        <i
                            class="material-icons delete-menu dessert"
                            @click.prevent="deleteMenuDessert(index)"
                        >
                            close
                        </i>
                    </div>
                </div>
                <button class="addmore dessert" @click.prevent="addDessert">
                    <p>+ Add more</p>
                </button>
            </div>
            <div class="input-group">
                <p class="input-text">
                    DRINKS & BEVERAGES
                </p>
                <div
                    class="row-input"
                    v-for="(menu, index) in event.menu[3]
                        ? event.menu[3].subMenu
                        : null"
                    :key="index"
                >
                    <input
                        class="menu-name input drink"
                        :class="index"
                        placeholder="Name"
                        v-model="menu.subMenuName"
                    />
                    <input
                        class="menu-description input drink"
                        :class="index"
                        placeholder="Description"
                        v-model="menu.subMenuDescription"
                    />
                    <div class="icon-wrapper">
                        <i
                            class="material-icons delete-menu drink"
                            @click.prevent="deleteMenuDrink(index)"
                        >
                            close
                        </i>
                    </div>
                </div>
                <button class="addmore starter drink" @click.prevent="addDrink">
                    <p>+ Add more</p>
                </button>
            </div>
            <div class="input-group danger">
                <p class="input-text">
                    Select food restriction on your event
                </p>
                <Dropdown
                    v-if="showAllergics[0]"
                    :initial="showAllergics"
                    :items="restrictions"
                    @clicked="restrictionClicked"
                />
                <Dropdown
                    v-if="showAllergics.length < 1"
                    :initial="showAllergics"
                    :items="restrictions"
                    @clicked="restrictionClicked"
                    class="food restriction"
                />
            </div>
        </div>
        <div class="header spacer">
            <h3>Photos</h3>
        </div>
        <div class="form">
            <div class="input-group photo">
                <div class="seperate-div">
                    <img
                        src="~/assets/upload_24px.png"
                        class="upload-logo"
                        v-if="uploadShow"
                    />
                </div>
                <div class="seperate-div upload-list">
                    <div
                        class="img-wrapper"
                        v-for="(photo, photo_index) in event.media"
                        :key="photo_index"
                    >
                        <div class="upload-img-wrapper">
                            <img
                                :src="photo.path"
                                class="upload_picture"
                                :class="photo_index"
                            />
                        </div>
                        <i
                            class="material-icons delete-upload"
                            :class="photo_index"
                            @click.prevent="deleteUpload(index)"
                        >
                            close
                        </i>
                    </div>
                </div>
                <div class="seperate-div button">
                    <input
                        type="file"
                        class="event-img"
                        id="upload-photo"
                        accept="image/*"
                        @change="onFileSelected"
                    />
                    <label class="upload" for="upload-photo">
                        Upload
                    </label>
                </div>
            </div>
        </div>
        <div class="header spacer">
            <h3>House's Rule</h3>
        </div>
        <div class="form">
            <div class="input-group">
                <textarea
                    rows="5"
                    cols="60"
                    maxlength="250"
                    name="description"
                    class="event-detail input"
                    v-model="event.rule"
                />
            </div>
        </div>
        <div class="header spacer">
            <h3>Place & Amenities</h3>
        </div>
        <div class="form">
            <div class="input-group">
                <div class="checkbox-wrapper input">
                    <input
                        type="checkbox"
                        class="check autofill"
                        :value="true"
                        @change="clickCheck"
                    />
                    <p style="margin-left: 16px">
                        Auto-fill my address
                    </p>
                </div>
                <div class="row-input">
                    <input
                        class="houseNo input"
                        placeholder="House/ Room no. bldg. name"
                        v-model="event.homeNo"
                    />
                    <input
                        class="street input"
                        placeholder="Street"
                        v-model="event.street"
                    />
                </div>
                <div class="row-input">
                    <input
                        class="sub-district input"
                        placeholder="Sub District"
                        v-model="event.subDistrict"
                    />
                    <input
                        class="district input"
                        placeholder="District"
                        v-model="event.district"
                    />
                </div>
                <div class="row-input">
                    <input
                        class="city input"
                        placeholder="City"
                        v-model="event.city"
                    />
                    <input
                        class="post input"
                        placeholder="Postal Code"
                        v-model="event.postalCode"
                    />
                </div>
                <div class="location-header input">
                    <img class="locate-icon" src="~/assets/place.png" />
                    <p class="locate-title">
                        Locate your place
                    </p>
                </div>
                <!-- <p class="dont-worry">
                    Don't worry! Your actual address will only be revealed after the payment has been done by the diner.
                </p> -->
            </div>
        </div>
        <div class="map input-group">
            <gmap-map
                ref="mymap"
                :center="startLocation"
                :zoom="20"
                style="width: 100%; height: 300px"
            >
                <gmap-marker
                    :position="startLocation"
                    :draggable="true"
                    @drag="updateCoordinates"
                />
            </gmap-map>
        </div>
        <div class="form">
            <div class="input-group owner rows">
                <p>Do you own this place?</p>
                <DropdownSingle
                    class="ownership"
                    :text="this.ownPlace ? 'Yes' : 'No'"
                    @clicked="ownPlaceClicked"
                    :items="listOwnPlace"
                />
            </div>
            <div class="input-group">
                <p class="input-text">
                    Amenities
                </p>
                <div
                    class="rows"
                    v-for="(amentitie, index) in event.amenitiesPlace"
                    :key="index"
                >
                    <input
                        class="input amentities"
                        :class="`amentities-${index}`"
                        v-model="amentitie.amenitiesPlaceName"
                        placeholder="e.g. parking space, pet friendly, kid friendly"
                    />
                    <i
                        class="add-amen material-icons"
                        :class="`add-amen-${index}`"
                        @click.prevent="addAmentities"
                    >
                        add_circle
                    </i>
                    <i
                        class="delete-amen material-icons"
                        :class="index"
                        @click.prevent="deleteAmentities(index)"
                    >
                        close
                    </i>
                </div>
            </div>
        </div>
        <div class="confirm-button-wrapper rows">
            <button class="save-draft">
                Save draft
            </button>
            <button @click.prevent="editEvent" class="submit-event">
                Submit Event
            </button>
        </div>
    </div>
</template>

<script>
import Dropdown from '~/components/Dropdown/Dropdown'
import DropdownSingle from '~/components/Dropdown/DropdownSingle'
import Timepicker from '~/components/Timepicker/Timepicker'
import moment, { weekdays } from 'moment'
import { mapState } from 'vuex'
import eventAPI from '~/api/graphql/events'
import sampleAPI from '~/api/graphql/sample'
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import userAPI from '~/api/graphql/user'
import axios from 'axios'
import apiConfig from '~/config/endpoint'
import paddingWithZero from '~/utils/paddingWithZero'
export default {
    components: {
        DropdownSingle,
        Dropdown,
        Timepicker,
    },
    data() {
        return {
            paddingWithZero: paddingWithZero,
            listOwnPlace: ['Yes', 'No'],
            startedDate: null,
            endedDate: null,
            dates_multiple: [],
            showTime: '',
            isRepeatOn: false,
            uploadShow: true,
            allergics: [],
            restrictions: [],
            isRanged: true,
            timepick: {
                first: null,
                second: null,
                active: false,
            },
            repeatOn: [],
            listEvent: [
                'BREAKFAST',
                'BRUNCH',
                'LUNCH',
                'DINNER',
                'SPECIAL_TABLE',
            ],
            date: {
                start: new Date(),
                end: new Date(),
            },
            event: {
                eventName: '',
                eventType: '',
                eventDetail: '',
                pricePerSeat: 0,
                lat: 0,
                lng: 0,
                commission: 0,
                homeNo: '',
                street: '',
                subDistrict: '',
                district: '',
                city: '',
                postalCode: '',
                minSeat: 0,
                maxSeat: 0,
                startDate: new Date(),
                endDate: new Date(),
                selectedDates: {},
                startTime: '',
                endTime: '',
                repeatOn: {},
                rule: '',
                ownPlace: false,
                allergic: [],
                media: [],
                menu: [
                    {
                        foodtype: 'STARTER',
                        subMenu: [
                            {
                                subMenuName: '',
                                subMenuDescription: '',
                            },
                        ],
                    },
                    {
                        foodtype: 'MAIN_COURSE',
                        subMenu: [
                            {
                                subMenuName: '',
                                subMenuDescription: '',
                            },
                        ],
                    },
                    {
                        foodtype: 'DESSERT',
                        subMenu: [
                            {
                                subMenuName: '',
                                subMenuDescription: '',
                            },
                        ],
                    },
                    {
                        foodtype: 'DRINKS_BEVERAGES',
                        subMenu: [
                            {
                                subMenuName: '',
                                subMenuDescription: '',
                            },
                        ],
                    },
                ],
                amenitiesPlace: [
                    {
                        amenitiesPlaceName: '',
                    },
                ],
                chef: null,
            },
            days: [
                {
                    name: 'S',
                    value: 1,
                    active: false,
                },
                {
                    name: 'M',
                    value: 2,
                    active: false,
                },
                {
                    name: 'T',
                    value: 3,
                    active: false,
                },
                {
                    name: 'W',
                    value: 4,
                    active: false,
                },
                {
                    name: 'T',
                    value: 5,
                    active: false,
                },
                {
                    name: 'F',
                    value: 6,
                    active: false,
                },
                {
                    name: 'S',
                    value: 7,
                    active: false,
                },
            ],
            dayTrigger: [false, false, false, false, false, false, false],
            time: {
                start: null,
                end: null,
            },
            coordinates: null,
            startLocation: {
                lat: 0,
                lng: 0,
            },
            finish: false,
        }
    },
    mounted() {
        this.getEventData()
    },
    methods: {
        getEventData() {
            eventAPI.getEventById(this.$route.params.id).then(async res => {
                this.event = await {
                    ...this.event,
                    ...res.getEventById,
                }

                this.dates_multiple = await this.event.subevent.map(item => {
                    return new Date(item.eventDate)
                })

                var start = false
                let outputArray = []
                var count = 0
                for (var j = 0; j < this.dates_multiple.length; j++) {
                    for (var k = 0; k < outputArray.length; k++) {
                        if (this.dates_multiple[j] == outputArray[k]) {
                            start = true
                        }
                    }
                    count++
                    if (count == 1 && start == false) {
                        outputArray.push(this.dates_multiple[j])
                    }
                    start = false
                    count = 0
                }
                this.event.maxSeat = await parseInt(
                    this.event.subevent[0].maxSeat
                )
                this.event.minSeat = await this.event.subevent[0].minSeat
                this.dates_multiple = outputArray
                navigator.geolocation.getCurrentPosition(position => {
                    this.startLocation.lat = position.coords.latitude
                    this.startLocation.lng = position.coords.longitude
                    this.event.lat = this.startLocation.lat
                    this.event.lng = this.startLocation.lng
                })
                this.getListAllergics()
                this.repeatOn = res.getEventById.repeatOn.map(item => {
                    return item.repeatOn
                })
                this.isRanged = this.repeatOn.length > 0 ? true : false
                this.time.start = this.event.subevent[0].startTime
                this.time.end = this.event.subevent[0].endTime
                this.showTime = `${moment(this.time.start, ['h:mm A']).format(
                    'ha'
                )} - ${moment(this.time.end, ['h:mm A']).format('ha')}`
                if (this.event.repeatOn.length > 0) {
                    this.isRepeatOn = true
                }
                this.ownPlace = this.event.ownPlace
                this.finish = await true
            })
        },
        updateCoordinates(location) {
            this.coordinates = {
                lat: location.latLng.lat(),
                lng: location.latLng.lng(),
            }
            this.event.lat = this.coordinates.lat
            this.event.lng = this.coordinates.lng
        },
        getListAllergics() {
            sampleAPI.getListAllergics().then(res => {
                this.allergics = res.getListAllergics
                this.restrictions = res.getListAllergics.map(item => {
                    return item['allergicName']
                })
            })
        },
        restrictionClicked(value) {
            this.event.allergic = value
        },
        ownPlaceClicked(value) {
            value == 'Yes' ? (this.ownPlace = true) : (this.ownPlace = false)
        },
        eventTypeClicked(value) {
            this.event.eventType = value
        },
        selectDay(index) {
            if (this.isRepeatOn) {
                var value = this.days[index].value
                this.days[index].active = !this.days[index].active
                if (this.repeatOn.indexOf(value) == -1) {
                    this.repeatOn.push(value)
                } else {
                    this.repeatOn.splice(this.repeatOn.indexOf(value), 1)
                }
            }
        },
        editEvent() {
            userAPI.getChefByUserId(this.user.id).then(res => {
                const chef = res.getChefByUserId
                var repeatOn = []
                repeatOn = this.repeatOn.map(item => {
                    return { repeatOn: item }
                })
                this.event.chef = {}
                this.event.chef.id = chef.id
                ;(this.event.startDate = moment(this.startedDate).format(
                    'DD-MM-YYYY'
                )),
                    (this.event.endDate = moment(this.endedDate).format(
                        'DD-MM-YYYY'
                    ))
                this.event.menu.forEach(item => {
                    delete item.__typename
                    item.subMenu.forEach(item => {
                        delete item.__typename
                    })
                })
                this.event.media.forEach(item => {
                    delete item.__typename
                })
                this.event.amenitiesPlace.forEach(item => {
                    delete item.__typename
                })
                delete this.event.__typename
                this.event.subevent.forEach(item => {
                    delete item.__typename
                })
                var subevent = []
                subevent = this.dates_multiple.map(items => {
                    return {
                        approveOrRejectDate: null,
                        cancelDate: null,
                        eventDate: moment(items).format('DD-MM-YYYY'),
                        status:
                            this.event.status === 'Pending_for_confirm'
                                ? 'Clarify_for_review'
                                : 'Requesting',
                        minSeat: parseInt(this.event.minSeat),
                        maxSeat: parseInt(this.event.maxSeat),
                        startTime: this.time.start,
                        endTime: this.time.end,
                    }
                })
                const event = {
                    inputEvent: {
                        id: this.$route.params.id,
                        requestingDate: moment(new Date()).format('DD-MM-YYYY'),
                        eventName: this.event.eventName,
                        eventType: this.event.eventType,
                        eventCategory: 'Go_Prac',
                        eventDetail: this.event.eventDetail,
                        status:
                            this.event.status === 'Pending_for_confirm'
                                ? 'Clarify_for_review'
                                : 'Requesting',
                        pricePerSeat: parseInt(this.event.pricePerSeat),
                        lat: this.event.lat,
                        lng: this.event.lng,
                        commission: this.event.fee,
                        homeNo: this.event.homeNo,
                        street: this.event.street,
                        subDistrict: this.event.subDistrict,
                        district: this.event.district,
                        city: this.event.city,
                        postalCode: this.event.postalCode,
                        startDate: moment(this.dates_multiple[0]).format(
                            'DD-MM-YYYY'
                        ),
                        endDate: moment(
                            this.dates_multiple[this.dates_multiple.length - 1]
                        ).format('DD-MM-YYYY'),
                        repeatOn: repeatOn,
                        rule: this.event.rule,
                        ownPlace: this.ownPlace,
                        allergic: this.event.allergic,
                        subevent: subevent,
                        media: this.event.media,
                        menu: this.event.menu,
                        amenitiesPlace: this.event.amenitiesPlace,
                        chef: {
                            id: this.event.chef.id,
                        },
                    },
                }
                event.inputEvent.menu.forEach(item => {
                    delete item.id
                    item.subMenu.forEach(item => {
                        delete item.id
                    })
                })
                event.inputEvent.amenitiesPlace.forEach(item => {
                    delete item.id
                })
                event.inputEvent.allergic.forEach(item => {
                    delete item.__typename
                })
                event.inputEvent.media.forEach(item => {
                    delete item.id
                })
                eventAPI.editEvent(event).then(res => {
                    this.$router.push('/event')
                })
            })
        },
        deleteMenuStarter(index) {
            this.event.menu[0].subMenu.splice(index, 1)
        },
        addStarter() {
            this.event.menu[0].subMenu.push({
                subMenuName: '',
                subMenuDescription: '',
            })
        },
        deleteMenuMain(index) {
            this.event.menu[1].subMenu.splice(index, 1)
        },
        addMain() {
            this.event.menu[1].subMenu.push({
                subMenuName: '',
                subMenuDescription: '',
            })
        },
        deleteMenuDessert(index) {
            this.event.menu[2].subMenu.splice(index, 1)
        },
        addDessert() {
            this.event.menu[2].subMenu.push({
                subMenuName: '',
                subMenuDescription: '',
            })
        },
        deleteMenuDrink(index) {
            this.event.menu[3].subMenu.splice(index, 1)
        },
        addDrink() {
            this.event.menu[3].subMenu.push({
                subMenuName: '',
                subMenuDescription: '',
            })
        },
        addAmentities() {
            this.event.amenitiesPlace.push({
                amenitiesPlaceName: '',
            })
        },
        deleteAmentities(index) {
            this.event.amenitiesPlace.splice(index, 1)
        },
        clicked(item) {
            if (item.first != null) {
                this.time.start = `${item.first + 1}:00:00`
                this.time.end = `${item.second + 1}:00:00`
                this.showTime = `${moment(this.time.start, ['h:mm A']).format(
                    'ha'
                )} - ${moment(this.time.end, ['h:mm A']).format('ha')}`
                this.event.startTime = this.time.start
                this.event.endTime = this.time.end
                this.timepick = item
            } else {
                this.timepick.active = false
            }
        },
        clickCheck() {
            this.timepick = [
                {
                    first: null,
                    second: null,
                    active: false,
                },
            ]
        },
        pickTime() {
            this.timepick.active = true
        },
        onFileSelected(event) {
            const datafile = event.target.files[0]
            let fileData = new FormData()
            fileData.append(`image`, datafile)
            // const datafile = event.target.files
            // let fileData = new FormData()
            // this.datafile.forEach((item, i)=>{
            //     fileData.append(image[${i}], item)
            // })
            axios
                .post(apiConfig.ENDPOINT_UPLOAD_DATA, fileData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + this.user.accessToken,
                    },
                })
                .then(response => {
                    this.event.media.push({ path: response.data })
                    this.uploadShow = false
                })
                .catch(error => {
                    console.error('err' + error)
                })
        },
        deleteUpload(index) {
            this.event.media.splice(index, 1)
            if (this.event.media.length == 0) {
                this.uploadShow = true
            }
        },
    },
    computed: {
        dateFormat: function() {
            this.startedDate
            this.endedDate
            if (
                this.dates_multiple[0] != undefined ||
                this.dates_multiple[0] != null
            ) {
                return this.dates_multiple.map(item => {
                    return moment(item).format('DD MMM YYYY')
                })
            } else {
                return new Date()
            }
        },
        attrs: function() {
            this.startedDate
            this.endedDate
            return [
                {
                    highlight: 'red',
                    order: 1,
                    dates:
                        this.dates_multiple.length > 0 && this.isRanged
                            ? {
                                  start: this.dates_multiple[0],
                                  end: this.dates_multiple[
                                      this.dates_multiple.length - 1
                                  ],
                                  weekdays: this.repeatOn,
                              }
                            : null,
                },
                {
                    highlight: {
                        color: 'red',
                        fillMode: 'light',
                    },
                    dates:
                        this.dates_multiple.length > 0 && this.isRanged
                            ? {
                                  start: this.dates_multiple[0],
                                  end: this.dates_multiple[
                                      this.dates_multiple.length - 1
                                  ],
                              }
                            : null,
                },
            ]
        },
        ...mapState({
            user: state => state.auth.auth,
        }),
        showAllergics: function() {
            var constant = []
            constant = this.event.allergic.map(item => {
                return item.allergicName
            })
            return constant
        },
    },
    watch: {
        startedDate: function(newDate, oldDate) {
            this.isRanged = true
            this.dates_multiple[0] = newDate
            if (!newDate) {
                this.isRanged = false
                this.dates_multiple.splice(
                    this.dates_multiple.indexOf(oldDate),
                    1
                )
            }
        },
        endedDate: function(newEndedDate, oldEndedDate) {
            this.isRanged = true
            if (!newEndedDate) {
                this.isRanged = false
                this.dates_multiple.splice(
                    this.dates_multiple.indexOf(oldEndedDate),
                    1
                )
            } else {
                this.dates_multiple[this.dates_multiple.length] = newEndedDate
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
p {
    font-size: 24px;
}
.datepicker {
    margin-top: 40px;
}
.page-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .map {
        width: 60%;
    }
    .header-wrappers {
        width: 80%;
        margin-top: 88px;
    }
    .page-header-spacer {
        display: flex;
        border-bottom: 1px solid $accent;
        justify-content: space-between;
        align-items: baseline;
        h3 {
            color: $accent;
            font-weight: 600;
        }
    }
    .sub-header {
        text-align: center;
        margin-top: 26px;
    }
    .spacer {
        border-bottom: 1px solid $accent;
        width: 80%;
        text-align: center;
        margin-top: 24px;
    }
    .form {
        width: 60%;
        margin-top: 12px;
        .input-group {
            margin-top: 28px;
            .dont-worry {
                margin-top: 18px;
            }
            .location-header {
                display: flex;
                .locate-title {
                    margin-left: 16px;
                    color: $accent;
                }
            }
            &.danger {
                margin-top: 78px;
            }
            &.photo {
                text-align: center;
                .seperate-div {
                    margin-top: 74px;
                }
                .seperate-div.button {
                    margin-top: 18px;
                }
            }
            &.repeat {
                display: flex;
                align-items: center;
                > p {
                    margin-right: 36px;
                    color: $black;
                    font-size: 20px;
                }
            }
            .checkbox-wrapper {
                display: flex;
                align-items: center;
                input {
                    margin: 0;
                }
            }
            .input-text {
                color: $accent;
            }
            .input {
                font-size: 20px;
                margin-top: 28px;
                font-size: 18px;
                color: $dark-grey;
            }
            .icon-wrapper {
                margin-top: 36px;
            }
            .date-picker-wrapper {
                display: flex;
                text-align: center;
                align-items: center;
                border-bottom: 1px solid $border;
                &:hover {
                    border-bottom: 1px solid $accent;
                    &.disable {
                        border-bottom: 1px solid $border;
                    }
                }
                .date-icon {
                    align-items: center;
                    padding: 0;
                }
                .date-picker {
                    align-items: center;
                    flex: 0 100%;
                    padding-left: 16px;
                    padding-bottom: 0;
                    border: 0;
                    &.disable {
                        color: #bdbdbd;
                    }
                }
            }
            .day-wrapper {
                display: flex;
                .day {
                    width: 48px;
                    height: 48px;
                    border-radius: 100%;
                    padding: 0;
                    background-color: #f1f3f4;
                    color: #898e92;
                    border: 0;
                    margin: 0 8px;
                }
                .selected {
                    background-color: $accent;
                    color: $white;
                }
            }
            .row-input {
                display: flex;
                align-items: center;
                justify-content: space-between;
                > .input {
                    flex: 0 45%;
                }
            }
        }
        .row {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .inrow {
                flex: 0 45%;
            }
        }
        .rows {
            display: flex;
            align-items: center;
            .ownership {
                flex: 0 40%;
                margin-left: 28px;
            }
            .material-icons {
                margin-top: 28px;
                margin-left: 26px;
            }
            .amentities {
                flex: 0 80%;
            }
        }
        .addmore {
            background-color: transparent;
            border: 0;
            color: $accent;
            padding: 0;
            font-weight: 600;
            margin-top: 14px;
        }
        .input {
            margin-top: 24px;
        }
        p {
            font-size: 20px;
        }
    }
    .confirm-button-wrapper {
        margin: 76px 0;
        button {
            flex: 0 25%;
            width: 170px;
            margin: 0 8px;
        }
        .save-draft {
            background-color: #bf808f;
            border-color: #bf808f;
        }
    }
    .event-img {
        display: none;
    }
    .time-picker {
        display: none;
        &.showTimePicker {
            display: block;
        }
    }
    .upload {
        border: 1px solid $accent;
        padding: 10px 30px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 600;
        color: $accent;
    }
    .photo {
        margin-top: 16px;
        margin-bottom: 69px;
    }
    .upload-img-wrapper {
        width: 180px;
        height: 148px;
        overflow: hidden;
        border-radius: 10px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .img-wrapper {
        display: flex;
    }
    .upload-list {
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 18px;
        .delete-upload {
            cursor: pointer;
        }
    }
}
</style>
