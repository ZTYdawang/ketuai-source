import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../components/ui/select';

interface Activity {
  id: number;
  type: string;
  user: string;
  company: string;
  time: string;
  amount?: number;
}

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // 统计数据
  const [stats, setStats] = useState<StatCard[]>([
    {
      title: '总用户数',
      value: 0,
      change: '0%',
      trend: 'neutral'
    },
    {
      title: 'AI应用数',
      value: 0,
      change: '0%',
      trend: 'neutral'
    },
    {
      title: '本月Token消耗',
      value: 0,
      change: '0%',
      trend: 'neutral'
    },
    {
      title: '活跃企业数',
      value: 0,
      change: '0%',
      trend: 'neutral'
    }
  ]);
  
  // 最近活动
  const [activities, setActivities] = useState<Activity[]>([]);

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

  useEffect(() => {
    // 检查管理员是否已登录
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/auth/login');
      return;
    }
    
    // 获取统计数据和最近活动
    const fetchDashboardData = async () => {
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 模拟统计数据
        setStats([
          {
            title: '总用户数',
            value: 128,
            change: '+12%',
            trend: 'up'
          },
          {
            title: 'AI应用数',
            value: 56,
            change: '+8%',
            trend: 'up'
          },
          {
            title: '本月Token消耗',
            value: '1.2M',
            change: '+15%',
            trend: 'up'
          },
          {
            title: '活跃企业数',
            value: 42,
            change: '+5%',
            trend: 'up'
          }
        ]);
        
        // 模拟最近活动
        setActivities([
          { id: 1, type: 'user_registered', user: '张三', company: '科技有限公司', time: '10分钟前' },
          { id: 2, type: 'requirement_created', user: '李四', company: '智能科技公司', time: '30分钟前' },
          { id: 3, type: 'agent_deployed', user: '王五', company: '数据分析有限公司', time: '1小时前' },
          { id: 4, type: 'token_purchased', user: '赵六', company: '创新科技公司', amount: 100000, time: '2小时前' },
          { id: 5, type: 'user_registered', user: '钱七', company: '智慧城市科技', time: '3小时前' }
        ]);
        
        setLoading(false);
      } catch {
        setError('获取仪表盘数据失败');
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [navigate]);

  // 渲染活动类型图标
  const renderActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registered':
        return (
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
        );
      case 'requirement_created':
        return (
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        );
      case 'agent_deployed':
        return (
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        );
      case 'token_purchased':
        return (
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        );
    }
  };

  // 渲染活动描述
  const renderActivityDescription = (activity: Activity) => {
    switch (activity.type) {
      case 'user_registered':
        return (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">
              新用户注册
            </p>
            <p className="text-sm text-gray-500">
              {activity.user} ({activity.company}) 注册了账号
            </p>
          </div>
        );
      case 'requirement_created':
        return (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">
              新需求提交
            </p>
            <p className="text-sm text-gray-500">
              {activity.user} ({activity.company}) 提交了新的AI应用需求
            </p>
          </div>
        );
      case 'agent_deployed':
        return (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">
              AI应用部署
            </p>
            <p className="text-sm text-gray-500">
              {activity.user} ({activity.company}) 部署了新的AI应用
            </p>
          </div>
        );
      case 'token_purchased':
        return (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">
              Token购买
            </p>
            <p className="text-sm text-gray-500">
              {activity.user} ({activity.company}) 购买了 {activity.amount} Tokens
            </p>
          </div>
        );
      default:
        return (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">
              系统活动
            </p>
            <p className="text-sm text-gray-500">
              {activity.user} ({activity.company}) 执行了操作
            </p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
       <main className="flex-1 p-6 w-full">
          <div className="mb-6 text-left">
            <h1 className="text-2xl font-bold text-gray-900">管理员控制台</h1>
            <p className="mt-1 text-sm text-gray-500">
              欢迎回来，管理员。以下是平台的概览数据。
            </p>
          </div>
          
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.title}
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {stat.value}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6 flex flex-col gap-2">
                  <div className="text-sm">
                    <span className={`font-medium ${
                      stat.trend === 'up' 
                        ? 'text-green-600' 
                        : stat.trend === 'down' 
                          ? 'text-red-600' 
                          : 'text-gray-500'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-gray-500"> 较上月</span>
                  </div>
                  <button
                    type="button"
                    className="mt-2 w-full inline-flex items-center justify-center px-4 py-2 border border-blue-500 text-blue-700 bg-white hover:bg-blue-50 rounded-md text-sm font-medium transition"
                    onClick={() => {
                      if (index === 0) navigate('/admin/users');
                      else if (index === 1) navigate('/admin/agents');
                      else if (index === 2) navigate('/admin/tokens');
                      else if (index === 3) navigate('/admin/statistics');
                    }}
                  >
                    查看详情
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  最近活动
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="flow-root">
                  <ul className="-mb-8">
                    {activities.map((activity, activityIdx) => (
                      <li key={activity.id}>
                        <div className="relative pb-8">
                          {activityIdx !== activities.length - 1 ? (
                            <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                          ) : null}
                          <div className="relative flex items-start space-x-3">
                            {renderActivityIcon(activity.type)}
                            {renderActivityDescription(activity)}
                            <div className="min-w-0 flex-1 text-right">
                              <p className="text-sm text-gray-500">
                                {activity.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <a
                    href="#"
                    className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    查看更多活动
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  快速操作
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">用户管理</h4>
                    <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => navigate('/admin/users')}
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        查看用户
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        添加用户
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">AI应用管理</h4>
                    <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => navigate('/admin/agents')}
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                        </svg>
                        查看应用
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => navigate('/admin/token')}
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                        Token管理
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">系统管理</h4>
                    <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => navigate('/admin/settings')}
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        系统设置
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        系统日志
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 用户增长趋势图表 */}
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
            {/* Token消耗趋势图表 */}
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
        </main>
    </>
  );
};

export default AdminDashboardPage;
