import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/logo.png';

const mockMessages = [
  { id: 1, content: '有新的工单待处理', time: '2分钟前' },
  { id: 2, content: 'AI应用"智慧客服"已上线', time: '10分钟前' },
  { id: 3, content: 'Token余额不足，请及时充值', time: '1小时前' },
  { id: 4, content: '企业"广州智能科技有限公司"已通过审核', time: '昨天' },
];

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();
  const [msgOpen, setMsgOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const msgRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  // 从本地存储获取已登录管理员信息
  const storedUser = localStorage.getItem('admin_user') || localStorage.getItem('user');
  const email = storedUser ? JSON.parse(storedUser).email : (localStorage.getItem('admin_email') || 'admin@example.com');

  // 点击外部关闭下拉
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (msgRef.current && !msgRef.current.contains(e.target as Node)) setMsgOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="feishu-header ant-layout-header fixed top-0 left-0 w-full z-50 shadow">
      <div className="flex items-center h-16 pl-4 sm:pl-6 lg:pl-8 pr-4 w-full">
        {/* 左侧 logo+标题 */}
        <div className="flex items-center min-w-0">
          <img src={logo} alt="logo" className="feishu-logo mr-3" style={{height: 36, width: 36, borderRadius: 8}} onClick={() => navigate('/')} />
          <span className="text-xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors duration-200 truncate" onClick={() => navigate('/')}>科图AI产业赋能研究院</span>
          </div>
          {/* 右侧操作区 */}
        <div className="ml-auto flex items-center space-x-6">
            {/* 信息图标+气泡 */}
            <div className="relative" ref={msgRef}>
              <button
                className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setMsgOpen(v => !v)}
              >
                {/* 信息图标 */}
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m10-4H7a2 2 0 00-2 2v0a2 2 0 002 2h10a2 2 0 002-2v0a2 2 0 00-2-2z" />
                </svg>
                {/* 气泡提示 */}
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">{mockMessages.length}</span>
              </button>
              {/* 下拉消息 */}
              {msgOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-2 px-4 border-b text-gray-700 font-semibold">最新消息</div>
                  <ul className="max-h-60 overflow-y-auto divide-y divide-gray-100">
                    {mockMessages.map(msg => (
                      <li key={msg.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <div className="text-sm text-gray-900">{msg.content}</div>
                        <div className="text-xs text-gray-400 mt-1">{msg.time}</div>
                      </li>
                    ))}
                  </ul>
                  <div className="py-2 px-4 text-right text-blue-600 text-sm hover:underline cursor-pointer">查看全部</div>
                </div>
              )}
            </div>
            {/* 头像+账户名+下拉 */}
            <div className="relative" ref={userRef}>
              <button
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full px-2 py-1 hover:bg-gray-100"
                onClick={() => setUserOpen(v => !v)}
              >
                {/* SVG头像 */}
                <span className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="white" />
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-3.314 3.134-6 8-6s8 2.686 8 6" />
                  </svg>
                </span>
                <span className="text-gray-900 font-medium">{email}</span>
              </button>
              {/* 下拉菜单 */}
              {userOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => { setUserOpen(false); navigate('/admin/settings'); }}>用户设置</button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => { setUserOpen(false); navigate('/admin/requirements'); }}>工单信息</button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => { setUserOpen(false); navigate('/auth/login'); }}>切换账号</button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
