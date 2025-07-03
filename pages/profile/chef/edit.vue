<template>
    <div class="page-wrapper">
        <h1>
            MY PROFILE
        </h1>
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <section>
            <div class="left-div">
                <div class="upload-section">
                    <div
                        :class="
                            `img-wrapper ${
                                !user.profileImage ? 'require' : null
                            }`
                        "
                    >
                        <img
                            class="profile-img"
                            :src="
                                imgUrl
                                    ? imgUrl
                                    : user.profileImage
                                    ? user.profileImage
                                    : require('~/assets/images/profile.svg')
                            "
                        />
                    </div>
                    <h3
                        class="upload-text"
                        v-if="this.maxWidth > 480"
                        @click.prevent="toggleModal('upload')"
                    >
                        Change your Profile Photo
                    </h3>
                    <h3
                        class="upload-text"
                        v-if="this.maxWidth <= 480"
                        @click.prevent="toggleModal('upload-mobile')"
                    >
                        Change your Profile Photo
                    </h3>
                </div>
                <div class="form left">
                    <div class="row left">
                        <div
                            :class="
                                `paragraph ${
                                    !user.firstName ? 'require' : null
                                }`
                            "
                        >
                            <h3>First Name*</h3>
                            <input
                                type="text"
                                v-model="user.firstName"
                                v-if="chef.status !== 'Approved'"
                            />
                            <p
                                class="sub-text"
                                v-if="chef.status === 'Approved'"
                            >
                                {{ user.firstName }}
                            </p>
                            <!-- <p
                                class="error-text"
                                v-if="!user.firstName"
                            >
                                Please fill the required field
                            </p> -->
                        </div>
                        <div
                            :class="
                                `paragraph ${!user.lastName ? 'require' : null}`
                            "
                        >
                            <h3>Last Name*</h3>
                            <input
                                type="text"
                                v-model="user.lastName"
                                v-if="chef.status !== 'Approved'"
                            />
                            <p
                                class="sub-text"
                                v-if="chef.status === 'Approved'"
                            >
                                {{ user.lastName }}
                            </p>
                            <p class="error-text" v-if="!user.lastName">
                                Please fill the required field
                            </p>
                        </div>
                    </div>
                    <div class="paragraph">
                        <h3>Occupation</h3>
                        <input type="text" v-model="chef.occupation" />
                    </div>
                    <div class="row left">
                        <div
                            :class="
                                `paragraph ${!user.birthday ? 'require' : null}`
                            "
                        >
                            <h3>Birthday*</h3>
                            <div
                                class="calendar"
                                v-if="chef.status !== 'Approved'"
                            >
                                <v-date-picker
                                    v-model="user.birthday"
                                    locale="en"
                                    color="red"
                                    :popover="{ visibility: 'click' }"
                                    class="date-picker-wrapper"
                                >
                                    <input
                                        id="date"
                                        v-model="dateFormated"
                                        readonly
                                    />
                                </v-date-picker>
                            </div>
                            <p
                                class="sub-text"
                                v-if="chef.status === 'Approved'"
                            >
                                {{ dateFormated }}
                            </p>
                        </div>
                        <div
                            :class="
                                `paragraph ${!user.gender ? 'require' : null}`
                            "
                        >
                            <h3>Gender*</h3>
                            <DropdownSingle
                                :text="user.gender"
                                :items="genders"
                                @clicked="genderClicked"
                                v-if="chef.status !== 'Approved'"
                            />
                            <p
                                class="sub-text"
                                v-if="chef.status === 'Approved'"
                            >
                                {{ user.gender }}
                            </p>
                        </div>
                    </div>
                    <div
                        :class="
                            `paragraph ${!user.nationality ? 'require' : null}`
                        "
                    >
                        <h3>Nationality*</h3>
                        <DropdownSingle
                            :text="user.nationality"
                            :items="nationalities"
                            @clicked="nationalityClick"
                            overflow="5"
                            v-if="chef.status !== 'Approved'"
                        />
                        <p class="sub-text" v-if="chef.status === 'Approved'">
                            {{ user.nationality }}
                        </p>
                    </div>
                    <div class="paragraph">
                        <h3>Language</h3>
                        <Dropdown
                            v-if="mockLanguage.length >= 1"
                            :initial="mockLanguage"
                            :items="languages"
                            @clicked="languageClick"
                            class="language"
                            holder="Language"
                            className="full"
                        />
                        <Dropdown
                            v-if="mockLanguage.length == 0"
                            :items="languages"
                            :initial="mockLanguage"
                            @clicked="languageClick"
                            class="language"
                            holder="Language"
                            className="full"
                        />
                    </div>
                </div>
            </div>
            <div class="right-div">
                <div class="row">
                    <div :class="`paragraph ${!user.email ? 'require' : null}`">
                        <h3>Email*</h3>
                        <p class="sub-text">
                            {{ user.email }}
                        </p>
                    </div>
                    <div
                        :class="
                            `paragraph
                        ${
                            !$v.user.phoneNumber.minLength ||
                            !$v.user.phoneNumber.maxLength ||
                            !$v.user.phoneNumber.numeric ||
                            !user.phoneNumber
                                ? 'require'
                                : null
                        }
                        `
                        "
                    >
                        <h3>Mobile Phone*</h3>
                        <input type="text" v-model="user.phoneNumber" />
                        <p class="error-text" v-if="!user.phoneNumber">
                            Please fill the required field
                        </p>
                        <p
                            v-if="
                                $v.user.phoneNumber.$invalid && user.phoneNumber
                            "
                            class="error-text"
                        >
                            Error found! Please recheck
                        </p>
                    </div>
                </div>
                <div class="paragraph">
                    <h3>Address*</h3>
                </div>
                <div class="row">
                    <div
                        :class="
                            `paragraph noMargin ${
                                !user.country ? 'require' : null
                            }`
                        "
                    >
                        <DropdownSingle
                            placeholder="Country"
                            :text="mockCountries"
                            :items="countries"
                            @clicked="countryClick"
                            overflow="5"
                        />
                        <p class="error-text" v-if="!mockCountries">
                            Please fill the required field
                        </p>
                    </div>
                    <div class="paragraph noMargin">
                        <DropdownSingle
                            placeholder="City"
                            :text="user.city"
                            :items="provinces"
                            @clicked="provinceClick"
                            overflow="5"
                        />
                        <p class="error-text" v-if="!user.city">
                            Please fill the required field
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div
                        :class="`paragraph ${!chef.homeNo ? 'require' : null}`"
                    >
                        <input
                            type="text"
                            v-model="chef.homeNo"
                            placeholder="House/ Room no. bldg. name"
                        />
                        <p class="error-text" v-if="!chef.homeNo">
                            Please fill the required field
                        </p>
                    </div>
                    <div
                        :class="`paragraph ${!chef.street ? 'require' : null}`"
                    >
                        <input
                            type="text"
                            v-model="chef.street"
                            placeholder="Street"
                        />
                        <p class="error-text" v-if="!chef.street">
                            Please fill the required field
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div
                        :class="
                            `paragraph ${!chef.district ? 'require' : null}`
                        "
                    >
                        <!-- <DropdownSingle
                            placeholder="District"
                            :text="chef.district"
                            :items="districts"
                            @clicked="districtClick"
                            overflow="5"
                        /> -->
                        <input placeholder="District" v-model="chef.district" />
                        <p class="error-text" v-if="!chef.district">
                            Please fill the required field
                        </p>
                    </div>
                    <div
                        :class="
                            `paragraph ${!chef.subDistrict ? 'require' : null}`
                        "
                    >
                        <input
                            v-model="chef.subDistrict"
                            placeholder="Sub District"
                        />
                        <p class="error-text" v-if="!chef.subDistrict">
                            Please fill the required field
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div
                        :class="
                            `paragraph
                        ${
                            !chef.postalCode ||
                            !$v.chef.postalCode.minLength ||
                            !$v.chef.postalCode.maxLength ||
                            !$v.chef.postalCode.numeric
                                ? 'require'
                                : null
                        }`
                        "
                    >
                        <input
                            type="text"
                            v-model="chef.postalCode"
                            placeholder="Postal code"
                        />
                        <p class="error-text" v-if="!chef.postalCode">
                            Please fill the required field
                        </p>
                        <p
                            class="error-text"
                            v-if="
                                !$v.chef.postalCode.minLength ||
                                    !$v.chef.postalCode.maxLength ||
                                    !$v.chef.postalCode.numeric
                            "
                        >
                            Error found! Please recheck
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="paragraph">
                        <h3>Favorite cuisine</h3>
                        <input type="text" v-model="chef.favoriteCuisine" />
                    </div>
                    <div class="paragraph">
                        <h3>Your signature dish</h3>
                        <input type="text" v-model="chef.signatureDish" />
                    </div>
                </div>
                <div class="row">
                    <div
                        :class="
                            `paragraph ${
                                user.allergic.length === 0 ? 'require' : null
                            }`
                        "
                    >
                        <h3>Food Restriction*</h3>
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
                        <p class="error-text" v-if="showAllergics.length < 1">
                            Please fill the required field
                        </p>
                    </div>
                </div>
                <div class="paragraph about-me">
                    <h3>Tell more about yourself</h3>
                    <textarea
                        rows="5"
                        cols="60"
                        maxlength="250"
                        name="description"
                        v-model="user.aboutMe"
                    />
                </div>
                <div class="paragraph upload" v-if="chef.status !== 'Approved'">
                    <div class="idPasspoer">
                        ID Card No. or Passport No.*<label
                            >(Same as ID card holder)</label
                        >
                    </div>
                    <div
                        :class="
                            `passport-input
                        ${
                            !chef.passportId ||
                            !$v.chef.passportId.minLength ||
                            !$v.chef.passportId.maxLength
                                ? 'require'
                                : null
                        }`
                        "
                    >
                        <input type="text" v-model="chef.passportId" />
                        <p class="error-text" v-if="!chef.passportId">
                            Please fill the required field
                        </p>
                        <p
                            class="error-text"
                            v-if="
                                !$v.chef.passportId.minLength ||
                                    !$v.chef.passportId.maxLength
                            "
                        >
                            Error found! Please recheck
                        </p>
                    </div>
                </div>
                <div class="paragraph upload" v-if="chef.status !== 'Approved'">
                    <div class="idPasspoer">
                        <label
                            >Please upload image of your ID card /
                            passport*</label
                        >(can upload only once)
                    </div>
                    <input
                        placeholder="Browse"
                        :value="passportFileName ? passportFileName : ''"
                        readonly
                    />
                    <label for="file-upload2" class="custom-file-upload">
                        Upload
                    </label>
                    <input
                        id="file-upload2"
                        type="file"
                        accept="image/*"
                        @change="onFilePassportSelected"
                    />
                    <p class="error-text" v-if="!passportFileName">
                        Please fill the required field
                    </p>
                </div>
                <div class="bank-account" v-if="chef.status !== 'Approved'">
                    <h3 class="spacer">
                        Bank Account Detail
                    </h3>
                    <div class="row">
                        <div
                            :class="
                                `paragraph ${
                                    !acc.accountName ? 'require' : null
                                }`
                            "
                        >
                            <h3>Account Name*</h3>
                            <input type="text" v-model="acc.accountName" />
                            <p class="error-text" v-if="!acc.accountName">
                                Please fill the required field
                            </p>
                        </div>
                        <div
                            :class="
                                `paragraph ${
                                    !acc.accountNumber ? 'require' : null
                                }`
                            "
                        >
                            <h3>Account Number*</h3>
                            <input type="text" v-model="acc.accountNumber" />
                            <p class="error-text" v-if="!acc.accountNumber">
                                Please fill the required field
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div
                            :class="
                                `paragraph ${!acc.bankName ? 'require' : null}`
                            "
                        >
                            <h3>Bank Name*</h3>
                            <DropdownSingle
                                :text="acc.bankName"
                                :items="bankNames"
                                @clicked="bankNameClick"
                                overflow="5"
                            />
                            <p class="error-text" v-if="!acc.bankName">
                                Please fill the required field
                            </p>
                        </div>
                        <div
                            :class="
                                `paragraph ${!acc.branch ? 'require' : null}`
                            "
                        >
                            <h3>Branch*</h3>
                            <input type="text" v-model="acc.branch" />
                            <p class="error-text" v-if="!acc.branch">
                                Please fill the required field
                            </p>
                        </div>
                    </div>
                    <div
                        :class="
                            `paragraph upload ${
                                !bankStatementFileName ? 'require' : null
                            }`
                        "
                    >
                        <div class="idPasspoer">
                            <label
                                >Please upload image of your official bank
                                statement*</label
                            >(can upload only once)
                        </div>
                        <input
                            :value="
                                bankStatementFileName
                                    ? bankStatementFileName
                                    : ''
                            "
                            placeholder="Browse"
                            readonly
                        />
                        <label for="file-upload3" class="custom-file-upload">
                            Upload
                        </label>
                        <input
                            id="file-upload3"
                            type="file"
                            accept="image/*"
                            @change="onFileBankStatementSelected"
                        />
                        <p class="error-text" v-if="!bankStatementFileName">
                            Please fill the required field
                        </p>
                    </div>
                </div>
                <h3 class="spacer">
                    Experience
                </h3>
                <div
                    class="experienceLoop"
                    v-for="(e, index) in exp"
                    :key="index"
                >
                    <div class="row">
                        <div class="paragraph">
                            <h3>Cuisine Type</h3>
                            <DropdownSingle
                                :text="exp[index].cuisineType"
                                :items="cuisineTypes"
                                @clicked="cuisineTypeClick(index, $event)"
                                overflow="5"
                            />
                        </div>
                        <div class="paragraph">
                            <h3>Year of experience</h3>
                            <input type="text" v-model="e.expYear" />
                        </div>
                    </div>
                    <div class="paragraph about-me">
                        <h3>About the experience</h3>
                        <textarea
                            rows="5"
                            cols="60"
                            maxlength="250"
                            name="description"
                            v-model="exp[index].aboutExp"
                        />
                    </div>
                    <div
                        class="delete-wrapper"
                        @click.prevent="deleteExp(index)"
                    >
                        <img src="@/assets/icons/delete_forever.svg" />
                        <label>Delete experience</label>
                    </div>
                </div>
                <div class="add">
                    <h3 class="bold" @click.prevent="add">
                        + Add more experience
                    </h3>
                </div>
                <div class="row btn">
                    <div class="btn-wrapper">
                        <button
                            class="return"
                            @click="$router.push('/profile/chef')"
                        >
                            Cancel
                        </button>
                    </div>
                    <div class="btn-wrapper">
                        <button
                            class="save"
                            :disabled="$v.$invalid"
                            @click="editProfileChef"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <!-- ======== Modal Start ======== -->
        <modal name="upload" :width="'60%'" height="auto" :adaptive="true">
            <div class="close-btn">
                <button class="btn" @click.prevent="$modal.hide('upload')">
                    <i class="material-icons">close</i>
                </button>
            </div>
            <section class="modal-main-content">
                <div class="upper-section">
                    <div class="img-wrapper">
                        <img
                            :src="
                                uploadUrl
                                    ? uploadUrl
                                    : user.profileImage
                                    ? user.profileImage
                                    : require('~/assets/images/profile.svg')
                            "
                            alt="uploadUrl"
                        />
                    </div>
                </div>
                <form class="form">
                    <div class="upload-input">
                        <input
                            :value="photoFileName ? photoFileName : null"
                            readonly
                        />
                        <label for="file-upload1" class="custom-file-upload">
                            Browse
                        </label>
                        <input
                            id="file-upload1"
                            type="file"
                            accept="image/*"
                            @change="onFilePhotoSelected"
                        />
                    </div>
                    <p v-if="!datafile">
                        *Minimum Screen Resolution Required is 300x300
                    </p>
                    <button
                        class="submitbtn"
                        :disabled="!datafile"
                        @click.prevent="confirmPhotoUpload"
                    >
                        <label>Confirm</label>
                    </button>
                </form>
            </section>
        </modal>
        <modal name="upload-mobile" width="100%" height="auto" :adaptive="true">
            <div class="close-btn">
                <button
                    class="btn"
                    @click.prevent="$modal.hide('upload-mobile')"
                >
                    <i class="material-icons">close</i>
                </button>
            </div>
            <section class="modal-main-content">
                <div class="upper-section">
                    <div class="img-wrapper">
                        <img
                            :src="
                                uploadUrl
                                    ? uploadUrl
                                    : user.profileImage
                                    ? user.profileImage
                                    : require('~/assets/images/profile.svg')
                            "
                            alt="uploadUrl"
                        />
                    </div>
                </div>
                <form class="form">
                    <div class="upload-input">
                        <input
                            :value="photoFileName ? photoFileName : null"
                            readonly
                        />
                        <label for="file-upload1" class="custom-file-upload">
                            Browse
                        </label>
                        <input
                            id="file-upload1"
                            type="file"
                            accept="image/*"
                            @change="onFilePhotoSelected"
                        />
                    </div>
                    <p v-if="!datafile">
                        *Minimum Screen Resolution Required is 300x300
                    </p>
                    <button
                        class="submitbtn"
                        :disabled="!datafile"
                        @click.prevent="confirmPhotoUpload"
                    >
                        <label>Confirm</label>
                    </button>
                </form>
            </section>
        </modal>
        <!-- ======== Modal End ======== -->
    </div>
