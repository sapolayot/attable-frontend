import apollo from "./instance"
import {
    bookingEvent,
    cancelReservation,
    autoCancelReservation,
    paymentBooking
} from "./mutation/booking"
import { getBooking, getReservationById } from "./queries/booking"

export default {
    bookingEvent: data => {
        return apollo.client
            .mutate({
                mutation: bookingEvent,
                variables: {
                    inputReservation: {
                        ...data
                    }
                }
            })
            .then(response => {
                return response.data
            })
    },
    getBooking: (page, pagesize) => {
        return apollo.client
            .query({
                query: getBooking,
                variables: {
                    page,
                    pagesize
                }
            })
            .then(response => response.data)
    },
    cancelBooking: id => {
        return apollo.client
            .mutate({
                mutation: cancelReservation,
                variables: {
                    id: id
                }
            })
            .then(response => response.data)
    },
    getReservationById: id => {
        return apollo.client
            .query({
                query: getReservationById,
                variables: {
                    id
                },
                fetchPolicy: 'no-cache'
            })
            .then(response => response.data)
    },
    autoCancelReservation: id => {
        return apollo.client
            .mutate({
                mutation: autoCancelReservation,
                variables: {
                    id: id
                }
            })
            .then(response => response.data)
    },
    paymentBooking: data => {
        return apollo.client
            .mutate({
                mutation: paymentBooking,
                variables: {
                    inputPayment: {
                        ...data
                    }
                }
            })
            .then(response => response.data)
    }
}
