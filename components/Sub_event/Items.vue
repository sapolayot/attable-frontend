<template>
    <div class="component-wrapper" v-if="tabsItems">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <div
            class="tab-items"
            v-for="(tabiItem, index) in tabsItems"
            :key="index"
        >
            <div class="tab-item">
                <div class="row left content">
                    <div class="left row content">
                        <div class="top">
                            <p class="top-label">
                                Event Number
                                {{ paddingWithZero.paddingWithZero(id, 5) }} ({{
                                    tabiItem.subIndex + 1
                                }})
                            </p>
                        </div>
                        <p
                            class="book-number"
                            @click="
                                $router.push(
                                    `/event/sub_event/diner/${tabiItem.id}`
                                )
                            "
                        >
                            {{
                                tabiItem.bookedSeat ? tabiItem.bookedSeat : 0
                            }}
                            Booked
                        </p>
                    </div>
                    <p class="status">
                        Status:
                        {{
                            tabiItem.status.replace('_', ' ').replace('_', ' ')
                        }}
                    </p>
                </div>
                <div class="row space-between f16 t24">
                    <div class="center content f20">
                        <p class="top-label">
                            Date
                        </p>
                        <div class="f16 t24 input" v-if="cancel">
                            <span class="text">{{ dateFormat[index] }}</span>
                        </div>
                        <div class="date-picker-wrapper" v-if="!cancel">
                            <div class="icon-wrapper">
                                <i class="material-icons date-icon">event</i>
                            </div>
                            <div>
                                <v-date-picker
                                    v-model="tabsItems[index].eventDate"
                                    :min-date="createMindatePicker()"
                                    locale="en"
                                    color="red"
                                    :popover="{ visibility: 'click' }"
                                    class="date-picker"
                                    mode="single"
                                >
                                    <input
                                        :disabled="
                                            tabiItem.status == 'In_progress'
                                        "
                                        class="date-picker input"
                                        id="date"
                                        v-model="dateFormat[index]"
                                        readonly
                                        @click="putChangeValue(index)"
                                    />
                                </v-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="center content f20" v-if="timepick[index]">
                        <p class="top-label">
                            Time
                        </p>
                        <div class="f16 t24 input" v-if="cancel">
                            <span class="text">{{ showTime[index] }}</span>
                        </div>
                        <div>
                            <input
                                :disabled="tabiItem.status == 'In_progress'"
                                class="event-name input"
                                v-if="!cancel"
                                readonly
                                @click.prevent="
                                    pickTime(index), putChangeValue(index)
                                "
                                v-model="showTime[index]"
                            />
                        </div>
                        <Timepicker
                            @clicked="
                                clicked($event, index), putChangeValue(index)
                            "
                            v-if="timepick[index].active && !cancel"
                        />
                    </div>
                    <div class="center content f20">
                        <p class="top-label">
                            Max no. of seat
                        </p>
                        <div class="f16 t24 input" v-if="cancel">
                            <span class="text">{{ tabiItem.maxSeat }}</span>
                        </div>
                        <div>
                            <input
                                :disabled="tabiItem.status == 'In_progress'"
                                type="number"
                                :class="{
                                    'error-input':
                                        $v.tabsItems.$each.$iter[index].maxSeat
                                            .$error,
                                }"
                                v-model="tabiItem.maxSeat"
                                v-if="!cancel"
                                @click="putChangeValue(index)"
                            />
                        </div>
                        <span
                            class="error-text"
                            v-if="
                                $v.tabsItems.$each.$iter[index].maxSeat.$error
                            "
                            >Please fill the required field.</span
                        >
                        <span
                            class="error-text"
                            v-if="
                                (!$v.tabsItems.$each.$iter[index].maxSeat
                                    .minValue ||
                                    !$v.tabsItems.$each.$iter[index].maxSeat
                                        .numeric ||
                                    tabiItem.maxSeat < tabiItem.minSeat) &&
                                    $v.tabsItems.$each.$iter[index].maxSeat
                                        .$error
                            "
                        >
                            Error found! Please recheck
                        </span>
                    </div>
                    <div class="center content f20">
                        <p class="top-label">
                            Min no. of seat
                        </p>
                        <div class="f16 t24 input" v-if="cancel">
                            <span class="text">{{ tabiItem.minSeat }}</span>
                        </div>
                        <div>
                            <input
                                :disabled="tabiItem.status == 'In_progress'"
                                type="number"
                                :class="{
                                    'error-input':
                                        $v.tabsItems.$each.$iter[index].minSeat
                                            .$error,
                                }"
                                v-model="tabiItem.minSeat"
                                v-if="!cancel"
                                @click="putChangeValue(index)"
                            />
                        </div>
                        <span
                            class="error-text"
                            v-if="
                                $v.tabsItems.$each.$iter[index].minSeat.$error
                            "
                            >Please fill the required field.</span
                        >
                        <span
                            class="error-text"
                            v-if="
                                !$v.tabsItems.$each.$iter[index].minSeat
                                    .minValue ||
                                    !$v.tabsItems.$each.$iter[index].minSeat
                                        .numeric ||
                                    parseInt(tabiItem.maxSeat) <
                                        parseInt(tabiItem.minSeat)
                            "
                        >
                            Error found! Please recheck
                        </span>
                    </div>
                    <div class="center content f20" v-if="cancel">
                        <p class="top-label">
                            Price
                        </p>
                        <div class="f16 t24 input">
                            <span class="text"
                                >THB
                                {{
                                    CurrencyFormatter.CurrencyFormatter(
                                        tabiItem.bookedSeat
                                            ? tabiItem.bookedSeat * price
                                            : 0
                                    )
                                }}</span
                            >
                        </div>
                    </div>
                    <div class="right content f20" v-if="!cancel">
                        <div class="label">
                            <button
                                @click="editSubEvent(index)"
                                :disabled="checkChangeValue(index)"
                            >
                                Save Change
                            </button>
                            <button
                                @click.prevent="
                                    $router.push(
                                        `/event/cancel_event/${tabiItem.id}`
                                    )
                                "
                                :disabled="tabiItem.status == 'In_progress'"
                            >
                                Cancel Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DropdownSingle from '~/components/Dropdown/DropdownSingle'
