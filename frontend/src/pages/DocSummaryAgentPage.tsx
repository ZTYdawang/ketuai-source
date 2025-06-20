import React, { useRef, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useRef as useReactRef } from 'react';

// Dify API配置
const DIFY_API_URL = 'http://localhost/v1/chat-messages';
const DIFY_API_KEY = 'app-3DLoAE0lgam08ZjWRerhk7kJ';

// 预设问题
const PRESET_QUESTIONS = [
  '请帮我总结这份文档的主要内容',
  '文档中有哪些关键要点？',
  '请提取文档中的结论部分',
  '文档的结构和章节分布是怎样的？',
  '请将文档内容转为一份简明摘要',
  '文档中有哪些值得关注的数据或事实？',
  '请列出文档中的核心观点',
  '文档适合哪些场景使用？',
  '请帮我生成一份文档阅读报告',
];

// 智能体mock数据（只保留文档智能摘要）
const AGENT = {
  id: 3,
  icon: '📄',
  name: '文档智能摘要',
  tech: { name: 'dify', color: 'text-blue-600' },
  desc: '文档关键信息提取与智能摘要',
  todayUsage: 5,
  todayTokens: 900,
  onlineUsers: 1,
};

interface Message {
  role: 'user' | 'ai';
  content: string;
}

// 聊天AI逐行输出hook
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

// mock历史对话数据
const historyConversations = [
  { id: 1, summary: '总结公司年度报告' },
  { id: 2, summary: '提取合同关键条款' },
  { id: 3, summary: '会议纪要自动摘要' },
  { id: 4, summary: '分析市场调研文档' },
  { id: 5, summary: '生成产品说明书摘要' },
  { id: 6, summary: '归纳政策文件要点' },
  { id: 7, summary: '论文核心观点提取' },
  { id: 8, summary: '总结项目计划书' },
  { id: 9, summary: '文档适用场景分析' },
];

