import React, { useRef, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useRef as useReactRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ConversationManager from './ConversationManager';
import { useConversations } from '../hooks/useConversations';
import { AgentPageConfig, AgentInfo } from '../types/AgentPageConfig';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

function useTypeLines(fullText: string, enabled: boolean, delay = 40) {
  const [displayed, setDisplayed] = useState<string>('');
  useEffect(() => {
    if (!enabled) return;
    if (!fullText) {
      setDisplayed('');
      return;
    }
    const lines = fullText.split(/\r?\n/);
    let current = '';
    let idx = 0;
    let timer: NodeJS.Timeout;
    function showNext() {
      if (idx < lines.length) {
        current += (idx === 0 ? '' : '\n') + lines[idx];
        setDisplayed(current);
        idx++;
        timer = setTimeout(showNext, delay + Math.random() * 40);
      }
    }
    showNext();
    return () => clearTimeout(timer);
  }, [fullText, enabled, delay]);
  return displayed;
}

const AgentChatPageTemplate: React.FC<AgentPageConfig> = (props) => {
  const {
    agentName,
    agentIcon,
    agentTech,
    apiUrl,
    apiKey,
    presetQuestions,
    recommendedAgents,
    allAgents,
    intro,
    enableAttachment = false,
    agentKey,
  } = props;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputDim, setInputDim] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [presetBatch, setPresetBatch] = useState<number[]>([0, 1, 2]);
  const inputRef = useReactRef<HTMLInputElement | null>(null);
  const [agentList, setAgentList] = useState<AgentInfo[]>(allAgents.slice(0, 5));
  const [agentEnd, setAgentEnd] = useState(false);
  const agentLoaderRef = useRef<HTMLDivElement>(null);
  const [currentAgent] = useState<AgentInfo>(recommendedAgents[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // 会话管理
  const {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    deleteConversation,
    updateConversationSummary,
    getConversationMessages,
    refreshConversations,
  } = useConversations({ agentKey });

  // AI回复逐行动画控制
  const [pendingAI, setPendingAI] = useState(false);
  const [pendingAIContent, setPendingAIContent] = useState('');
  const [pendingAIShow, setPendingAIShow] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{
    file: File;
    name: string;
    status: 'uploading' | 'done' | 'error';
    progress: number;
    fileId?: string;
    xhr?: XMLHttpRequest;
  }[]>([]);

  // 滚动到底部
  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // 发送消息到Dify
  const sendMessage = async () => {
    // Workflow应用：强制要求已上传附件
    if (agentKey === 'meeting' && uploadedFiles.filter(f => f.status === 'done').length === 0) {
      // 不弹窗，气泡区已提示
      return;
    }
    if (!input.trim()) return;
    setPendingAI(false);
    setPendingAIContent('');
    setPendingAIShow(false);
    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setInputDim(true);
    setPendingAI(true);
    scrollToBottom();
    try {
      let body: Record<string, unknown>;
      if (agentKey === 'meeting') {
        // Workflow应用，inputs需带 orig_mail（文件）和 text
        const fileInputs = uploadedFiles
          .filter(f => f.status === 'done' && f.fileId)
          .map(f => ({
            transfer_method: 'local_file',
            upload_file_id: f.fileId as string,
            type: 'document',
          }));
        body = {
          inputs: {
            voice_text: fileInputs, // 始终为数组
            main: input,
          },
          response_mode: 'blocking',
          user: 'guest',
        };
      } else {
        body = {
          inputs: { agent: agentKey },
          query: input,
          user: 'guest',
        };
        if (currentConversationId) body.conversation_id = currentConversationId;
      }
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data: Record<string, unknown> = await res.json();
      let aiReply = '';
      // 兼容 Dify workflow 返回结构
      let outputs: Record<string, unknown> | undefined = undefined;
      if (data.outputs && typeof data.outputs === 'object') {
        outputs = data.outputs as Record<string, unknown>;
      } else if (data.data && typeof data.data === 'object' && (data.data as any).outputs) {
        outputs = (data.data as any).outputs;
      }
      if (outputs) {
        const firstKey = Object.keys(outputs)[0];
        if (firstKey && outputs[firstKey]) {
          aiReply = String(outputs[firstKey]);
        }
      }
      if (!aiReply && data.answer) {
        aiReply = String(data.answer);
      }
      if (aiReply) {
        setPendingAIContent(aiReply);
        setPendingAIShow(true);
        if (currentConversationId || data.conversation_id) {
          updateConversationSummary(currentConversationId || data.conversation_id, input);
        }
      } else {
        setPendingAIContent('[未获取到回复]');
        setPendingAIShow(true);
      }
    } catch {
      setPendingAIContent('[发送失败]');
      setPendingAIShow(true);
    }
    setInput('');
    setLoading(false);
    scrollToBottom();
  };

  // 逐行输出hook
  const aiTyped = useTypeLines(pendingAIContent, pendingAIShow && !!pendingAIContent);

  // AI逐行输出结束后，真正加入消息流（只追加一次）
  useEffect(() => {
    if (pendingAIShow && aiTyped && aiTyped === pendingAIContent && pendingAIContent) {
      setTimeout(() => {
        setMessages(prev => {
          if (prev.length === 0 || prev[prev.length - 1].content !== pendingAIContent || prev[prev.length - 1].role !== 'ai') {
            return [...prev, { role: 'ai', content: pendingAIContent }];
          }
          return prev;
        });
        setPendingAI(false);
        setPendingAIContent('');
        setPendingAIShow(false);
      }, 300);
    }
  }, [aiTyped, pendingAIShow, pendingAIContent]);

  // 输入框聚焦时恢复正常颜色
  const handleInputFocus = () => setInputDim(false);

  // 换一换预设问题
  const refreshPreset = () => {
    const idxs: number[] = [];
    while (idxs.length < 3) {
      const n = Math.floor(Math.random() * presetQuestions.length);
      if (!idxs.includes(n)) idxs.push(n);
    }
    setPresetBatch(idxs);
  };

  // 选择预设问题
  const handlePresetClick = (q: string) => {
    setInput(q);
    setInputDim(false);
  };

  // 复制消息内容
  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch {
      window.prompt('复制失败，请手动复制：', content);
    }
  };

  // 重新编辑
  const handleEdit = (content: string) => {
    setInput(content);
    setInputDim(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // 滚动加载全部智能体
  useEffect(() => {
    if (agentEnd) return;
    const handleScroll = () => {
      if (!agentLoaderRef.current) return;
      const rect = agentLoaderRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        setTimeout(() => {
          const next = allAgents.slice(0, agentList.length + 3);
          setAgentList(next);
          if (next.length >= allAgents.length) setAgentEnd(true);
        }, 500);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [agentList, agentEnd, allAgents]);

  // 处理智能体切换
  const handleAgentChange = (agent: AgentInfo) => {
    if (agent.path) {
      navigate(agent.path);
    }
  };

  // 新建对话
  const handleNewConversation = async () => {
    setCurrentConversationId(null);
    setMessages([]);
    await refreshConversations();
  };

  // 切换对话
  const handleSelectConversation = async (conversationId: string) => {
    setCurrentConversationId(conversationId);
    const history = await getConversationMessages(conversationId);
    setMessages(history);
    await refreshConversations();
  };

  // 删除对话
  const handleDeleteConversation = async (conversationId: string) => {
    await deleteConversation(conversationId);
    await refreshConversations();
    if (currentConversationId === conversationId) {
      setCurrentConversationId(null);
      setMessages([]);
    }
  };

  useEffect(() => {
    refreshConversations();
    // eslint-disable-next-line
  }, []);

  const handleAttachmentClick = () => {
    if (!enableAttachment) {
      alert('当前智能体未开放附件功能');
      return;
    }
    fileInputRef.current?.click();
  };

  // 恢复 handleFileChange
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files).map(file => ({
      file,
      name: file.name,
      status: 'uploading' as const,
      progress: 0,
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
    Array.from(files).forEach((file) => {
      // 修复上传接口拼接，确保 apiUrl 有值且正确
      const baseUrl = apiUrl ? apiUrl.replace(/\/v1\/.*/, '') : '';
      const uploadUrl = `${baseUrl}/v1/files/upload`;
      const formData = new FormData();
      formData.append('file', file);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', uploadUrl, true);
      xhr.setRequestHeader('Authorization', `Bearer ${apiKey}`);
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setUploadedFiles(prev => prev.map((f) =>
            f.file === file ? { ...f, progress: Math.round((event.loaded / event.total) * 100) } : f
          ));
        }
      };
      xhr.onload = () => {
        let data: { id?: string } = {};
        try { data = JSON.parse(xhr.responseText); } catch {}
        setUploadedFiles(prev => prev.map((f) =>
          f.file === file
            ? typeof data.id === 'string'
              ? { ...f, status: 'done', fileId: data.id, progress: 100 }
              : { ...f, status: 'error', progress: 0 }
            : f
        ));
      };
      xhr.onerror = () => {
        setUploadedFiles(prev => prev.map((f) =>
          f.file === file ? { ...f, status: 'error', progress: 0 } : f
        ));
      };
      setUploadedFiles(prev => prev.map((f) =>
        f.file === file ? { ...f, xhr } : f
      ));
      xhr.send(formData);
    });
    e.target.value = '';
  };

  // 恢复 handleRemoveFile
  const handleRemoveFile = (file: File) => {
    setUploadedFiles(prev => {
      const target = prev.find(f => f.file === file);
      if (target && target.status === 'uploading' && target.xhr) {
        target.xhr.abort();
      }
      return prev.filter(f => f.file !== file);
    });
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-b from-blue-100 to-indigo-100">
      {/* 左侧书签+侧栏，展开时flex，收起时只渲染书签 */}
      {!sidebarOpen && (
        <div
          className="fixed left-0 top-1/2 -translate-y-1/2 z-50 cursor-pointer select-none"
          style={{height: '160px', width: '48px'}}
          onClick={() => setSidebarOpen(true)}
        >
          <div className="flex items-center h-full">
            <span
              className="bg-blue-600 text-white font-bold px-2 py-3 shadow-lg rounded-r-2xl text-lg tracking-wider"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                fontSize: '1.2rem',
                letterSpacing: '0.2em',
                userSelect: 'none',
                minHeight: '140px',
                display: 'inline-block',
                lineHeight: 1.2,
              }}
            >
              更多智能体
            </span>
          </div>
        </div>
      )}
      {sidebarOpen && (
        <div
          className="fixed left-0 top-0 h-screen z-50 flex flex-row items-center shadow-2xl border-r border-blue-200 transition-all duration-500 ease-in-out bg-gray-200"
          style={{width: '320px', minWidth: '260px', maxWidth: '320px', overflow: 'visible', transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)'}}
        >
          {/* 侧栏内容 */}
          <div className="flex-1 flex flex-col bg-gray-200 h-full relative pr-0">
            {/* 关闭按钮 */}
            <div className="flex justify-end items-center px-4 pt-4 pb-2">
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900 transition"
                onClick={() => setSidebarOpen(false)}
                title="收起"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 pt-2 pb-2">
              <div className="text-lg font-bold text-blue-900 mb-2">常用推荐</div>
              <div className="flex flex-col gap-3">
                {recommendedAgents.map(agent => (
                  <div
                    key={agent.id}
                    className={`bg-white rounded-lg shadow p-4 flex items-center border border-gray-100 cursor-pointer hover:shadow-lg transition ${currentAgent.id===agent.id?'ring-2 ring-blue-400':''}`}
                    onClick={() => handleAgentChange(agent)}>
                    <span className="text-2xl mr-3">{agent.icon}</span>
                    <div className="flex-1">
                      <div className="text-base font-bold text-gray-900">{agent.name}</div>
                      <div className="text-xs mt-1">技术支持：<span className={agent.tech.color}>{agent.tech.name}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 pt-2 pb-2">
              <div className="text-lg font-bold text-blue-900 mb-2">全部智能体</div>
              <div className="flex flex-col gap-3">
                {agentList.map(agent => (
                  <div
                    key={agent.id}
                    className={`bg-white rounded-lg shadow p-4 flex items-center border border-gray-100 cursor-pointer hover:shadow-lg transition ${currentAgent.id===agent.id?'ring-2 ring-blue-400':''}`}
                    onClick={() => handleAgentChange(agent)}>
                    <span className="text-2xl mr-3">{agent.icon}</span>
                    <div className="flex-1">
                      <div className="text-base font-bold text-gray-900">{agent.name}</div>
                      <div className="text-xs mt-1">技术支持：<span className={agent.tech.color}>{agent.tech.name}</span></div>
                    </div>
                  </div>
                ))}
                <div ref={agentLoaderRef} className="flex flex-col items-center py-4">
                  {!agentEnd && <span className="text-blue-500 text-sm">加载中...</span>}
                  {agentEnd && <span className="text-gray-400 text-sm">已经到底啦！</span>}
                </div>
              </div>
            </div>
            {/* 书签，absolute定位在右中间，right:-48px确保贴边 */}
            <div
              className="absolute top-1/2 -translate-y-1/2 z-50 cursor-pointer select-none"
              style={{height: '160px', width: '48px', right: '-48px'}}
              onClick={() => setSidebarOpen(false)}
            >
              <div className="flex items-center h-full">
                <span
                  className="text-blue-700 font-bold px-2 py-3 shadow-lg rounded-r-2xl text-lg tracking-wider bg-gray-200 border border-blue-200"
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    fontSize: '1.2rem',
                    letterSpacing: '0.2em',
                    userSelect: 'none',
                    minHeight: '140px',
                    display: 'inline-block',
                    lineHeight: 1.2,
                  }}
                >
                  更多智能体
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 右侧对话区 */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden items-center" onClick={()=>sidebarOpen && setSidebarOpen(false)}>
        {/* 顶部名片区，极简横向排版，浅色背景，内容居中 */}
        <div className="w-full bg-gradient-to-b from-gray-50 to-blue-50 py-8 px-4 sticky top-0 z-30">
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-8">
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-row items-center justify-center gap-3 w-full">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-[2.5rem] select-none">
                  <span role="img" aria-label="智能体" className="drop-shadow text-blue-500">{agentIcon}</span>
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">{agentName}</span>
                <span className="ml-0 sm:ml-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-base font-semibold shadow-sm border border-blue-200 animate-fade-in">技术支持：{agentTech.name}</span>
              </div>
              <div className="text-sm sm:text-base text-gray-500 font-semibold mt-2 text-center w-full">杭州云智信息技术有限公司·厦门</div>
              <div className="text-blue-900 text-lg font-medium leading-relaxed text-center mt-4 max-w-2xl w-full" style={{lineHeight: 1.85}}>
                {intro}
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex-1 min-h-0 w-full max-w-[1200px] mx-auto flex flex-row items-start gap-8 justify-end transition-all duration-500 overflow-hidden relative"
          style={{ maxWidth: '95vw' }}
        >
          {/* 主对话卡片 */}
          <div className="bg-white rounded-2xl shadow-2xl p-0 flex flex-col border border-blue-100 w-full max-w-[1100px] flex-1 h-full min-h-0">
            {/* 聊天气泡区 */}
            <div className="flex-1 overflow-y-auto px-6 py-8 bg-gray-100 rounded-t-2xl">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-full flex items-center justify-between mb-4">
                    <div className="text-gray-400 italic select-none text-base">欢迎咨询相关问题~</div>
                    <button
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium shadow hover:from-blue-600 hover:to-indigo-600 transition-all"
                      onClick={refreshPreset}
                      title="换一批问题建议"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581M19.418 15A7.963 7.963 0 0020 12c0-4.418-3.582-8-8-8a7.963 7.963 0 00-5.418 2.082M4.582 9A7.963 7.963 0 004 12c0 4.418 3.582 8 8 8a7.963 7.963 0 005.418-2.082"/></svg>
                      换一换
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-2">
                    {presetBatch.map(idx => (
                      <button
                        key={idx}
                        className="bg-gradient-to-br from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 border border-blue-200 rounded-xl shadow-md px-4 py-6 text-blue-900 font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={() => handlePresetClick(presetQuestions[idx])}
                      >
                        {presetQuestions[idx]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex mb-4 group ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}> 
                  <div className="relative flex flex-row">
                    <div className={`max-w-[70vw] sm:max-w-2xl w-auto px-4 py-2 rounded-2xl text-base shadow-md transition-all break-words
                      ${msg.role === 'user' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-md' : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'}`}
                    >
                      {/* 操作按钮区，悬浮显示 */}
                      <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button
                          className="p-1 rounded-full bg-white shadow border border-gray-200 hover:bg-blue-100 text-gray-500 hover:text-blue-600 transition"
                          title="复制"
                          onClick={() => handleCopy(msg.content)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><rect x="3" y="3" width="13" height="13" rx="2"/></svg>
                        </button>
                        {msg.role === 'user' && (
                          <button
                            className="p-1 rounded-full bg-white shadow border border-gray-200 hover:bg-blue-100 text-gray-500 hover:text-blue-600 transition"
                            title="重新编辑"
                            onClick={() => handleEdit(msg.content)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6.071-6.071a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.414 1.414-4.243a4 4 0 01.828-1.414z"/></svg>
                          </button>
                        )}
                      </div>
                      <div className={msg.role === 'user' ? '' : 'prose max-w-none prose-blue break-words'}>
                        {/* @ts-expect-error ReactMarkdown自定义组件类型不兼容 */}
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            a: (props: unknown) => <a {...(props as Record<string, unknown>)} className="underline text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer" />,
                            code: (props: unknown) => {
                              const {inline, children, ...rest} = props as {inline?: boolean, children: React.ReactNode};
                              return inline
                                ? <code className="bg-gray-100 px-1 rounded text-pink-600 text-sm" {...rest}>{children}</code>
                                : <pre className="bg-gray-100 text-gray-800 rounded p-3 overflow-x-auto my-2"><code {...rest}>{children}</code></pre>;
                            },
                            li: (props: unknown) => <li className="ml-4 list-disc" {...(props as Record<string, unknown>)} />,
                            strong: (props: unknown) => <strong className="font-bold text-gray-900" {...(props as Record<string, unknown>)} />,
                            em: (props: unknown) => <em className="italic text-gray-700" {...(props as Record<string, unknown>)} />,
                            blockquote: (props: unknown) => <blockquote className="border-l-4 border-blue-300 pl-4 text-gray-500 my-2" {...(props as Record<string, unknown>)} />,
                            table: (props: unknown) => <table className="min-w-full border my-2" {...(props as Record<string, unknown>)} />,
                            th: (props: unknown) => <th className="border px-2 py-1 bg-blue-50" {...(props as Record<string, unknown>)} />,
                            td: (props: unknown) => <td className="border px-2 py-1" {...(props as Record<string, unknown>)} />,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* AI回复加载动画/逐行输出 */}
              {pendingAI && (
                <div className="flex mb-4 group justify-start">
                  <div className="relative flex flex-row">
                    <div className="max-w-[70vw] sm:max-w-2xl w-auto px-4 py-2 rounded-2xl text-base shadow-md transition-all bg-white text-gray-800 rounded-bl-md border border-gray-200 min-h-[2.5em] relative break-words">
                      {/* 操作按钮区，悬浮显示，仅复制，始终停靠右上角 */}
                      <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button
                          className="p-1 rounded-full bg-white shadow border border-gray-200 hover:bg-blue-100 text-gray-500 hover:text-blue-600 transition"
                          title="复制"
                          onClick={() => handleCopy(aiTyped || pendingAIContent)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><rect x="3" y="3" width="13" height="13" rx="2"/></svg>
                        </button>
                      </div>
                      <div className="prose max-w-none prose-blue break-words w-full">
                        {aiTyped ? (
                          // @ts-expect-error ReactMarkdown自定义组件类型不兼容
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              a: (props: unknown) => <a {...(props as Record<string, unknown>)} className="underline text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer" />,
                              code: (props: unknown) => {
                                const {inline, children, ...rest} = props as {inline?: boolean, children: React.ReactNode};
                                return inline
                                  ? <code className="bg-gray-100 px-1 rounded text-pink-600 text-sm" {...rest}>{children}</code>
                                  : <pre className="bg-gray-100 text-gray-800 rounded p-3 overflow-x-auto my-2"><code {...rest}>{children}</code></pre>;
                              },
                              li: (props: unknown) => <li className="ml-4 list-disc" {...(props as Record<string, unknown>)} />,
                              strong: (props: unknown) => <strong className="font-bold text-gray-900" {...(props as Record<string, unknown>)} />,
                              em: (props: unknown) => <em className="italic text-gray-700" {...(props as Record<string, unknown>)} />,
                              blockquote: (props: unknown) => <blockquote className="border-l-4 border-blue-300 pl-4 text-gray-500 my-2" {...(props as Record<string, unknown>)} />,
                              table: (props: unknown) => <table className="min-w-full border my-2" {...(props as Record<string, unknown>)} />,
                              th: (props: unknown) => <th className="border px-2 py-1 bg-blue-50" {...(props as Record<string, unknown>)} />,
                              td: (props: unknown) => <td className="border px-2 py-1" {...(props as Record<string, unknown>)} />,
                            }}
                          >
                            {String(aiTyped)}
                          </ReactMarkdown>
                        ) : (
                          <div className="flex justify-center items-center h-6 w-full">
                            <span className="animate-bounce inline-block w-2 h-2 bg-blue-400 rounded-full mx-0.5" style={{animationDelay: '0ms'}}></span>
                            <span className="animate-bounce inline-block w-2 h-2 bg-blue-400 rounded-full mx-0.5" style={{animationDelay: '120ms'}}></span>
                            <span className="animate-bounce inline-block w-2 h-2 bg-blue-400 rounded-full mx-0.5" style={{animationDelay: '240ms'}}></span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            {/* 底部输入区，主卡片底部，浅色背景，顶部圆角，阴影 */}
            <div className="w-full flex gap-2 px-6 py-5 bg-white border-t border-blue-100 rounded-b-2xl items-center shadow-md">
              {/* 附件上传按钮 */}
              <button
                className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 mr-2
                  ${enableAttachment ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600' : 'bg-gray-300 cursor-not-allowed'}
                  ${uploadedFiles.length > 0 ? 'opacity-60' : ''}`}
                onClick={handleAttachmentClick}
                disabled={!enableAttachment || uploadedFiles.length > 0}
                title={enableAttachment ? (uploadedFiles.length > 0 ? '正在上传...' : '上传附件') : '当前智能体未开放附件功能'}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l7.071-7.071a4 4 0 00-5.656-5.657l-7.071 7.07a6 6 0 108.485 8.486l6.364-6.364" />
                </svg>
              </button>
              {enableAttachment && uploadedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2 px-6">
                  {uploadedFiles.map(f => (
                    <div key={f.name} className="flex items-center bg-blue-50 border border-blue-200 rounded-xl px-3 py-1 relative shadow-sm">
                      <span className="text-blue-700 font-medium text-sm mr-2 max-w-[120px] truncate">{f.name}</span>
                      {f.status === 'uploading' && (
                        <span className="text-xs text-blue-500 mr-2">{f.progress}%</span>
                      )}
                      {f.status === 'done' && (
                        <span className="text-xs text-green-600 mr-2">已上传</span>
                      )}
                      {f.status === 'error' && (
                        <span className="text-xs text-red-500 mr-2">上传失败</span>
                      )}
                      {f.status === 'uploading' && (
                        <div className="w-16 h-1 bg-blue-100 rounded overflow-hidden mr-2">
                          <div className="h-1 bg-blue-500" style={{width: `${f.progress}%`}} />
                        </div>
                      )}
                      <button
                        className="ml-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="移除/取消"
                        onClick={() => handleRemoveFile(f.file)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <input
                ref={inputRef}
                className={`flex-1 border-none outline-none px-4 py-3 rounded-xl shadow-sm text-base transition-all duration-300 bg-white focus:ring-2 focus:ring-blue-400
                  ${inputDim ? 'bg-gray-200 text-gray-400' : 'bg-white text-gray-900'}`}
                placeholder="请输入您的问题..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
                onFocus={handleInputFocus}
                disabled={loading}
                style={{ boxShadow: inputDim ? '0 0 0 2px #cbd5e1' : '0 1px 4px rgba(0,0,0,0.04)' }}
              />
              <button
                className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200
                  ${loading || !input.trim() ? 'bg-blue-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 active:scale-95 shadow-lg'}`}
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                style={{ outline: 'none', border: 'none' }}
                tabIndex={-1}
              >
                {/* 小飞机SVG */}
                <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5l7.5-7.5m0 0l-7.5-7.5m7.5 7.5H3" />
                </svg>
              </button>
            </div>
          </div>
          {/* 右侧对话管理区 */}
          <div className="w-80 flex-shrink-0">
            <ConversationManager
              conversations={conversations}
              currentConversationId={currentConversationId}
              onNewConversation={handleNewConversation}
              onSelectConversation={handleSelectConversation}
              onDeleteConversation={handleDeleteConversation}
            />
          </div>
        </div>
        <div className="flex-none w-full text-center text-gray-400 py-4 text-xs">© 杭州云智信息技术有限公司</div>
      </div>
      {/* 隐藏的文件上传 input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple
      />
    </div>
  );
};

export default AgentChatPageTemplate; 