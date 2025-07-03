<template>
    <div class="page-wrapper">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <div class="body-section">
            <div class="header">
                <h1>
                    Event Number
                    {{ pad.paddingWithZero(deep(subevent, 'event.id'), 5) }}
                    (1-{{ deep(subevent, 'event.subevent.length') }})
                </h1>
            </div>
            <h4>
                Event Number
                {{ pad.paddingWithZero(deep(subevent, 'event.id'), 5) }}({{
                    deep(subevent, 'subIndex') + 1
                }})
            </h4>
            <EventDetail
                :subevent="subevent"
                :sizeDiner="sizeDiner"
                :review="review"
                :reviewerNumber="reviewerNumber"
            />
            <div class="diner-list-wrapper">
                <div class="line-red">
                    <h4>Diner</h4>
                </div>
                <div class="diner-list" v-if="reserve.length > 0">
                    <div
                        class="diner"
                        v-for="(item, index) in reserve"
                        :key="index"
                    >
                        <p>
                            {{ index + 1 }}. {{ item.firstName }}
                            {{ item.lastName }}
                        </p>
                        <div class="diner">
                            <p
                                v-for="(allergic, index2) in item.allergic"
                                :key="`allergic-${index2}`"
                                class="allergic-list"
                                :class="{
                                    allergic:
                                        allergic.allergicName !==
                                        'No restriction',
                                }"
                            >
                                {{ allergic.allergicName }},
                            </p>
                        </div>
                    </div>
                </div>
                <div class="diner-list" v-if="reserve.length < 1">
                    <div class="diner">
                        <p>-</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EventDetail from '~/components/EventDetail/EventDetail'
import paddingWithZero from '~/utils/paddingWithZero'
import eventAPI from '~/api/graphql/events'
import _ from 'lodash'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import {
    required,
    minLength,
    email,
    maxLength,
    numeric,
    minValue,
    maxValue,
} from 'vuelidate/lib/validators'
import { method } from 'bluebird'

export default {
    components: {
        EventDetail,
        Loading,
    },
    layout: 'nofooter',
    data() {
        return {
            isLoading: false,
            subevent: null,
            sizeDiner: null,
            reserve: [],
            pad: paddingWithZero,
            reviewerNumber: null,
            review: null,
        }
    },
    mounted() {
        this.isLoading = true
        eventAPI.getSubEventById(this.$route.params.id).then(res => {
            this.subevent = res.getSubEventById
            this.subevent.reserve.forEach(item => {
                if (item.status == 'Confirmed_Seat') {
                    item.join.forEach(join => {
                        this.reserve.push(join)
                    })
                }
            })
            this.sizeDiner = this.reserve.length
            this.isLoading = false
        })
    },
    methods: {
        deep(item, path) {
            return _.get(item, path)
        },
    },
}
</script>
<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
.page-wrapper {
    display: flex;
    justify-content: center;
    .body-section {
        width: 50%;
        h4 {
            color: $accent;
            font-weight: bold;
        }
        .header {
            display: flex;
            justify-content: center;
            margin-top: 56px;
            margin-bottom: 40px;
            p {
                color: $accent;
                font-weight: bold;
            }
        }
        .event-detail-card {
            margin-top: 16px;
        }
        .diner-list-wrapper {
            .line-red {
                border-bottom: 1px solid $accent;
                margin-top: 48px;
                padding-bottom: 8px;
            }
            .diner-list {
                margin-top: 24px;
                .diner {
                    display: flex;
                    justify-content: space-between;
                    .allergic-list {
                        color: $grey;
                        &.allergic {
                            color: $accent;
                        }
                    }
                }
            }
        }
    }
}
</style>