export default function DocSummaryAgentPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [inputDim, setInputDim] = useState(false); // 输入框变暗动画
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [presetBatch, setPresetBatch] = useState<number[]>([0, 1, 2]);
  const inputRef = useReactRef<HTMLInputElement | null>(null);

  // 新增：AI回复逐行动画控制
  const [pendingAI, setPendingAI] = useState(false);
  const [pendingAIContent, setPendingAIContent] = useState('');
  const [pendingAIShow, setPendingAIShow] = useState(false);

  // 提示卡片展开/收起状态
  const [tipsOpen, setTipsOpen] = useState(true);

  // 滚动到底部
  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // 发送消息到Dify
  const sendMessage = async () => {
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
      const res = await fetch(DIFY_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${DIFY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {},
          query: input,
          conversation_id: conversationId || undefined,
          user: 'guest',
        }),
      });
      const data = await res.json();
      if (data.answer) {
        setPendingAIContent(data.answer);
        setPendingAIShow(true);
        if (data.conversation_id) setConversationId(data.conversation_id);
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
    // eslint-disable-next-line
  }, [aiTyped, pendingAIShow, pendingAIContent]);

  // 输入框聚焦时恢复正常颜色
  const handleInputFocus = () => setInputDim(false);

  // 换一换预设问题
  const refreshPreset = () => {
    const idxs: number[] = [];
    while (idxs.length < 3) {
      const n = Math.floor(Math.random() * PRESET_QUESTIONS.length);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-100 block">
      <div
        className="w-full max-w-[1200px] mx-auto mt-10 flex flex-row items-start gap-8 justify-end transition-all duration-500 relative"
        style={{ maxWidth: '95vw' }}
      >
        {/* 主对话卡片 */}
        <div className="bg-white rounded-2xl shadow-2xl p-0 flex flex-col border border-blue-100 h-[700px] max-h-[80vh] w-full max-w-[1100px]" style={{ minHeight: 540 }}>
          {/* 顶部名片区 */}
          <div className="w-full bg-gradient-to-b from-gray-50 to-blue-50 py-8 px-4 sticky top-0 z-30">
            <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-8">
              <div className="flex flex-col items-center w-full">
                <div className="flex flex-row items-center justify-center gap-3 w-full">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-[2.5rem] select-none">
                    <span role="img" aria-label="文档智能摘要" className="drop-shadow text-blue-500">📄</span>
                  </span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">文档智能摘要</span>
                  <span className="ml-0 sm:ml-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-base font-semibold shadow-sm border border-blue-200 animate-fade-in">技术支持：Dify AI</span>
                </div>
                <div className="text-sm sm:text-base text-gray-500 font-semibold mt-2 text-center w-full">杭州云智信息技术有限公司·厦门</div>
                <div className="text-blue-900 text-lg font-medium leading-relaxed text-center mt-4 max-w-2xl w-full" style={{lineHeight: 1.85}}>
                  我是你的文档智能摘要助手，能够为各类文档提供<span className="text-blue-700 font-bold">高效、精准</span>的关键信息提取与智能摘要服务。
                  无论是<span className="font-bold">报告总结</span>、<span className="font-bold">合同要点提取</span>、<span className="font-bold">会议纪要归纳</span>，还是<span className="font-bold">论文核心观点梳理</span>，我都能助你快速掌握文档精华内容。
                </div>
              </div>
            </div>
          </div>
          {/* 聊天气泡区 */}
          <div className="flex-1 overflow-y-auto px-6 py-8 bg-gray-100 rounded-t-2xl">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-full flex items-center justify-between mb-4">
                  <div className="text-gray-400 italic select-none text-base">欢迎上传或粘贴文档内容，获取智能摘要~</div>
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
                      onClick={() => handlePresetClick(PRESET_QUESTIONS[idx])}
                    >
                      {PRESET_QUESTIONS[idx]}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex mb-4 group ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}> 
                <div className="relative flex flex-row">
                  <div className={`max-w-[60vw] sm:max-w-2xl w-auto px-4 py-2 rounded-2xl text-base shadow-md transition-all break-words
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
                  <div className="max-w-[60vw] sm:max-w-2xl w-auto px-4 py-2 rounded-2xl text-base shadow-md transition-all bg-white text-gray-800 rounded-bl-md border border-gray-200 min-h-[2.5em] relative break-words">
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
          {/* 底部输入区 */}
          <div className="w-full flex gap-2 px-6 py-5 bg-white border-t border-blue-100 rounded-b-2xl items-center shadow-md">
            <input
              ref={inputRef}
              className={`flex-1 border-none outline-none px-4 py-3 rounded-xl shadow-sm text-base transition-all duration-300 bg-white focus:ring-2 focus:ring-blue-400
                ${inputDim ? 'bg-gray-200 text-gray-400' : 'bg-white text-gray-900'}`}
              placeholder="请输入您的文档内容或问题..."
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
        {/* 右侧提示卡片及对话管理卡片，复用主页面样式 */}
        <div className="hidden md:block relative" style={{width: 320, minWidth: 320}}>
          {/* 提示卡片 */}
          {tipsOpen ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 shadow rounded-xl p-4 flex flex-col gap-2 sticky top-24 z-10">
              <div className="flex justify-between items-center mb-1">
                <div className="font-bold text-yellow-700 text-base flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"/></svg>
                  Tips
                </div>
                <button className="ml-2 p-1 rounded-full hover:bg-yellow-100 text-yellow-600" title="收起" onClick={()=>setTipsOpen(false)}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <div className="text-yellow-800 text-sm leading-relaxed">
                请尽量描述清楚你的文档类型、内容需求和期望摘要方式，能获得更高质量的AI摘要。
              </div>
            </div>
          ) : null}
          {/* 小铃铛外部停靠 */}
          {!tipsOpen && (
            <button
              className="absolute z-20 -right-6 top-4 bg-yellow-100 rounded-full shadow flex items-center justify-center w-12 h-12 border border-yellow-300 hover:bg-yellow-200 transition"
              title="展开AI沟通小贴士"
              onClick={()=>setTipsOpen(true)}
              style={{boxShadow: '0 2px 8px rgba(0,0,0,0.10)'}}
            >
              <svg className="w-7 h-7 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 6 9.388 6 12v2.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          )}
          {/* 对话管理卡片 */}
          <div className="bg-white border-l-4 border-blue-400 shadow rounded-xl p-0 flex flex-col gap-0 sticky top-56 mt-6" style={{minHeight: 320, maxHeight: 420, overflow: 'hidden'}}>
            {/* 新建对话按钮 */}
            <button className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-t-xl transition text-base" style={{borderBottom: '1px solid #e0e7ef'}}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
              新建对话
            </button>
            {/* 历史对话列表 */}
            <div className="flex-1 overflow-y-auto" style={{maxHeight: 320}}>
              {historyConversations.slice(0,8).map(conv => (
                <div key={conv.id} className="px-4 py-3 border-b last:border-b-0 border-blue-50 hover:bg-blue-50 cursor-pointer text-blue-900 text-sm truncate" title={conv.summary}>
                  {conv.summary}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-center text-gray-400 py-4 text-xs">© 杭州云智信息技术有限公司</div>
    </div>
  );
} 