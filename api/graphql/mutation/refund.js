import gql from "graphql-tag"

export const addBankaccountForRefund = gql`
mutation addBankaccountForRefund($inputReservation: inputReservation,$authToken: String){
  addBankaccountForRefund(reserve:$inputReservation,authToken:$authToken){
    success
    acc{
        id
        accountName
        accountNumber
        bankName
        branch
        bankStatementUrl
        dateTimetransfer
        text
        amount
        status
    }
    error
  }
}
`
