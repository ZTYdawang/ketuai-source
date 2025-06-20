import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../components/ui/select';

// 生成38个历史工单编号（20250208之后，日期和编号有一定随机性）
const requirementSNs = [
  '20250208QWET', '20250209ZXCV', '20250210ASDF', '20250211GHJK', '20250212BNML',
  '20250213UIOP', '20250214LKJH', '20250215MNBV', '20250216YTRE', '20250217POIU',
  '20250218QAZX', '20250219WSXC', '20250220EDCV', '20250221RFVB', '20250222TGNB',
  '20250223YHNM', '20250224UJIK', '20250225OLPK', '20250226PLKO', '20250227MIJU',
  '20250228NHYT', '20250301BGVF', '20250302VCXZ', '20250303XSWQ', '20250304ZAQW',
  '20250305QWER', '20250306TYUI', '20250307OPAS', '20250308DFGH', '20250309JKLZ',
  '20250310XCVB', '20250311NMKL', '20250312QWAZ', '20250313SXED', '20250314RFVT',
  '20250315GBNH', '20250316UJMI', '20250317OLPK', '20250318PLKO'
];

// 生成38条需求数据
const requirementData = Array.from({length: 38}).map((_, i) => ({
  sn: requirementSNs[i],
  name: [
    '客户服务智能助手','数据分析智能体','销售预测助手','内容审核系统','智能审批机器人',
    '智能合同助手','智能翻译官','智能知识库','智能报表生成','智能招聘官',
    '智能采购助手','智能运维监控','智能绩效分析','智能工单分发','智能舆情分析',
    '智能财务机器人','智能市场分析','智能会议助手','智能内容生成','智能客服机器人',
    '智能邮件助手','智能日程管理','智能流程自动化','智能数据同步','智能客户画像',
    '智能舆情预警','智能法务助手','智能市场助手','智能工单助手','智能内容助手',
    '智能审批助手','智能采购机器人','智能运维助手','智能报表助手','智能绩效助手',
    '智能邮件机器人','智能日程助手','智能翻译助手','智能工单机器人'
  ][i%39],
  company: [
    '北京科技有限公司','上海数据科技有限公司','广州智能科技有限公司','深圳创意科技有限公司','杭州云智信息技术有限公司',
    '成都智链科技有限公司','南京数云信息有限公司','苏州慧联数据科技有限公司','武汉云启信息技术有限公司','西安智谷科技有限公司',
    '重庆云数科技有限公司','天津慧算数据有限公司','青岛云帆网络科技有限公司','合肥智链科技有限公司','郑州数联智能科技有限公司',
    '长沙云脉智能有限公司','福州慧联数据科技有限公司','南昌云启信息技术有限公司','济南智谷科技有限公司','哈尔滨云数科技有限公司',
    '石家庄慧算数据有限公司','太原云帆网络科技有限公司','呼和浩特智链科技有限公司','乌鲁木齐数联智能科技有限公司','兰州云脉智能有限公司',
    '银川慧联数据科技有限公司','贵阳云启信息技术有限公司','昆明智谷科技有限公司','拉萨云数科技有限公司','海口慧算数据有限公司',
    '三亚云帆网络科技有限公司','宁波智链科技有限公司','温州数联智能科技有限公司','徐州云脉智能有限公司','常州慧联数据科技有限公司',
    '南通云启信息技术有限公司','连云港智谷科技有限公司','盐城云数科技有限公司','镇江慧算数据有限公司'
  ][i%39],
  date: (() => {
    // 2025-02-08起，日期有一定乱序
    const base = new Date(2025, 1, 8);
    const offset = Math.floor(i*1.7 + (i%3)*2 + (i%5));
    const d = new Date(base.getTime() + offset*24*3600*1000);
    return d.toISOString().slice(0,10);
  })(),
  status: ['待处理','处理中','已完成','已拒绝'][i%4],
}));

// 分页逻辑
const PAGE_SIZE = 9;

