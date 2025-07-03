import gql from "graphql-tag"

export const getListAllergics = gql`
    query getListAllergics {
        getListAllergics {
            id
            allergicName
        }
    }
`
