import apollo from "./instance"
import {
    updateProfileDiner,
    editProfileDiner,
    updateProfileChef,
    editProfileChef,
    createInquiry
} from "./mutation/user"
import {
    getUserById,
    getChefByUserId,
    checkDupplicateEmail,
    forgetPassword,
    changePassword
} from "./queries/user"

export default {
    updateProfileDiner: user => {
        return apollo.client
            .mutate({
                mutation: updateProfileDiner,
                variables: user
            })
            .then(response => {
                return response.data
            })
    },
    editProfileDiner: user => {
        return apollo.client
            .mutate({
                mutation: editProfileDiner,
                variables: user
            })
            .then(response => {
                return response.data
            })
    },
    getUserById: id => {
        return apollo.client
            .query({
                query: getUserById,
                variables: {
                    id
                }
            })
            .then(response => {
                return response.data
            })
    },
    updateProfileChef: user => {
        return apollo.client
            .mutate({
                mutation: updateProfileChef,
                variables: user
            })
            .then(response => {
                return response.data
            })
    },
    editProfileChef: inputChef => {
        return apollo.client
            .mutate({
                mutation: editProfileChef,
                variables: inputChef
            })
            .then(response => {
                return response.data
            })
    },
    getChefByUserId: id => {
        return apollo.client
            .query({
                query: getChefByUserId,
                variables: {
                    id
                },
                fetchPolicy: 'no-cache'
            })
            .then(response => {
                return response.data
            })
    },
    checkDupplicateEmail: email => {
        return apollo.client
            .query({
                query: checkDupplicateEmail,
                variables: {
                    email
                }
            })
            .then(response => response.data)
    },
    forgetPassword: email => {
        return apollo.client
            .query({
                query: forgetPassword,
                variables: {
                    email
                }
            })
            .then(response => response.data)
    },
    changePassword: (token, email, password) => {
        return apollo.client
            .query({
                query: changePassword,
                variables: {
                    token,
                    email,
                    password
                }
            })
            .then(response => response.data)
    },
    createInquiry: inquiry => {
        return apollo.client
            .mutate({
                mutation: createInquiry,
                variables: inquiry
            })
            .then(response => {
                return response.data
            })
    },
}
