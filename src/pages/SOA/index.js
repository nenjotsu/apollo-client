import React from 'react';
import moment from 'moment';

import { Layout, Menu, Table, Breadcrumb, Icon, Dropdown } from 'antd';
import { checkTokenExpired } from '../../helpers/cookie';
import _get from 'lodash/get';
import _sumBy from 'lodash/sumBy';
import withSession from '../../components/Session/withSession';
import history from '../../constants/history';
import { getInMons } from '../../helpers/strings';

function SOAPage({ session }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [totalPayment, setTotalPayment] = React.useState(0);
  const [totalCollectibles, setTotalCollectibles] = React.useState(0);
  const [monthsDuration, setmonthsDuration] = React.useState(0);

  React.useEffect(() => {
    checkTokenExpired(history);
  }, []);
  React.useEffect(() => {
    const myTotalPayments = _sumBy(session.myPayments, 'amount');
    console.log('myTotalPayments', myTotalPayments);
    setTotalPayment(myTotalPayments);

    const dateTurnedOverRaw = _get(session, 'me.dateTurnedOver');
    console.log('dateTurnedOverRaw', dateTurnedOverRaw);

    const today = moment();
    console.log('today', today);
    const dateTurnedOver = moment(dateTurnedOverRaw);
    console.log('dateTurnedOver', dateTurnedOver);
    const inMs = today.diff(dateTurnedOver);
    console.log('inMs', inMs);

    var duration = moment.duration({ milliseconds: inMs });
    console.log('duration._data.months', duration);

    const inMons = getInMons(duration._data);
    setmonthsDuration(inMons);
    const divisor = (inMons + 1) * 600 - (myTotalPayments - 1000);
    setTotalCollectibles(divisor);
  }, [session.myPayments]);

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
    <section style={{ padding: 24, background: '#fff', minHeight: 360 }}>
      <div
        style={{
          padding: 24,
          background: '#f7f7f7',
          minHeight: 200,
          marginBottom: 20,
          boxShadow: '0px 2px 5px #d0d0d0',
          borderRadius: 5,
        }}
      >
        <h1>Your Statement of Account Unit No: {_get(session, 'me.unitNo', '')}</h1>
        <h3>Months: {monthsDuration}</h3>
        <h2>Total Payments: PHP {totalPayment}</h2>
        <h2 style={{ color: totalCollectibles > 0 ? '#E91E63' : '#4CAF50' }}>
          Total Balance: PHP {totalCollectibles}
        </h2>
      </div>
      <Table rowKey="id" dataSource={session.myPayments} columns={columns} />
    </section>
  );
}
export default withSession(SOAPage);
