import gql from "graphql-tag"

export const bookingEvent = gql`
mutation bookingEvent($inputReservation:inputReservation){
    bookingEvent(booking:$inputReservation){
        success
        reserve{
            id
            status
            descriptionToKnow
            seatNumber
            reserveDate
            requestingDate
            cancelDate
            user{
                id
                firstName
                lastName
            }
            subevent{
                id
                event{
                    id
                    eventName
                }
            }
            payment{
                id
                paymentMethod
                paymentDate
                refId
                price
                slipUrl
                docUrl
            }
            join{
                id
                firstName
                lastName
            }
        }
    
    }
}
`

export const paymentBooking = gql`
    mutation paymentBooking($inputPayment:inputPayment){
            paymentBooking(payment:$inputPayment){
            success
            error
            reserve{
                id
            }
        }
    }
`

export const cancelReservation = gql`
    mutation cancelReservation($id:Long){
        cancelReservation(id:$id){
        success
        reserve{
            id
            status
            descriptionToKnow
            seatNumber
            reserveDate
            requestingDate
            cancelDate
            user{
                id
                firstName
                lastName
            }
            subevent{
                id
                event{
                    id
                    eventName
                }
            }
            payment{
                id
                paymentMethod
                paymentDate
                refId
                price
                slipUrl
                docUrl
            }
            join{
                id
                firstName
                lastName
            }
        }
    
        }
    }
`

export const autoCancelReservation = gql`
mutation autoCancelReservation($id:Long){
  autoCancelReservation(id:$id){
		success
		error
		reserve{
            id
            status
            descriptionToKnow
            seatNumber
            reserveDate
            requestingDate
            cancelDate
            refundable
            subevent{
                id
            }
            user{
                id
                email
            }
		}
    }
}
`
