// import React from 'react';
// import { Route, Switch } from 'react-router-dom';
// import withAuthorization from '../Session/withAuthorization';
// import * as routes from '../../constants/routes';
// import routesAdmin from '../App/routes.admin';
// import MainPage from '../../pages/Main';

// const AdminPage = () => (
//   <Switch>
//     <Route
//       path={routes.LANDING}
//       component={() => (
//         <MainPage>
//           {routesAdmin().map(route => (
//             <Route
//               key={route.id}
//               path={route.path}
//               component={route.component}
//               exact={route.exact}
//             />
//           ))}
//         </MainPage>
//       )}
//     />
//   </Switch>
// );

// export default withAuthorization(session => session && session.me && session.me.role === 'admin')(
//   AdminPage,
// );
