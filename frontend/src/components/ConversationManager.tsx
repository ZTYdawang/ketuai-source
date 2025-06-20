import React from 'react';

export interface Conversation {
  id: string;
  summary: string;
  created_at: string;
  last_message?: string;
}

interface ConversationManagerProps {
  conversations: Conversation[];
  currentConversationId?: string | null;
  onNewConversation: () => void;
  onSelectConversation: (conversationId: string) => void;
  onDeleteConversation?: (conversationId: string) => void;
}

const ConversationManager: React.FC<ConversationManagerProps> = ({
  conversations,
  currentConversationId,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
}) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
      <button 
        onClick={onNewConversation}
        className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 transition text-base"
        style={{borderBottom: '1px solid #e0e7ef'}}
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
        新建对话
      </button>

      {conversations.length === 0 ? (
        <div className="text-center text-gray-500 py-4">暂无历史对话</div>
      ) : (
        conversations.map(conv => (
          <div
            key={conv.id}
            className={`group relative px-4 py-3 border-b last:border-b-0 hover:bg-blue-50 cursor-pointer transition-all
              ${currentConversationId === conv.id ? 'bg-blue-50' : 'border-blue-50'}`}
            onClick={() => onSelectConversation(conv.id)}
          >
            <div className="text-blue-900 text-sm font-medium truncate pr-8" title={conv.summary}>
              {conv.summary}
            </div>

            {conv.last_message && (
              <div className="text-gray-500 text-xs truncate mt-1" title={conv.last_message}>
                {conv.last_message}
              </div>
            )}

            <div className="text-gray-400 text-xs mt-1">
              {new Date(conv.created_at).toLocaleString()}
            </div>

            {onDeleteConversation && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-100 rounded-full"
                onClick={e => {
                  e.stopPropagation();
                  onDeleteConversation(conv.id);
                }}
                title="删除对话"
              >
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ConversationManager; 