import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../components/ui/select';

// 公司名称集合（用户管理+自定义）
const companyNames = [
  '杭州云智信息技术有限公司',
  '深圳数联智能科技有限公司',
  '北京慧算数据有限公司',
  '上海云帆网络科技有限公司',
  '成都智链科技有限公司',
  '南京数云信息有限公司',
  '广州云脉智能有限公司',
  '苏州慧联数据科技有限公司',
  '武汉云启信息技术有限公司',
  '西安智谷科技有限公司',
];

// 技术支持池
const techPool = [
  { name: 'dify', color: 'text-blue-700 font-bold' },
  { name: '扣子', color: 'text-pink-700 font-bold' },
  { name: '百度千帆智能云', color: 'text-green-700 font-bold' },
  { name: 'n8n', color: 'text-purple-700 font-bold' },
  { name: '阿里云', color: 'text-yellow-700 font-bold' },
  { name: '腾讯云', color: 'text-cyan-700 font-bold' },
];

// 智能体名称池
const agentNames = [
  '智慧人事助理', '智能客服助手', '销售数据分析', '市场调研助手', '智能会议记录',
  '财务分析专家', '法务文档助手', '智能招聘官', '项目管理助理', '智能采购助手',
  '智能运维监控', '知识库问答', '智能合同审核', '舆情监测', '智能翻译官',
  '智能内容生成', '智能客服机器人', '智能报表生成', '智能审批流', '智能邮件助手',
  '智能日程管理', '智能绩效分析', '智能工单分发', '智能舆情分析', '智能文档归档',
  '智能流程自动化', '智能数据同步', '智能营销助手', '智能客户画像', '智能舆情预警',
  '智能招聘助手', '智能财务机器人', '智能法务助手', '智能市场分析', '智能会议助手',
  '智能知识管理', '智能数据分析', '智能内容审核', '智能翻译助手', '智能审批助手',
  '智能采购机器人', '智能运维助手', '智能报表助手', '智能绩效助手', '智能工单助手',
  '智能邮件机器人', '智能日程助手', '智能内容助手', '智能工单机器人', '智能市场助手',
];

// 技术支持说明
const techDescMap: Record<string, string> = {
  'dify': '适合本地部署和工作流构建',
  '扣子': '低成本在线部署，建议开发客服使用',
  '百度千帆智能云': '出色的响应和前端兼容性及数字形象',
  'n8n': '强大的工具类智能体',
  '不限': '无特殊要求',
};

// 生成一批公司数据
function genCompanyBatch(batchIndex: number) {
  const companies = [];
  for (let i = 0; i < 3; i++) {
    const companyIdx = (batchIndex * 3 + i) % companyNames.length;
    const agentCount = 7 + Math.floor(Math.random() * 4); // 7~10个
    const userCount = 10 + Math.floor(Math.random() * 30);
    const todayUsage = 50 + Math.floor(Math.random() * 100);
    const todayTokens = 10000 + Math.floor(Math.random() * 20000);
    const onlineUsers = 2 + Math.floor(Math.random() * 10);
    // 智能体
    const agents = Array.from({ length: agentCount }).map((_, idx) => {
      // 名称差异化
      const name = agentNames[(batchIndex * 10 + i * 3 + idx) % agentNames.length] + (idx % 3 === 0 ? '' : idx % 2 === 0 ? 'Pro' : 'Plus');
      // 技术支持分布
      let techIdx = 0;
      if (idx % 3 === 0) techIdx = 0; // dify多
      else if (idx % 3 === 1) techIdx = 1; // 扣子多
      else if (idx % 3 === 2) techIdx = 2 + (batchIndex % 2); // 百度千帆智能云多
      const tech = techPool[techIdx];
      return {
        id: batchIndex * 1000 + i * 100 + idx,
        name,
        icon: ['🤖','💬','📊','📈','📁','🧑‍💼','📅','📑','📦','🛒'][idx % 10],
        tech,
        desc: '为企业提供高效智能服务，助力数字化升级。',
        todayUsage: 10 + Math.floor(Math.random() * 50),
        todayTokens: 1000 + Math.floor(Math.random() * 5000),
        onlineUsers: 1 + Math.floor(Math.random() * 5),
      };
    });
    companies.push({
      id: batchIndex * 10 + i,
      name: companyNames[companyIdx],
      agentCount: agents.length,
      userCount,
      todayUsage,
      todayTokens,
      onlineUsers,
      agents,
    });
  }
  return companies;
}

