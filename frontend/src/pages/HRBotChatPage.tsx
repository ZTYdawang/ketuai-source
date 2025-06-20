import AgentChatPageTemplate from '../components/AgentChatPageTemplate';
import hrAgentConfig from '../agentConfigs/hr';

export default function HRBotChatPage() {
  return <AgentChatPageTemplate {...hrAgentConfig} />;
} 