import paddingWithZero from '~/utils/paddingWithZero'
import Timepicker from '~/components/Timepicker/Timepicker'
import moment from 'moment'
import CurrencyFormatter from '~/utils/currencyFormatter'
import eventAPI from '~/api/graphql/events'
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
export default {
    props: ['tabsItems', 'toggleModal', 'switched', 'id', 'price', 'active'],
    data() {
        return {
            showTime: [],
            uploadShow: true,
            timepick: [],
            date: new Date(),
            time: [],
            cancel: false,
            paddingWithZero: paddingWithZero,
            CurrencyFormatter: CurrencyFormatter,
            booked: [],
            validButton: [],
            isLoading: false,
        }
    },
    validations: {
        tabsItems: {
            $each: {
                maxSeat: {
                    required,
                    minValue: minValue(1),
                    numeric,
                },
                minSeat: {
                    required,
                    minValue: minValue(1),
                    numeric,
                },
            },
        },
        showTime: { required },
    },
    components: {
        Timepicker,
        Loading,
    },
    mounted() {
        this.isLoading = true
        this.countBooked()
        const status = {
            0: ['Approved', 'In_progress'],
            1: ['Pending_for_confirm', 'Hold_Payment', 'Completed'],
            2: ['Cancel_Requesting', 'Pending', 'Cancelled'],
        }
        this.cancel = this.$route.query.cancel
        this.tabsItems.forEach(item => {
            this.time.push({
                start: item.startTime,
                end: item.endTime,
            })
            this.showTime.push(
                `${moment(item.startTime, 'hh:mm').format('h:mmA')} - ${moment(
                    item.endTime,
                    'hh:mm'
                ).format('h:mmA')}`
            )
            this.timepick.push({
                first: item.startTime,
                second: item.endTime,
                active: false,
            }),
                this.booked.push(!item.maxSeat == item.currentSeat)
        })
        this.tabsItems = this.tabsItems.filter(each =>
            status[`${this.active}`].includes(each.status)
        )
        this.isLoading = false
    },
    methods: {
        createMindatePicker() {
            let date = new Date()
            date.setDate(date.getDate() + 22)
            return date
        },
        putChangeValue(index) {
            if (
                this.tabsItems[index].bookedSeat == 0 &&
                this.tabsItems[index].status == 'Approved'
            ) {
                this.validButton.push(index)
            }
        },
        checkChangeValue(index) {
            const checkValue = this.validButton.filter(
                _validButton => _validButton === index
            )
            return checkValue.length ? false : true
        },
        goSub(index) {
            this.$router.push(`/event/sub_event/${this.$route.params.id}`)
        },
        countBooked() {
            this.tabsItems.map(each => {
                each.bookedSeat = 0
                each.reserve.map(e => {
                    if (e.status === 'Confirmed_Seat') {
                        each.bookedSeat = each.bookedSeat + e.join.length
                    }
                })
            })
        },
        clicked(item, i) {
            if (item.first != null) {
                this.time[i].start = `${item.first}`
                this.time[i].end = `${item.second}`
                this.showTime[i] = `${moment(this.time[i].start, ['h.mm'])
                    .locale('en')
                    .format('h:mmA')} - ${moment(this.time[i].end, ['h.mm'])
                    .locale('en')
                    .format('h:mmA')}`
                this.timepick[i].first = item.first
                this.timepick[i].second = item.second
                this.timepick[i].active = false
            } else {
                this.timepick[i].active = false
            }
        },
        pickTime(index) {
            this.timepick[index].active = true
        },
        editSubEvent(index) {
            this.$v.$touch()
            if (
                this.$v.$invalid ||
                this.tabsItems[index].maxSeat < this.tabsItems[index].minSeat
            ) {
                return false
            }
            const sub_event = {
                id: this.tabsItems[index].id,
                startTime: this.time[index].start,
                endTime: this.time[index].end,
                currentSeat: this.tabsItems[index].maxSeat,
                eventDate: moment(this.tabsItems[index].eventDate).format(
                    'DD-MM-YYYY'
                ),
                maxSeat: this.tabsItems[index].maxSeat,
                minSeat: this.tabsItems[index].minSeat,
            }
            this.isLoading = true
            eventAPI.editSubEvent(sub_event).then(res => {
                alert('Save change success.')
                this.validButton = []
                //this.$router.push(`/event`)
                this.isLoading = false
            })
        },
        close(modalName) {
            this.$modal.toggle(modalName)
        },
    },
    computed: {
        dateFormat: function() {
            return this.tabsItems.map(item => {
                return moment(item.eventDate).format('DD MMM YYYY')
            })
        },
    },
    watch: {
        // tabiItem: {
        //     handler: function (newValue) {
        //         console.log("wwaadasd", newValue.maxSeat)
        //     }
        // },
        // deep: true
        tabsItems(value) {
            this.tabsItems = value
        },
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
// .component-wrapper{
//     overflow: scroll;
// }
p {
    font-size: 24px;
    &.text {
        font-size: 16px;
    }
}
.row {
    display: flex;
}
.header {
    text-align: left;
    padding: 0 140px;
    .title {
        color: $accent;
        font-weight: 600;
    }
    .upper {
        display: flex;
        margin: 12px 0;
        align-items: center;
        > button {
            background-color: $white;
            color: $accent;
            font-weight: 600;
            font-size: 14px;
            margin-left: 46px;
        }
    }
}
.tab-items {
    border-bottom: 1px solid $accent;
    padding: 46px 0;
    .tab-item {
        justify-content: space-between;
        padding: 0 140px;
        .row {
            display: flex;
        }
        .space-between {
            justify-content: space-between;
        }
        .f16 {
            p {
                font-size: 20px;
            }
            button {
                font-size: 16px;
            }
        }
        .f20 {
            flex: 0 18%;
        }
        .t24 {
            margin-top: 24px;
        }
        .time-picker {
            display: none;
        }
        .showTimePicker {
            display: block;
        }
        .spacer {
            border-bottom: 1px solid $border;
        }
        .date-picker-wrapper {
            display: flex;
            text-align: center;
            align-items: center;
            border-bottom: 1px solid $border;
            &:hover {
                border-bottom: 1px solid $accent;
            }
            .date-icon {
                align-items: center;
                padding: 0;
                margin-top: 9px;
            }
            .date-picker {
                align-items: center;
                flex: 0 100%;
                padding-bottom: 0;
                // padding-top: 6.5px;
                // padding-left: 16px;
                padding: 8px;
                > input {
                    width: 100%;
                    border: 0;
                }
            }
        }
        .content {
            .top-label {
                margin-bottom: 12px;
                color: $accent;
            }
            align-self: flex-end;
        }
        .left.content {
            text-align: left;
            color: $accent;
            align-items: center;
            display: flex;
            justify-content: space-between;
            .top-label {
                font-weight: 600;
                color: $black;
            }
            .book-number {
                font-size: 16px;
                margin-left: 66px;
                cursor: pointer;
            }
            .status {
                font-size: 16px;
                right: 0;
            }
        }
        .center.content {
            text-align: left;
            .chef {
                display: flex;
                .chef-img {
                    height: 24px;
                    width: 24px;
                    img {
                        border-radius: 100%;
                        object-fit: cover;
                        height: 100%;
                        width: 100%;
                    }
                }
                .bottom-label {
                    color: $light-grey;
                    margin-left: 8px;
                }
            }
        }
        .right.content {
            text-align: left;
            .icon {
                margin-right: 16px;
                height: 24px;
                width: 24px;
                img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
            }
            .bottom-label {
                color: $dark-grey;
            }
            .label {
                display: flex;
                flex-direction: column;
            }
        }
    }
    button {
        margin: 2px;
    }
}

input:disabled {
    background: #fff;
    color: rgba(0, 0, 0, 0.3);
}
</style>
