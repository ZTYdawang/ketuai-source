import React from 'react';
import { Layout, Menu, Modal } from 'antd';
import { UserOutlined, FileTextOutlined } from '@ant-design/icons';
import './FeishuLayout.less';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';

const { Sider, Content } = Layout;

const menuItems = [
  { key: '/admin', label: '控制台', icon: <UserOutlined /> },
  { key: '/admin/users', label: '用户管理', icon: <UserOutlined /> },
  { key: '/admin/stats', label: '智能体统计', icon: <FileTextOutlined /> },
  { key: '/admin/companies', label: 'AI公司管理', icon: <FileTextOutlined /> },
  { key: '/admin/requirements', label: '需求管理', icon: <FileTextOutlined /> },
  { key: '/admin/tokens', label: 'Token管理', icon: <FileTextOutlined /> },
  { key: '/admin/settings', label: '系统设置', icon: <FileTextOutlined /> },
  { key: 'logout', label: '退出登录', icon: <FileTextOutlined />, danger: true },
];

const FeishuLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 智能体页面无需左侧导航
  const isAIAssistant = location.pathname.startsWith('/ai-assistant');

  // 精确高亮当前菜单项
  const getSelectedKey = () => {
    const match = menuItems.find(item => location.pathname === item.key || location.pathname.startsWith(item.key + '/'));
    return [match?.key || '/admin'];
  };

  const siderWidth = isAIAssistant ? 0 : (collapsed ? 80 : 220);

  // 退出登录确认
  const confirmLogout = () => {
    Modal.confirm({
      title: '确认退出登录？',
      okText: '退出',
      cancelText: '取消',
      okType: 'danger',
      onOk: () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        navigate('/auth/login');
      },
    });
  };

  return (
    <>
      <AdminHeader />
      <Layout style={{ minHeight: '100vh', marginLeft: siderWidth, paddingTop: 64 }}>
        {!isAIAssistant && (
          <Sider
            width={siderWidth}
            style={{ background: '#fff', boxShadow: '2px 0 8px rgba(36,104,242,0.04)', overflow: 'auto', display: 'flex', flexDirection: 'column', padding: 0, position: 'fixed', top: 64, left: 0, height: 'calc(100vh - 64px)' }}
          >
            <div className="feishu-logo" />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <Menu
                theme="light"
                mode="inline"
                selectedKeys={getSelectedKey()}
                style={{ border: 'none', fontSize: 16, height: '100%' }}
                items={menuItems.map(item => ({
                  key: item.key,
                  icon: item.icon,
                  label: item.label,
                  danger: item.danger,
                  onClick: () => {
                    if (item.key === 'logout') {
                      confirmLogout();
                    } else {
                      navigate(item.key);
                    }
                  }
                }))}
              />
            </div>
          </Sider>
        )}
        <Layout>
          <Content style={{ margin: '24px 24px 0', minHeight: 280, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(36,104,242,0.04)' }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default FeishuLayout; 