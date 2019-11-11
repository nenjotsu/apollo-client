import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Dropdown } from 'antd';
import { checkTokenExpired } from '../../helpers/cookie';
import * as routes from '../../constants/routes';
import withSession from '../../components/Session/withSession';
import _get from 'lodash/get';
import history from '../../constants/history';
import SignOut from '../../components/SignOut';
import SOAPage from '../SOA';
import UnitPage from '../Unit';
import SingleUnitPage from '../Unit/Single';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const menu = (
  <Menu>
    <Menu.Item key="signout">
      <SignOut />
    </Menu.Item>
  </Menu>
);

function SiderDemo({ session, children }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const isAdmin = _get(session, 'me.role') === 'admin';
  const isSuperAdmin = _get(session, 'me.username') === 'nenjotsu';

  console.log('isAdmin', isAdmin);

  React.useEffect(() => {
    checkTokenExpired(history);
  }, []);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={[]} mode="inline">
          <Menu.Item key="1">
            <Icon type="desktop" />
            <span>
              <Link to={routes.SOA}>SOA</Link>
            </span>
          </Menu.Item>
          {isAdmin && (
            <Menu.Item key="2">
              <Icon type="pie-chart" />
              <span>
                <Link to={routes.UNIT}>Unit Owners</Link>
              </span>
            </Menu.Item>
          )}
          {isSuperAdmin && (
            <Menu.Item key="3">
              <Icon type="form" />
              <span>
                <Link to={routes.PAYMENT}>Payments</Link>
              </span>
            </Menu.Item>
          )}
          {/* <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>User</span>
              </span>
            }
          >
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="team" />
                <span>Team</span>
              </span>
            }
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <Icon type="file" />
            <span>File</span>
          </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link account">
              Account <Icon type="down" />
            </a>
          </Dropdown>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {/* <Breadcrumb.Item>User</Breadcrumb.Item> */}
            {/* <Breadcrumb.Item>{_get(session, 'me.username')}</Breadcrumb.Item> */}
          </Breadcrumb>
          {children}
          {/* <Router history={history}>
            <React.Fragment>
              <Route exact path={routes.SOA} component={() => <SOAPage refetch={refetch} />} />
              <Route exact path={routes.UNIT} component={() => <UnitPage refetch={refetch} />} />
              <Route
                exact
                path={routes.SINGLE_UNIT}
                component={() => <SingleUnitPage refetch={refetch} />}
              />
            </React.Fragment>
          </Router> */}
        </Content>
        <Footer style={{ textAlign: 'center' }}>by nenjotsu@gmail.com</Footer>
      </Layout>
    </Layout>
  );
}

export default withSession(SiderDemo);
