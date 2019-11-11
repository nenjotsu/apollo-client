import * as routes from '../../constants/routes';
import SOA from '../../pages/SOA';
import UnitPage from '../../pages/Unit';
import SingleUnitPage from '../../pages/Unit/Single';
import PaymentPage from '../../pages/Payment';

const hoaRoutes = () => [
  {
    id: 'soa',
    path: routes.SOA,
    component: SOA,
    exact: true,
  },
  {
    id: 'unit',
    path: routes.UNIT,
    component: UnitPage,
    exact: true,
  },
  {
    id: 'unitsingle',
    path: routes.SINGLE_UNIT,
    component: SingleUnitPage,
    exact: false,
  },
  {
    id: 'payment',
    path: routes.PAYMENT,
    component: PaymentPage,
    exact: true,
  },
];

export default hoaRoutes;
