<template>
    <div class="page-wrapper">
        <div v-if="statusShow" class="page-body">
            <modal name="upload" width="60%" height="auto" :adaptive="true">
                <div class="close-btn">
                    <button class="btn" @click.prevent="$modal.hide('upload')">
                        <i class="material-icons">close</i>
                    </button>
                </div>
                <section class="modal-main-content">
                    <div class="upper-section">
                        <div class="img-wrapper">
                            <img :src="uploadUrl" alt="upload" />
                        </div>
                    </div>
                    <form class="form">
                        <div class="upload-input">
                            <input
                                :value="filename ? filename : null"
                                readonly
                            />
                            <label for="file-upload" class="custom-file-upload">
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
                            <img :src="uploadUrl" alt="upload" />
                        </div>
                    </div>
                    <form class="form">
                        <div class="upload-input">
                            <input
                                :value="filename ? filename : null"
                                readonly
                            />
                            <label for="file-upload" class="custom-file-upload">
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
            <h1>
                WELCOME to AT TABLE
            </h1>
            <label class="subtitle-text">
                Please fill in below information to Get Started!
            </label>
            <section>
                <div class="left-div">
                    <div class="upper-section">
                        <div class="img-wrapper">
                            <img
                                :src="
                                    imgUrl
                                        ? imgUrl
                                        : require('~/assets/images/profile.svg')
                                "
                                alt="profile"
                            />
                        </div>
                    </div>
                    <div class="upload-text">
                        <label>
                            Add Profile Picture to get closer
                        </label>
                        <div class="text-button-wrapper">
                            <label>
                                with our community.*
                            </label>
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
                        </div>
                        <label class="photo"
                            >(Please use a photo showing your face
                            clearly)</label
                        >
                    </div>
                </div>
                <div class="right-div">
                    <div class="row">
                        <div class="inputs">
                            <h3>Birthday</h3>
                            <div class="calendar">
                                <v-date-picker
                                    class="material-icons"
                                    locale="en"
                                    v-model="date"
                                    :popover="{ visibility: 'click' }"
                                    color="red"
                                >
                                    <i class="material-icons">
                                        event
                                    </i>
                                </v-date-picker>
                                <v-date-picker
                                    v-model="date"
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
                        </div>
                        <div class="inputs">
                            <h3>Gender</h3>
                            <DropdownSingle
                                :text="gender"
                                :items="genders"
                                @clicked="genderClicked"
                                class="gender"
                            />
                        </div>
                    </div>
                    <div class="inputs full">
                        <h3>Food Restriction*</h3>
                        <Dropdown
                            :items="restrictions"
                            :initial="restriction"
                            @clicked="restrictionClicked"
                        />
                    </div>
                    <button
                        @click.prevent="updateProfileDiner"
                        :disabled="$v.$invalid"
                    >
                        Confirm
                    </button>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import Dropdown from '~/components/Dropdown/Dropdown.vue'
import DropdownSingle from '~/components/Dropdown/DropdownSingle.vue'
import userAPI from '~/api/graphql/user'
import sampleAPI from '~/api/graphql/sample'
import api from '~/api/rest/api'
import { mapState } from 'vuex'
import axios from 'axios'
import apiConfig from '~/config/endpoint'
import moment from 'moment'
import { required } from 'vuelidate/lib/validators'

