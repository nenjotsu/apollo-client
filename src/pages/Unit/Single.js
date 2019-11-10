import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import moment from 'moment';
import gql from 'graphql-tag';

import { Layout, Menu, Table, Breadcrumb, Icon, Dropdown } from 'antd';
import { checkTokenExpired } from '../../helpers/cookie';
import _get from 'lodash/get';
import _sumBy from 'lodash/sumBy';
import withSession from '../../components/Session/withSession';
import history from '../../constants/history';
import ErrorMessage from '../../components/Error';
import Loading from '../../components/Loading';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const GET_PAYMENTS = gql`
  query($unitNo: String!) {
    payments(unitNo: $unitNo) {
      id
      orNo
      unitNo
      amount
      remarks
      paymentType
      datePayment
      dateOfCheck
      datePosted
      checkStatus
      checkNo
      bankName
      bankBranch
      isConfirmed
    }
  }
`;

function SOAPage({ session, location }) {
  const queryParams = location.pathname.replace('/', '').split('/');
  console.log(queryParams);
  const [collapsed, setCollapsed] = React.useState(false);
  const [totalPayment, setTotalPayment] = React.useState(0);
  const [totalCollectibles, setTotalCollectibles] = React.useState(0);
  const [monthsDuration, setmonthsDuration] = React.useState(0);

  React.useEffect(() => {
    checkTokenExpired(history);

    const dateTurnedOverRaw = queryParams[2];
    const today = moment();
    const dateTurnedOver = moment(dateTurnedOverRaw);
    const inMs = today.diff(dateTurnedOver);
    var duration = moment.duration({ milliseconds: inMs });
    setmonthsDuration(duration._data.months);
    const divisor = (duration._data.months + 1) * 600 - (totalPayment - 1000);
    setTotalCollectibles(divisor);
    console.log();
  }, [totalPayment]);

  // React.useEffect(() => {
  //   // const myTotalPayments = _sumBy(payments, 'amount');
  //   // setTotalPayment(myTotalPayments);

  // }, []);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const handleBackToUnit = event => {
    event.preventDefault();
    history.push('/unit');
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
    <Query query={GET_PAYMENTS} variables={{ unitNo: queryParams[1] }}>
      {({ data, loading, error }) => {
        if (!data) {
          return <div>There are no payments yet ... Try to create one by yourself.</div>;
        }

        const { payments } = data;

        if (error) {
          return <ErrorMessage error={error} />;
        }
        if (loading || !payments) {
          return <Loading />;
        }
        const totalPayments = _sumBy(payments, 'amount');
        setTotalPayment(totalPayments);
        return (
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <button className="ant-btn" onClick={handleBackToUnit}>
              <Icon type="arrow-left" /> Go Back
            </button>
            <h1>Statement of Account for Unit No: "{queryParams[1]}"</h1>
            <h2>Total Payments: PHP {totalPayments}</h2>
            <h2>Total Balance: PHP {totalCollectibles > 0 ? totalCollectibles : 0}</h2>
            <h2>Months: {monthsDuration}</h2>
            {totalCollectibles < 0 && (
              <h2>Total Advanced Payment: PHP {Math.abs(totalCollectibles)}</h2>
            )}
            <Table rowKey="id" dataSource={payments} columns={columns} />
          </div>
        );
      }}
    </Query>
  );
}
export default withSession(withRouter(SOAPage));
