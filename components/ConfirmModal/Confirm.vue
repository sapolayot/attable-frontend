<template>
    <modal
        name="confirm"
        class="confirmModal"
        :height="maxWidth <= 480 ? '80%' : maxWidth <= 1440 ? 'auto' : '60%'"
        :width="maxWidth >= 480 ? '60%' : '100%'"
        :scrollable="true"
        @closed="closed ? returnHome : null"
    >
        <loading
            :active.sync="isLoading"
            :can-cancel="true"
            :is-full-page="fullPage"
        />
        <section class="content">
            <div class="close-btn">
                <button class="btn" @click="$modal.hide('confirm')">
                    <i class="material-icons">close</i>
                </button>
            </div>
            <div class="logo">
                <img src="~/assets/logo.png" />
            </div>
            <div class="main-content-wrap">
                <h4 v-if="title">
                    {{ title }}
                </h4>
                <div
                    class="content-texts-cancel"
                    v-if="subCancel"
                    v-html="subCancel"
                />
                <div class="content-texts" v-if="subtitle" v-html="subtitle" />
            </div>
            <div class="button-list">
                <div class="row button">
                    <button
                        class="returnbtn outline"
                        @click="$modal.hide('confirm')"
                    >
                        Return
                    </button>
                    <button class="confirmbtn" @click="clicked">
                        Confirm
                    </button>
                </div>
            </div>
        </section>
    </modal>
</template>

<script>
import api from '~/api/rest/api'
// import firebase from 'firebase'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import moment from 'moment'
export default {
    props: ['toggleModal', 'title', 'subtitle', 'closed', 'subCancel'],
    data() {
        return {
            email: '',
            password: '',
            isLoading: false,
            fullPage: true,
            showError: false,
            email_error: false,
            password_error: null,
            maxWidth: Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
            ),
        }
    },
    validations: {
        email: {
            required,
        },
        password: {
            required,
        },
    },
    components: {
        Loading,
    },
    methods: {
        clicked() {
            this.$emit('clicked')
        },
        returnHome() {
            this.$router.push('/')
        },
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

.confirmModal {
    // overflow-x: scroll;
    .content {
        display: flex;
        flex-direction: column;
        align-content: center;
        text-align: center;
    }
    .main-content-wrap {
        margin-top: 40px;
        @include respond-to($phone) {
            overflow-y: scroll;
            height: 200px;
            margin: 0;
        }
        .content-texts {
            padding: 0 10%;
            //margin-top: 40px;
            font-size: 20px;
            color: $light-grey;
            overflow-y: scroll;
            height: 200px;
            @include respond-to($phone) {
                padding: 5%;
                margin-top: 4px;
            }
        }
        .content-texts-cancel {
            padding: 0 20%;
            //margin-top: 40px;
            font-size: 20px;
            color: $light-grey;
            //overflow-y: scroll;
            //height: 200px;
            @include respond-to($phone) {
                padding: 5%;
                margin-top: 4px;
            }
        }
        h4 {
            @include title-text(2em);
            color: $black;
        }
    }
    .row {
        display: flex;
        padding: 0 20%;
        justify-content: space-evenly;
        @include respond-to($phone) {
            padding: 5%;
            margin-top: 4px;
        }
    }
    .button-list {
        padding: 0 20%;
        margin: 75px 0;
        @include respond-to($phone) {
            padding: 5%;
            margin-top: 4px;
        }
    }
    .btn {
        margin: 0;
        padding: 0;
        border: 0;
        background-color: transparent;
        color: $light-grey;
        @include respond-to($phone) {
            padding: 5%;
        }
    }
    .close-btn {
        align-items: flex-end;
        display: flex;
        justify-content: flex-end;
        margin: 24px 24px 0 0;
    }
}
</style>
