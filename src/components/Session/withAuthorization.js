import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { Spin, Icon } from 'antd';

import * as routes from '../../constants/routes';
import { GET_ME } from './queries';
import { hasAccessToken } from '../../helpers/cookie';
import history from '../../constants/history';

const antIcon = (
  <Icon type="loading" style={{ fontSize: 24, paddingTop: '10%', paddingLeft: '40%' }} spin />
);

const withAuthorization = conditionFn => Component => props => {
  return (
    <Query query={GET_ME}>
      {({ data, networkStatus, loading, refetch }) => {
        if (loading || !data) {
          return <Spin indicator={antIcon} />;
        }
        if (networkStatus < 7) {
          return null;
        }

        if (window.location.pathname === '/signin' || window.location.pathname === '/signup') {
          return null;
        }
        const hasAccessTokenBool = hasAccessToken();
        debugger;
        if (!hasAccessTokenBool && window.location.pathname !== '/signin') {
          return <Redirect to={routes.SIGN_IN} />;
        }
        if (!hasAccessTokenBool) {
          return <Redirect to={routes.SIGN_IN} />;
        }

        return hasAccessTokenBool && conditionFn(data) ? (
          <Component {...props} session={data} refetch={refetch} />
        ) : null;
      }}
    </Query>
  );
};

export default withAuthorization;
