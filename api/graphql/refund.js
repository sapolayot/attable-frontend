import apollo from "./instance"
import { addBankaccountForRefund } from "./mutation/refund"

export default {
    addBankaccountForRefund: (reserveId, accountName, accountNumber, bankName, branch, bankStatementUrl, authToken) => {
        return apollo.client
            .mutate({
                mutation: addBankaccountForRefund,
                variables: {
                    inputReservation: {
                        id: reserveId,
                        accountForRefund: {
                            accountName: accountName,
                            accountNumber: accountNumber,
                            bankName: bankName,
                            branch: branch,
                            bankStatementUrl: bankStatementUrl
                        }
                    },
                    authToken: authToken
                }
            })
            .then(response => {
                return response.data
            })
    }
}
