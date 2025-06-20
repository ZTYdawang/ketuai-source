import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 统一公司名称数据源
const companyList = [
  '杭州云智信息技术有限公司',
  '深圳数联智能科技有限公司',
  '北京慧算数据有限公司',
  '上海云帆网络科技有限公司',
  '成都智链科技有限公司',
  '南京数云信息有限公司',
  '广州云脉智能有限公司',
  '苏州慧联数据科技有限公司',
  '武汉云启信息技术有限公司',
  '西安智谷科技有限公司',
];

// 图标组件（只跳一次）
type StatIconProps = { icon: React.ReactNode; color: string; bg: string };
const StatIcon = ({ icon, color, bg }: StatIconProps) => (
  <div className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg ${bg} animate-bounceOnce`}>
    <span className={`text-3xl ${color}`}>{icon}</span>
  </div>
);

// 自定义一次性跳动动画
const bounceOnceStyle = `@keyframes bounceOnce {0%,100%{transform:translateY(0);}30%{transform:translateY(-20%);}50%{transform:translateY(0);}}.animate-bounceOnce{animation:bounceOnce 0.8s cubic-bezier(0.4,0,0.2,1) 1;}`;

type MedalIconProps = { rank: number };
const MedalIcon = ({ rank }: MedalIconProps) => {
  if (rank === 1) return <span className="text-2xl animate-pulse">🥇</span>;
  if (rank === 2) return <span className="text-2xl animate-pulse">🥈</span>;
  if (rank === 3) return <span className="text-2xl animate-pulse">🥉</span>;
  return <span className="text-lg text-gray-400">{rank}</span>;
};

// mockCompanies 和 mockAgents 统一引用 companyList
const mockCompanies = companyList.map((name, idx) => ({ name, agentCount: 5 + (idx % 6) }));
const mockAgents = [
  { id: 1, name: '智能客服助手', company: companyList[0], users: 120, tokens: 58920, avgTime: 32, feedback: [
    { type: 'positive', content: '非常好用，极大提升了客服效率', company: companyList[0] },
    { type: 'suggest', content: '希望增加多语言支持', company: companyList[0] }
  ] },
  { id: 2, name: '销售数据分析', company: companyList[1], users: 98, tokens: 42560, avgTime: 28, feedback: [
    { type: 'positive', content: '分析很精准，报表美观', company: companyList[1] },
    { type: 'suggest', content: '建议增加导出Excel功能', company: companyList[1] }
  ] },
  { id: 3, name: '文档智能摘要', company: companyList[2], users: 76, tokens: 35670, avgTime: 25, feedback: [
    { type: 'positive', content: '摘要速度快', company: companyList[2] },
    { type: 'suggest', content: '希望支持PDF格式', company: companyList[2] }
  ] },
  { id: 4, name: '市场调研助手', company: companyList[3], users: 45, tokens: 12450, avgTime: 19, feedback: [
    { type: 'positive', content: '调研报告很有用', company: companyList[3] }
  ] },
  { id: 5, name: '智能会议记录', company: companyList[4], users: 63, tokens: 28760, avgTime: 22, feedback: [
    { type: 'positive', content: '会议纪要准确', company: companyList[4] },
    { type: 'suggest', content: '建议增加语音识别', company: companyList[4] }
  ] },
];

const AIAgentStatsPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [agents, setAgents] = useState<typeof mockAgents>([]);
  const [companies, setCompanies] = useState<typeof mockCompanies>([]);

  useEffect(() => {
    // 检查管理员是否已登录
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/auth/login');
      return;
    }
    // 模拟API加载
    setTimeout(() => {
      setAgents(mockAgents);
      setCompanies(mockCompanies);
      setLoading(false);
    }, 600);
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full py-24">
            <svg className="animate-spin h-12 w-12 text-blue-500" viewBox="0 0 50 50">
              <circle className="opacity-25" cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="5" />
              <path className="opacity-75" fill="currentColor" d="M25 5a20 20 0 0 1 20 20h-5a15 15 0 1 0-15 15v5A20 20 0 0 1 25 5z" />
            </svg>
      </div>
    );
  }

  // 排行榜数据
  const userRank = [...agents].sort((a, b) => b.users - a.users);
  const tokenRank = [...agents].sort((a, b) => b.tokens - a.tokens);
  const avgTimeRank = [...agents].sort((a, b) => b.avgTime - a.avgTime);

  return (
    <>
      <main className="flex-1 p-6 w-full">
          <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">智能体管理与统计</h1>
              <p className="mt-1 text-sm text-gray-500">全面掌握平台智能体的开发、分布与使用情况</p>
            </div>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-gradient-to-br from-blue-100 to-blue-300 shadow rounded-lg p-6 flex flex-col items-center relative overflow-hidden">
              <StatIcon icon="🤖" color="text-blue-600" bg="bg-white" />
              <div className="text-3xl font-bold text-blue-700 mb-2 mt-2">{agents.length}</div>
              <div className="text-gray-700 font-medium">已开发智能体数量</div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-300 shadow rounded-lg p-6 flex flex-col items-center relative overflow-hidden">
              <StatIcon icon="🏢" color="text-green-600" bg="bg-white" />
              <div className="text-3xl font-bold text-green-700 mb-2 mt-2">{companies.reduce((sum, c) => sum + c.agentCount, 0)}</div>
              <div className="text-gray-700 font-medium">平台总智能体数</div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-300 shadow rounded-lg p-6 flex flex-col items-center relative overflow-hidden">
              <StatIcon icon="👥" color="text-purple-600" bg="bg-white" />
              <div className="text-3xl font-bold text-purple-700 mb-2 mt-2">{userRank[0]?.users || 0}</div>
              <div className="text-gray-700 font-medium">单体最高用户数</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-300 shadow rounded-lg p-6 flex flex-col items-center relative overflow-hidden">
              <StatIcon icon="💎" color="text-yellow-600" bg="bg-white" />
              <div className="text-3xl font-bold text-yellow-700 mb-2 mt-2">{tokenRank[0]?.tokens || 0}</div>
              <div className="text-gray-700 font-medium">单体最高Token消耗</div>
            </div>
          </div>

          {/* 公司智能体分布 */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-lg font-bold mb-4">公司智能体分布</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {companies.map(c => (
                <div key={c.name} className="p-4 border rounded-lg flex flex-col items-center">
                  <div className="flex items-center mb-2">
                    {/* 堆叠图标，最多显示5个，多余用+N */}
                    <div className="flex -space-x-3">
                      {Array(Math.min(c.agentCount, 5)).fill(0).map((_, i) => (
                        <span key={i} className={`inline-block w-8 h-8 rounded-full bg-blue-${(i+3)*100} border-2 border-white flex items-center justify-center text-white text-lg shadow`} style={{zIndex: 10-i}}>
                          🤖
                        </span>
                      ))}
                      {c.agentCount > 5 && (
                        <span className="inline-block w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-gray-700 text-sm shadow" style={{zIndex: 0}}>
                          +{c.agentCount-5}
                        </span>
                      )}
                    </div>
                    <span className="ml-4 text-2xl font-bold text-blue-700">{c.agentCount}</span>
                  </div>
                  <div className="text-gray-700">{c.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 排行榜区块 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">使用用户数排行 <span className="ml-2 animate-bounce">👑</span></h3>
              <ol className="space-y-2">
                {userRank.map((a, idx) => (
                  <li key={a.id} className="flex justify-between items-center">
                    <span className="flex items-center font-medium text-gray-800">
                      <MedalIcon rank={idx + 1} />
                      <span className="ml-2">{a.name}</span>
                    </span>
                    <span className="text-blue-600 font-bold">{a.users}人</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">Token消耗排行 <span className="ml-2 animate-spin">⚡</span></h3>
              <ol className="space-y-2">
                {tokenRank.map((a, idx) => (
                  <li key={a.id} className="flex justify-between items-center">
                    <span className="flex items-center font-medium text-gray-800">
                      <MedalIcon rank={idx + 1} />
                      <span className="ml-2">{a.name}</span>
                    </span>
                    <span className="text-yellow-600 font-bold">{a.tokens}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">平均使用时间排行 <span className="ml-2 animate-pulse">⏱️</span></h3>
              <ol className="space-y-2">
                {avgTimeRank.map((a, idx) => (
                  <li key={a.id} className="flex justify-between items-center">
                    <span className="flex items-center font-medium text-gray-800">
                      <MedalIcon rank={idx + 1} />
                      <span className="ml-2">{a.name}</span>
                    </span>
                    <span className="text-purple-600 font-bold">{a.avgTime} 分钟</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* 智能体反馈区块 */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-lg font-bold mb-4">智能体用户反馈</h2>
            <div className="space-y-4">
              {agents.map(agent => (
                <div key={agent.id} className="border-b pb-3 mb-3">
                  <div className="font-bold text-blue-700 mb-1">{agent.name} <span className="ml-2 text-xs text-gray-400">({agent.company})</span></div>
                  <ul className="list-none pl-0 text-gray-700 text-sm space-y-2">
                    {agent.feedback.map((fb, idx) => (
                      <li key={idx} className="flex items-center justify-between">
                        <div className="flex items-center">
                          {fb.type === 'positive' ? (
                            <span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs mr-2">好评</span>
                          ) : (
                            <span className="inline-block px-2 py-0.5 rounded bg-orange-100 text-orange-700 text-xs mr-2 animate-pulse">需修改</span>
                          )}
                          <span>{fb.content}</span>
                          <span className="ml-2 text-gray-400 text-xs">[{fb.company}]</span>
                        </div>
                        {fb.type === 'suggest' && (
                          <div className="flex space-x-2">
                            <button className="px-2 py-0.5 text-xs rounded bg-gray-200 text-gray-700 hover:bg-gray-300">忽略</button>
                            <button className="px-2 py-0.5 text-xs rounded bg-blue-500 text-white hover:bg-blue-600">加入工单</button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </main>
      <style>{bounceOnceStyle}</style>
    </>
  );
};

export default AIAgentStatsPage;
