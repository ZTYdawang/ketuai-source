import AgentChatPageTemplate from '../components/AgentChatPageTemplate';
import meetingAgentConfig from '../agentConfigs/meeting';
 
export default function MeetingPage() {
  return <AgentChatPageTemplate {...meetingAgentConfig} />;
} 