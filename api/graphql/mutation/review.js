import gql from "graphql-tag"

export const createReviewEvent = gql`
mutation createReviewEvent($reviewEvent: inputReviewEvent,$reserveId: Long, $chefId:Long){
  createReviewEvent(reviewEvent: $reviewEvent,reserveId:$reserveId,chefId:$chefId){
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
