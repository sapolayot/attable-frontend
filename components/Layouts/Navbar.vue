<template>
    <div class="navbar-wrapper">
        <div
            class="dropdown-wrapper"
            @click.prevent="isShow = false"
            v-if="isShow"
        />
        <div class="nav-inner">
            <nuxt-link to="/">
                <div class="logo">
                    <img class="mobile" src="~/assets/logo2.png" />
                    <img class="desktop" src="~/assets/logo-text.png" />
                </div>
            </nuxt-link>
            <div class="action-buttons" v-if="!user">
                <button class="signup" @click.prevent="method('login')">
                    LOG IN
                </button>
                <button class="login" @click.prevent="method('signupdiner')">
                    SIGN UP
                </button>
                <nuxt-link to="/applytochef">
                    <button class="applytochef">
                        APPLY CHEF
                    </button>
                </nuxt-link>
            </div>
            <div class="logined" v-if="user">
                <button
                    v-if="statusNevbar"
                    class="event-btn"
                    @click.prevent="routing('/events')"
                >
                    BROWSE EVENT
                </button>
                <button
                    v-if="statusNevbar"
                    class="event-btn"
                    @click.prevent="routing('/booking')"
                >
                    MY BOOKING
                </button>
                <button
                    class="event-btn"
                    v-if="user && user.roles[0].id == 3 && statusNevbar"
                    @click.prevent="routing('/event')"
                >
                    MY EVENTS
                </button>
                <div class="dropdown">
                    <div
                        class="user-profile"
                        v-if="user"
                        @click.prevent="isShow = true"
                    >
                        <div class="img-wrapper">
                            <img
                                :src="
                                    user.profileImage
                                        ? user.profileImage
                                        : require('~/assets/images/profile.svg')
                                "
                            />
                        </div>
                        <p class="username">
                            {{ user.firstName }} {{ user.lastName }}
                        </p>
                    </div>
                    <div
                        class="dropdown-content"
                        v-if="isShow"
                        @click.prevent="isShow = false"
                    >
                        <div class="triangle" />
                        <label class="item" @click.prevent="myprofile">
                            MY PROFILE
                        </label>
                        <label
                            class="item last"
                            @click.prevent="routing('/applytochef')"
                            v-if="user.roles[0].id == 2"
                        >
                            APPLY CHEF
                        </label>
                        <label class="item last" @click.prevent="logout">
                            LOG OUT
                        </label>
                    </div>
                </div>
            </div>
            <div class="hamburger" @click.prevent="isShow = !isShow">
                <i class="material-icons" v-if="!user">dehaze</i>
                <div class="user-profile" v-if="user">
                    <div class="img-wrapper">
                        <img
                            :src="
                                user.profileImage
                                    ? user.profileImage
                                    : require('~/assets/images/profile.svg')
                            "
                        />
                    </div>
                </div>
                <div class="dropdown-content" v-if="isShow">
                    <div class="triangle" />
                    <label class="item" @click.prevent="myprofile" v-if="user">
                        MY PROFILE
                    </label>
                    <label
                        class="item"
                        @click.prevent="routing('/events')"
                        v-if="user && user.roles[0].id == 2"
                    >
                        BROWSE EVENT
                    </label>
                    <label
                        class="item last"
                        @click.prevent="routing('/booking')"
                        v-if="user"
                    >
                        MY BOOKING
                    </label>
                    <label
                        class="item last"
                        @click.prevent="routing('/event')"
                        v-if="user && user.roles[0].id == '3'"
                    >
                        MY EVENTS
                    </label>
                    <label
                        class="item"
                        @click.prevent="method('login-mobile')"
                        v-if="!user"
                    >
                        LOG IN
                    </label>
                    <label
                        class="item"
                        @click.prevent="method('signupdiner-mobile')"
                        v-if="!user"
                    >
                        SIGN UP
                    </label>
                    <label
                        class="item"
                        @click.prevent="routing('/applytochef')"
                        v-if="!user || user.roles[0].id == '2'"
                    >
                        APPLY CHEF
                    </label>
                    <label
                        class="item last"
                        @click.prevent="logout"
                        v-if="user"
                    >
                        LOG OUT
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: ['method'],
    data() {
        return {
            isShow: false,
            maxWidth: Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
            ),
        }
    },
    methods: {
        logout() {
            this.$store.commit('auth/resetAuth')
            this.$router.push('/')
        },
        myprofile() {
            if (this.user.roles[0].id == 2) {
                this.$router.push('/profile/diner')
            } else {
                this.$router.push('/profile/chef')
            }
        },
        routing(pageName) {
            this.isShow = false
            this.$router.push(pageName)
        },
    },
    computed: {
        ...mapState({
            user: state => state.auth.auth,
            statusNevbar: state => state.controlNevbar.statusNevbar,
        }),
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
i {
    display: none;
}
.dropdown-wrapper {
    background-color: transparent;
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: 1;
}
.navbar-wrapper {
    width: 100%;
    display: flex;
    position: sticky;
    top: 0;
    background-color: $white;
    box-shadow: $box-shadow;
    z-index: 200;
    .nav-inner {
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        display: flex;
        width: 97%;
        height: $navbarHeight;
        .logo {
            padding: 8px 0;
            .desktop {
                display: block;
                @include respond-to($phone) {
                    display: none;
                }
            }
            .mobile {
                display: none;
                @include respond-to($phone) {
                    display: block;
                }
            }
        }
        .signup,
        .login {
            @include button-outline;
            padding: 8px 15px !important;
        }
        .applytochef {
            padding: 8px 15px !important;
        }
        .logined {
            justify-content: center;
            position: relative;
            text-align: center;
            display: flex;
            > .event-btn {
                margin: auto 0;
                @include button-outline;
                color: black;
                font-weight: 400;
                display: inline-block;
                padding: 0px 10px;
                height: 100%;
                &:hover {
                    color: $accent;
                }
            }
            .user-profile {
                justify-content: space-evenly;
                align-items: center;
                display: flex;
                .img-wrapper {
                    justify-content: center;
                    border-radius: 100%;
                    overflow: hidden;
                    display: flex;
                    height: 48px;
                    width: 48px;
                    margin-right: 10px;
                    img {
                        object-fit: cover;
                        height: 100%;
                        width: 100%;
                    }
                }
                .username {
                    min-width: 120px;
                    display: block;
                }
                &:hover {
                    cursor: pointer;
                }
            }
            .dropdown {
                justify-content: center;
                position: relative;
                text-align: left;
                display: flex;
                margin-left: 10px;
                cursor: pointer;
            }
        }
    }
    .dropdown-content {
        box-shadow: $dropdown-shadow;
        background-color: $white;
        flex-direction: column;
        border-radius: 8px;
        position: absolute;
        display: flex;
        z-index: 1000;
        width: 160px;
        right: 0;
        top: 60px;
        @include respond-to($phone) {
            min-width: 200px;
            top: 55px;
        }
        .triangle {
            $size: 12px;
            $radius: 30%;
            position: absolute;
            top: -($size + 4);
            right: 20px;
            background-color: $white;
            text-align: left;
            width: $size;
            height: $size;
            border-top-right-radius: $radius;
            transform: rotate(-60deg) skewX(-30deg) scale(1, 0.866);
            filter: drop-shadow(1px -1px 1px rgba(0, 0, 0, 0.05));
            @include respond-to($phone) {
                top: -($size + 3);
            }
            &::before {
                content: '';
                position: absolute;
                background-color: inherit;
                width: $size;
                height: $size;
                // border-top-right-radius: $radius;
                transform: rotate(-135deg) skewX(-45deg) scale(1.414, 0.707)
                    translate(0, -50%);
            }
            &:after {
                content: '';
                position: absolute;
                background-color: inherit;
                width: $size;
                height: $size;
                // border-top-right-radius: $radius;
                transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414)
                    translate(50%);
                filter: drop-shadow(0px -1px 1px rgba(0, 0, 0, 0.05));
            }
        }
        .item {
            border-bottom: 1px solid $border;
            padding: 14px 20px;
            cursor: pointer;
            &:hover {
                color: $accent;
            }
            &:last-child {
                border: 0;
            }
        }
    }
    .hamburger {
        display: none;
    }
}
</style>

