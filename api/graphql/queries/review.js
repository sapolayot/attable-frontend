import gql from "graphql-tag"

export const getReviewByChefId = gql`
    query getReviewByChefId($page: Int, $pagesize: Int, $chefId: Long) {
        getReviewByChefId(page: $page, pagesize: $pagesize, chefId: $chefId) {
            totalPage
            totalElement
            reviewevents {
                id
                rate1
                rate2
                rate3
                rate4
                rate5
                rate6
                rate7
                commentDate
                comment
                reserve {
                    id
                    user {
                        id
                        firstName
                        lastName
                    }
                }
            }
        }
    }
`
export const getReviewByReservationId = gql`
    query getReviewByReservationId($reserveId: Long){
        getReviewByReservationId(reserveId:$reserveId){
            id
            rate1
            rate2
            rate3
            rate4
            rate5
            rate6
            rate7
            comment
        }
    }
`
