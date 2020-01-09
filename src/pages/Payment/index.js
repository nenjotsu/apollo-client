import React from 'react';
import { Row, Col } from 'antd';
import PaymentMutation from './PaymentMutation';

const PaymentLayout = () => (
  <Row>
    <Col sm={24}>
      <PaymentMutation />
    </Col>
  </Row>
);

export default PaymentLayout;
