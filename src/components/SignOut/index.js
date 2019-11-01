import React from 'react';
import { ApolloConsumer } from 'react-apollo';

import * as routes from '../../constants/routes';
import history from '../../constants/history';

import { deleteCookie } from '../../helpers/cookie';

function SignOutButton() {
  return (
    <ApolloConsumer>
      {client => (
        <a target="_blank" onClick={signOut(client)} rel="noopener noreferrer">
          Sign Out
        </a>
      )}
    </ApolloConsumer>
  );
}

const signOut = client => event => {
  event.preventDefault();
  deleteCookie('token');
  client.resetStore();
  history.push(routes.SIGN_IN);
};

export { signOut };

export default SignOutButton;
