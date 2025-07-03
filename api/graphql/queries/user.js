import gql from "graphql-tag"

export const getUserById = gql`
    query getUserById($id: Long) {
        getUserById(id: $id) {
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
            allergic {
                id
                allergicName
            }
            reserve{
                id
                status
                descriptionToKnow
                seatNumber
                reserveDate
                requestingDate
                cancelDate
                reviewEvent{
                    id
                    rate1
                    rate2
                    rate3
                    rate4
                    rate5
                    rate6
                    rate7
                    comment
                    chef{
                      id
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
                subevent{
                    id
                    startTime
                    endTime
                    eventDate
                    event{
                        id
                        eventName
                        chef {
                            id
                            user{
                                id
                                firstName
                                lastName
                                profileImage
                            }
                        }
                    }
                }
            }
            aboutMe
        }
    }
`
export const getChefByUserId = gql`
    query getChefByUserId($id: Long) {
        getChefByUserId(id: $id) {
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
                id
                accountName
                accountNumber
                bankName
                branch
                bankStatementUrl
            }
            exp {
                id
                cuisineType
                expYear
                aboutExp
            }
            event{
                id
                eventName
                eventType
                media{
                    id
                    path
                }
                startDate
                endDate
                status
                subevent{
                    id
                    currentSeat
                    minSeat
                    startTime
                    endTime
                    cancelDate
                    eventDate
                    status
                }
                chef{
                    id
                    user{
                        id
                        firstName
                        lastName
                        profileImage
                    }
                }
            }
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
                allergic {
                    id
                    allergicName
                }
                aboutMe
            }
        }
    }
`
export const checkDupplicateEmail = gql`
    query checkDupplicateEmail($email: String) {
        checkDupplicateEmail(email: $email) {
            success
            message
        }
    }
`

export const forgetPassword = gql`
    query forgetPassword($email: String) {
        forgetPassword(email: $email) {
            success
            email
            token
        }
    }
`

export const changePassword = gql`
    query changePassword($token: String, $email: String, $password: String) {
        changePassword(token: $token, email: $email, password: $password) {
            success
            message
        }
    }
`
