<template>
    <div class="chef-wrapper">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <div class="page-wrapper" v-if="chef && chef.user">
            <section>
                <div class="left-div">
                    <div class="upload-section">
                        <div class="img-wrapper">
                            <img
                                class="profile-img"
                                :src="
                                    userStore
                                        ? userStore.profileImage
                                        : require('~/assets/images/profile.svg')
                                "
                            />
                        </div>
                        <label
                            :style="
                                `${
                                    !user.city || !user.country
                                        ? 'color:#BDBDBD'
                                        : ''
                                }`
                            "
                        >
                            {{
                                !user.city || !user.country
                                    ? 'City,Country'
                                    : ''
                            }}
                            {{ user.city ? user.city + ',' : '' }}
                            {{ user.country ? user.country : '' }}
                        </label>
                        <label class="status"
                            >Status:
                            {{ chef.status.replace(/_/gi, ' ') }}</label
                        >
                    </div>
                    <div class="form left">
                        <div class="row left">
                            <div class="paragraph">
                                <h3>Name</h3>
                                <label>{{
                                    userStore ? userStore.firstName : ''
                                }}</label>
                            </div>
                            <div class="paragraph">
                                <h3>Last Name</h3>
                                <label>{{
                                    userStore ? userStore.lastName : ''
                                }}</label>
                            </div>
                        </div>
                        <div class="paragraph">
                            <h3>Occupation</h3>
                            <label>{{
                                chef.occupation ? chef.occupation : '-'
                            }}</label>
                        </div>
                        <div class="row left">
                            <div class="paragraph">
                                <h3>Birthday</h3>
                                <label>{{
                                    getFormatDate(userStore.birthday)
                                        ? getFormatDate(userStore.birthday)
                                        : '-'
                                }}</label>
                            </div>
                            <div class="paragraph">
                                <h3>Gender</h3>
                                <label>{{
                                    chef.user.gender ? chef.user.gender : '-'
                                }}</label>
                            </div>
                        </div>
                        <div class="row left">
                            <div class="paragraph">
                                <h3>Nationality</h3>
                                <label>{{
                                    chef.user.nationality
                                        ? chef.user.nationality
                                        : '-'
                                }}</label>
                            </div>
                            <div class="paragraph">
                                <h3>Language</h3>
                                <div
                                    v-for="language in chef.user.language"
                                    :key="language.value"
                                >
                                    <p class="sub-text">
                                        {{ language.value }}
                                        {{
                                            chef.user.language == undefined
                                                ? '-'
                                                : ''
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right-div">
                    <div class="headline">
                        <h1>
                            MY PROFILE
                        </h1>
                        <label class="status"
                            >Status:
                            {{ chef.status.replace(/_/gi, ' ') }}</label
                        >
                    </div>
                    <div class="row">
                        <div class="paragraph">
                            <h3>Email Address</h3>
                            <p class="sub-text">
                                {{ chef.user.email ? chef.user.email : '-' }}
                            </p>
                        </div>
                        <div class="paragraph">
                            <h3>Mobile Phone</h3>
                            <label>{{
                                chef.user.phoneNumber
                                    ? chef.user.phoneNumber
                                    : '-'
                            }}</label>
                        </div>
                    </div>
                    <div class="paragraph">
                        <h3>Address</h3>
                        <label
                            >{{ chef.homeNo }} {{ chef.subDistrict }},
                            {{ chef.district }} {{ chef.portalCode }}
                            <span>{{ user.city }},{{ user.country }}</span>
                        </label>
                    </div>
                    <div class="row">
                        <div class="paragraph">
                            <h3>Favorite cuisine</h3>
                            <label>{{
                                chef.favoriteCuisine
                                    ? chef.favoriteCuisine
                                    : '-'
                            }}</label>
                        </div>
                        <div class="paragraph">
                            <h3>Your signature dish</h3>
                            <label>{{
                                chef.signatureDish ? chef.signatureDish : '-'
                            }}</label>
                        </div>
                    </div>
                    <div class="paragraph">
                        <h3>Food Restrictions</h3>
                        <div
                            v-for="allergic in chef.user.allergic"
                            :key="allergic.allergicName"
                        >
                            <label>{{ allergic.allergicName }}</label>
                        </div>
                        <div class="paragraph about-me">
                            <h3>About Me</h3>
                            <p>
                                {{
                                    chef.user.aboutMe ? chef.user.aboutMe : '-'
                                }}
                            </p>
                        </div>
                        <div
                            class="experienceLoop"
                            v-for="(chef_exp, xp_i) in chef.exp"
                            :key="xp_i"
                        >
                            <h3 class="spacer">
                                Experience
                            </h3>
                            <div class="row">
                                <div class="paragraph">
                                    <h3>Cuisine Type</h3>
                                    <label>{{ chef_exp.cuisineType }}</label>
                                </div>
                                <div class="paragraph">
                                    <h3>Year of experience</h3>
                                    <label>{{ chef_exp.expYear }}</label>
                                </div>
                            </div>
                            <div class="paragraph about-me">
                                <h3>About the experience</h3>
                                <p>
                                    {{ chef_exp.aboutExp }}
                                </p>
                            </div>
                        </div>
                        <div class="row btn">
                            <div class="btn-wrapper">
                                <button
                                    class="edit-profile"
                                    @click.prevent="editProfile"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import userAPI from '~/api/graphql/user'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    components: {
        Loading,
    },
    data() {
        return {
            user: {},
            chef: {},
            imgUrl: null,
            isLoading: false,
        }
    },
    mounted() {
        this.isLoading = true
        this.imgUrl = this.user.profileImage
        this.viewChefProfile()
    },
    methods: {
        editProfile() {
            this.$router.push('/profile/chef/edit')
        },
        getFormatDate(date) {
            return moment(date).format('DD MMMM YYYY')
        },
        async viewChefProfile() {
            const user_id = await this.userStore.id
            userAPI.getChefByUserId(user_id).then(response => {
                const data = response.getChefByUserId
                this.chef = { ...data }
                this.user = {
                    ...data.user,
                }
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
        padding-top: 10px;
        display: inline;
    }
    .left-div {
        flex-direction: column;
        align-items: center;
        position: relative;
        display: flex;
        height: auto;
        width: 40%;
        padding: 0 40px 0 20px;
        @include respond-to($phone) {
            width: 100%;
            padding: 0 16px 0;
        }
        label.status {
            display: none;
            color: $accent;
            @include respond-to($phone) {
                display: block;
                text-align: right;
            }
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
                margin-top: 14px;
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
                &:first-child {
                    border-top: 1px solid #800020;
                }
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
            padding: 0 16px 0;
        }
        .headline {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
            border-bottom: 1px solid $accent;
            padding-bottom: 20px;
            h1 {
                @include respond-to($phone) {
                    display: none;
                }
            }
            label {
                border: 0;
                padding-bottom: 0;
                color: $accent;
                @include respond-to($phone) {
                    display: none;
                }
            }
        }
        .border {
            border-bottom: 1px solid #800020;
            padding-bottom: 20px;
            text-align: right;
            color: $accent;
        }
        .spacer.row {
            border-bottom: 1px solid $accent;
            padding: 0 0 32px 0;
        }
        .btn.row {
            justify-content: flex-start;
            margin-bottom: 32px;
            @include respond-to($phone) {
                justify-content: center;
            }
        }
        .paragraph {
            margin-top: 24px;
            width: 100%;
            .sub-text {
                padding-top: 8px;
            }
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
            > input {
                width: 45%;
            }
        }
        .about-me.paragraph {
            width: 100%;
        }
        .btn-wrapper {
            justify-content: center;
            margin: 30px 0 0;
            display: flex;
            .edit-profile {
                padding: 8px 64px;
                @include respond-to($phone) {
                    padding: 8px 8px;
                }
            }
        }
        .row {
            justify-content: space-between;
            position: relative;
            display: flex;
            width: 100%;
        }
    }
}
</style>
