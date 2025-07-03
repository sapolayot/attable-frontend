<template>
    <div class="page-wrapper">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <div class="page-header">
            <h1>YOUR GREAT</h1>
            <h1>EVENT IS FEW STEPS AHEAD!</h1>
        </div>
        <div class="sub-header">
            <p>Please fill in below information.</p>
        </div>
        <div class="form">
            <div class="input-group">
                <p class="input-text">
                    Event Name
                </p>
                <input class="event-name input" v-model="event.eventName" />
                <span class="error-text" v-if="$v.event.eventName.$error"
                    >* Please enter Event Name.</span
                >
            </div>
            <div class="row event-type">
                <div class="input-group inrow">
                    <p class="input-text">
                        Event Type
                    </p>
                    <DropdownSingle
                        class="input type"
                        :text="event.eventType"
                        :items="listEvent"
                        @clicked="eventTypeClicked"
                        v-model="event.eventType"
                    />
                    <span class="error-text" v-if="$v.event.eventType.$error"
                        >* Please enter Event Type.</span
                    >
                </div>
                <div class="input-group inrow">
                    <p class="input-text">
                        Price per seat
                    </p>
                    <input
                        class="cost input"
                        v-model="event.pricePerSeat"
                        type="number"
                        min="20"
                    />
                    <span
                        class="error-text"
                        v-if="
                            $v.event.pricePerSeat.$error &&
                                $v.event.pricePerSeat.required
                        "
                        >* Please enter price per seat.</span
                    >
                    <span
                        class="error-text"
                        v-if="!this.$v.event.pricePerSeat.minValue"
                    >
                        *price per seat 20฿ minimum.
                    </span>
                    <span
                        class="error-text"
                        v-if="
                            $v.event.pricePerSeat.$error &&
                                !$v.event.pricePerSeat.required
                        "
                        >Error found! Please recheck.</span
                    >
                </div>
            </div>
            <div class="row">
                <div class="input-group inrow">
                    <p class="input-text">
                        Max no. of seat
                    </p>
                    <input
                        class="max-seat input"
                        type="number"
                        v-model="event.maxSeat"
                        :min="parseInt(event.minSeat) + 1"
                    />
                    <span
                        class="error-text"
                        v-if="
                            !$v.event.maxSeat.required &&
                                $v.event.maxSeat.$error
                        "
                        >* Please enter maxSeat.</span
                    >
                    <span class="error-text" v-if="!maxSeatCheck"
                        >Error found! Please recheck.</span
                    >
                    <span
                        class="error-text"
                        v-if="
                            !$v.event.maxSeat.maxValue &&
                                $v.event.maxSeat.$error
                        "
                        >* MaxSeat Maximum 12000 seat.</span
                    >
                </div>
                <div class="input-group inrow">
                    <p class="input-text">
                        Min no. of seat
                    </p>
                    <input
                        class="min-seat input"
                        type="number"
                        :min="0"
                        v-model="event.minSeat"
                    />
                    <span class="error-text" v-if="$v.event.minSeat.$error"
                        >* Please enter minSeat.</span
                    >
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
                    <span class="error-text" v-if="$v.showTime.$error"
                        >* Please enter Time.</span
                    >
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
                        <div class="error-wrap">
                            <v-date-picker
                                v-model="startedDate"
                                locale="en"
                                color="red"
                                :popover="{
                                    visibility: isRepeatOn ? 'click' : null,
                                }"
                                class="date-picker"
                                :min-date="configTime(new Date())"
                            >
                                <input
                                    class="date-picker input"
                                    :class="!isRepeatOn ? 'disable' : null"
                                    id="date"
                                    v-model="dateFormat[0]"
                                    readonly
                                />
                            </v-date-picker>
                            <!-- <span class="error-text" v-if="startedDate">* Please enter start date.</span> -->
                        </div>
                    </div>
                </div>
                <div class="input-group inrow">
                    <p class="input-text">
                        End Date
                    </p>
                    <div class="date-picker-wrapper">
                        <div class="icon-wrapper">
                            <i class="material-icons date-icon">event</i>
                        </div>
                        <div class="error-w">
                            <v-date-picker
                                v-model="endedDate"
                                locale="en"
                                color="red"
                                :popover="{
                                    visibility: isRepeatOn ? 'click' : null,
                                }"
                                class="date-picker"
                                :min-date="dates_multiple[0]"
                                :class="!isRepeatOn ? 'disable' : null"
                            >
                                <input
                                    class="date-picker input"
                                    :class="!isRepeatOn ? 'disable' : null"
                                    id="date"
                                    v-model="dateFormat[dateFormat.length - 1]"
                                    readonly
                                />
                            </v-date-picker>
                            <!-- <span class="error-text" v-if="endedDate">* Please enter end date.</span> -->
                        </div>
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
                            :disabled="!isRepeatOn"
                            :class="{ selected: day.active && isRepeatOn }"
                            @click.prevent="selectDay(index)"
                        >
                            {{ day.name }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="row datepicker">
                <div class="error-text">
                    <span
                        >For suitably held event, the events must be created at
                        least 21 days in advance.</span
                    >
                </div>
                <v-date-picker
                    v-model="dates_multiple"
                    locale="en"
                    mode="multiple"
                    :color="isRepeatOn && isRanged ? null : 'red'"
                    is-inline
                    is-expanded
                    :columns="$screens({ default: 1, xl: 2 })"
                    :attributes="isRepeatOn && isRanged ? attrs : null"
                    :min-date="configTime(new Date())"
                />
                <span class="error-text" v-if="$v.dates_multiple.$error"
                    >* Please enter event date.</span
                >
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
                <span class="error-text" v-if="$v.event.eventDetail.$error"
                    >* Please enter event detail.</span
                >
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
                        :id="`menu-${index}`"
                        placeholder="Name"
                        v-model="menu.subMenuName"
                    />
                    <input
                        class="menu-description input starter"
                        :id="`menu-description-${index}`"
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
                <div>
                    <span
                        class="error-text"
                        v-if="
                            event.menu[0]
                                ? $v.event.menu.$each.$iter[0].$error
                                : false
                        "
                        >* Please enter menu name.</span
                    >
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
                    <div class="error-wrapper">
                        <input
                            class="menu-name input main"
                            :id="`menu-name-${index}`"
                            placeholder="Name"
                            v-model="menu.subMenuName"
                        />
                    </div>
                    <div class="error-wrapper">
                        <input
                            class="menu-description input main"
                            :id="`menu-description-${index}`"
                            placeholder="Description"
                            v-model="menu.subMenuDescription"
                        />
                    </div>
                    <div class="icon-wrapper">
                        <i
                            v-if="event.menu[1].subMenu.length > 1"
                            class="material-icons delete-menu main"
                            @click.prevent="deleteMenuMain(index)"
                        >
                            close
                        </i>
                    </div>
                </div>
                <div>
                    <span
                        class="error-text"
                        v-if="$v.event.menu.$each.$iter[1].$error"
                        >* Please enter menu name.</span
                    >
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
                        :id="`menu-name123-${index}`"
                        placeholder="Name"
                        v-model="menu.subMenuName"
                    />
                    <input
                        class="menu-description input dessert"
                        :id="`menu-des-213123-${index}`"
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
                <div>
                    <span
                        class="error-text"
                        v-if="
                            event.menu[2]
                                ? $v.event.menu.$each.$iter[2].$error
                                : false
                        "
                        >* Please enter menu name.</span
                    >
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
                        :id="`menu-name-sadasd-${index}`"
                        placeholder="Name"
                        v-model="menu.subMenuName"
                    />
                    <input
                        class="menu-description input drink"
                        :id="`menu-des-sdadweadwa-${index}`"
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
                <div>
                    <span
                        class="error-text"
                        v-if="
                            event.menu[3]
                                ? $v.event.menu.$each.$iter[3].$error
                                : false
                        "
                        >* Please enter menu name.</span
                    >
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
                    v-if="showAllergics.length > 0"
                    :initial="showAllergics"
                    :items="restrictions"
                    @clicked="restrictionClicked"
                    class="food restriction"
                />
                <Dropdown
                    v-if="showAllergics.length < 1"
                    :initial="showAllergics"
                    :items="restrictions"
                    @clicked="restrictionClicked"
                    class="food restriction"
                />
                <div>
                    <span class="error-text" v-if="$v.event.allergic.$error"
                        >* Please enter food restriction.</span
                    >
                </div>
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
                        v-if="event.media.length < 1"
                    />
                </div>
                <div class="seperate-div upload-list">
                    <carousel
                        :perPageCustom="[
                            [0, 1],
                            [481, 1],
                            [1025, 3],
                        ]"
                        :paginationEnabled="true"
                    >
                        <slide
                            class="img-wrapper"
                            v-for="(photo, photo_index) in event.media"
                            :key="photo_index"
                        >
                            <div class="upload-img-wrapper">
                                <img
                                    :src="photo.path"
                                    class="upload_picture"
                                    :id="`upload-asdasda-${photo_index}`"
                                />
                            </div>
                            <i
                                class="material-icons delete-upload"
                                :id="`upload-icon-asdasda-${photo_index}`"
                                @click.prevent="deleteUpload(photo_index)"
                            >
                                close
                            </i>
                        </slide>
                    </carousel>
                </div>
                <div class="seperate-div button">
                    <p v-if="event.media.length == 0">
                        Please upload photos of your menus, venues, atmosphere,
                        etc. Events with higher quality and number of photos
                        have better chance of attracting booking
                    </p>
                    <input
                        type="file"
                        class="event-img"
                        id="upload-photo"
                        accept="image/*"
                        @change="onFileSelected"
                        multiple
                    />
                    <label class="upload" for="upload-photo">
                        Upload
                    </label>
                    <div class="error-margin">
                        <span class="error-text" v-if="$v.event.media.$error"
                            >* Please enter photos.</span
                        >
                    </div>
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
                    placeholder="e.g.
    No outside food is allowed.
    No pet is allowed.
    You can bring your alcohol.
    Please take off shoes when entering the house"
                />
                <span class="error-text" v-if="$v.event.rule.$error"
                    >* Please enter event rule.</span
                >
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
                        v-model="auto"
                        @change="clickCheck"
                    />
                    <p style="margin-left: 16px">
                        Auto-fill my address
                    </p>
                </div>
                <div class="row-input">
                    <div class="error-wrapper">
                        <input
                            class="houseNo input"
                            id="houseno"
                            placeholder="House/ Room no. bldg. name"
                            v-model="event.homeNo"
                            :disabled="auto"
                        />
                        <span class="error-text" v-if="$v.event.homeNo.$error"
                            >* Please enter home no.</span
                        >
                    </div>
                    <div class="error-wrapper">
                        <input
                            class="street input"
                            id="street"
                            placeholder="Street"
                            v-model="event.street"
                            :disabled="auto"
                        />
                        <span class="error-text" v-if="$v.event.street.$error"
                            >* Please enter street.</span
                        >
                    </div>
                </div>
                <div class="row-input">
                    <div class="error-wrapper">
                        <input
                            class="sub-district input"
                            id="sub-district"
                            placeholder="Sub District"
                            v-model="event.subDistrict"
                            :disabled="auto"
                        />
                        <span
                            class="error-text"
                            v-if="$v.event.subDistrict.$error"
                            >* Please enter sub district.</span
                        >
                    </div>
                    <div class="error-wrapper">
                        <input
                            class="district input"
                            id="district"
                            placeholder="District"
                            v-model="event.district"
                            :disabled="auto"
                        />
                        <span class="error-text" v-if="$v.event.district.$error"
                            >* Please enter district.</span
                        >
                    </div>
                </div>
                <div class="row-input">
                    <div class="error-wrapper">
                        <input
                            class="city input"
                            id="city"
                            placeholder="City"
                            v-model="event.city"
                            :disabled="auto"
                        />
                        <span class="error-text" v-if="$v.event.city.$error"
                            >* Please enter city.</span
                        >
                    </div>
                    <div class="error-wrapper">
                        <input
                            class="post input"
                            id="post"
                            placeholder="Postal Code"
                            v-model="event.postalCode"
                            :disabled="auto"
                        />
                        <span
                            class="error-text"
                            v-if="$v.event.postalCode.$error"
                            >* Please enter postal.</span
                        >
                    </div>
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
            <!-- <gmap-map
                ref="mymap"
                :center="myLocation"
                :zoom="20"
                style="width: 100%; height: 300px"
            >
                <gmap-marker
                    :position="myLocation"
                    :clickable="true"
                    :draggable="true"
                    @drag="updateCoordinates"
                />
            </gmap-map> -->
            <gmap-map
                ref="mymap"
                v-if="marker[0]"
                :center="myLocation"
                :position="myLocation"
                :zoom="18"
                map-type-id="terrain"
                style="width: 100%; height: 300px"
            >
                <gmap-marker
                    :position="google && marker[0]"
                    v-if="marker[0]"
                    :draggable="true"
                    :clickable="true"
                    :z-index="999999"
                    @dragend="updateCoordinates"
                />
            </gmap-map>
        </div>
        <div class="form">
            <div class="input-group owner rows">
                <p>Do you own this place?</p>
                <DropdownSingle
                    class="ownership"
                    @clicked="ownPlaceClicked"
                    :items="listOwnPlace"
                    :text="ownPlace ? 'Yes' : 'No'"
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
                        :class="index"
                        v-model="amentitie.amenitiesPlaceName"
                        placeholder="e.g. parking space, pet friendly, kid friendly"
                    />
                    <i
                        class="add-amen material-icons"
                        :class="index"
                        @click.prevent="addAmentities"
                    >
                        add_circle
                    </i>
                    <i
                        v-if="event.amenitiesPlace.length > 1"
                        class="delete-amen material-icons"
                        :class="index"
                        @click.prevent="deleteAmentities(index)"
                    >
                        close
                    </i>
                </div>
                <span class="error-text" v-if="$v.event.amenitiesPlace.$error"
                    >* Please enter amenities.</span
                >
            </div>
        </div>
        <div class="confirm-button-wrapper rows">
            <button
                class="save-draft"
                @click.prevent="draftEvent"
                v-if="!isEditMode"
            >
                Save draft
            </button>
            <button
                class="outline"
                @click.prevent="openModal"
                v-if="isEditMode"
            >
                Delete Event
            </button>
            <button @click.prevent="checkIsEditOrNot" class="submit-event">
                Submit Event
            </button>
        </div>
        <Confirm @clicked="deleteEvent" :title="title" :subtitle="subtitle" />
    </div>
