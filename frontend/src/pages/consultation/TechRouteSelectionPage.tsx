import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';

interface TechRouteOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface TechRouteCategory {
  title: string;
  description: string;
  options: TechRouteOption[];
  selected: string;
}

const TechRouteSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [requirementData, setRequirementData] = useState<any>(null);
  
  const [techRoutes, setTechRoutes] = useState<{[key: string]: TechRouteCategory}>({
    visibility: {
      title: '可见性',
      description: '选择您的AI应用对企业内部的可见范围',
      options: [],
      selected: ''
    },
    connectivity: {
      title: '联网能力',
      description: '决定您的AI应用是否可以访问互联网获取实时信息',
      options: [],
      selected: ''
    },
    privacy: {
      title: '隐私保护',
      description: '选择适合您业务的数据隐私保护级别',
      options: [],
      selected: ''
    },
    knowledge_base: {
      title: '知识库配置',
      description: '决定您的AI应用是否需要专属知识库支持',
      options: [],
      selected: ''
    }
  });

  useEffect(() => {
    // 检查用户是否已登录
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    // 检查是否有需求数据传入
    if (location.state && location.state.requirementData) {
      setRequirementData(location.state.requirementData);
    } else {
      navigate('/consultation/new');
      return;
    }
    
    // 获取技术路线选项
    const fetchTechRoutes = async () => {
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 模拟数据
        const mockTechRoutes = {
          visibility: [
            {
              id: 'public',
              name: '公开',
              description: '应用可被公司内所有员工访问和使用',
              icon: '🌐'
            },
            {
              id: 'private',
              name: '私有',
              description: '应用仅对指定用户可见和使用',
              icon: '🔒'
            }
          ],
          connectivity: [
            {
              id: 'online',
              name: '联网',
              description: '应用可以访问互联网获取实时信息',
              icon: '🔌'
            },
            {
              id: 'offline',
              name: '离线',
              description: '应用在封闭环境中运行，不访问外部网络',
              icon: '📴'
            }
          ],
          privacy: [
            {
              id: 'standard',
              name: '标准隐私保护',
              description: '遵循平台默认的数据处理和隐私政策',
              icon: '🔐'
            },
            {
              id: 'enhanced',
              name: '增强隐私保护',
              description: '额外的数据加密和隐私保护措施',
              icon: '🛡️'
            }
          ],
          knowledge_base: [
            {
              id: 'required',
              name: '需要知识库',
              description: '应用需要配置专属知识库以提供准确回答',
              icon: '📚'
            },
            {
              id: 'not_required',
              name: '无需知识库',
              description: '应用基于大模型能力，无需额外知识库',
              icon: '🧠'
            }
          ]
        };
        
        // 更新状态
        setTechRoutes(prev => {
          const updated = {...prev};
          Object.keys(mockTechRoutes).forEach(key => {
            if (updated[key]) {
              updated[key] = {
                ...updated[key],
                options: mockTechRoutes[key as keyof typeof mockTechRoutes],
                selected: mockTechRoutes[key as keyof typeof mockTechRoutes][0].id
              };
            }
          });
          return updated;
        });
        
        setLoading(false);
      } catch (err) {
        setError('获取技术路线选项失败');
        setLoading(false);
      }
    };
    
    fetchTechRoutes();
  }, [navigate, location.state]);

  const handleOptionSelect = (category: string, optionId: string) => {
    setTechRoutes(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        selected: optionId
      }
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    
    try {
      // 收集选择的技术路线
      const selectedOptions = {
        is_public: techRoutes.visibility.selected === 'public',
        is_online: techRoutes.connectivity.selected === 'online',
        is_private: techRoutes.privacy.selected === 'enhanced',
        requires_knowledge_base: techRoutes.knowledge_base.selected === 'required'
      };
      
      // 合并需求数据和技术路线选择
      const combinedData = {
        ...requirementData,
        ...selectedOptions
      };
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 根据是否需要知识库决定下一步
      if (selectedOptions.requires_knowledge_base) {
        navigate('/consultation/platform', { 
          state: { 
            requirementData: combinedData 
          } 
        });
      } else {
        navigate('/consultation/platform', { 
          state: { 
            requirementData: combinedData 
          } 
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('提交失败，请稍后再试');
      }
      setSubmitting(false);
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
            <h1 className="text-2xl font-bold text-gray-900">选择技术路线</h1>
            <p className="mt-1 text-sm text-gray-500">
              为您的AI应用选择合适的技术路线，以满足业务需求和安全要求
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
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="p-6">
              <div className="space-y-8">
                {Object.entries(techRoutes).map(([category, data]) => (
                  <div key={category} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-lg font-medium text-gray-900">{data.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{data.description}</p>
                    
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {data.options.map(option => (
                        <div
                          key={option.id}
                          className={`relative rounded-lg border p-4 flex cursor-pointer focus:outline-none ${
                            data.selected === option.id
                              ? 'bg-blue-50 border-blue-200'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => handleOptionSelect(category, option.id)}
                        >
                          <div className="flex items-center">
                            <div className="text-2xl mr-3">{option.icon}</div>
                            <div>
                              <p className={`text-sm font-medium ${
                                data.selected === option.id ? 'text-blue-900' : 'text-gray-900'
                              }`}>
                                {option.name}
                              </p>
                              <p className={`text-sm ${
                                data.selected === option.id ? 'text-blue-700' : 'text-gray-500'
                              }`}>
                                {option.description}
                              </p>
                            </div>
                          </div>
                          {data.selected === option.id && (
                            <div className="absolute top-4 right-4 text-blue-600">
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => navigate(-1)}
                >
                  上一步
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                    submitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  onClick={handleSubmit}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      提交中...
                    </>
                  ) : (
                    '下一步：选择平台'
                  )}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TechRouteSelectionPage;
