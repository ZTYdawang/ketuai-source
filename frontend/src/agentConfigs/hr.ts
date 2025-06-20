import { AgentPageConfig } from '../types/AgentPageConfig';

const ALL_AGENTS = [
  { id: 1, icon: '🤖', name: '智慧人事助理', tech: { name: 'dify', color: 'text-blue-600' }, desc: '专业人事全流程AI助手', path: '/ai-assistant/hr' },
  { id: 2, icon: '📊', name: '销售数据分析', tech: { name: '百度千帆', color: 'text-green-600' }, desc: '销售数据智能分析与预测', path: '/ai-assistant/sales' },
  { id: 3, icon: '📄', name: '文档智能摘要', tech: { name: 'dify', color: 'text-blue-600' }, desc: '文档关键信息提取', path: '/ai-assistant/doc-summary' },
  { id: 4, icon: '📅', name: '智能会议记录', tech: { name: '扣子', color: 'text-purple-600' }, desc: '会议纪要自动生成', path: '/ai-assistant/meeting' },
  { id: 5, icon: '📦', name: '市场调研助手', tech: { name: 'dify', color: 'text-blue-600' }, desc: '调研报告AI生成', path: '/ai-assistant/market' },
  { id: 6, icon: '📝', name: '智能合同审核', tech: { name: '百度千帆', color: 'text-green-600' }, desc: '合同风险自动识别', path: '/ai-assistant/contract' },
];

const hrAgentConfig: AgentPageConfig = {
  agentName: '智慧人事助理',
  agentIcon: '🤖',
  agentDesc: '专业人事全流程AI助手',
  agentTech: { name: 'dify', color: 'text-blue-600' },
  apiUrl: `${import.meta.env.VITE_FLASK_API_BASE || 'http://localhost:5002'}/v1/chat-messages`,
  apiKey: 'app-Nz6sZ2MRXv9vtXZqM0ORrhkg',
  presetQuestions: [
    '如何编写岗位描述？',
    '如何筛选简历？',
    '请帮我总结面试对话要点',
    '如何评估候选人匹配度？',
    '请生成一份招聘启事模板',
    '如何优化面试流程？',
    '请帮我分析简历优缺点',
    '如何制定入职培训计划？',
    '请给出员工绩效评估建议',
  ],
  recommendedAgents: ALL_AGENTS.slice(0, 3),
  allAgents: ALL_AGENTS,
  intro: '我是你的智能人事助理，能够为公司人事岗位提供专业且精准的全流程服务。无论是岗位信息描述编写、简历信息总结、候选人匹配度分析，还是面试对话要点整理与综合评估，我都能为你高效助力，提升招聘与人事管理效率。',
  enableAttachment: false,
  agentKey: 'hr',
};

export default hrAgentConfig; 