const AdminRequirementsPage: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [statusFilter, setStatusFilter] = React.useState('all');
  // 状态映射
  const statusMap: Record<string, string|null> = {
    all: null,
    pending: '待处理',
    in_progress: '处理中',
    completed: '已完成',
    rejected: '已拒绝',
  };
  // 根据筛选过滤数据
  const filteredData = statusFilter === 'all' ? requirementData : requirementData.filter(item => item.status === statusMap[statusFilter]);
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const pageData = filteredData.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);
  // 切换筛选时重置到第一页
  React.useEffect(() => { setPage(1); }, [statusFilter]);

  return (
    <>
      <main className="flex-1 p-6 w-full overflow-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">需求管理</h1>
            <p className="mt-1 text-sm text-gray-500">
              管理和处理企业提交的AI赋能需求
            </p>
          </div>
          
          {/* 统计卡片 */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">需求总数</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">48</div>
                        <div className="text-sm text-green-600">+8% 增长</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">待处理需求</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">12</div>
                        <div className="text-sm text-yellow-600">需要关注</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">已完成需求</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">32</div>
                        <div className="text-sm text-green-600">+4 本周</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">已拒绝需求</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">4</div>
                        <div className="text-sm text-gray-600">8.3% 比例</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 需求列表 */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  需求列表
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  企业提交的AI赋能需求
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4 gap-2 sm:gap-0 items-stretch w-full max-w-xl">
                <div className="flex-1 min-w-[120px]">
                  <label htmlFor="status-filter" className="sr-only">状态筛选</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full h-10 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400">
                      <SelectValue placeholder="所有状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有状态</SelectItem>
                      <SelectItem value="pending">待处理</SelectItem>
                      <SelectItem value="in_progress">处理中</SelectItem>
                      <SelectItem value="completed">已完成</SelectItem>
                      <SelectItem value="rejected">已拒绝</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label htmlFor="search" className="sr-only">搜索需求</label>
                  <div className="relative rounded-md shadow-sm h-10">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full h-10 pl-10 sm:text-sm border border-gray-300 rounded-md"
                      placeholder="搜索需求"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      需求信息
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      企业
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      提交时间
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">操作</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pageData.map((item, idx) => (
                    <tr key={item.sn}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                          <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${['bg-blue-100','bg-green-100','bg-purple-100','bg-red-100'][idx%4]}`}> 
                            <svg className={`h-6 w-6 ${['text-blue-600','text-green-600','text-purple-600','text-red-600'][idx%4]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">需求编号: {item.sn}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${['bg-yellow-100 text-yellow-800','bg-blue-100 text-blue-800','bg-green-100 text-green-800','bg-red-100 text-red-800'][['待处理','处理中','已完成','已拒绝'].indexOf(item.status)]}`}>
                          {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-blue-600 hover:text-blue-900 mr-4">查看详情</a>
                        {item.status==='待处理'||item.status==='处理中' ? (
                          <a href="#" className="text-green-600 hover:text-green-900">{item.status==='待处理'?'处理':'更新'}</a>
                        ) : null}
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* 分页按钮与信息 */}
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
              <button
                disabled={page===1}
                onClick={()=>setPage(p=>Math.max(1,p-1))}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
                  上一页
              </button>
              <button
                disabled={page===totalPages}
                onClick={()=>setPage(p=>Math.min(totalPages,p+1))}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
                  下一页
              </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                  显示第 <span className="font-medium">{(page-1)*PAGE_SIZE+1}</span> 到 <span className="font-medium">{Math.min(page*PAGE_SIZE,filteredData.length)}</span> 条，共 <span className="font-medium">{filteredData.length}</span> 条记录
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    disabled={page===1}
                    onClick={()=>setPage(p=>Math.max(1,p-1))}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                      <span className="sr-only">上一页</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                  </button>
                  {Array.from({length: totalPages}).map((_,i)=>(
                    <button
                      key={i}
                      onClick={()=>setPage(i+1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page===i+1?'z-10 bg-blue-50 border-blue-500 text-blue-600':'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                    >
                      {i+1}
                    </button>
                  ))}
                  <button
                    disabled={page===totalPages}
                    onClick={()=>setPage(p=>Math.min(totalPages,p+1))}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                      <span className="sr-only">下一页</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                  </button>
                  </nav>
              </div>
            </div>
          </div>
        </main>
    </>
  );
};

export default AdminRequirementsPage;