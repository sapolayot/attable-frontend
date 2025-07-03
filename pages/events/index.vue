<template>
    <div class="event-wrapper">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <div class="input-wrapper">
            <div class="input-search">
                <img src="~/assets/search.svg" />
                <input
                    type="text"
                    placeholder="Search for city, chef name , event type , event name"
                    v-model="searchText"
                />
            </div>
            <div class="filter-wrapper" @click.prevent="isShow = !isShow">
                <img src="@/assets/icons/filter_list.svg" />
                <div class="dropdown">
                    <div class="dropdown-content" v-if="isShow">
                        <label
                            class="item"
                            @click.prevent="clickFilter('allEvent')"
                        >
                            ALL EVENTS
                        </label>
                        <label
                            class="item"
                            @click.prevent="clickFilter('featured')"
                        >
                            FEATURED EVENTS
                        </label>
                        <label
                            class="item"
                            @click.prevent="clickFilter('upcoming')"
                        >
                            UPCOMING EVENT
                        </label>
                        <label
                            class="item"
                            @click.prevent="clickFilter('special')"
                        >
                            SPECIAL TABLES
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="event-card-wrapper">
            <h3>{{ title }}</h3>
            <div class="event-card-list">
                <div
                    class="event-card"
                    v-for="(event, index) in filterByFilterOption"
                    :key="index"
                >
                    <EventCard :event="event" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import EventCard from '~/components/Events/EventCard'
import filterByFilterOption from '~/mixins/eventsWithSearch'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    mixins: [filterByFilterOption],
    components: {
        EventCard,
        Loading,
    },
    layout: 'fullHeight',
    data() {
        return {
            title: 'ALL Events',
            isShow: false,
        }
    },
    mounted() {
        this.title = this.$route.query.title
            ? this.$route.query.title
            : this.title
    },
    computed: {},
}
</script>
<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
.event-wrapper {
    .input-wrapper {
        display: flex;
        justify-content: center;
        margin: 90px 0 40px;
        @include respond-to($phone) {
            margin: 40px 0 40px;
        }
        .input-search {
            display: flex;
            width: 80%;
            border: 1px solid $accent;
            padding: 8px 20px;
            border-radius: 30px;
            margin-right: 25px;
            @include respond-to($phone) {
                margin: 10px;
            }
            input {
                border: none;
                width: 80%;
                text-overflow: ellipsis;
            }
        }
        .filter-wrapper {
            align-self: center;
            &:hover {
                cursor: pointer;
            }
        }
    }
    .dropdown {
        position: relative;
        .dropdown-content {
            box-shadow: $dropdown-shadow;
            background-color: $white;
            flex-direction: column;
            border-radius: 8px;
            position: absolute;
            display: flex;
            z-index: 1000;
            width: 150px;
            @include respond-to($phone) {
                min-width: 200px;
                top: 55px;
            }
            .item {
                font-size: 14px;
                padding: 10px 16px;
                cursor: pointer;
                &:hover {
                    color: $accent;
                }
                &:last-child {
                    border: 0;
                }
            }
        }
    }
    .event-card-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 105px;
        width: 100%;
        h3 {
            text-transform: uppercase;
            text-align: center;
        }
        .event-card-list {
            display: flex;
            flex-wrap: wrap;
            width: 85%;
            margin-top: 60px;
            align-self: center;
        }
        .event-card {
            width: 33%;
            flex-grow: 0;
            @include respond-to($phone) {
                width: 100%;
            }
            @include respond-to('(min-width: 1599px)') {
                width: 25%;
            }
        }
    }
}
</style>
