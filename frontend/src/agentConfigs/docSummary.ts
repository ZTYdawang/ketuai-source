import { AgentPageConfig } from '../types/AgentPageConfig';

const ALL_AGENTS = [
  { id: 1, icon: '🤖', name: '智慧人事助理', tech: { name: 'dify', color: 'text-blue-600' }, desc: '专业人事全流程AI助手', path: '/ai-assistant/hr' },
  { id: 2, icon: '📊', name: '销售数据分析', tech: { name: '百度千帆', color: 'text-green-600' }, desc: '销售数据智能分析与预测', path: '/ai-assistant/sales' },
  { id: 3, icon: '📄', name: '文档智能摘要', tech: { name: 'dify', color: 'text-blue-600' }, desc: '文档关键信息提取', path: '/ai-assistant/doc-summary' },
  { id: 4, icon: '📅', name: '智能会议记录', tech: { name: '扣子', color: 'text-purple-600' }, desc: '会议纪要自动生成', path: '/ai-assistant/meeting' },
  { id: 5, icon: '📦', name: '市场调研助手', tech: { name: 'dify', color: 'text-blue-600' }, desc: '调研报告AI生成', path: '/ai-assistant/market' },
  { id: 6, icon: '📝', name: '智能合同审核', tech: { name: '百度千帆', color: 'text-green-600' }, desc: '合同风险自动识别', path: '/ai-assistant/contract' },
];

const docSummaryAgentConfig: AgentPageConfig = {
  agentName: '文档智能摘要',
  agentIcon: '📄',
  agentDesc: '文档关键信息提取',
  agentTech: { name: 'dify', color: 'text-blue-600' },
  apiUrl: `${import.meta.env.VITE_FLASK_API_BASE || 'http://localhost:5002'}/v1/chat-messages`,
  apiKey: 'app-3DLoAE0lgam08ZjWRerhk7kJ',
  presetQuestions: [
    '请帮我总结这份文档的主要内容',
    '提取文档中的关键信息点',
    '分析文档的结构和逻辑',
    '生成文档的执行摘要',
    '识别文档中的重要数据',
    '提取文档中的行动项目',
    '总结文档的结论和建议',
    '分析文档的语气和风格',
    '找出文档中的潜在问题',
  ],
  recommendedAgents: ALL_AGENTS.slice(0, 3),
  allAgents: ALL_AGENTS,
  intro: '我是你的文档智能摘要助手，能够帮助你快速提取文档关键信息、结构要点、结论建议等内容，提升文档处理效率。',
  enableAttachment: true,
  agentKey: 'doc-summary',
};

export default docSummaryAgentConfig; 