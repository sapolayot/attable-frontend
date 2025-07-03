import gql from "graphql-tag"

export const getEvents = gql`
query getListAllEvents($page:Int,$pagesize:Int){
    getListAllEvents(page:$page,pagesize:$pagesize){
      totalPage
      totalElement
      events{
        id
        eventName
        eventType
        eventCategory
        eventDetail
        status
        pricePerSeat
        lat
        lng
        commission
        homeNo
        street
        subDistrict
        district
        city
        postalCode
        startDate
        endDate
        rule
        ownPlace
        requestingDate
        approveDate
        allergic{
          id
          allergicName
        }
        subevent{
          minSeat
          maxSeat
          startTime
          endTime
          cancelDate
          eventDate
          status 
        }
        menu{
          id
          foodtype
          subMenu{
            id
            subMenuName
            subMenuDescription
          }
        }
        media{
          id
          path
        }
        amenitiesPlace{
          id
          amenitiesPlaceName
        }
        repeatOn{
          id
          repeatOn
        }
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
          user{
            id
            firstName
            lastName
            email
            gender
            birthday
            registeredDate
            phoneNumber
            city
            country
            nationality
            profileImage
            isFacebookUser
            status
            aboutMe
            language{
              id
              value
            }
            
          }
        }
        
      }
    }
}
`
export const getEventById = gql`
    query getEventById($id: Long) {
        getEventById(id: $id) {
            id
            eventName
            eventType
            eventCategory
            eventDetail
            status
            pricePerSeat
            lat
            lng
            commission
            homeNo
            street
            subDistrict
            district
            city
            postalCode
            startDate
            endDate
            rule
            ownPlace
            requestingDate
            allergic {
                id
                allergicName
            }
            subevent {
                id
                minSeat
                maxSeat
                currentSeat
                startTime
                endTime
                cancelDate
                eventDate
                status
                subIndex
                reserve {
                    id
                    refundable
                    status
                    join {
                        id
                        firstName
                        lastName
                        allergic {
                            id
                            allergicName
                        }
                    }
                }
            }
            menu {
                id
                foodtype
                subMenu {
                    id
                    subMenuName
                    subMenuDescription
                }
            }
            media {
                id
                path
            }
            amenitiesPlace {
                id
                amenitiesPlaceName
            }
            repeatOn {
                id
                repeatOn
            }
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
                user {
                    id
                    firstName
                    lastName
                    email
                    gender
                    birthday
                    registeredDate
                    phoneNumber
                    city
                    country
                    nationality
                    profileImage
                    isFacebookUser
                    status
                    aboutMe
                    language {
                        id
                        value
                    }
                }
            }
        }
    }
`
export const getSubEventById = gql`
    query getSubEventById($id: Long) {
        getSubEventById(id: $id) {
            minSeat
            maxSeat
            startTime
            endTime
            cancelDate
            eventDate
            status
            subIndex
            reserve {
                id
                status
                refundable
                join {
                    id
                    firstName
                    lastName
                    allergic {
                        id
                        allergicName
                    }
                }
            }
            event {
                id
                eventName
                eventType
                eventCategory
                eventDetail
                status
                pricePerSeat
                lat
                lng
                commission
                commissionType
                homeNo
                street
                subDistrict
                district
                city
                postalCode
                startDate
                endDate
                rule
                ownPlace
                requestingDate
                subevent {
                    id
                    minSeat
                    maxSeat
                    currentSeat
                    startTime
                    endTime
                    cancelDate
                    eventDate
                    status
                    subIndex
                    reserve {
                        id
                        refundable
                        join {
                            id
                            firstName
                            lastName
                            allergic {
                                id
                                allergicName
                            }
                        }
                    }
                }
                allergic {
                    id
                    allergicName
                }
                menu {
                    id
                    foodtype
                    subMenu {
                        id
                        subMenuName
                        subMenuDescription
                    }
                }
                media {
                    id
                    path
                }
                amenitiesPlace {
                    id
                    amenitiesPlaceName
                }
                repeatOn {
                    id
                    repeatOn
                }
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
                    user {
                        id
                        firstName
                        lastName
                        email
                        gender
                        birthday
                        registeredDate
                        phoneNumber
                        city
                        country
                        nationality
                        profileImage
                        isFacebookUser
                        status
                        aboutMe
                        language {
                            id
                            value
                        }
                    }
                }
            }
        }
    }
`