</template>

<script>
import provinces from '~/json/provinces.json'
import nationalities from '~/json/nationality.json'
import banks from '~/json/banks.json'
import cuisineType from '~/json/cuisineType.json'
import languages from '~/json/language.json'
import DropdownSingle from '~/components/Dropdown/DropdownSingle.vue'
import Dropdown from '~/components/Dropdown/Dropdown.vue'
import sampleAPI from '~/api/graphql/sample'
import userAPI from '~/api/graphql/user'
import { mapState } from 'vuex'
import moment from 'moment'
import axios from 'axios'
import apiConfig from '~/config/endpoint'
import countries from '~/json/countries.json'
import states from '~/json/states.json'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import {
    required,
    minLength,
    email,
    maxLength,
    numeric,
} from 'vuelidate/lib/validators'
export default {
    components: {
        Dropdown,
        DropdownSingle,
        Loading,
    },
    data() {
        return {
            isLoading: false,
            cuisine: null,
            chef: {
                homeNo: '',
                street: '',
                subDistrict: '',
                district: '',
                postalCode: '',
                occupation: '',
                favoriteCuisine: '',
                signatureDish: '',
                passportId: '',
                passportUrl: '',
                status: '',
            },
            acc: {
                id: null,
                accountName: '',
                accountNumber: '',
                bankName: '',
                branch: '',
                bankStatementUrl: '',
            },
            exp: [
                {
                    cuisineType: '',
                    expYear: '',
                    aboutExp: '',
                },
            ],
            user: {
                email: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                birthday: new Date(),
                gender: '',
                city: '',
                nationality: '',
                language: [],
                profileImage: '',
                aboutMe: '',
                allergic: [],
            },
            restrictions: [],
            genders: ['Male', 'Female'],
            countries: countries,
            languages: languages,
            nationalities: nationalities,
            subDistricts: ['WiangNua'],
            bankNames: banks ? banks.data : [],
            cuisineTypes: cuisineType,
            imgUrl: null,
            uploadUrl: null,
            photoFileName: '',
            passportFileName: '',
            bankStatementFileName: '',
            datafile: null,
            maxWidth: Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
            ),
            mockChef: null,
        }
    },
    validations: {
        user: {
            allergic: {
                required,
            },
            firstName: {
                required,
            },
            lastName: {
                required,
            },
            nationality: {
                required,
            },
            email: {
                required,
                email,
            },
            birthday: {
                required,
            },
            gender: {
                required,
            },
            phoneNumber: {
                required,
                numeric,
                maxLength: maxLength(10),
                minLength: minLength(10),
            },
            country: {
                required,
            },
            city: {
                required,
            },
        },
        chef: {
            homeNo: {
                required,
            },
            subDistrict: {
                required,
            },
            district: {
                required,
            },
            postalCode: {
                maxLength: maxLength(5),
                minLength: minLength(5),
                numeric,
                required,
            },
            street: {
                required,
            },
            passportUrl: {
                required,
            },
            passportId: {
                required,
                maxLength: maxLength(13),
                minLength: minLength(7),
            },
        },
        acc: {
            bankStatementUrl: {
                required,
            },
            accountName: {
                required,
            },
            accountNumber: {
                required,
            },
            bankName: {
                required,
            },
            branch: {
                required,
            },
        },
    },
    mounted() {
        this.getListAllergics()
    },
    methods: {
        getChefData() {
            userAPI.getChefByUserId(this.userStore.id).then(res => {
                const chef = res.getChefByUserId
                const allergicArray = chef.user.allergic.map(item => {
                    return item.allergicName
                })
                this.user.birthday = this.userStore.birthday
                this.exp = [...chef.exp]
                this.user = chef.user
                this.chef.occupation = chef.occupation
                this.chef.homeNo = chef.homeNo
                this.chef.street = chef.street
                this.chef.district = chef.district
                this.chef.subDistrict = chef.subDistrict
                this.chef.postalCode = chef.postalCode
                this.chef.favoriteCuisine = chef.favoriteCuisine
                this.chef.signatureDish = chef.signatureDish
                this.chef.passportId = chef.passportId
                this.chef.passportUrl = chef.passportUrl
                this.chef.status = chef.status
                this.passportFileName = chef.passportUrl
                this.bankStatementFileName = chef.acc.bankStatementUrl
                this.acc = chef.acc
                this.user = {
                    ...this.user,
                }
                this.isLoading = false
            })
        },
        toggleModal(modalName) {
            this.$modal.toggle(modalName)
        },
        getListAllergics() {
            this.isLoading = true
            sampleAPI.getListAllergics().then(res => {
                this.allergics = res.getListAllergics
                this.restrictions = res.getListAllergics.map(item => {
                    return item['allergicName']
                })
                this.getChefData()
            })
        },
        restrictionClicked(value) {
            const allergics = this.allergics.filter(item => {
                return value ? value.indexOf(item.allergicName) !== -1 : []
            })
            this.user.allergic = allergics
        },
        provinceClick(value) {
            this.user.city = value.value
        },
        nationalityClick(value) {
            this.user.nationality = value.value
        },
        languageClick(value) {
            let language = value.map(item => {
                return { value: item }
            })
            this.user.language = language
        },
        countryClick(value) {
            this.user.country = value.value
        },
        genderClicked(value) {
            this.user.gender = value
        },
        districtClick(value) {
            this.chef.district = value.value
        },
        subDistrictClick(value) {
            this.chef.subDistrict = value
        },
        bankNameClick(value) {
            this.acc.bankName = value.value
        },
        cuisineTypeClick(index, value) {
            this.exp[index].cuisineType = value.value
        },
        add() {
            this.exp.push({
                cuisineType: '',
                expYear: '',
                aboutExp: '',
            })
        },
        deleteExp(index) {
            this.exp.splice(index, 1)
        },
        onFilePhotoSelected(event) {
            this.datafile = event.target.files[0]
            this.photoFileName = this.datafile.name
            if (this.photoFileName.lastIndexOf('.') <= 0) {
                return alert('Please add image file!')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load', event => {
                this.uploadUrl = event.target.result
            })
            if (this.datafile) {
                fileReader.readAsDataURL(this.datafile)
            }
        },
        confirmPhotoUpload() {
            this.isLoading = true
            let fileData = new FormData()
            fileData.append('image', this.datafile)
            axios
                .post(apiConfig.ENDPOINT_UPLOAD_DATA, fileData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + this.userStore.accessToken,
                    },
                })
                .then(response => {
                    this.user.profileImage = response.data
                    this.$modal.hide('upload')
                    this.$modal.hide('upload-mobile')
                    this.isLoading = false
                })
                .catch(error => {
                    console.error('err' + error)
                    this.isLoading = false
                })
        },
        onFilePassportSelected(event) {
            this.isLoading = true
            const datafile = event.target.files[0]
            this.passportFileName = datafile.name
            if (this.passportFileName.lastIndexOf('.') <= 0) {
                return alert('Please add image file!')
            }
            let fileData = new FormData()
            fileData.append('image', datafile)
            axios
                .post(apiConfig.ENDPOINT_UPLOAD_DATA, fileData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + this.userStore.accessToken,
                    },
                })
                .then(response => {
                    this.chef.passportUrl = response.data
                    this.isLoading = false
                })
                .catch(error => {
                    console.error('err' + error)
                    this.isLoading = false
                })
        },
        onFileBankStatementSelected(event) {
            this.isLoading = true
            const datafile = event.target.files[0]
            this.bankStatementFileName = datafile.name
            if (this.bankStatementFileName.lastIndexOf('.') <= 0) {
                return alert('Please add image file!')
            }
            let fileData = new FormData()
            fileData.append('image', datafile)
            axios
                .post(apiConfig.ENDPOINT_UPLOAD_DATA, fileData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + this.userStore.accessToken,
                    },
                })
                .then(response => {
                    this.chef.bankStatementUrl = response.data
                    this.isLoading = false
                })
                .catch(error => {
                    console.error('err' + error)
                    this.isLoading = false
                })
        },
        editProfileChef() {
            this.isLoading = true
            this.user.birthday = moment(this.user.birthday).format('DD-MM-YYYY')
            this.exp.forEach(item => {
                delete item.__typename
            })
            delete this.user.tokenType
            delete this.user.createdAt
            delete this.user.id
            delete this.user.isFacebookUser
            delete this.user.registeredDate
            delete this.user.reserve
            delete this.user.roles
            delete this.user.userId
            delete this.user.updatedAt
            delete this.user.status
            delete this.user.__typename
            delete this.acc.__typename
            this.user.allergic.forEach(item => {
                delete item.__typename
            })
            this.user.language.forEach(item => {
                delete item.id
                delete item.__typename
            })
            const item = {
                inputChef: {
                    homeNo: this.chef.homeNo,
                    street: this.chef.street,
                    subDistrict: this.chef.subDistrict,
                    district: this.chef.district,
                    postalCode: this.chef.postalCode,
                    occupation: this.chef.occupation,
                    favoriteCuisine: this.chef.favoriteCuisine,
                    signatureDish: this.chef.signatureDish,
                    passportId: this.chef.passportId,
                    passportUrl: this.chef.passportUrl,
                    acc: {
                        id: this.acc.id,
                        accountName: this.acc.accountName,
                        accountNumber: this.acc.accountNumber,
                        bankName: this.acc.bankName,
                        branch: this.acc.branch,
                        bankStatementUrl: this.acc.bankStatementUrl,
                    },
                    exp: this.exp,
                    user: this.user,
                },
            }
            delete item.inputChef.user.accessToken
            if (this.$v.$invalid) {
                alert('please check field')
                this.isLoading = false
            } else {
                delete item.inputChef.user.accountForRefund
                userAPI.editProfileChef(item).then(response => {
                    // const auth = {
                    //     ...this.userStore,
                    //     firstName: response.editProfileChef.user.firstName,
                    //     lastName: response.editProfileChef.user.lastName,
                    //     profileImage:
                    //         response.editProfileChef.user.profileImage,
                    //     ...this.user
                    // }
                    const res = response.editProfileChef.user
                    const auth = {
                        ...this.userStore,
                        ...res,
                    }
                    this.$store.commit('auth/setAuth', auth)
                    this.$router.push('/profile/chef/')
                    this.isLoading = false
                })
            }
        },
    },
    computed: {
        ...mapState({
            userStore: state => state.auth.auth,
        }),
        dateFormated() {
            return moment(this.user.birthday).format('DD MMMM YYYY')
        },
        mockCountries: function() {
            const country = countries.filter(item => {
                return this.user.country
                    ? item.value == this.user.country
                    : null
            })
            return country[0] ? country[0] : '-'
        },
        provinces: function() {
            const state = states.filter(item => {
                return this.mockCountries
                    ? item.country_id == this.mockCountries.id
                    : null
            })
            return state[0] ? state : '-'
        },
        mockLanguage: function() {
            var constLanguage = []
            constLanguage = this.user.language[0]
                ? this.user.language.map(item => {
                      return item.value
                  })
                : []
            return constLanguage
        },
        showAllergics: function() {
            var constAllegic = []
            constAllegic = this.user.allergic[0]
                ? this.user.allergic.map(function(item) {
                      return item['allergicName']
                  })
                : []
            return constAllegic
        },
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
@import '@/styles/modal.scss';

form {
    .submitbtn {
        margin: 18px 0;
        label {
            cursor: pointer;
        }
        &:disabled {
            border-color: #bdbdbd;
            background-color: #bdbdbd;
            cursor: not-allowed;
        }
    }
}
.modal-main-content {
    display: flex;
    flex-direction: column;
    padding: 40px 40px 0 40px;
    justify-content: center;
    @include respond-to($phone) {
        padding: 20px;
    }
    form {
        width: 60%;
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        @include respond-to($phone) {
            margin: 0;
            width: 100%;
        }
        .custom-file-upload {
            background-color: #fff;
            color: #800020;
            border-color: #800020;
            padding: 10px 35px;
            border-radius: 5px;
        }
        p {
            text-align: center;
            color: #707070;
            margin-top: 15px;
            margin-bottom: 20px;
        }
        button {
            align-self: center;
        }
    }
}
.page-wrapper {
    .upper-section {
        justify-content: center;
        display: flex;
        @include respond-to($phone) {
            margin: 10px;
        }
        .img-wrapper {
            justify-content: center;
            border-radius: 300%;
            overflow: hidden;
            display: flex;
            height: 210px;
            width: 210px;
            @include respond-to($phone) {
                height: 112px;
                width: 112px;
            }
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
    }
    flex-direction: column;
    margin: 0 128px;
    display: flex;
    @include respond-to($phone) {
        margin: 0;
    }
    .subtitle-text {
        justify-content: center;
        margin-bottom: 32px;
        margin-top: 32px;
        display: flex;
        width: 100%;
    }
    section {
        justify-content: space-between;
        margin-top: 20px;
        display: flex;
        @include respond-to($phone) {
            flex-direction: column;
            align-items: center;
        }
        .calendar {
            border-bottom: 1px solid $border;
            justify-content: space-between;
            flex-direction: row;
            display: flex;
            width: 100%;
            cursor: text;
            img {
                justify-content: flex-end;
                display: flex;
                height: 12%;
                width: 12%;
            }
            input {
                position: relative;
                width: 100%;
                height: 100%;
                margin-right: 55px;
            }
        }
        .calendar:hover {
            border-bottom: 1px solid $accent;
        }
    }
    h3 {
        @include title-text(16px);
    }
    h3.spacer {
        border-bottom: 1px solid $accent;
        @include title-text(1em);
        margin-top: 15px;
        font-weight: 600;
        padding: 8px 0;
    }
    h3.bold {
        @include title-text(1em);
        margin-top: 15px;
        font-weight: 600;
        padding: 8px 0;
    }
    h1 {
        text-align: center;
        padding: 10px 0;
        width: 100%;
    }
    .left-div {
        flex-direction: column;
        align-items: center;
        position: relative;
        display: flex;
        height: auto;
        width: 30%;
        @include respond-to($phone) {
            width: 90%;
        }
        a {
            text-decoration: underline;
            font-weight: 600;
        }
        .upload-section {
            flex-direction: column;
            align-items: center;
            position: relative;
            text-align: center;
            display: flex;
            .img-wrapper {
                justify-content: center;
                border-radius: 300%;
                overflow: hidden;
                display: flex;
                height: 210px;
                width: 210px;
                @include respond-to($phone) {
                    height: 112px;
                    width: 112px;
                }
                img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                }
            }
            .upload-text {
                text-align: justify;
                margin-top: 20px;
                cursor: pointer;
            }
            .cautions {
                @include body-text(12px);
                color: $accent;
            }
        }
        .form.left {
            justify-content: space-between;
            flex-direction: column;
            margin-top: 20px;
            display: flex;
            width: 100%;
            @include respond-to($phone) {
                border-top: 1px solid #800020;
            }
            .paragraph {
                margin-top: 12px;
                width: 100%;
            }
            .row.left {
                justify-content: space-between;
                position: relative;
                display: flex;
                width: 100%;
                > .paragraph {
                    width: 45%;
                }
            }
        }
    }
    .right-div {
        flex-direction: column;
        display: flex;
        width: 60%;
        @include respond-to($phone) {
            width: 90%;
        }
        .spacer.row {
            border-bottom: 1px solid $accent;
            padding: 0 0 32px 0;
        }
        .btn.row {
            justify-content: flex-start;
            margin: 32px 0;
            @include respond-to($phone) {
                flex-direction: row;
                justify-content: center;
                .btn-wrapper {
                    button {
                        padding: 8px 24px;
                    }
                }
            }
        }
        .paragraph {
            margin-top: 24px;
            width: 45%;
            @include respond-to($phone) {
                width: 100%;
            }
            .sub-text {
                padding-top: 8px;
            }
        }
        .paragraph.full {
            width: 100%;
        }
        .paragraph.noMargin {
            margin: 0 0;
        }
        .paragraph.upload {
            width: 100%;
            .idPasspoer {
                @include title-text(16px);
                > label {
                    @include body-text(14px);
                }
            }
            .custom-file-upload {
                background-color: #fff;
                color: #800020;
                border-color: #800020;
                padding: 10px 35px;
                border-radius: 5px;
                margin: 29px 0;
            }
            > input {
                width: 45%;
            }
        }
        .about-me.paragraph {
            width: 100%;
        }
        .btn-wrapper {
            justify-content: center;
            margin-right: 14px;
            display: flex;
            .return {
                background-color: $white;
                color: $accent;
                border-color: $accent;
            }
            .save {
                padding: 8px 64px;
            }
        }
        .row {
            justify-content: space-between;
            position: relative;
            display: flex;
            width: 100%;
            @include respond-to($phone) {
                flex-direction: column;
            }
        }
        .add {
            cursor: pointer;
        }
        .delete-wrapper {
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>
