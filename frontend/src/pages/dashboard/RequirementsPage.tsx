import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';

const RequirementsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requirements, setRequirements] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequirements = async () => {
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
        const mockRequirements = [
          {
            id: 1,
            title: '智能客服助手',
            description: '需要一个能够自动回答客户问题的智能客服系统，提高客服效率。',
            status: 'completed',
            platform: '飞书',
            isPublic: false,
            isOnline: true,
            isPrivate: true,
            requiresKnowledgeBase: true,
            createdAt: '2023-05-10T10:30:00Z',
            completedAt: '2023-05-15T14:45:00Z'
          },
          {
            id: 2,
            title: '销售数据分析师',
            description: '需要一个能够分析销售数据，生成报告和洞察的AI工具，帮助销售团队优化策略。',
            status: 'completed',
            platform: '百度千帆',
            isPublic: true,
            isOnline: true,
            isPrivate: false,
            requiresKnowledgeBase: true,
            createdAt: '2023-05-12T09:15:00Z',
            completedAt: '2023-05-18T16:30:00Z'
          },
          {
            id: 3,
            title: '文档摘要工具',
            description: '需要一个能够自动提取文档关键信息，生成摘要的工具，节省阅读时间。',
            status: 'in_progress',
            platform: 'Dify',
            isPublic: false,
            isOnline: true,
            isPrivate: true,
            requiresKnowledgeBase: true,
            createdAt: '2023-05-20T11:20:00Z',
            completedAt: null
          },
          {
            id: 4,
            title: '市场调研助手',
            description: '需要一个能够收集和分析市场数据，生成市场调研报告的AI助手，辅助决策。',
            status: 'pending',
            platform: '扣子',
            isPublic: true,
            isOnline: true,
            isPrivate: false,
            requiresKnowledgeBase: false,
            createdAt: '2023-05-22T13:45:00Z',
            completedAt: null
          },
          {
            id: 5,
            title: '会议纪要生成器',
            description: '需要一个能够自动记录会议内容，生成会议纪要的工具，提高会议效率。',
            status: 'rejected',
            platform: '飞书',
            isPublic: false,
            isOnline: false,
            isPrivate: true,
            requiresKnowledgeBase: false,
            createdAt: '2023-05-05T15:30:00Z',
            completedAt: null,
            rejectionReason: '技术可行性低，需要更多细节'
          }
        ];
        
        setRequirements(mockRequirements);
        setLoading(false);
      } catch (err: any) {
        setError('获取需求数据失败');
        setLoading(false);
      }
    };
    
    fetchRequirements();
  }, [navigate]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            已完成
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            进行中
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            待处理
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            已拒绝
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            未知
          </span>
        );
    }
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">需求管理</h1>
            <p className="mt-1 text-sm text-gray-500">
              管理您的AI应用开发需求
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
          
          {/* 操作按钮 */}
          <div className="mb-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => navigate('/consultation/new')}
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              新增需求
            </button>
          </div>
          
          {/* 需求列表 */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">需求列表</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">查看所有AI应用开发需求</p>
              </div>
              <div className="flex space-x-2">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  defaultValue="all"
                >
                  <option value="all">所有状态</option>
                  <option value="completed">已完成</option>
                  <option value="in_progress">进行中</option>
                  <option value="pending">待处理</option>
                  <option value="rejected">已拒绝</option>
                </select>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  defaultValue="all"
                >
                  <option value="all">所有平台</option>
                  <option value="feishu">飞书</option>
                  <option value="baidu">百度千帆</option>
                  <option value="dify">Dify</option>
                  <option value="kouzhi">扣子</option>
                </select>
              </div>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {requirements.length === 0 ? (
                  <li className="px-4 py-4 sm:px-6">
                    <p className="text-sm text-gray-500 text-center py-4">暂无需求数据</p>
                  </li>
                ) : (
                  requirements.map((req) => (
                    <li key={req.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              req.status === 'completed' ? 'bg-green-100 text-green-600' :
                              req.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
                              req.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              {req.status === 'completed' ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              ) : req.status === 'in_progress' ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                              ) : req.status === 'pending' ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {req.title}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {req.description}
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {getStatusBadge(req.status)}
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {req.platform}
                              </span>
                              {req.isPublic ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  公开
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  不公开
                                </span>
                              )}
                              {req.isOnline ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  联网
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  不联网
                                </span>
                              )}
                              {req.isPrivate ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                  隐私保护
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  无隐私要求
                                </span>
                              )}
                              {req.requiresKnowledgeBase ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  需知识库
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  无需知识库
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-sm text-gray-500">
                            提交于: {new Date(req.createdAt).toLocaleDateString('zh-CN')}
                          </div>
                          {req.completedAt && (
                            <div className="text-sm text-gray-500">
                              完成于: {new Date(req.completedAt).toLocaleDateString('zh-CN')}
                            </div>
                          )}
                          <div className="mt-2">
                            <a
                              href={`/requirements/${req.id}`}
                              className="text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                              查看详情
                            </a>
                          </div>
                        </div>
                      </div>
                      {req.status === 'rejected' && req.rejectionReason && (
                        <div className="mt-2 bg-red-50 p-2 rounded-md">
                          <p className="text-sm text-red-700">拒绝原因: {req.rejectionReason}</p>
                        </div>
                      )}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
          
          {/* 分页 */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4">
            <div className="flex-1 flex justify-between sm:hidden">
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                上一页
              </a>
              <a
                href="#"
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                下一页
              </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  显示第 <span className="font-medium">1</span> 至 <span className="font-medium">{requirements.length}</span> 条，共 <span className="font-medium">{requirements.length}</span> 条结果
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">上一页</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">下一页</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RequirementsPage;
