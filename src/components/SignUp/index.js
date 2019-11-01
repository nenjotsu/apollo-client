import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import _has from 'lodash/has';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Alert from 'antd/lib/alert';
import Radio from 'antd/lib/radio';
import Select from 'antd/lib/select';
import Divider from 'antd/lib/divider';
import DatePicker from 'antd/lib/date-picker';
import message from 'antd/lib/message';

import * as routes from '../../constants/routes';
import ErrorMessage from '../Error';
import Backdrop from '../../images/michal-kubalczyk-bCNzxvvbF_U-unsplash.jpg';
import { allUnits } from './data.units';

const SIGN_UP = gql`
  mutation(
    $username: String!
    $email: String!
    $password: String!
    $role: String!
    $contactNo: String!
    $unitNo: String!
    $residencyType: String!
    $firstName: String!
    $lastName: String!
    $dateTurnedOver: Date
    $dateOfBirth: Date!
  ) {
    signUp(
      username: $username
      email: $email
      password: $password
      role: $role
      contactNo: $contactNo
      unitNo: $unitNo
      residencyType: $residencyType
      firstName: $firstName
      lastName: $lastName
      dateTurnedOver: $dateTurnedOver
      dateOfBirth: $dateOfBirth
    ) {
      token
      message
    }
  }
`;

const SignUpPage = ({ history, refetch }) => (
  <Row>
    <Col sm={24} md={8}>
      <div>
        <img src={Backdrop} className="backdrop" />
      </div>
    </Col>
    <Col sm={24} md={16}>
      <SignUpForm history={history} refetch={refetch} />
    </Col>
  </Row>
);

function SignUpForm(props) {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [contactNo, setContactNo] = React.useState('');
  const [unitNo, setUnitNo] = React.useState('');
  const [residencyType, setResidencyType] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [dateTurnedOver, setDateTurnedOver] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');

  const handleChangeInput = funcSetter => event => {
    const { value } = event.target;
    funcSetter(value);
  };

  const onSubmit = signUp => event => {
    event.preventDefault();
    signUp().then(async ({ data }) => {
      await props.refetch();
      message.success(data.signUp.message);
      clearState();
    });
  };

  const handleChangeUnitNo = value => {
    setUnitNo(value);
  };

  const handleChangeResidencyType = event => {
    setResidencyType(event.target.value);
  };

  const handleDateTurnedOverChange = date => {
    if (date) {
      setDateTurnedOver(date._d);
    }
  };

  const handleDateOfBirthChange = date => {
    if (date) {
      setDateOfBirth(date._d);
    }
  };

  const clearState = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
    setContactNo('');
    setUnitNo('');
    setResidencyType('');
    setFirstName('');
    setLastName('');
    setDateTurnedOver('');
    setDateOfBirth('');
  };

  const isInvalid =
    password !== passwordConfirmation ||
    password === '' ||
    email === '' ||
    username === '' ||
    contactNo === '' ||
    unitNo === '' ||
    residencyType === '' ||
    firstName === '' ||
    lastName === '' ||
    dateTurnedOver === '' ||
    dateOfBirth === '';

  return (
    <Mutation
      mutation={SIGN_UP}
      variables={{
        username,
        email,
        password,
        role: 'standard',
        contactNo,
        unitNo,
        residencyType,
        firstName,
        lastName,
        dateTurnedOver,
        dateOfBirth,
      }}
    >
      {(signUp, { data, loading, error }) => (
        <form className="signup-form">
          <h3>Register</h3>
          <Row gutter={30}>
            <Col sm={24} md={12}>
              <input
                className="ant-input"
                name="username"
                value={username}
                onChange={handleChangeInput(setUsername)}
                type="text"
                placeholder="User Name"
              />
              <input
                className="ant-input"
                name="email"
                value={email}
                onChange={handleChangeInput(setEmail)}
                type="email"
                placeholder="Email Address"
              />
              <input
                className="ant-input"
                name="password"
                value={password}
                onChange={handleChangeInput(setPassword)}
                type="password"
                placeholder="Password"
              />
              <input
                className="ant-input"
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={handleChangeInput(setPasswordConfirmation)}
                type="password"
                placeholder="Confirm Password"
              />
              <Select
                className="bottom-20"
                showSearch
                style={{ width: '100%' }}
                placeholder="Select a Unit No."
                optionFilterProp="children"
                onChange={handleChangeUnitNo}
                size="large"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {allUnits.map(unit => {
                  return (
                    <Select.Option key={unit} value={unit}>
                      {unit}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
            <Col sm={24} md={12}>
              <input
                className="ant-input"
                name="firstName"
                value={firstName}
                onChange={handleChangeInput(setFirstName)}
                type="text"
                placeholder="First Name"
              />
              <input
                className="ant-input"
                name="lastName"
                value={lastName}
                onChange={handleChangeInput(setLastName)}
                type="text"
                placeholder="Last Name"
              />
              <input
                className="ant-input"
                name="contactNo"
                value={contactNo}
                onChange={handleChangeInput(setContactNo)}
                type="text"
                placeholder="Mobile or Landline"
              />
              <DatePicker
                className="bottom-20"
                onChange={handleDateOfBirthChange}
                size="large"
                style={{ with: '100%' }}
                placeholder="Date of Birth"
              />
              <h5>Residency Type</h5>
              <Radio.Group
                className="bottom-20"
                size="large"
                defaultValue="resident"
                value={residencyType}
                buttonStyle="solid"
                onChange={handleChangeResidencyType}
              >
                <Radio.Button value="resident">Resident</Radio.Button>
                <Radio.Button value="owner">Owner</Radio.Button>
                <Radio.Button value="lesse">Lesse</Radio.Button>
              </Radio.Group>

              {residencyType === 'owner' && (
                <div>
                  <h5>Date Turned Over</h5>
                  <DatePicker.MonthPicker
                    size="large"
                    style={{ with: '100%' }}
                    renderExtraFooter={() => 'Select Month & Year Turned Over'}
                    placeholder="Turned Over"
                    format="DD-MM-YYYY"
                    onChange={handleDateTurnedOverChange}
                  />
                </div>
              )}
            </Col>
          </Row>

          <Divider />

          <Button
            disabled={isInvalid || loading}
            className="bottom-20"
            type="submit"
            onClick={onSubmit(signUp)}
          >
            Create an account
          </Button>

          {error && <ErrorMessage error={error} />}
          {_has(data, 'signUp.message') && (
            <Alert
              className="bottom-20"
              message="Success Message"
              description={data.signUp.message}
              type="success"
              closable
            />
          )}
          <SignInLink />
        </form>
      )}
    </Mutation>
  );
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Register</Link>
  </p>
);

const SignInLink = ({ isEmailConfirm }) => (
  <p>
    {isEmailConfirm ? 'You can now use your credentials, Please' : 'Already have an account?'}{' '}
    <Link to={routes.SIGN_IN}>Sign In</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink, SignInLink };
