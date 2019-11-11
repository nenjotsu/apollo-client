import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import moment from 'moment';
import gql from 'graphql-tag';

import { Tag } from 'antd';
import { checkTokenExpired } from '../../helpers/cookie';
import _get from 'lodash/get';
import _sumBy from 'lodash/sumBy';
import withSession from '../../components/Session/withSession';
import history from '../../constants/history';
import ErrorMessage from '../../components/Error';
import Loading from '../../components/Loading';

export const GET_OWNER_INFO = gql`
  query($unitNo: String!) {
    unit(unitNo: $unitNo) {
      id
      unitNo
      houseModel
      dateTurnedOver
      ownerName
      lotArea
    }
  }
`;

function OwnerInfo({ unitNo }) {
  // const queryParams = location.pathname.replace('/', '').split('/');
  // const [totalPayment, setTotalPayment] = React.useState(0);
  // const [totalCollectibles, setTotalCollectibles] = React.useState(0);
  // const [monthsDuration, setmonthsDuration] = React.useState(0);
  // const [isPrint, setisPrint] = React.useState(false);

  // React.useEffect(() => {
  //   checkTokenExpired(history);
  //   const dateTurnedOverRaw = queryParams[2];
  //   const today = moment();
  //   const dateTurnedOver = moment(dateTurnedOverRaw);
  //   const inMs = today.diff(dateTurnedOver);
  //   var duration = moment.duration({ milliseconds: inMs });
  //   setmonthsDuration(duration._data.months);
  //   const divisor = (duration._data.months + 2) * 600 - (totalPayment - 1000);
  //   setTotalCollectibles(divisor);
  // }, [totalPayment]);

  // const handleBackToUnit = event => {
  //   event.preventDefault();
  //   history.push('/unit');
  // };

  // const handlePrint = event => {
  //   event.preventDefault();
  //   window.print();
  // };

  return (
    <Query query={GET_OWNER_INFO} variables={{ unitNo }}>
      {({ data, loading, error }) => {
        if (!data) {
          return <div>There are no unit owner info.</div>;
        }
        if (error) {
          return <ErrorMessage error={error} />;
        }
        const { unit } = data;
        if (loading || !unit) {
          return <Loading />;
        }
        console.log(unitNo, data);
        // const totalPayments = _sumBy(payments, 'amount');
        // setTotalPayment(totalPayments);
        return (
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
            <h1>
              {unit.ownerName} <Tag color="#2db7f5">{unit.unitNo}</Tag>
            </h1>
            <p>
              <strong>Date Turned Over: </strong>
              {moment(unit.dateTurnedOver).format('MM-DD-YYYY')}
            </p>
            <p>
              <strong>House Model: </strong>
              {unit.houseModel}
            </p>
            <p>
              <strong>Lot Area: </strong>
              {unit.lotArea}
            </p>
          </div>
        );
      }}
    </Query>
  );
}
export default withSession(OwnerInfo);
