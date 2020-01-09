import gql from 'graphql-tag';

export const GET_ALL_UNITS = gql`
  query getAllUnits {
    allUnits {
      ownerName
      unitNo
      dateTurnedOver
      houseModel
      lotArea
    }
  }
`;

export const GET_PAYMENTS = gql`
  query getPayments($unitNo: String!) {
    payments(unitNo: $unitNo) {
      id
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

export const GET_OWNER_INFO = gql`
  query getOwnerInfo($unitNo: String!) {
    unit(unitNo: $unitNo) {
      id
      unitNo
      houseModel
      dateTurnedOver
      ownerName
      lotArea
    }
  }
`;

export const DELETE_PAYMENT = gql`
  mutation deletePayment($id: ID!) {
    deletePayment(id: $id)
  }
`;
