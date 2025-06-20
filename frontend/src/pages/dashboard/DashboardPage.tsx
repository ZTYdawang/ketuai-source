import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import StatisticsCards from '../../components/dashboard/StatisticsCards';
import RecentActivities from '../../components/dashboard/RecentActivities';
import AIApplicationsPreview from '../../components/dashboard/AIApplicationsPreview';

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalApplications: 0,
    remainingTokens: 0,
    totalConversations: 0
  });
  const [activities, setActivities] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 检查用户是否已登录
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/auth/login');
          return;
        }
        
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 使用模拟数据
        setStats({
          totalApplications: 5,
          remainingTokens: 15000,
          totalConversations: 1250
        });
        
        setActivities([
          {
            id: 1,
            type: 'app_usage',
            user: '张三',
            app: '智能客服助手',
            details: '使用智能客服助手处理了25条客户咨询',
            time: '2023-05-28T08:30:00Z'
          },
          {
            id: 2,
            type: 'token_usage',
            user: '系统',
            details: '本月Token使用量已达到配额的75%',
            time: '2023-05-28T07:15:00Z'
          },
          {
            id: 3,
            type: 'app_creation',
            user: '李四',
            app: '数据分析助手',
            details: '创建了新的AI应用"数据分析助手"',
            time: '2023-05-27T15:45:00Z'
          },
          {
            id: 4,
            type: 'app_update',
            user: '王五',
            app: '文档摘要工具',
            details: '更新了"文档摘要工具"的知识库',
            time: '2023-05-27T11:20:00Z'
          },
          {
            id: 5,
            type: 'user_add',
            user: '管理员',
            details: '添加了新员工"赵六"',
            time: '2023-05-26T09:10:00Z'
          }
        ]);
        
        setApplications([
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
            lastUsed: '2023-05-28T08:30:00Z'
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
            lastUsed: '2023-05-27T14:20:00Z'
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
            lastUsed: '2023-05-27T11:20:00Z'
          }
        ]);
        
        setLoading(false);
      } catch (err) {
        setError('获取仪表盘数据失败');
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [navigate]);

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
            <h1 className="text-2xl font-bold text-gray-900">仪表盘</h1>
            <p className="mt-1 text-sm text-gray-500">
              欢迎回来，查看您的AI部门概览
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
          
          <StatisticsCards stats={stats} />
          
          <AIApplicationsPreview applications={applications} />
          
          <RecentActivities activities={activities} />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
