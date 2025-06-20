import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './MainSiteLayout.less';

const { Header, Content } = Layout;

const menuItems = [
  { key: '/', label: <Link to="/">首页</Link> },
  { key: '/cases', label: <Link to="/cases">案例</Link> },
  { key: '/pricing', label: <Link to="/pricing">价格</Link> },
  { key: '/contact', label: <Link to="/contact">联系我们</Link> },
];

const MainSiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <Layout className="main-site-layout">
      <Header className="main-site-header">
        <div className="main-site-logo" />
        <Menu
          mode="horizontal"
          selectedKeys={[menuItems.find(item => location.pathname.startsWith(item.key))?.key || '/']}
          items={menuItems}
          className="main-site-menu"
        />
        <div className="main-site-actions">
          <Link to="/auth/login"><Button type="link">登录</Button></Link>
          <Link to="/auth/register"><Button type="primary" style={{ marginLeft: 8 }}>注册</Button></Link>
        </div>
      </Header>
      <Content className="main-site-content">
        {children}
      </Content>
    </Layout>
  );
};

export default MainSiteLayout; 