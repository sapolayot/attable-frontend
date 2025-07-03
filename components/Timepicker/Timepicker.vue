<template>
    <div class="timepicker-wrapper">
        <div class="header">
            <div class="start-time divine">
                <p>Start Time</p>
            </div>
            <div class="end-time divine">
                <p>End Time</p>
            </div>
        </div>
        <div class="picker">
            <div class="hour-wrapper wrapper">
                <div
                    class="hour first"
                    :class="{ selected: firstHour == hour1 }"
                    v-for="(hour1, index) in timeList"
                    :key="index"
                    @click.prevent="selected(hour1, 1)"
                >
                    <p>{{ hourFormat(hour1) }}</p>
                </div>
            </div>
            <div class="minutes-wrapper wrapper">
                <div
                    class="hour second"
                    :class="{
                        selected: parseFloat(secondHour) == parseFloat(hour2),
                        disable:
                            parseFloat(firstHour) > parseFloat(hour2)
                                ? true
                                : false,
                    }"
                    v-for="(hour2, index) in timeList"
                    :key="index"
                    @click.prevent="
                        parseFloat(hour2) >= parseFloat(firstHour)
                            ? selected(hour2, 2)
                            : null
                    "
                >
                    <p>{{ hourFormat(hour2) }}</p>
                </div>
            </div>
        </div>
        <div class="button-group">
            <button
                @click.prevent="
                    $emit('clicked', {
                        first: null,
                        second: null,
                        active: false,
                    })
                "
            >
                Cancel
            </button>
            <button class="ok-button" @click.prevent="confirm">
                OK
            </button>
        </div>
    </div>
</template>

<script>
import moment, { weekdays } from 'moment'
export default {
    data() {
        return {
            firstHour: 1,
            secondHour: 1,
            timeList: [
                '0',
                '0.30',
                '1',
                '1.30',
                '2',
                '2.30',
                '3',
                '3.30',
                '4',
                '4.30',
                '5',
                '5.30',
                '6',
                '6.30',
                '7',
                '7.30',
                '8',
                '8.30',
                '9',
                '9.30',
                '10',
                '10.30',
                '11',
                '11.30',
                '12',
                '12.30',
                '13',
                '13.30',
                '14',
                '14.30',
                '15',
                '15.30',
                '16',
                '16.30',
                '17',
                '17.30',
                '18',
                '18.30',
                '19',
                '19.30',
                '20',
                '20.30',
                '21',
                '21.30',
                '22',
                '22.30',
                '23',
                '23.30',
            ],
        }
    },
    methods: {
        selected(value, temp) {
            if (temp == 1) {
                this.firstHour = value
                if (parseFloat(this.firstHour) > parseFloat(this.secondHour)) {
                    this.secondHour = value
                }
            } else {
                this.secondHour = value
                if (parseFloat(this.firstHour) > parseFloat(this.secondHour)) {
                    this.secondHour = value
                }
            }
        },
        hourFormat(time) {
            return moment(time, ['h.m'])
                .locale('en')
                .format('HH:mm')
        },
        confirm() {
            this.$emit('clicked', {
                first: this.hourFormat(this.firstHour),
                second: this.hourFormat(this.secondHour),
                active: false,
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;

.timepicker-wrapper {
    width: 100%;
    box-shadow: $box-shadow;
    .header {
        background-color: $accent;
        color: $white;
        padding: 12px;
        display: flex;
        justify-content: space-between;
        .divine {
            text-align: center;
            width: 50%;
        }
        > p {
            font-size: 12px;
        }
        .header-row {
            > p {
                font-size: 1.5em;
            }
        }
    }
    .picker {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        height: 150px;
        .wrapper {
            overflow: scroll;
            text-align: center;
            flex: 0 50%;
            display: flex;
            flex-direction: column;
            p {
                cursor: pointer;
            }
        }
        .selected {
            p {
                color: $accent;
                font-weight: 600;
            }
        }
        .disable {
            p {
                color: $disable;
            }
        }
    }
    .button-group {
        display: flex;
        justify-content: flex-end;
        button {
            background-color: transparent;
            border: 0;
            color: $accent;
            padding: 0;
            margin: 8px 12px;
            font-weight: 600;
        }
    }
}
</style>
