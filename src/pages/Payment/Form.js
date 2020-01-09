import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, DatePicker, Select, Radio } from 'antd';
import { allUnits } from '../../constants/data.units';

const textFields = [
  {
    name: 'orNo',
    type: 'text',
    placeholder: 'OR #',
  },
  {
    name: 'remarks',
    type: 'type',
    placeholder: 'Remarks',
  },

  {
    name: 'bankName',
    type: 'text',
    placeholder: 'Bank Name',
  },
  {
    name: 'bankBranch',
    type: 'text',
    placeholder: 'Bank Branch',
  },
];

const numberFields = [
  {
    name: 'amount',
    type: 'number',
    placeholder: 'Amount',
    min: '0',
    max: '999999',
  },
  {
    name: 'checkNo',
    type: 'number',
    placeholder: 'Check No',
    min: '0',
    max: '9999999',
  },
];

const dateFields = [
  {
    name: 'datePayment',
    placeholder: 'Date of Payment',
  },
  {
    name: 'dateOfCheck',
    placeholder: 'Date of Check',
  },
  {
    name: 'datePosted',
    placeholder: 'Date Posted',
  },
];

function PaymentForm({ handleChangeInput, state }) {
  return (
    <Row gutter={30}>
      <Col sm={24} md={12}>
        {textFields.map(field => {
          return (
            <React.Fragment>
              <label for={field.name}>
                <h5>{field.placeholder}</h5>
              </label>
              <input
                className="ant-input"
                id={field.name}
                key={field.name}
                name={field.name}
                value={state[field.name]}
                onChange={handleChangeInput(field.name)}
                type={field.type}
                placeholder={field.placeholder}
              />
            </React.Fragment>
          );
        })}
        {numberFields.map(field => {
          return (
            <React.Fragment>
              <label for={field.name}>
                <h5>{field.placeholder}</h5>
              </label>
              <input
                className="ant-input"
                key={field.name}
                name={field.name}
                min={field.min}
                max={field.max}
                type={field.type}
                placeholder={field.placeholder}
                value={state[field.name]}
                onChange={handleChangeInput(field.name)}
              />
            </React.Fragment>
          );
        })}
      </Col>
      <Col sm={24} md={12}>
        <div>
          <label for="unitNo">
            <h5>Unit No.</h5>
          </label>
          <Select
            id="unitNo"
            className="bottom-20"
            showSearch
            style={{ width: '100%' }}
            placeholder="Select a Unit No."
            optionFilterProp="children"
            onChange={handleChangeInput('unitNo')}
            size="large"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {allUnits.map(unit => {
              return (
                <Select.Option key={unit} value={unit}>
                  {unit}
                </Select.Option>
              );
            })}
          </Select>
        </div>
        {dateFields.map(date => (
          <div>
            <label for={date.name}>
              <h5>{date.placeholder}</h5>
            </label>
            <DatePicker
              disabled={
                state.paymentType === 'cash' &&
                (date.name === 'dateOfCheck' || date.name === 'datePosted')
              }
              id={date.name}
              key={date.name}
              name={date.name}
              onChange={handleChangeInput(date.name)}
              size="large"
              style={{ with: '100%' }}
              placeholder={date.placeholder}
            />
          </div>
        ))}

        <h5>Payment Type</h5>
        <Radio.Group
          className="bottom-20"
          size="large"
          defaultValue="cash"
          value={state.paymentType}
          buttonStyle="solid"
          onChange={handleChangeInput('paymentType')}
        >
          <Radio.Button value="cash">Cash</Radio.Button>
          <Radio.Button value="check">Check</Radio.Button>
        </Radio.Group>
      </Col>
    </Row>
  );
}

PaymentForm.propTypes = {
  handleChangeInput: PropTypes.func,
  state: PropTypes.object,
  setState: PropTypes.func,
};

export default PaymentForm;
