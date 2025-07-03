<template>
    <div class="page-wrapper">
        <div class="banner-slider">
            <Banner :banners="banners" />
        </div>
        <section class="at-table">
            <h3 class="headline">
                WHY BECOME AT TABLE'S CHEF
            </h3>
            <div class="content-blocks">
                <div class="block">
                    <div class="img-wrapper">
                        <img src="~/assets/attable/good.svg" />
                    </div>
                    <p class="content">
                        Post events on your own schedule and get discovered by
                        Diners
                    </p>
                </div>
                <div class="block">
                    <div class="img-wrapper">
                        <img src="~/assets/attable/idea.svg" />
                    </div>
                    <p class="content">
                        Showcase th unique menu and share your creativity to the
                        world
                    </p>
                </div>
                <div class="block">
                    <div class="img-wrapper">
                        <img src="~/assets/attable/guarantee.svg" />
                    </div>
                    <p class="content">
                        Concentrate only on kitchen’s work and leave the rest
                    </p>
                </div>
                <div class="block">
                    <div class="img-wrapper">
                        <img src="~/assets/attable/chef.svg" />
                    </div>
                    <p class="content">
                        Be part of the community and get connected with other
                        talented Chefs
                    </p>
                </div>
            </div>
        </section>
        <div class="block-applytochef">
            <h3>
                <label @click.prevent="clickApplyToChef">CLICK</label> TO APPLY
                FOR CHEF
            </h3>
        </div>
        <section class="diner">
            <h3 class="headline">
                HOW TO HOST AT TABLE?
            </h3>
            <div class="content-blocks">
                <div class="block">
                    <div class="img-wrapper">
                        <img src="~/assets/chef/membership.svg" />
                    </div>
                    <p class="content">
                        Sign up and create profile to let diners know more about
                        you and your creation.
                    </p>
                </div>
                <div class="block">
                    <div class="img-wrapper">
                        <img src="~/assets/chef/brain.svg" />
                    </div>
                    <p class="content">
                        Create AT TABLE’s invitation and set detail that serve
                        your schedule.
                    </p>
                </div>
                <div class="block">
                    <div class="img-wrapper">
                        <img src="~/assets/chef/handshake.svg" />
                    </div>
                    <p class="content">
                        Submit event to At Table team for review and proceed.
                    </p>
                </div>
                <div class="block">
                    <div class="img-wrapper">
                        <img src="~/assets/chef/hand.svg" />
                    </div>
                    <p class="content">
                        Enjoy worry-free hosting to show off your menu and
                        receive payment.
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import Banner from '~/components/Banner/Banner'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            banners: [
                {
                    id: 1,
                    path: '/images/slide1.png',
                    type: 'images',
                },
                {
                    id: 2,
                    path: '/images/slide4.png',
                    type: 'images',
                },
                {
                    id: 3,
                    path: '/images/slide3.png',
                    type: 'images',
                },
            ],
        }
    },
    methods: {
        clickApplyToChef() {
            this.user && this.user.roles[0].id == 2
                ? this.$router.push('/profile/chef/update')
                : this.$modal.show('signupchef')
        },
    },
    components: {
        Banner,
    },
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
.page-wrapper {
    .banner-slider {
        width: 100%;
        img {
            width: 100%;
        }
    }
    .block-applytochef {
        width: 100%;
        height: 140px;
        background-color: $accent;
        display: flex;
        justify-content: center;
        align-items: center;
        h3 {
            font-size: 30px;
            color: $white;
            @include respond-to($phone) {
                font-size: 1.425em;
            }
            label {
                text-decoration: underline;
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
    section {
        &.at-table,
        &.upcomming-events,
        &.diner {
            width: 1200px;
            margin: 60px auto 50px;
            @include respond-to($phone) {
                width: 90%;
            }
            &:first-child,
            &:last-child {
                margin: 56px auto;
            }
            .headline {
                @include title-text(3em);
                text-align: center;
                margin-bottom: 10px;
                @include respond-to($phone) {
                    font-size: 1.425em;
                }
            }
            .content-blocks {
                display: flex;
                flex-wrap: wrap;
                .block {
                    width: 25%;
                    padding: 8px 24px;
                    @include respond-to($phone) {
                        width: 50%;
                        padding: 20px 0;
                        @include body-text(12px);
                    }
                    .img-wrapper {
                        text-align: center;
                        margin: 20px auto;
                        width: 60%;
                        @include respond-to($phone) {
                            margin: 10px auto;
                            width: 64px;
                            height: 64px;
                        }
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .content {
                        text-align: center;
                    }
                }
            }
        }
        @include respond-to($phone) {
            &.diner {
                .content-blocks {
                    flex-direction: column;
                    align-items: center;
                    .block {
                        width: 70%;
                    }
                }
            }
        }
    }
}
</style>