//Responsive
<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
@include respond-to($phone) {
    i {
        display: block;
        color: $accent;
        cursor: pointer;
    }
    .navbar-wrapper {
        .nav-inner {
            padding: 0 15px;
            margin: 0 0;
            width: 100%;
            height: 56px;
            .logo {
                justify-content: flex-start;
                display: flex;
                padding: 0 0;
                height: 50%;
                margin: 0 0;
                @include respond-to($phone) {
                    height: 100%;
                }
                img {
                    height: 100%;
                    width: 100%;
                }
            }
            .signup,
            .login {
                display: none;
            }
            .applytochef {
                display: none;
                padding: 8px 16px !important;
            }
            .logined {
                display: none;
            }
        }
        .hamburger {
            position: relative;
            display: block;
            display: flex;
            .img-wrapper {
                justify-content: center;
                border-radius: 100%;
                overflow: hidden;
                display: flex;
                height: 32px;
                width: 32px;
                margin-right: 10px;
                img {
                    object-fit: cover;
                    height: 100%;
                    width: 100%;
                }
            }
        }
        .dropdown-content {
            .item {
                border-radius: 0px;
                &:hover,
                &:focus {
                    background-color: $accent;
                    color: $white;
                }
            }
            &:first-child {
                border-top-right-radius: 8px;
                border-top-left-radius: 8px;
            }
            &:last-child {
                border-bottom-right-radius: 8px;
                border-bottom-left-radius: 8px;
                border-bottom: 0;
                text-decoration: none;
                font-weight: 200;
                font-size: 16px;
                color: #333333;
            }
        }
    }
}
</style>
