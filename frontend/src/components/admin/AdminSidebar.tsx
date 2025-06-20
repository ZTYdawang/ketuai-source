import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const [countdown, setCountdown] = React.useState(9);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // 处理倒计时
  React.useEffect(() => {
    if (showLogoutModal) {
      setCountdown(9);
      timerRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setShowLogoutModal(false);
            clearInterval(timerRef.current!);
            return 9;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [showLogoutModal]);

  const handleLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem('admin_token');
    navigate('/auth/login');
  };

  return (
    <div className={styles['feishu-sidebar']}>
      <div className="flex flex-col h-full w-full">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto w-full">
          <nav className="mt-5 flex-1 flex flex-col items-center">
            <Link
              className={`${styles['feishu-menu-item']} ${currentPath === '/admin' ? styles['feishu-menu-item-selected'] : ''}`}
              to="/admin"
            >
              控制台
            </Link>
            <Link
              className={`${styles['feishu-menu-item']} ${currentPath === '/admin/users' ? styles['feishu-menu-item-selected'] : ''}`}
              to="/admin/users"
            >
              用户管理
            </Link>
            <Link
              className={`${styles['feishu-menu-item']} ${currentPath === '/admin/stats' ? styles['feishu-menu-item-selected'] : ''}`}
              to="/admin/stats"
            >
              智能体统计
            </Link>
            <Link
              className={`${styles['feishu-menu-item']} ${currentPath === '/admin/companies' ? styles['feishu-menu-item-selected'] : ''}`}
              to="/admin/companies"
            >
              AI公司管理
            </Link>
            <Link
              className={`${styles['feishu-menu-item']} ${currentPath === '/admin/requirements' ? styles['feishu-menu-item-selected'] : ''}`}
              to="/admin/requirements"
            >
              需求管理
            </Link>
            <Link
              className={`${styles['feishu-menu-item']} ${currentPath === '/admin/tokens' ? styles['feishu-menu-item-selected'] : ''}`}
              to="/admin/tokens"
            >
              Token管理
            </Link>
            <Link
              className={`${styles['feishu-menu-item']} ${currentPath === '/admin/settings' ? styles['feishu-menu-item-selected'] : ''}`}
              to="/admin/settings"
            >
              系统设置
            </Link>
            <button
              className={`${styles['feishu-menu-item']} ${styles['feishu-menu-logout']}`}
              onClick={() => setShowLogoutModal(true)}
            >
              退出登录
            </button>
          </nav>
        </div>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-2">确认退出登录？</h3>
            <p className="text-gray-600 mb-4">确定要退出登录吗？（{countdown} 秒后自动取消）</p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={() => setShowLogoutModal(false)}
              >
                取消
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleLogout}
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
