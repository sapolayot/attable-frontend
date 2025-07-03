import apollo from "./instance"
import { createReviewEvent } from "./mutation/review"
import { getReviewByChefId, getReviewByReservationId } from "./queries/review"

export default {
    reviewSubEvent: (review) => {
        return apollo.client
            .mutate({
                mutation: createReviewEvent,
                variables: review
            })
            .then(response => {
                return response.data
            })
    },
    getReviewByChefId: (page, pagesize, chefId) => {
        return apollo.client
            .query({
                query: getReviewByChefId,
                variables: {
                    page,
                    pagesize,
                    chefId
                },
                fetchPolicy: 'no-cache'
            })
            .then(response => response.data)
    },
    getReviewByReservationId: (reserveId) => {
        return apollo.client
            .query({
                query: getReviewByReservationId,
                variables: {
                    reserveId: reserveId
                },
                fetchPolicy: 'no-cache'
            })
            .then(response => response.data)
    },
}
