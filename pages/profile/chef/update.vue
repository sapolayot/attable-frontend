<template>
    <div class="page-wrapper" v-if="user && statusShow">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <h1>
            {{
                page == 'applytochef'
                    ? `ONE STEP TO CHEF'S COMMUNITY`
                    : `WELCOME to AT TABLE`
            }}
        </h1>
        <label
            >Please fill in below information to
            {{
                page == 'applytochef' ? `apply to chef` : `Get Started!`
            }}</label
        >
        <section>
            <div class="left-div">
                <div class="upload-section">
                    <div
                        :class="
                            `imgs-wrapper ${
                                !user.profileImage ? 'require' : null
                            }`
                        "
                    >
                        <img
                            class="profile-img"
                            :src="
                                user.profileImage
                                    ? user.profileImage
                                    : require('~/assets/images/profile.svg')
                            "
                        />
                    </div>
                    <div class="upload-text">
                        Add Profile Picture to get closer<br />with our
                        community.*
                        <label
                            v-if="this.maxWidth > 480"
                            class="upload-btn"
                            @click.prevent="$modal.show('upload')"
                        >
                            Upload
                        </label>
                        <label
                            v-if="this.maxWidth <= 480"
                            class="upload-btn"
                            @click.prevent="$modal.show('upload-mobile')"
                        >
                            Upload
                        </label>
                        <p class="cautions">
                            (Please use a photo showing your face clearly)
                        </p>
                    </div>
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
                            <input type="text" v-model="user.firstName" />
                            <p class="error-text" v-if="!user.firstName">
                                Please fill the required field
                            </p>
                        </div>
                        <div
                            :class="
                                `paragraph ${!user.lastName ? 'require' : null}`
                            "
                        >
                            <h3>Last Name*</h3>
                            <input type="text" v-model="user.lastName" />
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
                            <div class="calendar">
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
                                <p class="error-text" v-if="!user.birthday">
                                    Please fill the required field
                                </p>
                            </div>
                        </div>
                        <div
                            :class="
                                `paragraph ${!user.gender ? 'require' : null}`
                            "
                        >
                            <h3>Gender*</h3>
                            <DropdownSingle
                                placeholder="Gender"
                                :text="user.gender"
                                :items="genders"
                                @clicked="genderClicked"
                            />
                            <p class="error-text" v-if="!user.gender">
                                Please fill the required field
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
                            placeholder="Nationality"
                            :text="user.nationality"
                            :items="nationalities"
                            @clicked="nationalityClick"
                            overflow="5"
                        />
                        <p class="error-text" v-if="!user.nationality">
                            Please fill the required field
                        </p>
                    </div>
                    <div class="paragraph">
                        <h3>Language</h3>
                        <Dropdown
                            v-if="!mockLanguage"
                            :initial="mockLanguage"
                            :items="languages"
                            @clicked="languageClick"
                            class="language"
                            holder="Language"
                            className="full"
                        />
                        <Dropdown
                            v-if="mockLanguage"
                            :initial="mockLanguage"
                            :items="languages"
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
                    <div :class="`paragraph`">
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
                        <p
                            v-if="
                                !$v.user.phoneNumber.minLength ||
                                    !$v.user.phoneNumber.maxLength
                            "
                            class="error-text"
                        >
                            Error found! Please recheck
                        </p>
                        <p v-if="!user.phoneNumber" class="error-text">
                            Please fill the required field
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
                            :text="user.country"
                            :items="countries"
                            @clicked="countryClick"
                            overflow="5"
                        />
                        <p class="error-text" v-if="!user.country">
                            Please fill the required field
                        </p>
                    </div>
                    <div
                        :class="
                            `paragraph noMargin ${
                                !user.city ? 'require' : null
                            }`
                        "
                    >
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
                        <input v-model="chef.district" placeholder="District" />
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
                            type="number"
                            v-model="chef.postalCode"
                            placeholder="Postal code"
                            onKeyDown="if(this.value.length==5 && event.keyCode!=8) return false;"
                        />
                        <p v-if="$v.chef.postalCode.$error" class="error-text">
                            Error found! Please recheck
                        </p>
                        <p v-if="!chef.postalCode" class="error-text">
                            Please fill the required field
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
                <div class="row apply">
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
                <div class="paragraph upload">
                    <div class="idPasspoer">
                        ID Card No. or Passport No.*
                        <label>(Same as ID card holder)</label>
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
                <div class="paragraph upload">
                    <div class="idPasspoer">
                        <label
                            >Please upload image of your ID card / passport* </label
                        >(can upload only once)
                    </div>
                    <input
                        :value="passportFileName ? passportFileName : ''"
                        readonly
                        :class="
                            `
                        ${
                            !passportFileName == '' || !passportFileName
                                ? 'require'
                                : null
                        }`
                        "
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
                    <p class="error-text" v-if="!chef.passportUrl">
                        Please fill the required field
                    </p>
                </div>
                <h3 class="spacer">
                    Bank Account Detail
                </h3>
                <div class="row">
                    <div
                        :class="
                            `paragraph ${!acc.accountName ? 'require' : null}`
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
                            `paragraph ${!acc.accountNumber ? 'require' : null}`
                        "
                    >
                        <h3>Account Number*</h3>
                        <input type="number" v-model="acc.accountNumber" />
                        <p class="error-text" v-if="!acc.accountNumber">
                            Please fill the required field
                        </p>
                        <p
                            class="error-text"
                            v-if="$v.acc.accountNumber.$error"
                        >
                            Error found! Please recheck
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div
                        :class="`paragraph ${!acc.bankName ? 'require' : null}`"
                    >
                        <h3>Bank Name*</h3>
                        <DropdownSingle
                            placeholder="Bank Name"
                            :text="acc.bankName"
                            :items="bankNames"
                            @clicked="bankNameClick"
                            overflow="5"
                        />
                        <p class="error-text" v-if="!acc.bankName">
                            Please fill the required field
                        </p>
                    </div>
                    <div :class="`paragraph ${!acc.branch ? 'require' : null}`">
                        <h3>Branch*</h3>
                        <input type="text" v-model="acc.branch" />
                        <p class="error-text" v-if="!acc.branch">
                            Please fill the required field
                        </p>
                    </div>
                </div>
                <div class="paragraph upload">
                    <div class="idPasspoer">
                        <label
                            >Please upload image of your official bank
                            statement* </label
                        >(can upload only once)
                    </div>
                    <input
                        :value="
                            bankStatementFileName ? bankStatementFileName : ''
                        "
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
                                placeholder="Cuisine Type"
                                :text="e.cuisineType"
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
                            v-model="e.aboutExp"
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
                <div class="row btn wrapper">
                    <div class="btn-wrapper">
                        <button class="return" @click.prevent="$router.go(-1)">
                            Cancel
                        </button>
                    </div>
                    <div class="btn-wrapper">
                        <button class="save" @click.prevent="applytoChef">
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
                    <div class="imgs-wrapper">
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
                        <div>Confirm</div>
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
                    <div class="imgs-wrapper">
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
import subdistricts from '~/json/subdistricts.json'
import districts from '~/json/districts.json'
import provinces from '~/json/provinces.json'
import banks from '~/json/banks.json'
import nationalities from '~/json/nationality.json'
import countries from '~/json/countries.json'
import states from '~/json/states.json'
import cuisineType from '~/json/cuisineType.json'
import cities from '~/json/cities.json'
import languages from '~/json/language.json'
import DropdownSingle from '~/components/Dropdown/DropdownSingle.vue'
import Dropdown from '~/components/Dropdown/Dropdown.vue'
import sampleAPI from '~/api/graphql/sample'
import userAPI from '~/api/graphql/user'
import { mapState } from 'vuex'
import moment from 'moment'
import axios from 'axios'
import apiConfig from '~/config/endpoint'
import api from '~/api/rest/api'
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
            statusShow: false,
            isLoading: false,
            showError: false,
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
            },
            acc: {
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
                birthday: null,
                gender: '',
                city: '-',
                country: '',
                nationality: '',
                language: '',
                profileImage: '',
                aboutMe: '',
                allergic: [],
            },
            restrictions: [],
            genders: ['Male', 'Female'],
            countries: countries,
            languages: languages,
            nationalities: nationalities,
            subDistricts: subdistricts,
            bankNames: banks.data,
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
            page: '',
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
            profileImage: {
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
                numeric,
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
        this.$route.query.token ? this.autoLogin() : this.setData()
        this.getListAllergics()
    },
    methods: {
        autoLogin() {
            const data = {
                token: this.$route.query.token,
                email: this.$route.query.email,
            }
            api.validateToken(data).then(response => {
                const user = {
                    ...response.user,
                    accessToken: this.$route.query.token,
                }
                this.$store.commit('auth/setAuth', user)
                if (user.status === 'Approved') {
                    this.$router.push('/profile/chef/not-update')
                } else {
                    this.setData()
                }
            })
        },
        setData() {
            this.$store.commit('controlNevbar/hiddenNevbar')
            this.statusShow = true
            !this.$route.query.token
                ? (this.page = 'applytochef')
                : (this.page = 'update')
            this.user = {
                ...this.userStore,
            }
            this.user.country = this.userStore.country
            this.user.city = this.userStore.city
            this.user.birthday = this.userStore.birthday
                ? this.userStore.birthday
                : null
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
            const allergics = this.allergics.filter(item => {
                return value ? value.indexOf(item.allergicName) !== -1 : []
            })
            this.user.allergic = allergics
        },
        provinceClick(value) {
            this.user.city = value.value ? value.value : '-'
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
                        Authorization: 'Bearer ' + this.user.accessToken,
                    },
                })
                .then(response => {
                    this.user.profileImage = response.data
                    this.$modal.hide('upload')
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
            if (datafile) {
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
                            Authorization: 'Bearer ' + this.user.accessToken,
                        },
                    })
                    .then(response => {
                        this.chef.passportUrl = response.data
                        this.isLoading = false
                    })
                    .catch(error => {
                        this.isLoading = false
                    })
            }
        },
        onFileBankStatementSelected(event) {
            this.isLoading = true
            const datafile = event.target.files[0]
            if (datafile) {
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
                            Authorization: 'Bearer ' + this.user.accessToken,
                        },
                    })
                    .then(response => {
                        this.acc.bankStatementUrl = response.data
                        this.isLoading = false
                    })
                    .catch(error => {
                        this.isLoading = false
                    })
            }
        },
        applytoChef() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                return false
            }
            delete this.user.accessToken
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
            delete this.user.password
            delete this.user.__typename
            this.user.allergic.forEach(item => {
                delete item.__typename
            })
            this.user.birthday = moment(this.user.birthday).format('DD-MM-YYYY')
            const data = {
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
                    acc: this.acc,
                    exp: this.exp,
                    user: this.user,
                },
            }
            delete data.inputChef.user.facebookUser
            delete data.inputChef.user.accountForRefund
            data.inputChef.user.language.forEach(each => {
                delete each.__typename
            })
            this.isLoading = true
            userAPI.updateProfileChef(data).then(res => {
                const auth = {
                    ...this.$store.state.auth.auth,
                    ...res.updateProfileChef.user,
                }
                this.$store.commit('controlNevbar/showNevbar')
                this.$store.commit('auth/setAuth', auth)
                this.$router.push('/')
                this.isLoading = false
            })
        },
    },
    computed: {
        ...mapState({
            userStore: state => state.auth.auth,
        }),
        dateFormated() {
            return this.user.birthday
                ? moment(this.user.birthday).format('DD MMMM YYYY')
                : null
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
        districts: function() {
            const city = cities.filter(item => {
                return this.mockCity ? item.state_id == this.mockCity.id : null
            })
            return city[0] ? city : '-'
        },
        showAllergics: function() {
            var constAllegic = []
            constAllegic = this.user.allergic
                ? this.user.allergic.map(function(item) {
                      return item['allergicName']
                  })
                : []
            return constAllegic
        },
        mockLanguage: function() {
            var constLanguage = []
            constLanguage = this.user.language
                ? this.user.language[0]
                    ? this.user.language.map(item => {
                          return item.value
                      })
                    : []
                : []
            return constLanguage
        },
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
@import '@/styles/modal.scss';

.upload-btn {
    color: #800020;
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer;
}
.custom-file-upload {
    background-color: #fff;
    color: #800020;
    border-color: #800020;
    padding: 10px 35px;
    border-radius: 5px;
    margin: 29px 0;
}
.page-wrapper {
    flex-direction: column;
    margin: 0 128px;
    display: flex;
    @include respond-to($phone) {
        margin: 0 10px;
    }
    .upper-section {
        justify-content: center;
        display: flex;
        @include respond-to($phone) {
            margin: 10px;
        }
        .imgs-wrapper {
            justify-content: center;
            border-radius: 100%;
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
    .subtitle-text {
        justify-content: center;
        margin-bottom: 32px;
        margin-top: 32px;
        display: flex;
        width: 100%;
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
                margin: 0;
            }
            p {
                text-align: center;
                color: #707070;
                margin-top: 15px;
                margin-bottom: 20px;
            }
            button {
                align-self: center;
                padding: 12px 50px;
                margin: 20px;
                @include respond-to($phone) {
                    padding: 0;
                }
            }
        }
    }
    section {
        justify-content: space-between;
        margin-top: 20px;
        display: flex;
        @include respond-to($phone) {
            flex-direction: column;
        }
        .calendar {
            justify-content: space-between;
            flex-direction: row;
            width: 100%;
            cursor: text;
            @include respond-to($phone) {
                padding: 2px 0 2px 0;
            }
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
                border-bottom: 1px solid $border;
            }
            input:hover {
                border-bottom: 1px solid $accent;
            }
        }
        // .calendar:hover {
        //     border-bottom: 1px solid $accent;
        // }
    }
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type='number'] {
        -moz-appearance: textfield;
    }
    h3 {
        @include title-text(16px);
        margin-bottom: 10px;
        @include respond-to($phone) {
            font-size: 14px;
        }
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
        @include respond-to($phone) {
            font-size: 1.5em;
        }
    }
    label {
        text-align: center;
    }
    .left-div {
        flex-direction: column;
        align-items: center;
        position: relative;
        display: flex;
        height: auto;
        width: 30%;
        @include respond-to($phone) {
            width: 100%;
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
            @include respond-to($phone) {
                flex-direction: row-reverse;
            }
            .imgs-wrapper {
                justify-content: center;
                border-radius: 100%;
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
                margin-top: 20px;
                @include respond-to($phone) {
                    margin-top: 10px;
                }
            }
            .cautions {
                @include body-text(12px);
                color: $accent;
                @include respond-to($phone) {
                    font-size: 10px;
                }
            }
        }
        .form.left {
            justify-content: space-between;
            flex-direction: column;
            margin-top: 20px;
            display: flex;
            width: 100%;
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
            width: 100%;
        }
        .spacer.row {
            border-bottom: 1px solid $accent;
            padding: 0 0 32px 0;
        }
        .btn.row.wrapper {
            justify-content: flex-start;
            margin-bottom: 32px;
            @include respond-to($phone) {
                width: 100%;
                justify-content: center;
                flex-direction: row;
            }
        }
        .paragraph {
            margin-top: 24px;
            width: 45%;
            .sub-text {
                padding-top: 8px;
            }
        }
        .paragraph.noMargin {
            margin: 0 0;
            @include respond-to($phone) {
                margin-top: 24px;
            }
        }
        .paragraph.upload {
            width: 100%;
            .idPasspoer {
                @include title-text(16px);
                > label {
                    @include body-text(14px);
                }
            }
            > input {
                width: 45%;
                @include respond-to($phone) {
                    width: 55%;
                }
                &.require {
                    border-bottom: 1px solid $accent;
                }
            }
        }
        .about-me.paragraph {
            width: 100%;
        }
        .btn-wrapper {
            justify-content: center;
            margin: 14px;
            display: flex;
            .return {
                background-color: $white;
                color: $accent;
                border-color: $accent;
            }
            .save {
                padding: 8px 40px;
                @include respond-to($phone) {
                    padding: 8px;
                }
            }
        }
        .row {
            justify-content: space-between;
            position: relative;
            display: flex;
            width: 100%;
            @include respond-to($phone) {
                flex-direction: column;
                .paragraph {
                    width: 100%;
                }
            }
        }
        .add {
            cursor: pointer;
        }
        .delete-wrapper {
            display: flex;
            justify-content: flex-end;
            border-bottom: 1px solid $accent;
            padding-bottom: 30px;
        }
    }
}
</style>
