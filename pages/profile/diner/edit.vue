<template>
    <div class="page-wrapper">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <div class="page-body">
            <section>
                <!-- ======== Modal Start ======== -->
                <modal name="upload" width="60%" height="auto" :adaptive="true">
                    <div class="close-btn">
                        <button
                            class="btn"
                            @click.prevent="$modal.hide('upload')"
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
                                    alt="upload"
                                />
                            </div>
                        </div>
                        <form class="form">
                            <div class="upload-input">
                                <input
                                    :value="filename ? filename : null"
                                    readonly
                                />
                                <label
                                    for="file-upload"
                                    class="custom-file-upload"
                                >
                                    Browse
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    @change="onFileSelected"
                                />
                            </div>
                            <p v-if="!datafile">
                                *Minimum Screen Resolution Required is 300x300
                            </p>
                            <button
                                class="submitbtn"
                                :disabled="!datafile"
                                @click.prevent="confirmUpload"
                            >
                                <label>Confirm</label>
                            </button>
                        </form>
                    </section>
                </modal>
                <modal
                    name="upload-mobile"
                    width="100%"
                    height="auto"
                    :adaptive="true"
                >
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
                                    alt="upload"
                                />
                            </div>
                        </div>
                        <form class="form">
                            <div class="upload-input">
                                <input
                                    :value="filename ? filename : null"
                                    readonly
                                />
                                <label
                                    for="file-upload"
                                    class="custom-file-upload"
                                >
                                    Browse
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    @change="onFileSelected"
                                />
                            </div>
                            <p v-if="!datafile">
                                *Minimum Screen Resolution Required is 300x300
                            </p>
                            <button
                                class="submitbtn"
                                :disabled="!datafile"
                                @click.prevent="confirmUpload"
                            >
                                <label>Confirm</label>
                            </button>
                        </form>
                    </section>
                </modal>
                <!-- ======== Modal End ======== -->
                <div class="left-div">
                    <div class="upper-section">
                        <div class="img-wrapper">
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
                </div>
                <div class="right-div">
                    <h1>MY PROFILE</h1>
                    <div class="row">
                        <div class="paragraph">
                            <h3>First Name*</h3>
                            <input type="text" v-model="firstName" />
                            <p class="error-text" v-if="!firstName">
                                Please fill the required field
                            </p>
                        </div>
                        <div class="paragraph">
                            <h3>Last Name*</h3>
                            <input type="text" v-model="lastName" />
                            <p class="error-text" v-if="!lastName">
                                Please fill the required field
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="paragraph">
                            <h3>Birthday*</h3>
                            <div class="calendar">
                                <v-date-picker
                                    v-model="birthday"
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
                                <p class="error-text" v-if="!dateFormated">
                                    Please fill the required field
                                </p>
                            </div>
                        </div>
                        <div class="paragraph">
                            <h3>Gender*</h3>
                            <DropdownSingle
                                :text="gender"
                                :items="genders"
                                @clicked="genderClicked"
                                placeholder="Gender"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="paragraph">
                            <h3>Country</h3>
                            <DropdownSingle
                                placeholder="Country"
                                :text="country"
                                :items="countries"
                                @clicked="countryClick"
                                overflow="5"
                            />
                        </div>
                        <div class="paragraph">
                            <h3>City</h3>
                            <DropdownSingle
                                :text="province"
                                :items="provinces"
                                @clicked="provinceClick"
                                overflow="5"
                                placeholder="City"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="paragraph">
                            <h3>Email Address</h3>
                            <p class="sub-text">
                                {{ user.email }}
                            </p>
                        </div>
                        <div class="paragraph">
                            <h3>Mobile Phone*</h3>
                            <input v-model="phoneNumber" />
                            <p class="error-text" v-if="!phoneNumber">
                                Please fill the required field
                            </p>
                            <p
                                class="error-text"
                                v-if="$v.phoneNumber.$invalide && phoneNumber"
                            >
                                Error found! Please recheck
                            </p>
                        </div>
                    </div>
                    <div class="row spacer">
                        <div class="paragraph">
                            <h3>Nationality</h3>
                            <DropdownSingle
                                :text="nationality"
                                :items="nationalities"
                                @clicked="nationalityClick"
                                overflow="5"
                                class="nationality"
                                placeholder="Nationality"
                            />
                        </div>
                        <div class="paragraph full">
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
                    <div class="inputs full">
                        <h3>Food Restriction*</h3>
                        <Dropdown
                            v-if="!showAllergics.length >= 1"
                            :initial="showAllergics"
                            :items="restrictions"
                            @clicked="restrictionClicked"
                            class="food restriction"
                        />
                        <Dropdown
                            v-if="showAllergics.length >= 1"
                            :initial="showAllergics"
                            :items="restrictions"
                            @clicked="restrictionClicked"
                            class="food restriction"
                        />
                        <p class="error-text" v-if="$v.showAllergics.$invalid">
                            Please fill the required field
                        </p>
                    </div>
                    <div class="paragraph about-me">
                        <h3>About Me</h3>
                        <textarea
                            rows="5"
                            cols="60"
                            maxlength="250"
                            name="description"
                            v-model="aboutMe"
                        />
                    </div>
                    <div class="row btn">
                        <div class="btn-wrapper">
                            <button class="return" @click.prevent="returned">
                                Return
                            </button>
                        </div>
                        <div class="btn-wrapper">
                            <button @click.prevent="editProfileDiner">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import provinces from '~/json/provinces.json'
