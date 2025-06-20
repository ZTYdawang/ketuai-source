import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';

interface Platform {
  id: string;
  name: string;
  description: string;
  logo: string;
  features: string[];
  is_popular: boolean;
}

const PlatformSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [requirementData, setRequirementData] = useState<any>(null);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');

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
    
    // 获取平台列表
    const fetchPlatforms = async () => {
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 模拟数据
        const mockPlatforms = [
          {
            id: 'feishu',
            name: '飞书',
            description: '字节跳动旗下的企业协作平台，提供丰富的API和机器人能力',
            logo: '/images/platforms/feishu.png',
            features: ['文档处理', '会话机器人', '知识库集成', '工作流自动化'],
            is_popular: true
          },
          {
            id: 'qianfan',
            name: '百度千帆',
            description: '百度智能云AI大模型平台，提供多种大模型API和定制化服务',
            logo: '/images/platforms/qianfan.png',
            features: ['大模型API', '多模态能力', '知识库检索增强', '行业专属模型'],
            is_popular: true
          },
          {
            id: 'dify',
            name: 'Dify',
            description: '开源的LLMOps平台，支持构建、部署和监控AI应用',
            logo: '/images/platforms/dify.png',
            features: ['开源部署', '多模型支持', '知识库管理', '对话流程设计'],
            is_popular: false
          },
          {
            id: 'kozi',
            name: '扣子',
            description: '国内领先的AI应用开发平台，提供低代码开发能力',
            logo: '/images/platforms/kozi.png',
            features: ['低代码开发', '多场景模板', '企业级安全', '快速部署'],
            is_popular: false
          }
        ];
        
        setPlatforms(mockPlatforms);
        setSelectedPlatform(mockPlatforms[0].id);
        setLoading(false);
      } catch (err) {
        setError('获取平台列表失败');
        setLoading(false);
      }
    };
    
    fetchPlatforms();
  }, [navigate, location.state]);

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    
    try {
      // 合并需求数据和平台选择
      const combinedData = {
        ...requirementData,
        platform: selectedPlatform
      };
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 根据是否需要知识库决定下一步
      if (requirementData.requires_knowledge_base) {
        navigate('/consultation/knowledge-base', { 
          state: { 
            requirementData: combinedData 
          } 
        });
      } else {
        navigate('/consultation/other-requirements', { 
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
            <h1 className="text-2xl font-bold text-gray-900">选择开发平台</h1>
            <p className="mt-1 text-sm text-gray-500">
              为您的AI应用选择合适的开发平台，以获得最佳的开发体验和功能支持
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
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">推荐平台</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    根据您的需求，我们推荐以下平台
                  </p>
                  
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {platforms.filter(p => p.is_popular).map(platform => (
                      <div
                        key={platform.id}
                        className={`relative rounded-lg border p-4 flex cursor-pointer focus:outline-none ${
                          selectedPlatform === platform.id
                            ? 'bg-blue-50 border-blue-200'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => handlePlatformSelect(platform.id)}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center mr-4">
                            <span className="text-xl">
                              {platform.id === 'feishu' && '🚀'}
                              {platform.id === 'qianfan' && '🔍'}
                              {platform.id === 'dify' && '⚙️'}
                              {platform.id === 'kozi' && '🧩'}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <p className={`text-sm font-medium ${
                                selectedPlatform === platform.id ? 'text-blue-900' : 'text-gray-900'
                              }`}>
                                {platform.name}
                              </p>
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                推荐
                              </span>
                            </div>
                            <p className={`text-sm mt-1 ${
                              selectedPlatform === platform.id ? 'text-blue-700' : 'text-gray-500'
                            }`}>
                              {platform.description}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {platform.features.map((feature, index) => (
                                <span
                                  key={index}
                                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                    selectedPlatform === platform.id
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {selectedPlatform === platform.id && (
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
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">其他平台</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    您也可以选择以下平台
                  </p>
                  
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {platforms.filter(p => !p.is_popular).map(platform => (
                      <div
                        key={platform.id}
                        className={`relative rounded-lg border p-4 flex cursor-pointer focus:outline-none ${
                          selectedPlatform === platform.id
                            ? 'bg-blue-50 border-blue-200'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => handlePlatformSelect(platform.id)}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center mr-4">
                            <span className="text-xl">
                              {platform.id === 'feishu' && '🚀'}
                              {platform.id === 'qianfan' && '🔍'}
                              {platform.id === 'dify' && '⚙️'}
                              {platform.id === 'kozi' && '🧩'}
                            </span>
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${
                              selectedPlatform === platform.id ? 'text-blue-900' : 'text-gray-900'
                            }`}>
                              {platform.name}
                            </p>
                            <p className={`text-sm mt-1 ${
                              selectedPlatform === platform.id ? 'text-blue-700' : 'text-gray-500'
                            }`}>
                              {platform.description}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {platform.features.map((feature, index) => (
                                <span
                                  key={index}
                                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                    selectedPlatform === platform.id
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {selectedPlatform === platform.id && (
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
                    requirementData && requirementData.requires_knowledge_base
                      ? '下一步：配置知识库'
                      : '下一步：其他需求'
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

export default PlatformSelectionPage;
