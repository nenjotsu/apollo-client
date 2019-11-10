import React from 'react';

// import React, { Component, Fragment } from 'react';
import moment from 'moment';
import gql from 'graphql-tag';

import { Layout, Menu, Table, Breadcrumb, Icon, Dropdown } from 'antd';
import { checkTokenExpired } from '../../helpers/cookie';
import _get from 'lodash/get';
import _sumBy from 'lodash/sumBy';
import withSession from '../../components/Session/withSession';
import history from '../../constants/history';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function SOAPage({ session }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [totalPayment, setTotalPayment] = React.useState(0);
  const [totalCollectibles, setTotalCollectibles] = React.useState(0);
  const [monthsDuration, setmonthsDuration] = React.useState(0);

  React.useEffect(() => {
    checkTokenExpired(history);

    // session.myPayments;
  }, []);
  React.useEffect(() => {
    const myTotalPayments = _sumBy(session.myPayments, 'amount');
    setTotalPayment(myTotalPayments);

    const dateTurnedOverRaw = _get(session, 'me.dateTurnedOver');
    const today = moment();
    const dateTurnedOver = moment(dateTurnedOverRaw);
    const inMs = today.diff(dateTurnedOver);

    var duration = moment.duration({ milliseconds: inMs });
    setmonthsDuration(duration._data.months);
    const divisor = (duration._data.months + 1) * 600 - (myTotalPayments - 1000);
    setTotalCollectibles(divisor);
  }, [session.myPayments]);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const columns = [
    {
      title: 'OR No',
      dataIndex: 'orNo',
      key: 'orNo',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: text => {
        return <span>{`PHP ${text}`}</span>;
      },
    },
    {
      title: 'Date Payment',
      dataIndex: 'datePayment',
      key: 'datePayment',
      render: text => {
        return (
          <span title={moment(text).format('MMM DD, YYYY')}>
            {moment(text).format('MM/DD/YYYY')}
          </span>
        );
      },
    },
    {
      title: 'Payment Type',
      dataIndex: 'paymentType',
      key: 'paymentType',
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
    },
    {
      title: 'Unit No',
      dataIndex: 'unitNo',
      key: 'unitNo',
    },
  ];

  return (
    <section>
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <h1>Statement of Account for Unit No: "{_get(session, 'me.unitNo', '')}"</h1>
        <h2>Total Payments: PHP {totalPayment}</h2>
        <h2>Total Balance: PHP {totalCollectibles}</h2>
        <h2>Months: {monthsDuration}</h2>
        <Table rowKey="id" dataSource={session.myPayments} columns={columns} />
      </div>
    </section>
  );
}
export default withSession(SOAPage);