const MAX_BATCH = 5;

const AdminCompaniesPage: React.FC = () => {
  const [batches, setBatches] = useState([genCompanyBatch(0)]);
  const [batchIndex, setBatchIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [form, setForm] = useState({
    title: '',
    agentName: '',
    tech: '',
    desc: '',
    files: [] as File[],
  });
  const [sn, setSn] = useState('');

  // 监听滚动加载
  useEffect(() => {
    if (end) return;
    const handleScroll = () => {
      if (!loaderRef.current) return;
      const rect = loaderRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100 && !loading) {
        setLoading(true);
        setTimeout(() => {
          if (batchIndex < MAX_BATCH) {
            setBatches(prev => [...prev, genCompanyBatch(batchIndex)]);
            setBatchIndex(idx => idx + 1);
          } else {
            setEnd(true);
          }
          setLoading(false);
        }, 800);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [batchIndex, loading, end]);

  // 自动生成需求编号
  function genSN() {
    const date = new Date();
    const ymd = date.getFullYear().toString() + (date.getMonth()+1).toString().padStart(2,'0') + date.getDate().toString().padStart(2,'0');
    const rand = Array.from({length:4},()=>String.fromCharCode(65+Math.floor(Math.random()*26))).join('');
    return ymd + rand;
  }
  useEffect(() => {
    if (showDialog) setSn(genSN());
  }, [showDialog]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    setForm(f => ({ ...f, files: files ? Array.from(files) : [] }));
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleSubmit() {
    // TODO: 提交逻辑
    setShowDialog(false);
  }

  return (
    <main className="flex-1 p-6 w-full overflow-auto">
          {batches.flat().map(company => (
            <div key={company.id} className="mb-10 bg-white rounded-xl shadow-lg p-6 border border-blue-100">
              <h1 className="text-xl font-bold text-gray-900 mb-4 text-left">{company.name}</h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6 text-left">
                <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
                  <div className="text-sm text-gray-500">智能体数量</div>
                  <div className="text-2xl font-bold text-blue-600">{company.agentCount}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center">
                  <div className="text-sm text-gray-500">用户量</div>
                  <div className="text-2xl font-bold text-green-600">{company.userCount}</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 flex flex-col items-center">
                  <div className="text-sm text-gray-500">今日使用量</div>
                  <div className="text-2xl font-bold text-purple-600">{company.todayUsage}</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center">
                  <div className="text-sm text-gray-500">今日Token消耗</div>
                  <div className="text-2xl font-bold text-yellow-600">{company.todayTokens}</div>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 flex flex-col items-center">
                  <div className="text-sm text-gray-500">当前在线用户</div>
                  <div className="text-2xl font-bold text-pink-600">{company.onlineUsers}</div>
                </div>
              </div>
              {/* 智能体卡片区 */}
              <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {company.agents.map(agent => (
                  <div key={agent.id} className="bg-white rounded-lg shadow p-6 flex flex-col border border-gray-100">
                    <div className="flex items-center mb-2">
                      <span className="text-3xl mr-3">{agent.icon}</span>
                      <div className="flex-1">
                        <div className="text-lg font-bold text-gray-900">{agent.name}</div>
                        <div className="text-xs mt-1">技术支持：<span className={agent.tech.color}>{agent.tech.name}</span></div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 mb-2">{agent.desc}</div>
                    <div className="flex justify-between text-xs text-gray-500 mb-4">
                      <div>今日使用：<span className="font-semibold text-blue-600">{agent.todayUsage}</span></div>
                      <div>Token消耗：<span className="font-semibold text-yellow-600">{agent.todayTokens}</span></div>
                      <div>在线用户：<span className="font-semibold text-pink-600">{agent.onlineUsers}</span></div>
                    </div>
                    <div className="mt-auto flex space-x-2">
                      <button className="flex-1 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium">智能体详情</button>
                      {company.name === '杭州云智信息技术有限公司' && agent.name.startsWith('智慧人事助理') ? (
                        <button
                          className="flex-1 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-medium"
                          onClick={() => window.open('/#/ai-assistant/hr', '_blank')}
                        >
                          立即使用
                        </button>
                      ) : (
                      <button className="flex-1 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-medium">立即使用</button>
                      )}
                    </div>
                  </div>
                ))}
                {/* 添加智能体需求卡片 */}
                <Dialog open={showDialog} onOpenChange={setShowDialog}>
                  <DialogTrigger asChild>
                <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center border-2 border-dashed border-blue-400 cursor-pointer hover:bg-blue-50 transition">
                  <div className="text-4xl mb-2 text-blue-400">+</div>
                  <div className="text-lg font-bold text-blue-600 mb-1">添加智能体需求</div>
                  <div className="text-sm text-gray-500">点击提交新的智能体需求</div>
                </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl rounded-2xl shadow-2xl p-0 overflow-hidden border-0">
                    <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-500 w-full" />
                    <DialogHeader className="px-8 pt-6 pb-2">
                      <DialogTitle className="text-2xl font-bold text-blue-700">添加智能体需求</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-5 px-8 pb-2 pt-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">需求标题</label>
                        <input name="title" value={form.title} onChange={handleInputChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400" placeholder="请输入需求标题" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">需求编号</label>
                          <input value={sn} readOnly className="w-full border rounded px-3 py-2 bg-gray-100" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">智能体名称</label>
                          <input name="agentName" value={form.agentName} onChange={handleInputChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400" placeholder="请输入智能体名称" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">技术支持</label>
                        <Select value={form.tech} onValueChange={val => setForm(f => ({ ...f, tech: val }))}>
                          <SelectTrigger className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400">
                            <SelectValue placeholder="请选择" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dify">dify <span className="block text-xs text-gray-400">{techDescMap['dify']}</span></SelectItem>
                            <SelectItem value="扣子">扣子 <span className="block text-xs text-gray-400">{techDescMap['扣子']}</span></SelectItem>
                            <SelectItem value="百度千帆智能云">百度千帆智能云 <span className="block text-xs text-gray-400">{techDescMap['百度千帆智能云']}</span></SelectItem>
                            <SelectItem value="n8n">n8n <span className="block text-xs text-gray-400">{techDescMap['n8n']}</span></SelectItem>
                            <SelectItem value="不限">不限 <span className="block text-xs text-gray-400">{techDescMap['不限']}</span></SelectItem>
                          </SelectContent>
                        </Select>
                        {form.tech && (
                          <div className="mt-2 text-xs text-blue-600 bg-blue-50 rounded px-2 py-1">
                            {techDescMap[form.tech]}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">智能体需求描述</label>
                        <textarea name="desc" value={form.desc} onChange={handleInputChange} className="w-full border rounded px-3 py-2 min-h-[80px] focus:ring-2 focus:ring-blue-400" placeholder="请详细描述您的智能体需求" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">附件上传</label>
                        <input type="file" multiple accept=".doc,.docx,.ppt,.pptx,.pdf,.html,.txt,.md" onChange={handleFileChange} className="w-full" />
                        <div className="text-xs text-gray-400 mt-1">支持doc、docx、ppt、pptx、pdf、html、txt、md等文件类型</div>
                        {form.files.length > 0 && (
                          <ul className="mt-2 text-xs text-gray-700 space-y-1">
                            {form.files.map(f => <li key={f.name}>{f.name}</li>)}
                          </ul>
                        )}
                      </div>
                    </div>
                    <DialogFooter className="mt-6 px-8 pb-6 flex justify-center gap-4">
                      <Button type="button" onClick={handleSubmit} variant="default" className="px-6">提交并生成工单</Button>
                      <Button type="button" onClick={handleSubmit} variant="secondary" className="px-6">仅提交</Button>
                      <Button type="button" onClick={()=>setShowDialog(false)} variant="outline" className="px-6">取消</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
          <div ref={loaderRef} className="flex flex-col items-center py-8">
            {loading && <span className="text-blue-500">加载中...</span>}
            {end && <span className="text-gray-400">已经到底啦！</span>}
          </div>
        </main>
  );
};

export default AdminCompaniesPage; 