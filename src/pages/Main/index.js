import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Dropdown } from 'antd';
import { checkTokenExpired } from '../../helpers/cookie';

import history from '../../constants/history';
import SignOut from '../../components/SignOut';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const menu = (
  <Menu>
    <Menu.Item key="signout">
      <SignOut />
    </Menu.Item>
  </Menu>
);

function SiderDemo() {
  const [collapsed, setCollapsed] = React.useState(false);

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
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.Item>
          <SubMenu
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
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link account" href="#">
              Account <Icon type="down" />
            </a>
          </Dropdown>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>by Nenjotsu</Footer>
      </Layout>
    </Layout>
  );
}

export default SiderDemo;