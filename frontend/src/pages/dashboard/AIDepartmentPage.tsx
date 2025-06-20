import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';

const AIDepartmentPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applications, setApplications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // 检查用户是否已登录
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }
        
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 使用模拟数据
        const mockApplications = [
          {
            id: 1,
            name: '智能客服助手',
            description: '自动回答客户问题，提高客服效率',
            platform: '飞书',
            type: 'customer_service',
            status: 'active',
            icon: '🤖',
            color: 'bg-blue-100',
            usage: {
              tokens: 5200,
              conversations: 350,
              users: 8
            },
            lastUsed: '2023-05-28T08:30:00Z',
            createdAt: '2023-05-10T10:30:00Z'
          },
          {
            id: 2,
            name: '销售数据分析师',
            description: '分析销售数据，生成报告和洞察',
            platform: '百度千帆',
            type: 'data_analysis',
            status: 'active',
            icon: '📊',
            color: 'bg-green-100',
            usage: {
              tokens: 4800,
              conversations: 120,
              users: 5
            },
            lastUsed: '2023-05-27T14:20:00Z',
            createdAt: '2023-05-12T09:15:00Z'
          },
          {
            id: 3,
            name: '文档摘要工具',
            description: '自动提取文档关键信息，生成摘要',
            platform: 'Dify',
            type: 'document_processing',
            status: 'active',
            icon: '📄',
            color: 'bg-yellow-100',
            usage: {
              tokens: 3500,
              conversations: 85,
              users: 12
            },
            lastUsed: '2023-05-27T11:20:00Z',
            createdAt: '2023-05-15T13:45:00Z'
          },
          {
            id: 4,
            name: '市场调研助手',
            description: '收集和分析市场数据，生成市场调研报告',
            platform: '扣子',
            type: 'market_research',
            status: 'inactive',
            icon: '🔍',
            color: 'bg-purple-100',
            usage: {
              tokens: 1200,
              conversations: 25,
              users: 3
            },
            lastUsed: '2023-05-20T16:10:00Z',
            createdAt: '2023-05-18T11:30:00Z'
          },
          {
            id: 5,
            name: '会议纪要生成器',
            description: '自动记录会议内容，生成会议纪要',
            platform: '飞书',
            type: 'meeting_assistant',
            status: 'active',
            icon: '📝',
            color: 'bg-red-100',
            usage: {
              tokens: 2800,
              conversations: 45,
              users: 10
            },
            lastUsed: '2023-05-26T09:45:00Z',
            createdAt: '2023-05-20T14:20:00Z'
          }
        ];
        
        setApplications(mockApplications);
        setLoading(false);
      } catch (err) {
        setError('获取AI应用数据失败');
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, [navigate]);

  // 过滤和搜索应用
  const filteredApplications = applications.filter(app => {
    const matchesSearch = searchTerm === '' || 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      app.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlatform = filterPlatform === 'all' || app.platform === filterPlatform;
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const handleCreateApplication = () => {
    navigate('/consultation/new');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-6">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">我的AI部门</h1>
              <p className="mt-1 text-sm text-gray-500">
                管理您的所有AI应用
              </p>
            </div>
            <button
              type="button"
              onClick={handleCreateApplication}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              创建新应用
            </button>
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
          
          {/* 搜索和筛选 */}
          <div className="mb-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">搜索应用</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="搜索应用名称或描述"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div>
                <label htmlFor="platform-filter" className="sr-only">平台筛选</label>
                <select
                  id="platform-filter"
                  name="platform-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filterPlatform}
                  onChange={(e) => setFilterPlatform(e.target.value)}
                >
                  <option value="all">所有平台</option>
                  <option value="飞书">飞书</option>
                  <option value="百度千帆">百度千帆</option>
                  <option value="Dify">Dify</option>
                  <option value="扣子">扣子</option>
                </select>
              </div>
              <div>
                <label htmlFor="status-filter" className="sr-only">状态筛选</label>
                <select
                  id="status-filter"
                  name="status-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">所有状态</option>
                  <option value="active">活跃</option>
                  <option value="inactive">未激活</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* 应用列表 */}
          {filteredApplications.length === 0 ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">暂无应用</h3>
              <p className="mt-1 text-sm text-gray-500">
                开始创建您的第一个AI应用吧
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleCreateApplication}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  创建新应用
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredApplications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white overflow-hidden shadow rounded-lg border border-gray-200"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 rounded-md p-3 ${app.color}`}>
                        <span className="text-2xl">{app.icon}</span>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="truncate text-sm font-medium text-gray-500">
                            {app.platform}
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {app.name}
                            </div>
                          </dd>
                        </dl>
                      </div>
                      <div className="flex-shrink-0">
                        {app.status === 'active' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            活跃
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            未激活
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 px-5 py-3">
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {app.description}
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-5 py-3 bg-gray-50">
                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>使用量: {app.usage.tokens.toLocaleString()} tokens</span>
                      <span>对话: {app.usage.conversations}</span>
                      <span>用户: {app.usage.users}</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 px-5 py-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        创建于: {new Date(app.createdAt).toLocaleDateString('zh-CN')}
                      </span>
                      <div className="flex space-x-2">
                        <a
                          href={`/ai-department/${app.id}/settings`}
                          className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                          设置
                        </a>
                        <a
                          href={`/ai-department/${app.id}`}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          使用
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AIDepartmentPage;
