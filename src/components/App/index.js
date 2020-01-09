import React from 'react';
import { Router, Route } from 'react-router-dom';

import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import AccountPage from '../Account';
import EmailConfirmPage from '../EmailConfirm';
import withSession from '../Session/withSession';

import * as routes from '../../constants/routes';
import history from '../../constants/history';
import '../../css/overwrite.css';

const App = ({ refetch, session }) => (
  <Router history={history}>
    <React.Fragment>
      <Route
        exact
        path={routes.SIGN_UP}
        component={() => <SignUpPage refetch={refetch} session={session} />}
      />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage refetch={refetch} />} />
      <Route
        exact
        path={routes.EMAIL_CONFIRM}
        component={() => <EmailConfirmPage refetch={refetch} />}
      />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      {/* <Route exact path={routes.ADMIN} component={() => <AdminPage />} /> */}

      <Route path={routes.LANDING} component={() => <LandingPage />} />
    </React.Fragment>
  </Router>
);

export default withSession(App);
