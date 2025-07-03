import apollo from "./instance"
import { createEvent, editEvent, editSubEvent, editEventStatus, editSubEventStatus } from "./mutation/events"
import { getEvents, getEventById, getSubEventById } from "./queries/events"

export default {
    createEvent: event => {
        return apollo.client
            .mutate({
                mutation: createEvent,
                variables: event
            })
            .then(response => {
                return response.data
            })
    },
    getEvents: (page, pagesize) => {
        return apollo.client
            .query({
                query: getEvents,
                variables: {
                    page,
                    pagesize
                },
                fetchPolicy: 'no-cache'
            })
            .then(response => response.data)
    },
    editEvent: event => {
        return apollo.client
            .mutate({
                mutation: editEvent,
                variables: event
            })
            .then(response => {
                return response.data
            })
    },
    getEventById: id => {
        return apollo.client
            .query({
                query: getEventById,
                variables: {
                    id
                },
                fetchPolicy: 'no-cache'
            })
            .then(response => response.data)
    },
    getSubEventById: id => {
        return apollo.client
            .query({
                query: getSubEventById,
                variables: {
                    id
                },
                fetchPolicy: 'no-cache'
            })
            .then(response => response.data)
    },
    editSubEvent: event => {
        return apollo.client
            .mutate({
                mutation: editSubEvent,
                variables: {
                    inputSubEvent: {
                        ...event
                    }
                }
            })
            .then(response => {
                return response.data
            })
    },
    cancelEvent: id => {
        return apollo.client
            .mutate({
                mutation: editEventStatus,
                variables: {
                    id: id
                }
            })
            .then(response => {
                return response.data
            })
    },
    cancelSubEvent: (id, reasonCancel) => {
        const data = {
            id: id,
            reasonCancel: reasonCancel
        }
        return apollo.client
            .mutate({
                mutation: editSubEventStatus,
                variables: data
            })
            .then(response => {
                return response.data
            })
    }
}
