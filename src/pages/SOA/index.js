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

// const MY_SOA = gql`
//   query($unitNo: "5-1-24") {
//     myPayments(unitNo: "5-1-24") {

//     }
//   }
// `;

function SOAPage({ session }) {
  console.log('session', session);

  const [collapsed, setCollapsed] = React.useState(false);
  const [totalPayment, setTotalPayment] = React.useState(0);

  React.useEffect(() => {
    checkTokenExpired(history);
  }, []);
  React.useEffect(() => {
    const myTotalPayments = _sumBy(session.myPayments, 'amount');
    setTotalPayment(myTotalPayments);
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

    //     amount: 1000
    // bankBranch: null
    // bankName: null
    // checkNo: null
    // checkStatus: null
    // dateOfCheck: null
    // datePayment: "2018-12-18T00:00:00.000Z"
    // datePosted: null
    // isConfirmed: true
    // orNo: "0164"
    // paymentType: "cash"
    // remarks: "Membership Fee"
    // unitNo: "5-1-24"
  ];

  return (
    <section>
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <h1>Statement of Account for Unit No: "{_get(session, 'me.unitNo', '')}"</h1>
        <h2>Total Payments: PHP {totalPayment}</h2>
        <Table dataSource={session.myPayments} columns={columns} />
      </div>
    </section>
  );
}
export default withSession(SOAPage);
