import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../components/ui/select';
import { useState } from 'react';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [userTrendDimension, setUserTrendDimension] = useState<'week' | 'month' | 'year'>('week');
  const [tokenTrendDimension, setTokenTrendDimension] = useState<'week' | 'month' | 'year'>('week');
  // 模拟不同维度数据
  const userGrowthDataMap = {
    week: [
    { date: '05-01', users: 80 },
    { date: '05-02', users: 90 },
    { date: '05-03', users: 100 },
    { date: '05-04', users: 110 },
    { date: '05-05', users: 120 },
    { date: '05-06', users: 125 },
    { date: '05-07', users: 128 },
    ],
    month: Array.from({ length: 31 }, (_, i) => ({
      date: `05-${(i + 1).toString().padStart(2, '0')}`,
      users: 80 + i * 2 + Math.floor(Math.random() * 5),
    })),
    year: Array.from({ length: 12 }, (_, i) => ({
      date: (i + 1).toString().padStart(2, '0'),
      users: 100 + i * 30 + Math.floor(Math.random() * 20),
    })),
  };
  const tokenTrendDataMap = {
    week: [
    { date: '05-01', tokens: 80000 },
    { date: '05-02', tokens: 90000 },
    { date: '05-03', tokens: 95000 },
    { date: '05-04', tokens: 100000 },
    { date: '05-05', tokens: 110000 },
    { date: '05-06', tokens: 115000 },
    { date: '05-07', tokens: 120000 },
    ],
    month: Array.from({ length: 31 }, (_, i) => ({
      date: `05-${(i + 1).toString().padStart(2, '0')}`,
      tokens: 80000 + i * 1000 + Math.floor(Math.random() * 2000),
    })),
    year: Array.from({ length: 12 }, (_, i) => ({
      date: (i + 1).toString().padStart(2, '0'),
      tokens: 100000 + i * 20000 + Math.floor(Math.random() * 10000),
    })),
  };

  return (
    <main className="flex-1 p-6 w-full overflow-auto">
          <div className="mb-8 text-left">
            <h1 className="text-2xl font-bold text-gray-900">管理员控制台</h1>
            <p className="mt-1 text-sm text-gray-500">
              欢迎使用科图AI产业赋能研究院管理系统
            </p>
          </div>
          
          {/* 统计卡片 */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">用户总数</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">24</div>
                        <div className="text-sm text-green-600">+12% 增长</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <button onClick={() => navigate('/admin/users')} className="font-medium text-blue-600 hover:text-blue-500 w-full text-left">查看详情<span className="sr-only">用户总数</span></button>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">AI应用总数</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">86</div>
                        <div className="text-sm text-green-600">+18% 增长</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <button onClick={() => navigate('/admin/agents')} className="font-medium text-blue-600 hover:text-blue-500 w-full text-left">查看详情<span className="sr-only">AI应用总数</span></button>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Token消耗</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">1.2M</div>
                        <div className="text-sm text-red-600">-5% 下降</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <button onClick={() => navigate('/admin/tokens')} className="font-medium text-blue-600 hover:text-blue-500 w-full text-left">查看详情<span className="sr-only">Token消耗</span></button>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">待处理需求</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">12</div>
                        <div className="text-sm text-green-600">+8% 增长</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <button onClick={() => navigate('/admin/requirements')} className="font-medium text-blue-600 hover:text-blue-500 w-full text-left">查看详情<span className="sr-only">待处理需求</span></button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 图表区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">用户增长趋势</h2>
                <Select value={userTrendDimension} onValueChange={v => setUserTrendDimension(v as any)}>
                  <SelectTrigger className="w-28 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">周度</SelectItem>
                    <SelectItem value="month">月度</SelectItem>
                    <SelectItem value="year">年度</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={userGrowthDataMap[userTrendDimension]} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="#2563eb" name="用户数" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Token消耗趋势</h2>
                <Select value={tokenTrendDimension} onValueChange={v => setTokenTrendDimension(v as any)}>
                  <SelectTrigger className="w-28 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">周度</SelectItem>
                    <SelectItem value="month">月度</SelectItem>
                    <SelectItem value="year">年度</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={tokenTrendDataMap[tokenTrendDimension]} margin={{ top: 20, right: 30, left: 48, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={v => (v / 10000) + '万'} />
                    <Tooltip formatter={v => (v as number / 10000) + '万'} />
                    <Legend formatter={v => v === 'tokens' ? 'Token消耗量（万）' : v} />
                    <Bar dataKey="tokens" fill="#10b981" name="Token消耗量（万）" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* 最近活动 */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                最近活动
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              <li>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          新用户注册
                        </div>
                        <div className="text-sm text-gray-500">
                          上海数据科技有限公司
                        </div>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <div className="text-sm text-gray-500">
                        10分钟前
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          新AI应用创建
                        </div>
                        <div className="text-sm text-gray-500">
                          客户服务智能助手 - 北京科技有限公司
                        </div>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <div className="text-sm text-gray-500">
                        30分钟前
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Token充值
                        </div>
                        <div className="text-sm text-gray-500">
                          广州智能科技有限公司 - 1,000,000 Tokens
                        </div>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <div className="text-sm text-gray-500">
                        2小时前
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          新需求提交
                        </div>
                        <div className="text-sm text-gray-500">
                          销售数据分析助手 - 上海数据科技有限公司
                        </div>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <div className="text-sm text-gray-500">
                        3小时前
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">查看所有活动<span className="sr-only">查看所有活动</span></a>
              </div>
            </div>
          </div>
          
          {/* 快速操作 */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                快速操作
              </h3>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full"
                  >
                    添加用户
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full"
                  >
                    处理需求
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full"
                  >
                    查看统计
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full"
                  >
                    系统设置
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
  );
};

export default AdminPage;
