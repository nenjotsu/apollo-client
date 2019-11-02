import gql from 'graphql-tag';

export const GET_ME = gql`
  {
    me {
      id
      username
      email
      role
      unitNo
    }
    myPayments {
      orNo
      unitNo
      amount
      remarks
      paymentType
      datePayment
      dateOfCheck
      datePosted
      checkStatus
      checkNo
      bankName
      bankBranch
      isConfirmed
    }
  }
`;
