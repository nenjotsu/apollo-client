import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { has, get, map, isEmpty } from 'lodash';
import { Row, Col, Button, message } from 'antd';
import Alert from 'antd/lib/alert';
import Radio from 'antd/lib/radio';
import Select from 'antd/lib/select';
import Divider from 'antd/lib/divider';
import DatePicker from 'antd/lib/date-picker';
// import message from 'antd/lib/message';

import * as routes from '../../constants/routes';
import ErrorMessage from '../../components/Error';
// import Backdrop from '../../images/michal-kubalczyk-bCNzxvvbF_U-unsplash.jpg';

import PaymentForm from './Form';
import { CREATE_PAYMENT } from './query';

const dateFields = ['datePayment', 'dateOfCheck', 'datePosted'];

function PaymentMutation() {
  const defaultState = {
    orNo: '',
    unitNo: '',
    remarks: '',
    paymentType: '',
    datePayment: '',
    dateOfCheck: null,
    datePosted: null,
    checkStatus: '',
    bankName: '',
    bankBranch: '',
    checkNo: undefined,
    amount: undefined,
    paymentType: 'cash',
  };

  const [state, setStateValue] = React.useState(defaultState);

  const handleChangeInput = fieldName => e => {
    let value = get(e, 'target.value', '') || get(e, '_d', '');
    if (fieldName === 'amount' || fieldName === 'checkNo') {
      value = parseInt(value, 10);
    }

    if (dateFields.includes(fieldName)) {
      value = e._d;
    }

    if (fieldName === 'unitNo') {
      value = e;
    }
    setStateValue({
      ...state,
      [`${fieldName}`]: value,
    });
  };

  const onSubmit = createPayment => event => {
    event.preventDefault();
    createPayment().then(async ({ data }) => {
      message.success(data.createPayment, 10);
      clearState();
    });
  };

  const clearState = () => {
    setStateValue(defaultState);
  };

  const isInvalid = () => {
    let isBool = false;
    // for (const key in state) {
    //   if (state.hasOwnProperty(key)) {
    //     isBool = isEmpty(state[key]);
    //     if (isBool) {
    //       break;
    //     }
    //   }
    // }
    return isBool;
  };

  return (
    <Mutation
      mutation={CREATE_PAYMENT}
      variables={{
        ...state,
      }}
    >
      {(createPayment, { data, loading, error }) => (
        <form className="signup-form">
          <h2>Highview Hills Phase 5</h2>
          <h3>Create Payment</h3>
          <PaymentForm
            state={state}
            setState={setStateValue}
            handleChangeInput={handleChangeInput}
          />
          <Divider />

          <Button
            disabled={isInvalid() || loading}
            className="bottom-20"
            type="submit"
            size="large"
            onClick={onSubmit(createPayment)}
          >
            Submit Payment
          </Button>

          {error && <ErrorMessage error={error} />}
          {has(data, 'signUp.message') && (
            <Alert
              className="bottom-20"
              message="Success Message"
              description={data.signUp.message}
              type="success"
              closable
            />
          )}
        </form>
      )}
    </Mutation>
  );
}

export default withRouter(PaymentMutation);
