import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import { useCookies } from 'react-cookie';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Divider from 'antd/lib/divider';

import { SignUpLink } from '../SignUp';
import * as routes from '../../constants/routes';
import ErrorMessage from '../Error';
import Backdrop from '../../images/patrick-perkins-3wylDrjxH-E-unsplash.jpg';

const responsive = {
  sm: {
    span: 24,
  },
  md: { span: 12 },
};

const SIGN_IN = gql`
  mutation($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
      message
    }
  }
`;

const SignInPage = ({ history, refetch }) => (
  <Row>
    <Col {...responsive}>
      <SignInForm history={history} refetch={refetch} />
    </Col>
    <Col {...responsive}>
      <div>
        <img src={Backdrop} className="backdrop" />
      </div>
    </Col>
  </Row>
);

function SignInForm(props) {
  const [_, setCookie] = useCookies(['token']);
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = event => {
    const { value } = event.target;
    setLogin(value);
  };

  const handlePassword = event => {
    const { value } = event.target;
    setPassword(value);
  };

  const onSubmit = signIn => event => {
    const expires = moment().add(1, 'd');
    signIn().then(async ({ data }) => {
      setCookie('token', data.signIn.token, {
        path: '/',
        expires: expires._d,
      });
      setLogin('');
      setPassword('');
      await props.refetch();
      props.history.push(routes.LANDING);
    });

    event.preventDefault();
  };

  const isInvalid = password === '' || login === '';

  return (
    <Mutation mutation={SIGN_IN} variables={{ login, password }}>
      {(signIn, { data, loading, error }) => (
        <form className="login-form" onSubmit={onSubmit(signIn)}>
          <h3>Sign In</h3>
          <input
            className="ant-input"
            name="login"
            value={login}
            onChange={handleLogin}
            type="text"
            placeholder="Email or Username"
          />
          <input
            className="ant-input"
            name="password"
            value={password}
            onChange={handlePassword}
            type="password"
            placeholder="Password"
          />
          <Divider />
          <button className="ant-btn bottom-20" disabled={isInvalid || loading} type="submit">
            Sign In
          </button>

          {error && <ErrorMessage error={error} />}
          <SignUpLink />
        </form>
      )}
    </Mutation>
  );
}

export default withRouter(SignInPage);

export { SignInForm };