import nationalities from '~/json/nationality.json'
import countries from '~/json/countries.json'
import states from '~/json/states.json'
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
    mounted() {
        this.setData()
        this.getListAllergics()
    },
    data() {
        return {
            isLoading: false,
            mockCity: null,
            mockDistric: null,
            allergics: [],
            allergicInit: [],
            restrictions: [],
            restriction: [],
            datafile: null,
            filename: null,
            nationalities: nationalities,
            country: null,
            countries: countries,
            languages: languages,
            province: null,
            nationality: null,
            language: null,
            imgUrl: null,
            uploadUrl: null,
            aboutMe: null,
            firstName: null,
            lastName: null,
            phoneNumber: null,
            birthday: null,
            gender: null,
            genders: ['Male', 'Female'],
            maxWidth: Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
            ),
        }
    },
    validations: {
        firstName: {
            required,
        },
        lastName: {
            required,
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
        showAllergics: {
            required,
        },
    },
    methods: {
        async setData() {
            this.nationality = this.user.nationality
            this.language = this.user.language
                ? this.user.language.map(item => {
                      return item
                  })
                : null
            this.province = this.user.city
            this.country = this.user.country
            this.firstName = this.user.firstName
            this.lastName = this.user.lastName
            this.aboutMe = this.user.aboutMe
            this.gender = this.user.gender
            this.birthday = moment(this.user.birthday)
            this.phoneNumber = this.user.phoneNumber
            this.restriction = this.user.allergic
        },
        getListAllergics() {
            sampleAPI.getListAllergics().then(res => {
                this.allergics = res.getListAllergics
                this.restrictions = res.getListAllergics.map(function(item) {
                    return item['allergicName']
                })
            })
        },
        restrictionClicked(value) {
            let restriction = value.map(item => {
                return { allergicName: item }
            })
            this.restriction = restriction
        },
        provinceClick(value) {
            this.mockCity = value
            this.province = value.value ? value.value : '-'
        },
        genderClicked(value) {
            this.gender = value
        },
        nationalityClick(value) {
            this.nationality = value.value
        },
        languageClick(value) {
            let language = value.map(item => {
                return { value: item }
            })
            this.language = language
        },
        countryClick(value) {
            this.country = value.value
            this.province = '-'
        },
        confirmUpload() {
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
                    this.imgUrl = response.data
                    this.$modal.hide('upload')
                    this.$modal.hide('upload-mobile')
                    this.isLoading = false
                })
                .catch(error => {
                    console.error('err' + error)
                    this.isLoading = false
                })
        },
        editProfileDiner() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                return false
            }
            let allergics = this.allergics.filter(item => {
                return this.showAllergics.indexOf(item.allergicName) !== -1
            })
            allergics.forEach(item => {
                delete item.__typename
            })
            let language = this.language
                ? this.language.map(item => {
                      return { value: item.value }
                  })
                : null
            const user = {
                inputUser: {
                    email: this.user.email,
                    profileImage: this.imgUrl
                        ? this.imgUrl
                        : this.user.profileImage,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    gender: this.gender,
                    birthday: moment(this.birthday, 'DD MMMM YYYY').format(
                        'DD-MM-YYYY'
                    ),
                    city: this.province,
                    phoneNumber: this.phoneNumber,
                    country: this.country,
                    nationality: this.nationality,
                    language: language,
                    allergic: allergics,
                    aboutMe: this.aboutMe,
                },
            }
            this.isLoading = true
            userAPI.editProfileDiner(user).then(res => {
                const auth = Object.assign(
                    {},
                    this.$store.state.auth.auth,
                    res.editProfileDiner.user
                )
                this.$store.commit('auth/setAuth', auth)
                this.$router.go(-1)
                this.isLoading = false
            })
        },
        toggleModal(modalName) {
            this.$modal.toggle(modalName)
        },
        onFileSelected(event) {
            this.datafile = event.target.files[0]
            this.filename = this.datafile.name
            if (this.filename.lastIndexOf('.') <= 0) {
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
        returned() {
            this.$router.go(-1)
        },
    },
    computed: {
        ...mapState({
            user: state => state.auth.auth,
        }),
        dateFormated() {
            return moment(this.birthday, 'DD-MM-YYYY').format('DD MMMM YYYY')
        },
        mockCountries: function() {
            const country = countries.filter(item => {
                return this.country ? item.value == this.country : null
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
            constAllegic = this.restriction.map(function(item) {
                return item['allergicName']
            })
            return constAllegic
        },
        mockLanguage: function() {
            var constLanguage = []
            constLanguage = this.language
                ? this.language.map(item => {
                      return item.value
                  })
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

form {
    .submitbtn {
        margin: 18px 0;
        &:disabled {
            border-color: #bdbdbd;
            background-color: #bdbdbd;
            cursor: not-allowed;
        }
    }
}
.close-btn {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    right: 0;
    .btn {
        background-color: transparent;
        padding: 16px 16px 0 0;
        border: 0;
        color: $primary;
        .material-icons {
            font-size: 18px;
        }
    }
}
.language {
    width: 100%;
}
.page-wrapper {
    .upper-section {
        justify-content: center;
        display: flex;
        flex-direction: column;
        align-items: center;
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
    .photo {
        font-size: 14px;
    }
    .page-body {
        padding: 63px 176px;
        @include respond-to($phone) {
            padding: 0;
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
                }
            }
        }
        section {
            justify-content: space-evenly;
            display: flex;
            @include respond-to($phone) {
                flex-direction: column;
                padding: 10px 20px;
            }
            .calendar {
                border-bottom: 1px solid $border;
                justify-content: space-between;
                flex-direction: row;
                display: flex;
                width: 100%;
                cursor: text;
                @include respond-to($phone) {
                    padding: 1px 0px 4px 0;
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
                    border: 0;
                }
            }
            .calendar:hover {
                border-bottom: 1px solid $accent;
            }
        }
        h3 {
            @include title-text(16px);
        }
        h1 {
            border-bottom: 1px solid $accent;
            padding: 10px 0;
            width: 100%;
            @include respond-to($phone) {
                display: none;
            }
        }
        .left-div {
            flex-direction: column;
            align-items: center;
            text-align: center;
            position: relative;
            display: flex;
            height: auto;
            @include respond-to($phone) {
                border-bottom: 1px solid #800020;
                padding-bottom: 20px;
            }
            label {
                color: $accent;
            }
            .upload-text {
                margin-top: 16px;
                cursor: pointer;
            }
        }
        .right-div {
            flex-direction: column;
            display: flex;
            width: 50%;
            @include respond-to($phone) {
                width: 100%;
            }
            .row {
                justify-content: space-between;
                display: flex;
                width: 100%;
            }
            .spacer.row {
                border-bottom: 1px solid $accent;
                padding: 0 0 32px 0;
                @include respond-to($phone) {
                    padding: 0;
                    border: 0;
                }
            }
            .inputs {
                margin-top: 36px;
                width: 45%;
            }
            .inputs.full {
                width: 100%;
            }
            .btn.row {
                justify-content: center;
                margin-bottom: 32px;
            }
            .paragraph {
                margin-top: 24px;
                width: 45%;
                .sub-text {
                    padding: 5px 0 !important;
                }
            }
            .paragraph.full {
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
                    @include respond-to($phone) {
                        padding: 8px 32px;
                    }
                }
                button {
                    padding: 8px 64px;
                    justify-content: center;
                    align-self: center;
                    margin-top: 80px;
                    display: flex;
                    width: 100%;
                    @include respond-to($phone) {
                        padding: 8px 56px;
                    }
                }
            }
        }
    }
}
</style>
