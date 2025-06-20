import React from 'react';

const AdminSettingsPage: React.FC = () => {
  return (
    <main className="flex-1 p-6 w-full">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
            <p className="mt-1 text-sm text-gray-500">
              管理平台的全局设置和配置选项
            </p>
          </div>
          
          {/* 设置卡片 */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                基本设置
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                平台基本信息和显示设置
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="platform-name" className="block text-sm font-medium text-gray-700">
                    平台名称
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="platform-name"
                      id="platform-name"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue="科图AI产业赋能研究院"
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="platform-description" className="block text-sm font-medium text-gray-700">
                    平台描述
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="platform-description"
                      id="platform-description"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue="专注于AI产业赋能的综合服务平台"
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-6">
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">
                    联系邮箱
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="contact-email"
                      id="contact-email"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue="contact@ketuai.com"
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="logo-upload" className="block text-sm font-medium text-gray-700">
                    平台Logo
                  </label>
                  <div className="mt-1 flex items-center">
                    <span className="h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                      <img src="/logo.png" alt="平台Logo" className="h-full w-full object-contain" />
                    </span>
                    <button
                      type="button"
                      className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      更改
                    </button>
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="theme-color" className="block text-sm font-medium text-gray-700">
                    主题颜色
                  </label>
                  <div className="mt-1">
                    <select
                      id="theme-color"
                      name="theme-color"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue="blue"
                    >
                      <option value="blue">蓝色主题</option>
                      <option value="green">绿色主题</option>
                      <option value="purple">紫色主题</option>
                      <option value="red">红色主题</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                保存设置
              </button>
            </div>
          </div>
          
          {/* API设置 */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                API设置
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                API密钥和访问配置
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="api-key" className="block text-sm font-medium text-gray-700">
                    API密钥
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="api-key"
                      id="api-key"
                      className="flex-1 focus:ring-blue-500 focus:border-blue-500 block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300"
                      defaultValue="sk-1234567890abcdefghijklmnopqrstuvwxyz"
                      readOnly
                    />
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 sm:text-sm"
                    >
                      复制
                    </button>
                  </div>
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="api-rate-limit" className="block text-sm font-medium text-gray-700">
                    API速率限制
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="api-rate-limit"
                      id="api-rate-limit"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue="100"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">每分钟请求数</p>
                </div>
                
                <div className="sm:col-span-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="enable-api"
                        name="enable-api"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="enable-api" className="font-medium text-gray-700">启用API访问</label>
                      <p className="text-gray-500">允许通过API访问平台功能</p>
                    </div>
                  </div>
                </div>
                
                <div className="sm:col-span-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    重新生成API密钥
                  </button>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                保存设置
              </button>
            </div>
          </div>
          
          {/* 通知设置 */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                通知设置
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                系统通知和提醒配置
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email-notifications"
                      name="email-notifications"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email-notifications" className="font-medium text-gray-700">邮件通知</label>
                    <p className="text-gray-500">接收重要事件的邮件通知</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="system-notifications"
                      name="system-notifications"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="system-notifications" className="font-medium text-gray-700">系统通知</label>
                    <p className="text-gray-500">在平台内接收系统通知</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="token-alerts"
                      name="token-alerts"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="token-alerts" className="font-medium text-gray-700">Token余额提醒</label>
                    <p className="text-gray-500">当Token余额低于阈值时接收提醒</p>
                  </div>
                </div>
                
                <div className="sm:col-span-3 max-w-xs">
                  <label htmlFor="token-threshold" className="block text-sm font-medium text-gray-700">
                    Token余额阈值
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="token-threshold"
                      id="token-threshold"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue="100000"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                保存设置
              </button>
            </div>
          </div>
          
          {/* 安全设置 */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                安全设置
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                账户安全和访问控制
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="session-timeout" className="block text-sm font-medium text-gray-700">
                    会话超时时间
                  </label>
                  <div className="mt-1">
                    <select
                      id="session-timeout"
                      name="session-timeout"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue="30"
                    >
                      <option value="15">15分钟</option>
                      <option value="30">30分钟</option>
                      <option value="60">1小时</option>
                      <option value="120">2小时</option>
                    </select>
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="password-policy" className="block text-sm font-medium text-gray-700">
                    密码策略
                  </label>
                  <div className="mt-1">
                    <select
                      id="password-policy"
                      name="password-policy"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue="medium"
                    >
                      <option value="low">基本 (至少8个字符)</option>
                      <option value="medium">中等 (至少8个字符，包含大小写和数字)</option>
                      <option value="high">高强度 (至少12个字符，包含大小写、数字和特殊字符)</option>
                    </select>
                  </div>
                </div>
                
                <div className="sm:col-span-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="two-factor-auth"
                        name="two-factor-auth"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="two-factor-auth" className="font-medium text-gray-700">启用两因素认证</label>
                      <p className="text-gray-500">要求管理员账户使用两因素认证</p>
                    </div>
                  </div>
                </div>
                
                <div className="sm:col-span-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="ip-restriction"
                        name="ip-restriction"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="ip-restriction" className="font-medium text-gray-700">IP访问限制</label>
                      <p className="text-gray-500">限制只有特定IP地址可以访问管理后台</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                保存设置
              </button>
            </div>
          </div>
        </main>
  );
};

export default AdminSettingsPage;
