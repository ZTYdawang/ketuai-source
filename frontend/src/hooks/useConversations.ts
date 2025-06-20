import { useState } from 'react';
import axios from 'axios';

interface Conversation {
  id: string;
  summary: string;
  created_at: string;
  last_message?: string;
}

interface UseConversationsProps {
  user?: string;
  agentKey: string;
}

const DIFY_API_URL = 'http://127.0.0.1/v1';
const DIFY_API_KEY = 'app-3DLoAE0lgam08ZjWRerhk7kJ';

export const useConversations = ({ user = 'guest', agentKey }: UseConversationsProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 获取会话列表（Dify官方API）
  const loadConversations = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${DIFY_API_URL}/conversations?user=${user}`, {
        headers: {
          'Authorization': `Bearer ${DIFY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      // 本地伪隔离：只显示本地标记为当前 agentKey 的会话
      const map = JSON.parse(localStorage.getItem('conversation_agent_map') || '{}');
      setConversations(
        (data.data || []).filter((item: any) => map[item.id] === agentKey || !map[item.id])
          .map((item: any) => ({
            id: item.id,
            summary: item.name || item.summary || '新对话',
            created_at: item.created_at,
            last_message: item.last_message,
          }))
      );
    } catch {
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  // 创建新会话（首次发消息时自动创建，无需单独API）
  const createNewConversation = async () => {
    setCurrentConversationId(null);
    return null;
  };

  // 新建会话后本地标记归属
  const markConversationAgent = (conversationId: string) => {
    const map = JSON.parse(localStorage.getItem('conversation_agent_map') || '{}');
    map[conversationId] = agentKey;
    localStorage.setItem('conversation_agent_map', JSON.stringify(map));
  };

  // 删除会话（Dify官方API）
  const deleteConversation = async (conversationId: string) => {
    try {
      await axios.delete(`${DIFY_API_URL}/conversations/${conversationId}`, {
        headers: {
          'Authorization': `Bearer ${DIFY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        data: { user },
      });
      setConversations(prev => prev.filter(conv => conv.id !== conversationId));
      if (currentConversationId === conversationId) {
        setCurrentConversationId(null);
      }
    } catch { return; }
  };

  // 更新会话摘要（Dify官方API）
  const updateConversationSummary = async (conversationId: string, summary: string) => {
    try {
      await fetch(`${DIFY_API_URL}/conversations/${conversationId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${DIFY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: summary }),
      });
      setConversations(prev => prev.map(conv => conv.id === conversationId ? { ...conv, summary } : conv));
    } catch { return; }
  };

  // 获取会话历史消息（Dify官方API）
  const getConversationMessages = async (conversationId: string) => {
    const res = await fetch(`${DIFY_API_URL}/messages?conversation_id=${conversationId}&user=${user}&limit=50`, {
      headers: {
        'Authorization': `Bearer ${DIFY_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data || []).map((msg: { query: string; answer: string }) => ([
      { role: 'user', content: msg.query },
      { role: 'ai', content: msg.answer }
    ])).flat();
  };

  return {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    loading,
    createNewConversation,
    deleteConversation,
    updateConversationSummary,
    getConversationMessages,
    refreshConversations: loadConversations,
    agentKey,
    markConversationAgent,
  };
}; 