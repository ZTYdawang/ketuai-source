export interface AgentInfo {
  id: number | string;
  icon: string;
  name: string;
  tech: { name: string; color: string };
  desc: string;
  path: string;
}

export interface AgentPageConfig {
  agentName: string;
  agentIcon: string;
  agentDesc: string;
  agentTech: { name: string; color: string };
  apiUrl: string;
  apiKey: string;
  presetQuestions: string[];
  recommendedAgents: AgentInfo[];
  allAgents: AgentInfo[];
  intro: string;
  enableAttachment?: boolean;
  agentKey: string;
} 