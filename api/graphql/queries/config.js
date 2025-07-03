import gql from "graphql-tag"

export const getConfig = gql`
query getConfig{
    getConfig{
      eventReview
      eventRelease
      eventPrepare
      emailMinimumSeat
      emailConfirmSeat
    }
  }
`
