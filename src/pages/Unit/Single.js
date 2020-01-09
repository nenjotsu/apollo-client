import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import moment from 'moment';

import { Layout, Menu, Table, Button, Icon, message } from 'antd';
import { checkTokenExpired } from '../../helpers/cookie';
import { get, sumBy } from 'lodash';
import withSession from '../../components/Session/withSession';
import history from '../../constants/history';
import ErrorMessage from '../../components/Error';
import Loading from '../../components/Loading';
import OwnerInfo from './OwnerInfo';
import { GET_PAYMENTS, DELETE_PAYMENT } from './query';
import { getInMons } from '../../helpers/strings';

function SOAPage({ session, location }) {
  const isAdmin = get(session, 'me.role') === 'admin';
  const queryParams = location.pathname.replace('/', '').split('/');
  const [totalPayment, setTotalPayment] = React.useState(0);
  const [totalCollectibles, setTotalCollectibles] = React.useState(0);
  const [monthsDuration, setmonthsDuration] = React.useState(0);
  const [isPrint, setisPrint] = React.useState(false);

  React.useEffect(() => {
    checkTokenExpired(history);
    const dateTurnedOverRaw = queryParams[2];
    const today = moment(new Date());
    const dateTurnedOver = moment(dateTurnedOverRaw);
    const inMs = today.diff(dateTurnedOver);
    var duration = moment.duration({ milliseconds: inMs });
    const inMons = getInMons(duration._data);
    setmonthsDuration(inMons);
    const divisor = (inMons + 2) * 600 - (totalPayment - 1000);
    console.log('divisor', divisor);
    setTotalCollectibles(divisor);
  }, [totalPayment, totalCollectibles, monthsDuration]);

  const handleBackToUnit = event => {
    event.preventDefault();
    history.push('/unit');
  };

  const handlePrint = event => {
    event.preventDefault();
    window.print();
  };

  const handleDelete = deletePayment => event => {
    event.preventDefault();
    deletePayment().then(async ({ data }) => {
      if (data.deletePayment) {
        message.success('Successfully deleted', 10);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        message.error('Error in deleting', 10);
      }
    });
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
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        if (!isAdmin) {
          return null;
        }
        return (
          <Mutation
            mutation={DELETE_PAYMENT}
            variables={{
              id: record.id,
            }}
          >
            {(deletePayment, { data, loading, error }) => (
              <Button onClick={handleDelete(deletePayment)}>Delete</Button>
            )}
          </Mutation>
        );
      },
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
        const totalPayments = sumBy(payments, 'amount');
        setTotalPayment(totalPayments);
        return (
          <section style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <h1>Highview Hills Phase 5</h1>
            <h3>Home Owners Association</h3>
            {queryParams[1] && <OwnerInfo unitNo={queryParams[1]} />}
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
              <h1>Statement of Account as of {moment().format('MMM DD, YYYY')}</h1>
              <h3>Unit No: {queryParams[1]}</h3>
              <h3>Total Months: {monthsDuration}</h3>
              <h2>Total Payments: PHP {totalPayments}</h2>
              <h2 style={{ color: totalCollectibles > 0 ? '#E91E63' : '#4CAF50' }}>
                Total Balance: PHP {totalCollectibles > 0 ? totalCollectibles : 0}
              </h2>
              {totalCollectibles < 0 && (
                <h2 style={{ color: '#4CAF50' }}>
                  Total Advanced Payment: PHP {Math.abs(totalCollectibles)}
                </h2>
              )}
            </div>
            <Table rowKey="id" dataSource={payments} columns={columns} />
            <button
              className="ant-btn bottom-20"
              style={{ marginRight: 20 }}
              onClick={handleBackToUnit}
            >
              <Icon type="arrow-left" /> Go Back
            </button>
            <button className="ant-btn bottom-20" onClick={handlePrint}>
              <Icon type="printer" /> Print
            </button>
          </section>
        );
      }}
    </Query>
  );
}
export default withSession(withRouter(SOAPage));
