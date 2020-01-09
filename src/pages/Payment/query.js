import gql from 'graphql-tag';

export const CREATE_PAYMENT = gql`
  mutation createPayment(
    $orNo: String!
    $unitNo: String!
    $amount: Int!
    $remarks: String!
    $paymentType: String!
    $datePayment: DateTime!
    $dateOfCheck: DateTime
    $datePosted: DateTime
    $checkStatus: String
    $checkNo: Int
    $bankName: String
    $bankBranch: String
  ) {
    createPayment(
      orNo: $orNo
      unitNo: $unitNo
      amount: $amount
      remarks: $remarks
      paymentType: $paymentType
      datePayment: $datePayment
      dateOfCheck: $dateOfCheck
      datePosted: $datePosted
      checkStatus: $checkStatus
      checkNo: $checkNo
      bankName: $bankName
      bankBranch: $bankBranch
    )
  }
`;
