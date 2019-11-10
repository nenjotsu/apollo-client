import React from 'react';
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

const GET_ALL_UNITS = gql`
  query {
    allUnits {
      ownerName
      unitNo
      dateTurnedOver
      houseModel
      lotArea
    }
  }
`;

function UnitPage({ session }) {
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

  const handleViewSOA = (unitNo, dateTurnedOver) => event => {
    event.preventDefault();
    history.push(`/unit/${unitNo}/${dateTurnedOver.toString()}`);
  };

  const columns = [
    {
      title: 'Unit No',
      dataIndex: 'unitNo',
      key: 'unitNo',
      render: (text, record) => {
        return (
          <button
            className="ant-btn"
            onClick={handleViewSOA(text, moment(record.dateTurnedOver).format('MM-DD-YYYY'))}
            title="View SOA"
          >{`${text}`}</button>
        );
      },
    },
    {
      title: 'Owner Name',
      dataIndex: 'ownerName',
      key: 'ownerName',
    },
    {
      title: 'Lot Area',
      dataIndex: 'lotArea',
      key: 'lotArea',
      render: text => {
        return <span>{`${text} sqm`}</span>;
      },
    },
    {
      title: 'Date Turned Over',
      dataIndex: 'dateTurnedOver',
      key: 'dateTurnedOver',
      render: text => {
        return (
          <span title={moment(text).format('MMM DD, YYYY')}>
            {moment(text).format('MM/DD/YYYY')}
          </span>
        );
      },
    },
    {
      title: 'House Model',
      dataIndex: 'houseModel',
      key: 'houseModel',
    },
  ];

  return (
    <Query query={GET_ALL_UNITS}>
      {({ data, loading, error }) => {
        if (!data) {
          return <div>There are no allUnits yet ... Try to create one by yourself.</div>;
        }

        const { allUnits } = data;

        if (error) {
          return <ErrorMessage error={error} />;
        }
        if (loading || !allUnits) {
          return <Loading />;
        }
        return (
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <h1>Unit Owners</h1>
            <h2>Total: {allUnits.length}</h2>
            <Table rowKey="unitNo" dataSource={allUnits} columns={columns} />
          </div>
        );
      }}
    </Query>
  );
}

export default withSession(UnitPage);