export default {
    components: {
        Dropdown,
        DropdownSingle,
    },
    validations: {
        imgUrl: {
            required,
        },
        restriction: {
            required,
        },
    },
    data() {
        return {
            statusShow: false,
            allergics: [],
            restrictions: [
                'None',
                'Lactose Intolerance',
                'Vegetarian and Vegans',
                'Peanut Allergies',
                'Diabetic',
                'Celiac Disease (Gluten Free)',
                'Kosher',
                'Halal',
            ],
            genders: ['Male', 'Female'],
            date: null,
            restriction: [],
            gender: null,
            imgUrl: null,
            uploadUrl: require('~/assets/images/profile.svg'),
            filename: null,
            datafile: null,
            maxWidth: Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
            ),
        }
    },
    mounted() {
        this.autoLogin()
        this.getListAllergics()
    },
    computed: {
        ...mapState({
            user: state => state.auth.auth,
        }),
        dateFormated: function() {
            return this.date ? moment(this.date).format('DD MMMM YYYY') : null
        },
    },
    methods: {
        getListAllergics() {
            sampleAPI.getListAllergics().then(res => {
                this.allergics = res.getListAllergics
                this.restrictions = res.getListAllergics.map(item => {
                    return item['allergicName']
                })
            })
        },
        autoLogin() {
            const data = {
                token: this.$route.query.token,
                email: this.$route.query.email,
            }
            api.validateToken(data)
                .then(response => {
                    const user = {
                        ...response.user,
                        accessToken: this.$route.query.token,
                    }
                    this.$store.commit('auth/setAuth', user)
                    if (user.status === 'Approved') {
                        this.$router.push('/profile/diner/not-update')
                    } else {
                        this.$store.commit('controlNevbar/hiddenNevbar')
                        this.statusShow = true
                    }
                })
                .catch(() => {
                    this.$router.push('/')
                })
        },
        restrictionClicked(value) {
            this.restriction = value
        },
        genderClicked(value) {
            this.gender = value
        },
        confirmUpload() {
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
                })
                .catch(error => {
                    console.error('err' + error)
                })
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
        updateProfileDiner() {
            const allergics = this.allergics.filter(item => {
                return this.restriction.indexOf(item.allergicName) !== -1
            })
            allergics.forEach(item => {
                delete item.__typename
            })
            const user = {
                inputUser: {
                    email: this.user.email,
                    birthday: this.date
                        ? moment(this.date).format('DD-MM-YYYY')
                        : null,
                    gender: this.gender ? this.gender : null,
                    profileImage: this.imgUrl,
                    allergic: allergics,
                },
            }
            userAPI.updateProfileDiner(user).then(res => {
                if (res.updateProfileDiner.success) {
                    const user = {
                        ...res.updateProfileDiner.user,
                        accessToken: this.$route.query.token,
                    }
                    this.$store.commit('controlNevbar/showNevbar', user)
                    this.$store.commit('auth/setAuth', user)
                    this.$router.push('/')
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
@import '@/styles/modal.scss';

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
form {
    .submitbtn {
        margin: 18px 0;
    }
}
.page-wrapper {
    .page-body {
        padding: 63px 176px;
        display: flex;
        flex-direction: column;
        @include respond-to($phone) {
            padding: 0px;
        }
        .subtitle-text {
            margin-bottom: 32px;
            margin-top: 32px;
            @include respond-to($phone) {
                margin: 10px;
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
                    padding: 12px 50px;
                    @include respond-to($phone) {
                        padding: 0;
                    }
                }
            }
        }
        section {
            display: flex;
            flex-direction: row;
            @include respond-to($phone) {
                flex-direction: column;
            }
            .calendar {
                border-bottom: 1px solid $border;
                justify-content: space-between;
                flex-direction: row;
                display: flex;
                width: 100%;
                @include respond-to($phone) {
                    height: 41px;
                }
                cursor: pointer;
                .date-picker-wrapper {
                    input {
                        border: 0;
                    }
                }
                .material-icons {
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    color: $light-grey;
                }
                .date-picker-wrapper {
                    width: 100%;
                }
                .datepicker {
                    width: 100%;
                    border-bottom: 0;
                }
                // @include respond-to($phone) {
                //     padding: 6px 8px;
                // }
            }
            .calendar:hover {
                border-bottom: 1px solid $accent;
            }
        }
        h3 {
            @include title-text(18px);
        }
        h1 {
            align-self: center;
            font-size: 40px;
            @include respond-to($phone) {
                margin: 10px 0 0 0;
                font-size: 24px;
            }
        }
        label {
            align-self: center;
            font-size: 20px;
            @include respond-to($phone) {
                font-size: 14px;
            }
        }
        .left-div {
            justify-content: center;
            flex-direction: column;
            text-align: center;
            display: flex;
            flex-grow: 0;
            flex-shrink: 0;
            max-height: 240px;
            @include respond-to($phone) {
                flex-direction: row-reverse;
                align-items: center;
            }
            .upload-text {
                .text-button-wrapper {
                    @include respond-to($phone) {
                        text-align: left;
                    }
                    .upload-btn {
                        color: $accent;
                        font-weight: 600;
                        text-decoration: underline;
                        cursor: pointer;
                        label {
                            color: $accent;
                        }
                    }
                    * {
                        margin-bottom: 10px;
                    }
                }
            }
        }
        .right-div {
            flex-direction: column;
            display: flex;
            flex: 1;
            padding-left: 4vw;
            @include respond-to($phone) {
                padding: 0px 20px 20px;
                .inputs {
                    width: 100% !important;
                }
            }
            .row {
                justify-content: space-between;
                display: flex;
                width: 100%;
                @include respond-to($phone) {
                    .inputs {
                        width: 45% !important;
                    }
                }
            }
            .inputs {
                margin-top: 36px;
                width: 45%;
            }
            .inputs.full {
                width: 100%;
            }
            button {
                justify-content: center;
                align-self: center;
                margin-top: 80px;
                display: flex;
                width: 28%;
                padding: 5px 13px;
                align-self: start;
                margin-top: 40px;
                @include respond-to($phone) {
                    align-self: center;
                    padding: 10px 10px;
                    width: 40%;
                    margin-top: 10px;
                }
                &:disabled {
                    border-color: #bdbdbd;
                    background-color: #bdbdbd;
                    cursor: not-allowed;
                }
            }
        }
        .upload-text {
            label {
                color: #000000;
                margin-top: 16px;
                font-size: 20px;
                @include respond-to($phone) {
                    font-size: 14px;
                }
            }
            .photo {
                color: #800020;
                @include respond-to($phone) {
                    font-size: 10px;
                }
            }
        }
    }
    .upload-input {
        flex-direction: row;
        display: flex;
    }
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
    .photo {
        font-size: 14px;
    }
}
</style>
