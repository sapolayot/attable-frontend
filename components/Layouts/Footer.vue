<template>
    <div class="footer-wrapper">
        <div class="footer-inner">
            <div class="wrapper">
                <ul class="footer-menu">
                    <li
                        class="menu"
                        @click.prevent="$modal.show('signupdiner')"
                    >
                        <nuxt-link to="">
                            Diner Sign up
                        </nuxt-link>
                    </li>
                    <li class="menu">
                        <nuxt-link to="/applytochef">
                            APPLY CHEF
                        </nuxt-link>
                    </li>
                    <li class="menu">
                        <nuxt-link to="/faq">
                            FAQ
                        </nuxt-link>
                    </li>
                    <li class="menu">
                        <nuxt-link to="/contact">
                            Contact Us
                        </nuxt-link>
                    </li>
                </ul>
                <p class="copy-right">
                    <label
                        >Copyright © 2019 At Table All rights reserved.</label
                    >
                </p>
            </div>
            <a href="https://www.facebook.com/attable.thailand/">
                <img src="~/assets/flogo.svg" alt="fb-logo" />
            </a>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            user: state => state.auth.auth,
        }),
    },
}
</script>
<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
.footer-wrapper {
    width: 100%;
    padding: 40px 50px;
    height: $footerHeight;
    background-color: $footer-color;
    @include respond-to($phone) {
        padding: 16px;
        height: auto;
    }
    .footer-inner {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
        @include respond-to($phone) {
            flex-direction: row;
            position: relative;
        }
        .wrapper {
            width: 100%;
            display: flex;
            justify-content: space-between;
            @include respond-to($phone) {
                flex-direction: column;
            }
            .footer-menu {
                list-style: none;
                display: flex;
                @include respond-to($phone) {
                    padding: 0;
                    flex-wrap: wrap;
                    width: 75%;
                    align-self: start;
                    flex-flow: column wrap;
                    height: 60px;
                }
                * {
                    @include respond-to($phone) {
                        width: 50%;
                    }
                }
                .menu {
                    @include body-text(14px);
                    padding: 0 30px;
                    text-transform: uppercase;
                    @include respond-to($phone) {
                        padding: 5px 0;
                    }
                    a {
                        text-decoration: none;
                        color: black;
                        @include respond-to($phone) {
                            font-size: 14px;
                        }
                    }
                }
            }
            .copy-right {
                display: flex;
                justify-content: stretch;
                align-items: center;
                label {
                    padding: 0 67px;
                    @include respond-to($phone) {
                        font-size: 14px;
                        padding: 24px 0 0 0;
                    }
                }
            }
        }
        img {
            padding-right: 60px;
            @include respond-to($phone) {
                padding: 0;
                position: absolute;
                top: 8px;
                right: 4px;
            }
        }
    }
}
</style>
