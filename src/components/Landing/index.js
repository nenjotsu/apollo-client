import React from 'react';
import { Route, Switch } from 'react-router-dom';
import withAuthorization from '../Session/withAuthorization';
import * as routes from '../../constants/routes';
import hoaRoutes from '../App/routes';
import AdminPage from '../Admin';
import MainPage from '../../pages/Main';
import SOAPage from '../../pages/SOA';

const LandingPage = () => (
  <Switch>
    <Route
      path={routes.LANDING}
      component={() => (
        <MainPage>
          {hoaRoutes().map(route => (
            <Route
              key={route.id}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
        </MainPage>
      )}
    />
  </Switch>
);

export default withAuthorization(session => session && session.me)(LandingPage);
