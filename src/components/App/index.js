import React from 'react';
import { Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import EmailConfirmPage from '../EmailConfirm';
import withSession from '../Session/withSession';

import MainPage from '../../pages/Main';

import * as routes from '../../constants/routes';
import history from '../../constants/history';
import '../../css/overwrite.css';

const App = ({ session, refetch }) => (
  <Router history={history}>
    <React.Fragment>
      <Route exact path={routes.LANDING} component={() => <MainPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage refetch={refetch} />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage refetch={refetch} />} />
      <Route
        exact
        path={routes.EMAIL_CONFIRM}
        component={() => <EmailConfirmPage refetch={refetch} />}
      />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Route exact path={routes.ADMIN} component={() => <AdminPage />} />
    </React.Fragment>
  </Router>
);

export default withSession(App);
