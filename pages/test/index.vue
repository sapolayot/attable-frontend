<template>
    <div>
        <input v-model="repeat">
        <p>Date: {{ date }}</p>
    </div>
</template>
<script>
import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)
export default {
    data() {
        return {
            start: '12-11-2019',
            end: '30-12-2019',
            repeat: null,
            date: [],
            weekday: [],
            temp: []
        }
    },
    watch: {
        repeat () {
            const startDay = new Date(moment(this.start, 'DD-MM-YYYY').format('YYYY-MM-DD'))
            const endDay = new Date(moment(this.end, 'DD-MM-YYYY').format('YYYY-MM-DD'))
            const startDateForLoop = new Date(startDay)
            const repeatDate = [ 1 ]
            while (startDateForLoop <= endDay) {
                startDateForLoop.setDate(startDateForLoop.getDate() + 1)
                if (repeatDate.includes(startDateForLoop.getDay())) {
                    this.date.push(moment(startDateForLoop).format('ddd, DD-MM-YYYY'))
                }
            }

        }
    }
}
</script>
