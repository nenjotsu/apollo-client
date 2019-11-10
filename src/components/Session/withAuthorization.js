import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import * as routes from '../../constants/routes';
import { GET_ME } from './queries';
import { hasAccessToken } from '../../helpers/cookie';
import history from '../../constants/history';

const withAuthorization = conditionFn => Component => props => {
  return (
    <Query query={GET_ME}>
      {({ data, networkStatus }) => {
        if (networkStatus < 7) {
          return null;
        }

        if (window.location.pathname === '/signin') {
          return null;
        }
        const hasAccessTokenBool = hasAccessToken();
        if (!hasAccessTokenBool && window.location.pathname !== '/signin') {
          return <Redirect to={routes.SIGN_IN} />;
        }
        if (!hasAccessTokenBool) {
          return <Redirect to={routes.SIGN_IN} />;
        }

        return hasAccessTokenBool && conditionFn(data) ? (
          <Component {...props} />
        ) : (
          <Redirect to={routes.SIGN_IN} />
        );
      }}
    </Query>
  );
};

export default withAuthorization;
