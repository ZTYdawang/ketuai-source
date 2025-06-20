import { Layout, Menu, Avatar, Typography, theme } from 'antd';
import {
  UserOutlined,
  MessageOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import React from 'react';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const menuItems = [
  { key: '1', icon: <MessageOutlined />, label: '会话' },
  { key: '2', icon: <TeamOutlined />, label: '智能体' },
  { key: '3', icon: <SettingOutlined />, label: '设置' },
];

const LayoutDemo: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <Sider
        width={220}
        style={{ background: '#fff', boxShadow: '2px 0 8px rgba(36,104,242,0.04)' }}
      >
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <Avatar size={40} style={{ background: '#2468F2' }} icon={<UserOutlined />} />
          <Title level={5} style={{ margin: '0 0 0 12px', color: '#2468F2', fontWeight: 700 }}>智能体平台</Title>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ borderRight: 0, marginTop: 16 }}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 1px 8px rgba(36,104,242,0.04)',
            height: 64,
          }}
        >
          <Title level={4} style={{ margin: 0, color: '#222', fontWeight: 700 }}>
            飞书风格 Ant Design 主框架
          </Title>
        </Header>
        <Content style={{ margin: '24px 32px', background: colorBgContainer, borderRadius: 12, minHeight: 360, boxShadow: '0 2px 8px rgba(36,104,242,0.04)' }}>
          <div style={{ padding: 32, minHeight: 200 }}>
            <Title level={5} style={{ color: '#2468F2' }}>欢迎体验飞书风格的 Ant Design 主框架！</Title>
            <p style={{ color: '#666', marginTop: 16 }}>
              你可以在此基础上快速开发各类智能体页面，所有布局、配色、圆角、阴影均已适配飞书风格。
            </p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutDemo; 