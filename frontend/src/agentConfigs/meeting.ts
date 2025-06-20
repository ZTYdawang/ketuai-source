import { AgentPageConfig } from '../types/AgentPageConfig';

const ALL_AGENTS = [
  { id: 1, icon: '🤖', name: '智慧人事助理', tech: { name: 'dify', color: 'text-blue-600' }, desc: '专业人事全流程AI助手', path: '/ai-assistant/hr' },
  { id: 2, icon: '📊', name: '销售数据分析', tech: { name: '百度千帆', color: 'text-green-600' }, desc: '销售数据智能分析与预测', path: '/ai-assistant/sales' },
  { id: 3, icon: '📄', name: '文档智能摘要', tech: { name: 'dify', color: 'text-blue-600' }, desc: '文档关键信息提取', path: '/ai-assistant/doc-summary' },
  { id: 4, icon: '📅', name: '智能会议记录', tech: { name: 'dify', color: 'text-blue-600' }, desc: '会议纪要自动生成', path: '/ai-assistant/meeting' },
  { id: 5, icon: '📦', name: '市场调研助手', tech: { name: 'dify', color: 'text-blue-600' }, desc: '调研报告AI生成', path: '/ai-assistant/market' },
  { id: 6, icon: '📝', name: '智能合同审核', tech: { name: '百度千帆', color: 'text-green-600' }, desc: '合同风险自动识别', path: '/ai-assistant/contract' },
];

const meetingAgentConfig: AgentPageConfig = {
  agentName: '智能会议记录',
  agentIcon: '📅',
  agentDesc: '会议纪要自动生成',
  agentTech: { name: 'dify', color: 'text-blue-600' },
  apiUrl: `${import.meta.env.VITE_FLASK_API_BASE || 'http://localhost:5002'}/v1/workflows/run`,
  apiKey: 'app-Axqtt0uFnzm1x7OLjCHVKLMt',
  presetQuestions: [
    '请上传会议录音或文档，自动生成会议纪要',
    '请帮我总结本次会议的主要内容',
    '提取会议中的关键决策点',
    '生成会议行动项清单',
    '分析会议讨论的重点问题',
    '请输出会议参与人员及分工',
    '总结会议中的待办事项',
    '提取会议中的风险与建议',
    '请生成会议纪要摘要',
  ],
  recommendedAgents: ALL_AGENTS.slice(0, 3),
  allAgents: ALL_AGENTS,
  intro: '我是你的智能会议记录助手，请先上传会议录音或文档，再输入你的问题，自动为你生成结构化会议纪要、要点总结、行动项清单等内容，助力高效会议管理。',
  enableAttachment: true,
  agentKey: 'meeting',
};

export default meetingAgentConfig; 