</template>

<script>
import Dropdown from '~/components/Dropdown/Dropdown'
import DropdownSingle from '~/components/Dropdown/DropdownSingle'
import Confirm from '~/components/ConfirmModal/Confirm'
import Timepicker from '~/components/Timepicker/Timepicker'
import moment, { weekdays } from 'moment'
import { mapState } from 'vuex'
import eventAPI from '~/api/graphql/events'
import sampleAPI from '~/api/graphql/sample'
import Vue from 'vue'
import userAPI from '~/api/graphql/user'
import axios from 'axios'
import apiConfig from '~/config/endpoint'
import configAPI from '~/api/graphql/config'
import _ from 'lodash'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { gmapApi } from 'vue2-google-maps'
import CurrencyFormatter from '~/utils/currencyFormatter'

import {
    required,
    minLength,
    email,
    maxLength,
    numeric,
    minValue,
    maxValue,
} from 'vuelidate/lib/validators'
export default {
    components: {
        DropdownSingle,
        Dropdown,
        Timepicker,
        Confirm,
        Loading,
    },
    data() {
        return {
            isLoading: false,
            title: 'You are about to delete your event.',
            subtitle: `<h6 style="text-align: center;">Please click below button to confirm.</h6>`,
            startLocation: {
                lat: 0,
                lng: 0,
            },
            config: null,
            auto: false,
            ownPlace: null,
            isEditMode: false,
            listOwnPlace: ['Yes', 'No'],
            startedDate: null,
            endedDate: null,
            dates_multiple: [],
            marker: [],
            showTime: '',
            repeatUnder: [],
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
            listEvent: ['Breakfast', 'Brunch', 'Lunch', 'Dinner'],
            date: {
                start: new Date(),
                end: new Date(),
            },
            event: {
                eventName: null,
                eventType: null,
                eventDetail: null,
                pricePerSeat: 0,
                lat: 0,
                lng: 0,
                commission: 0,
                homeNo: null,
                street: null,
                subDistrict: null,
                district: null,
                city: null,
                postalCode: null,
                minSeat: 0,
                maxSeat: 0,
                startDate: new Date(),
                endDate: new Date(),
                selectedDates: {},
                startTime: null,
                endTime: null,
                repeatOn: {},
                rule: null,
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
                    value2: 0,
                    active: false,
                },
                {
                    name: 'M',
                    value: 2,
                    value2: 1,
                    active: false,
                },
                {
                    name: 'T',
                    value: 3,
                    value2: 2,
                    active: false,
                },
                {
                    name: 'W',
                    value: 4,
                    value2: 3,
                    active: false,
                },
                {
                    name: 'T',
                    value: 5,
                    value2: 4,
                    active: false,
                },
                {
                    name: 'F',
                    value: 6,
                    value2: 5,
                    active: false,
                },
                {
                    name: 'S',
                    value: 7,
                    value2: 6,
                    active: false,
                },
            ],
            dayTrigger: [false, false, false, false, false, false, false],
            time: {
                start: null,
                end: null,
            },
            coordinates: null,
            myLocation: {
                lat: 13.7251088,
                lng: 100.352908,
            },
        }
    },
    validations: {
        showTime: { required },
        event: {
            required,
            eventName: {
                required,
            },
            eventType: {
                required,
            },
            pricePerSeat: {
                required,
                numeric,
                minValue: minValue(20),
            },
            maxSeat: {
                required,
                numeric,
                minValue: minValue(1),
                maxValue: maxValue(12000),
            },
            minSeat: {
                required,
                numeric,
                minValue: minValue(1),
            },
            eventDetail: { required },
            menu: {
                $each: {
                    subMenu: {
                        $each: {
                            subMenuName: { required },
                        },
                    },
                },
            },
            media: {
                minLength: minLength(1),
                required,
            },
            rule: { required },
            homeNo: {
                required,
            },
            street: {
                required,
            },
            subDistrict: {
                required,
            },
            district: {
                required,
            },
            city: {
                required,
            },
            postalCode: {
                required,
                minLength: minLength(5),
                maxLength: maxLength(5),
            },
            amenitiesPlace: {
                required,
                $each: {
                    amenitiesPlaceName: {
                        required,
                    },
                },
            },
            allergic: {
                minLength: minLength(1),
                required,
            },
        },
        // time: {
        //     start: {
        //         required
        //     },
        //     end: {
        //         required
        //     }
        // },
        dates_multiple: {
            minLength: minLength(1),
            required,
        },
        // ownPlace: {
        //     required
        // }
    },
    mounted() {
        this.getListAllergics()
        navigator.geolocation.getCurrentPosition(position => {
            this.myLocation.lat = position.coords.latitude
            this.myLocation.lng = position.coords.longitude
            this.event.lat = position.coords.latitude
            this.event.lng = position.coords.longitude
            this.marker.push(this.myLocation)
        })
        this.coordinates = this.myLocation
        configAPI.getConfig().then(res => {
            this.config = res.getConfig
        })
        const { eventId } = this.$route.query
        if (eventId) {
            this.isLoading = true
            this.getEventData()
            this.isEditMode = true
        }
        if (!this.coordinates) {
            window.location.reload()
        }
    },
    methods: {
        checkIsEditOrNot() {
            if (this.isEditMode) {
                console.log('EDIT')
                this.editEvent()
            } else {
                this.createEvent()
            }
        },
        deep(item, path) {
            return _.get(item, path)
        },
        updateCoordinates(location) {
            this.coordinates = {
                lat: location.latLng.lat(),
                lng: location.latLng.lng(),
            }
            console.log('this updateCoordinates: ', this.coordinates)
            this.myLocation.lat = this.coordinates.lat
            this.myLocation.lng = this.coordinates.lng
            this.event.lat = this.myLocation.lat
            this.event.lng = this.myLocation.lng
            this.marker[0] = this.myLocation
            // console.log(
            //     'this is sparta :',
            //     this.event.lat + ' ' + this.event.lng
            // )
        },
        getListAllergics() {
            sampleAPI.getListAllergics().then(res => {
                this.allergics = res.getListAllergics
                this.restrictions = res.getListAllergics.map(item => {
                    return item['allergicName']
                })
            })
        },
        // checkValidate() {
        //     console.log(this.dates_multiple)
        //     console.log(this.$v)
        // },
        restrictionClicked(value) {
            const allergics = this.allergics.filter(item => {
                return value ? value.indexOf(item.allergicName) !== -1 : []
            })
            this.event.allergic = allergics
        },
        ownPlaceClicked(value) {
            value == 'Yes' ? (this.ownPlace = true) : (this.ownPlace = false)
        },
        eventTypeClicked(value) {
            this.event.eventType = value
        },
        selectDay(index) {
            if (this.isRepeatOn && this.isRanged) {
                var value = this.days[index].value
                var value2 = this.days[index].value2
                this.days[index].active = !this.days[index].active
                if (this.repeatOn.indexOf(value) == -1) {
                    this.repeatOn.push(value)
                    this.repeatUnder.push(value2)
                    const startDateForLoop = new Date(this.dates_multiple[0])
                    const endDate = new Date(
                        this.dates_multiple[this.dates_multiple.length - 1]
                    )
                    const repeatDate = this.repeatUnder
                    var temp = []
                    while (startDateForLoop < endDate) {
                        startDateForLoop.setDate(startDateForLoop.getDate() + 1)
                        if (repeatDate.includes(startDateForLoop.getDay())) {
                            this.dates_multiple.push(
                                moment(startDateForLoop.toString()).toDate()
                            )
                        }
                    }
                    this.dates_multiple = this.dates_multiple.sort(function(
                        a,
                        b
                    ) {
                        return new Date(a) - new Date(b)
                    })
                    this.dates_multiple = _.uniqBy(
                        this.dates_multiple,
                        function(e) {
                            return e.getTime()
                        }
                    )
                } else {
                    const startDateForLoop = new Date(this.dates_multiple[0])
                    const endDate = new Date(
                        this.dates_multiple[this.dates_multiple.length - 1]
                    )
                    const repeatDate = this.repeatUnder
                    this.repeatOn.splice(this.repeatOn.indexOf(value), 1)
                    this.repeatUnder.splice(this.repeatUnder.indexOf(value2), 1)
                    while (startDateForLoop <= endDate) {
                        startDateForLoop.setDate(startDateForLoop.getDate() + 1)
                        if (value2 == startDateForLoop.getDay()) {
                            const deleteDate = moment(
                                startDateForLoop.toString()
                            ).toDate()
                            this.dates_multiple.forEach((each, index) => {
                                if (
                                    each.getTime() === deleteDate.getTime() &&
                                    index != this.dates_multiple.length - 1
                                ) {
                                    this.dates_multiple.splice(index, 1)
                                }
                            })
                        }
                    }
                }
            }
        },
        async draftEvent() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                return false
            }
            if (this.event.media.length == 0) {
                alert('Please Upload image')
                return false
            }
            userAPI
                .getChefByUserId(this.user.id)
                .then(res => {
                    const chef = res.getChefByUserId
                    this.event.chef = {}
                    this.event.chef.id = chef.id
                    this.event.allergic.forEach(item => {
                        delete item.__typename
                    })
                })
                .then(() => {
                    var selectedDates = []
                    selectedDates = this.dates_multiple.map(item => {
                        return {
                            selectedDates: moment(item).format('DD-MM-YYYY'),
                        }
                    })
                    var repeatOn = []
                    repeatOn = this.repeatOn.map(item => {
                        return { repeatOn: item }
                    })
                    var subevent = []
                    subevent = this.dates_multiple.map(items => {
                        return {
                            approveOrRejectDate: null,
                            cancelDate: null,
                            eventDate: moment(items).format('DD-MM-YYYY'),
                            status: 'Draft',
                            minSeat: parseInt(this.event.minSeat),
                            maxSeat: parseInt(this.event.maxSeat),
                            startTime: this.timepick.first,
                            endTime: this.timepick.second,
                            currentSeat: parseInt(this.event.maxSeat),
                        }
                    })
                    const event = {
                        inputEvent: {
                            requestingDate: moment(new Date()).format(
                                'DD-MM-YYYY'
                            ),
                            eventName: this.event.eventName,
                            eventType: this.event.eventType,
                            eventDetail: this.event.eventDetail,
                            pricePerSeat: parseInt(this.event.pricePerSeat),
                            lat: this.myLocation.lat,
                            lng: this.myLocation.lng,
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
                                this.dates_multiple[
                                    this.dates_multiple.length - 1
                                ]
                            ).format('DD-MM-YYYY'),
                            repeatOn: repeatOn,
                            rule: this.event.rule,
                            ownPlace: this.ownPlace,
                            allergic: this.event.allergic,
                            subevent: subevent,
                            media: this.event.media,
                            menu: this.event.menu,
                            amenitiesPlace: this.event.amenitiesPlace,
                            status: 'Draft',
                            chef: {
                                id: this.event.chef.id,
                            },
                        },
                    }
                    eventAPI.createEvent(event).then(res => {
                        if (res.createEvent.success) {
                            this.$store.commit('draft/setDraft', 3)
                            this.$router.push('/event')
                        } else {
                            alert('Date is incorrect')
                        }
                    })
                })
        },
        async createEvent() {
            // console.log(this.dates_multiple)
            this.$v.$touch()
            if (this.$v.$invalid) {
                // console.log('this $v', this.$v)
                alert('Please check that the information is correct.')
                return false
            }
            if (this.event.media.length == 0) {
                alert('Please Upload image')
                return false
            }
            this.isLoading = true
            userAPI
                .getChefByUserId(this.user.id)
                .then(res => {
                    const chef = res.getChefByUserId
                    this.event.chef = {}
                    this.event.chef.id = chef.id
                    this.event.allergic.forEach(item => {
                        delete item.__typename
                    })
                })
                .then(() => {
                    var selectedDates = []
                    selectedDates = this.dates_multiple.map(item => {
                        return {
                            selectedDates: moment(item).format('DD-MM-YYYY'),
                        }
                    })
                    var repeatOn = []
                    repeatOn = this.repeatOn.map(item => {
                        return { repeatOn: item }
                    })
                    var subevent = []
                    subevent = this.dates_multiple.map(items => {
                        return {
                            approveOrRejectDate: null,
                            cancelDate: null,
                            eventDate: moment(items).format('DD-MM-YYYY'),
                            status: 'Requesting',
                            minSeat: parseInt(this.event.minSeat),
                            maxSeat: parseInt(this.event.maxSeat),
                            startTime: this.timepick.first,
                            endTime: this.timepick.second,
                            currentSeat: parseInt(this.event.maxSeat),
                        }
                    })
                    const event = {
                        inputEvent: {
                            requestingDate: moment(new Date()).format(
                                'DD-MM-YYYY'
                            ),
                            eventName: this.event.eventName,
                            eventType: this.event.eventType,
                            eventDetail: this.event.eventDetail,
                            pricePerSeat: parseInt(this.event.pricePerSeat),
                            lat: this.myLocation.lat,
                            lng: this.myLocation.lng,
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
                                this.dates_multiple[
                                    this.dates_multiple.length - 1
                                ]
                            ).format('DD-MM-YYYY'),
                            repeatOn: repeatOn,
                            rule: this.event.rule,
                            ownPlace: this.ownPlace,
                            allergic: this.event.allergic,
                            subevent: subevent,
                            media: this.event.media,
                            menu: this.event.menu,
                            amenitiesPlace: this.event.amenitiesPlace,
                            status: 'Requesting',
                            chef: {
                                id: this.event.chef.id,
                            },
                        },
                    }
                    eventAPI.createEvent(event).then(res => {
                        // console.log("Success : ", res)
                        if (res.createEvent.success) {
                            this.$router.push('/event')
                        } else {
                            alert('Date is incorrect')
                        }
                        this.isLoading = false
                    })
                })
        },
        editEvent() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                // console.log('this $v', this.$v)
                return false
            }
            this.isLoading = true
            userAPI.getChefByUserId(this.user.id).then(res => {
                const chef = res.getChefByUserId
                var repeatOn = []
                repeatOn = this.repeatOn.map(items => {
                    return {
                        repeatOn: items,
                        id: this.event.repeatOn.filter(item => {
                            return item.repeatOn == items
                        })[0]
                            ? this.event.repeatOn.filter(item => {
                                  return item.repeatOn == items
                              })[0].id
                            : null,
                    }
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
                this.event.amenitiesPlace.forEach(item => {
                    delete item.__typename
                })
                this.event.media.forEach(item => {
                    delete item.__typename
                })
                delete this.event.__typename
                this.event.subevent.forEach(item => {
                    delete item.__typename
                })
                var subevent = []
                subevent = this.event.subevent
                //console.log("Sub Event :", subevent)
                const status =
                    this.event.status == 'Reject'
                        ? 'Clarify_for_review'
                        : 'Requesting'
                subevent = this.dates_multiple.map(items => {
                    return {
                        approveOrRejectDate: null,
                        cancelDate: null,
                        eventDate: moment(items).format('DD-MM-YYYY'),
                        status: status,
                        minSeat: parseInt(this.event.minSeat),
                        maxSeat: parseInt(this.event.maxSeat),
                        currentSeat: parseInt(this.event.maxSeat),
                        startTime: this.time.start,
                        endTime: this.time.end,
                        id: this.event.subevent.filter(item => {
                            return (
                                moment(
                                    moment(
                                        item.eventDate,
                                        'YYYY-MM-DD'
                                    ).toDate()
                                ).format('YYYYMMDD') ==
                                moment(moment(items).toDate()).format(
                                    'YYYYMMDD'
                                )
                            )
                        })[0]
                            ? this.event.subevent.filter(item => {
                                  return (
                                      moment(
                                          moment(
                                              item.eventDate,
                                              'YYYY-MM-DD'
                                          ).toDate()
                                      ).format('YYYYMMDD') ==
                                      moment(moment(items).toDate()).format(
                                          'YYYYMMDD'
                                      )
                                  )
                              })[0].id
                            : null,
                    }
                })
                const event = {
                    inputEvent: {
                        id: this.$route.query.eventId,
                        status: status,
                        requestingDate: moment(new Date()).format('DD-MM-YYYY'),
                        eventName: this.event.eventName,
                        eventType: this.event.eventType,
                        eventDetail: this.event.eventDetail,
                        pricePerSeat: parseInt(this.event.pricePerSeat),
                        lat: this.myLocation.lat,
                        lng: this.myLocation.lng,
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
                console.log('Input Event', event)
                event.inputEvent.allergic.forEach(item => {
                    delete item.__typename
                })
                //console.log('before : ', event)
                eventAPI.editEvent(event).then(res => {
                    if (res.editEvent.success) {
                        this.$store.commit('draft/setDraft', 0)
                        this.$router.push('/event')
                        console.log('res', res.editEvent)
                    } else {
                        alert('Date is incorrect')
                    }
                    this.isLoading = false
                })
            })
        },
        getEventData() {
            const { eventId } = this.$route.query
            eventAPI.getEventById(eventId).then(async res => {
                this.event = await {
                    ...this.event,
                    ...res.getEventById,
                }
                console.log(this.event)
                // console.log("LOGEVENT", res.getEventById)
                let temp = []
                await this.event.subevent.map(item => {
                    if (temp.indexOf(item.eventDate) == -1) {
                        temp.push(item.eventDate)
                        this.dates_multiple.push(
                            moment(
                                moment(item.eventDate).format('YYYY-MM-DD')
                            ).toDate()
                        )
                    }
                })
                this.event.repeatOn.map(item => {
                    this.days[item.repeatOn - 1].active = !this.days[
                        item.repeatOn - 1
                    ].active
                })
                this.event.maxSeat = await parseInt(
                    this.event.subevent[0].maxSeat
                )
                this.event.minSeat = await this.event.subevent[0].minSeat
                // console.log("RESPONSE", this.dates_multiple)
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
                    'h:mma'
                )} - ${moment(this.time.end, ['h:mm A']).format('h:mma')}`
                if (this.event.repeatOn.length > 0) {
                    this.isRepeatOn = true
                }
                this.startedDate = this.dates_multiple[0]
                this.endedDate = this.dates_multiple[
                    this.dates_multiple.length - 1
                ]
                this.ownPlace = this.event.ownPlace
                this.finish = await true
                this.event.amenitiesPlace = res.getEventById.amenitiesPlace[0]
                    ? res.getEventById.amenitiesPlace
                    : [
                          {
                              amenitiesPlaceName: null,
                          },
                      ]
                this.isLoading = false
            })
        },
        openModal() {
            this.$modal.show('confirm')
        },
        deleteEvent() {
            eventAPI.cancelEvent(this.$route.query.eventId).then(res => {
                this.$modal.hide('confirm')
            })
            this.$router.push('/event')
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
                this.time.start = `${item.first}:00:00`
                this.time.end = `${item.second}:00:00`
                this.showTime = `${moment(this.time.start, ['h.mm'])
                    .locale('en')
                    .format('h:mma')} - ${moment(this.time.end, ['h.mm'])
                    .locale('en')
                    .format('h:mma')}`
                this.event.startTime = this.time.start
                this.event.endTime = this.time.end
                this.timepick = item
            } else {
                this.timepick.active = false
            }
        },
        configTime(date) {
            const addedDate = moment(date).add(this.totalTime, 'days')
            return addedDate.toDate()
        },
        clickCheck() {
            if (this.auto) {
                userAPI.getChefByUserId(this.user.id).then(res => {
                    const chef = res.getChefByUserId
                    this.event.homeNo = chef.homeNo
                    this.event.street = chef.street
                    this.event.district = chef.district
                    this.event.subDistrict = chef.subDistrict
                    this.event.city = chef.user.city
                    this.event.postalCode = chef.postalCode
                })
            } else {
                this.event.homeNo = ''
                this.event.street = ''
                this.event.district = ''
                this.event.subDistrict = ''
                this.event.city = ''
                this.event.postalCode = ''
            }
        },
        pickTime() {
            this.timepick.active = true
        },
        onFileSelected(event) {
            const datafile = event.target.files
            let fileData = new FormData()
            for (let i = 0; i < datafile.length; i++) {
                fileData.append(`files`, datafile[i])
            }
            axios
                .post(apiConfig.ENDPOINT_MUTIPLE_UPLOAD_DATA, fileData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + this.user.accessToken,
                    },
                })
                .then(response => {
                    response.data.forEach(each => {
                        this.event.media.push({ path: each })
                    })
                    this.uploadShow = false
                })
                .catch(error => {
                    console.error('err' + error)
                })
        },
        deleteUpload(index) {
            this.event.media.splice(index, 1)
            // console.log(index)
            if (this.event.media.length == 0) {
                this.uploadShow = true
            }
        },
    },
    computed: {
        totalTime() {
            return (
                this.deep(this.config, 'eventReview') +
                this.deep(this.config, 'eventRelease') +
                this.deep(this.config, 'eventPrepare')
            )
        },
        maxSeatCheck() {
            return parseInt(this.event.maxSeat) >= parseInt(this.event.minSeat) //ถ้าน้อย
        },
        showAllergics() {
            var constAllegic = []
            constAllegic = this.event.allergic
                ? this.event.allergic.map(item => {
                      return item['allergicName']
                  })
                : []
            return constAllegic
        },
        dateFormat() {
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
        attrs() {
            // console.log('IN Toggle')
            this.startedDate
            this.endedDate
            this.isRepeatOn
            return [
                {
                    highlight: {
                        color: 'red',
                    },
                    order: 2,
                    dates: this.dates_multiple,
                },
                {
                    highlight: 'red',
                    order: 1,
                    dates:
                        this.dates_multiple.length > 0 && this.isRepeatOn
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
                        this.dates_multiple.length > 0 && this.isRepeatOn
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
        google: gmapApi,
        ...mapState({
            user: state => state.auth.auth,
            saveDraft: state => state.draft.draft,
        }),
    },
    watch: {
        startedDate(newDate, oldDate) {
            this.isRanged = false
            if (newDate != null && newDate != undefined) {
                this.isRanged = true
                this.dates_multiple[0] = newDate
            } else {
                this.dates_multiple.splice(0, 1)
            }
        },
        endedDate(newDate, oldDate) {
            this.isRanged = false
            if (newDate != this.dates_multiple[0]) {
                if (newDate != null && newDate != undefined) {
                    this.isRanged = true
                    if (this.dates_multiple.length > 1) {
                        this.dates_multiple[
                            this.dates_multiple.length - 1
                        ] = newDate
                    } else {
                        this.dates_multiple.push(newDate)
                    }
                } else {
                    this.dates_multiple.splice(
                        this.dates_multiple.length - 1,
                        1
                    )
                }
            }
        },
        dates_multiple() {
            if (this.dates_multiple[0]) {
                this.isRanged = true
                this.startedDate = this.dates_multiple[0]
                this.endedDate = this.dates_multiple[
                    this.dates_multiple.length - 1
                ]
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
.seperate-div {
    button {
        p {
            padding: 40px 0;
        }
    }
}
p {
    font-size: 24px;
}
.datepicker {
    margin-top: 40px;
}
.VueCarousel {
    width: 100%;
}
.page-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @include respond-to($phone) {
        padding: 0 18px;
    }
    .map {
        margin: 20px 0;
        width: 60%;
        @include respond-to($phone) {
            width: 90%;
        }
    }
    .page-header {
        text-align: center;
        @include respond-to($phone) {
            margin-top: 20px;
            h1 {
                font-size: 1.5em;
            }
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
        @include respond-to($phone) {
            font-size: 1.15em;
        }
    }
    .form {
        width: 60%;
        margin-top: 12px;
        @include respond-to($phone) {
            width: 100%;
        }
        .input-group {
            margin-top: 28px;
            .dont-worry {
                margin-top: 18px;
            }
            .location-header {
                display: flex;
                @include respond-to($phone) {
                    margin-bottom: 10px;
                }
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
                margin: 20px 0;
                .seperate-div {
                    margin-top: 40px;
                }
                .seperate-div.button {
                    margin-top: 40px;
                    p {
                        margin: 20px 0;
                    }
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
                @include respond-to($phone) {
                    font-size: 12px;
                }
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
                    cursor: pointer;
                    border: 0;
                    &.disable {
                        color: #bdbdbd;
                        cursor: not-allowed;
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
                    @include respond-to($phone) {
                        width: 40px;
                        height: 40px;
                        margin: 0 4px;
                    }
                    &.disable {
                        cursor: not-allowed;
                    }
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
                @include respond-to($phone) {
                    flex-wrap: wrap;
                }
                > .input {
                    flex: 0 45%;
                    @include respond-to($phone) {
                        flex: 0 90%;
                    }
                }
            }
        }
        .row {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            @include respond-to($phone) {
                &.event-type {
                    flex-direction: column;
                }
            }
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
            @include respond-to($phone) {
                width: 150px;
                text-align: left;
            }
        }
        .input {
            margin-top: 24px;
        }
        p {
            font-size: 20px;
            @include respond-to($phone) {
                font-size: 14px;
            }
        }
    }
    .confirm-button-wrapper {
        margin: 76px 0;
        @include respond-to($phone) {
            margin: 40px 0;
            display: flex;
            justify-content: center;
        }
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
        width: 240px;
        height: 148px;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 3px 3px 4px 0px rgba(51, 51, 51, 0.4);
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .img-wrapper {
        display: flex;
        justify-content: center;
        margin: 4px 0;
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
.error-wrapper {
    flex: 0 45%;
    margin-left: 5px;
    margin-right: 5px;
    @include respond-to($phone) {
        flex: 0 90%;
    }
}
.error-margin {
    margin-top: 12px;
}
</style>
