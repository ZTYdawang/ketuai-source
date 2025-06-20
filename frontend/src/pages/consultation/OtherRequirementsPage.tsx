import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';

const OtherRequirementsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [requirementData, setRequirementData] = useState<any>(null);
  
  const [otherRequirements, setOtherRequirements] = useState({
    deadline: '',
    budget: '',
    additionalNotes: '',
    contactPreference: 'email',
    contactInfo: ''
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
    }
  }, [navigate, location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOtherRequirements(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    
    try {
      // 合并需求数据和其他需求
      const combinedData = {
        ...requirementData,
        deadline: otherRequirements.deadline || null,
        budget: otherRequirements.budget || null,
        additional_notes: otherRequirements.additionalNotes || null,
        contact_preference: otherRequirements.contactPreference,
        contact_info: otherRequirements.contactInfo || null
      };
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 跳转到提交成功页面
      navigate('/consultation/success', { 
        state: { 
          requirementData: combinedData 
        } 
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('提交失败，请稍后再试');
      }
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">其他需求</h1>
            <p className="mt-1 text-sm text-gray-500">
              补充您的其他需求和偏好，帮助我们更好地为您服务
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
                  <h3 className="text-lg font-medium text-gray-900">时间和预算</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    告诉我们您的时间和预算限制
                  </p>
                  
                  <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                        期望完成时间
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          name="deadline"
                          id="deadline"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={otherRequirements.deadline}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                        预算范围（元）
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="budget"
                          id="budget"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="例如：10000-20000"
                          value={otherRequirements.budget}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">联系偏好</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    告诉我们您希望如何接收项目进展和沟通
                  </p>
                  
                  <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contactPreference" className="block text-sm font-medium text-gray-700">
                        联系方式
                      </label>
                      <div className="mt-1">
                        <select
                          id="contactPreference"
                          name="contactPreference"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={otherRequirements.contactPreference}
                          onChange={handleChange}
                        >
                          <option value="email">电子邮件</option>
                          <option value="phone">电话</option>
                          <option value="wechat">微信</option>
                          <option value="meeting">线上会议</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">
                        联系信息
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="contactInfo"
                          id="contactInfo"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder={
                            otherRequirements.contactPreference === 'email' ? '您的邮箱地址' :
                            otherRequirements.contactPreference === 'phone' ? '您的电话号码' :
                            otherRequirements.contactPreference === 'wechat' ? '您的微信号' :
                            '您的会议软件偏好'
                          }
                          value={otherRequirements.contactInfo}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700">
                    其他说明
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      rows={4}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="请输入任何其他需要我们了解的信息，如特殊要求、参考案例等"
                      value={otherRequirements.additionalNotes}
                      onChange={handleChange}
                    />
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
                    '提交需求'
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

export default OtherRequirementsPage;
