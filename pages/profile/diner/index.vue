<template>
    <div class="page-wrapper">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <div class="page-body">
            <section>
                <div class="left-div">
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
                    <div
                        class="upload-text"
                        :style="
                            `${
                                !user.city || !user.country
                                    ? 'color:#BDBDBD'
                                    : ''
                            }`
                        "
                    >
                        {{ !user.city || !user.country ? 'City,Country' : '' }}
                        {{ user.city ? user.city + ',' : '' }}
                        {{ user.country ? user.country : '' }}
                    </div>
                </div>
                <div class="right-div">
                    <h1>MY PROFILE</h1>
                    <div class="row">
                        <div class="paragraph">
                            <h3>First Name</h3>
                            <p class="sub-text">
                                {{ !user.firstName ? '-' : '' }}
                                {{ user.firstName }}
                            </p>
                        </div>
                        <div class="paragraph">
                            <h3>Last Name</h3>
                            <p class="sub-text">
                                {{ !user.lastName ? '-' : '' }}
                                {{ user.lastName }}
                            </p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="paragraph">
                            <h3>Birthday</h3>
                            <p class="sub-text">
                                {{ getFormatDate(user.birthday) }}
                                {{ !user.birthday ? '-' : '' }}
                            </p>
                        </div>
                        <div class="paragraph">
                            <h3>Gender</h3>
                            <p class="sub-text">
                                {{ user.gender }}
                                {{ !user.gender ? '-' : '' }}
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="paragraph">
                            <h3>Email Address</h3>
                            <p class="sub-text">
                                {{ user.email }}
                                {{ !user.email ? '-' : '' }}
                            </p>
                        </div>
                        <div class="paragraph">
                            <h3>Mobile Phone</h3>
                            <p class="sub-text">
                                {{ user.phoneNumber }}
                                {{ !user.phoneNumber ? '-' : '' }}
                            </p>
                        </div>
                    </div>
                    <div class="row spacer">
                        <div class="paragraph">
                            <h3>Nationality</h3>
                            <p class="sub-text">
                                {{ user.nationality }}
                                {{ !user.nationality ? '-' : '' }}
                            </p>
                        </div>
                        <div class="paragraph">
                            <h3>Language</h3>
                            <div
                                v-for="language in user.language"
                                :key="language.value"
                            >
                                <p class="sub-text">
                                    {{ language.value }}
                                    {{ user.language == undefined ? '-' : '' }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="paragraph">
                        <h3>Food Restrictions</h3>
                        <div
                            v-for="allergic in user.allergic"
                            :key="allergic.allergicName"
                        >
                            <p class="sub-text">
                                {{ allergic.allergicName }}
                                {{ user.allergic == undefined ? '-' : '' }}
                            </p>
                        </div>
                    </div>
                    <div class="paragraph about-me">
                        <h3>About Me</h3>
                        <p class="sub-text">
                            {{ user.aboutMe }}
                            {{ !user.aboutMe ? '-' : '' }}
                        </p>
                    </div>
                    <div class="btn-wrapper">
                        <button
                            class="editProfile"
                            @click.prevent="editProfile"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import userAPI from '~/api/graphql/user'
import moment from 'moment'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    data() {
        return {
            user: {},
            imgUrl: null,
            isLoading: false,
        }
    },
    components: {
        Loading,
    },
    mounted() {
        this.viewProfile()
    },
    methods: {
        editProfile() {
            this.$router.push('/profile/diner/edit')
        },
        getFormatDate(date) {
            return date ? moment(date).format('DD MMMM YYYY') : null
        },
        viewProfile() {
            this.isLoading = true
            userAPI.getUserById(this.userStore.id).then(res => {
                this.user = res.getUserById
                const setStore = {
                    ...this.userStore,
                }
                this.$store.commit('auth/setAuth', setStore)
                this.isLoading = false
            })
        },
    },
    computed: {
        ...mapState({
            userStore: state => state.auth.auth,
        }),
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
@import '@/styles/modal.scss';

.page-wrapper {
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
                .date-picker-wrapper {
                    input {
                        border: 0;
                    }
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
            .img-wrapper {
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
            label {
                color: $accent;
            }
            .upload-text {
                margin-top: 16px;
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
                    border: 0;
                    padding: 0;
                }
            }
            .paragraph {
                margin-top: 24px;
                width: 45%;
                .sub-text {
                    padding-top: 8px;
                }
            }
            .about-me.paragraph {
                width: 100%;
            }
            .btn-wrapper {
                justify-content: right;
                margin: 14px 14px 14px 0;
                display: flex;
                @include respond-to($phone) {
                    justify-content: center;
                }
            }
        }
    }
}
</style>
