import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import _get from 'lodash/get';

import { SignInLink } from '../SignUp';
import ErrorMessage from '../Error';

const EMAIL_CONFIRM = gql`
  query($id: ID!) {
    emailConfirm(id: $id)
  }
`;

function SignInPage() {
  const idParam = window.location.pathname.replace('/email_confirm/', '');

  return (
    <Query query={EMAIL_CONFIRM} variables={{ id: idParam }}>
      {({ data, loading, error }) => {
        return (
          <div className="email-confirm-message">
            {error && <ErrorMessage error={error} />}
            <h1>{_get(data, 'emailConfirm')}</h1>
            <SignInLink isEmailConfirm />
          </div>
        );
      }}
    </Query>
  );
}

export default withRouter(SignInPage);
