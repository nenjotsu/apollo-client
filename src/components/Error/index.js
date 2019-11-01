import React from 'react';
import Alert from 'antd/lib/alert';
import { cleanErrorMessage } from '../../helpers/strings';

const ErrorMessage = ({ error }) => (
  <Alert
    className="bottom-20"
    message="Error Message"
    description={cleanErrorMessage(error.message)}
    type="error"
    closable
  />
);

export default ErrorMessage;
