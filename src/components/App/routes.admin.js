import * as routes from '../../constants/routes';
import UnitPage from '../../pages/Unit';
import SingleUnitPage from '../../pages/Unit/Single';

const routesAdmin = () => [
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
    exact: true,
  },
];

export default routesAdmin;
