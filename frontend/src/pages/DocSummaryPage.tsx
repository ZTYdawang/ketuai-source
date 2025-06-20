import AgentChatPageTemplate from '../components/AgentChatPageTemplate';
import docSummaryAgentConfig from '../agentConfigs/docSummary';

export default function DocSummaryPage() {
  return <AgentChatPageTemplate {...docSummaryAgentConfig} />;
} 