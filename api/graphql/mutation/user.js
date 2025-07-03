import gql from "graphql-tag"

export const updateProfileDiner = gql`
    mutation updateProfileDiner($inputUser: inputUser) {
        updateProfileDiner(user: $inputUser) {
            success
            user {
                id
                firstName
                lastName
                email
                gender
                birthday
                registeredDate
                phoneNumber
                roles {
                    id
                    roleName
                }
                city
                country
                nationality
                language {
                    id
                    value
                }
                profileImage
                isFacebookUser
                status
                aboutMe
                allergic {
                    id
                    allergicName
                }
            }
        }
    }
`
export const editProfileDiner = gql`
    mutation editProfileDiner($inputUser: inputUser) {
        editProfileDiner(user: $inputUser) {
            success
            user {
                id
                firstName
                lastName
                email
                gender
                birthday
                registeredDate
                phoneNumber
                roles {
                    id
                    roleName
                }
                city
                country
                nationality
                language {
                    id
                    value
                }
                profileImage
                isFacebookUser
                status
                aboutMe
                allergic {
                    id
                    allergicName
                }
            }
        }
    }
`
export const updateProfileChef = gql`
    mutation updateProfileChef($inputChef: inputChef) {
        updateProfileChef(chef: $inputChef) {
            success
            user {
                id
                firstName
                lastName
                email
                gender
                birthday
                registeredDate
                phoneNumber
                roles {
                    id
                    roleName
                }
                city
                country
                nationality
                language {
                    id
                    value
                }
                profileImage
                isFacebookUser
                status
                aboutMe
                chef {
                    id
                    homeNo
                    street
                    subDistrict
                    district
                    postalCode
                    occupation
                    favoriteCuisine
                    signatureDish
                    passportId
                    passportUrl
                    status
                    acc {
                        accountName
                        accountNumber
                        bankName
                        branch
                        bankStatementUrl
                    }
                    exp {
                        cuisineType
                        expYear
                        aboutExp
                    }
                }
                allergic {
                    id
                    allergicName
                }
            }
        }
    }
`
export const editProfileChef = gql`
   mutation editProfileChef($inputChef:inputChef){
  editProfileChef(chef:$inputChef){
		success
        user{
            id
            firstName
            lastName
            email
            gender
            birthday
            registeredDate
            phoneNumber
            roles{
                id
                roleName
            }
            city
            country
            nationality
            language{
                id
                value
            }
            profileImage
            isFacebookUser
            status
            aboutMe
            chef{
                id
                homeNo
                street
                subDistrict
                district
                postalCode
                occupation
                favoriteCuisine
                signatureDish
                passportId
                passportUrl
                status
                acc{
                    id
                    accountName
                    accountNumber
                    bankName
                    branch
                    bankStatementUrl
                }
                exp{
                    id
                    cuisineType
                    expYear
                    aboutExp
                }
            }
            allergic{
                id
                allergicName
            }
        }
    }
}
`
export const createInquiry = gql`
mutation createContact($contactUs: inputContactUs){
    createContact(contactUs: $contactUs){
      id
      name
      email
      phoneNumber
      subject
      messages
      contactDate
    }
  }
`

