import gql from "graphql-tag"

export const createEvent = gql`
    mutation createEvent($inputEvent: inputEvent) {
        createEvent(event: $inputEvent) {
            success
            event {
                id
            }
        }
    }
`
export const editEvent = gql`
    mutation editEvent($inputEvent: inputEvent) {
        editEvent(event: $inputEvent) {
            success
            event {
                id
            }
        }
    }
`

export const editSubEvent = gql`
    mutation editSubEvent($inputSubEvent: inputSubEvent) {
        editSubEvent(subEvent: $inputSubEvent) {
            success
            subEvent {
                id
                currentSeat
                startTime
                endTime
                maxSeat
                minSeat
                cancelDate
                eventDate
                status
                event {
                    id
                    eventName
                }
            }
        }
    }
`

export const editEventStatus = gql`
    mutation cancelEvent($id: Long) {
        cancelEvent(id: $id) {
            success
            event {
                id
            }
        }
    }
`

export const editSubEventStatus = gql`
    mutation cancelSubEvent($id: Long, $reasonCancel: String) {
        cancelSubEvent(id: $id, reasonCancel: $reasonCancel) {
            success
            subEvent {
                id
            }
        }
    }
`
