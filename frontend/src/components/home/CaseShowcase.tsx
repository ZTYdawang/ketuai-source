import React from 'react';
import { Link } from 'react-router-dom';
import './CaseShowcase.less';

const caseImages = [
  '/images/cases/case1.jpg',
  '/images/cases/case2.jpg',
  '/images/cases/case3.jpg',
  '/images/cases/case4.jpg',
];

const CaseShowcase: React.FC = () => {
  const cases = [
    {
      title: "基于本地化部署的政策问答服务系统",
      client: "某科技交流中心",
      description: "该中心面临大量政策咨询工作，传统人工解答方式效率低下且容易出现不一致情况。我们为其构建了基于本地化部署的政策问答服务系统，采用嵌入式模型实现向量检索知识库，结合deepseek大模型进行内容匹配和总结。",
      results: "系统部署后，政策咨询响应时间从平均30分钟缩短至秒级响应，准确率提升至95%以上，大幅减轻了工作人员负担，提升了服务质量和用户满意度。",
      advantages: [
        "本地化部署确保数据安全，避免敏感政策信息外泄",
        "向量检索技术实现精准匹配，提供最相关的政策解读",
        "大模型总结能力使复杂政策内容变得易于理解",
        "Web端接口便于集成到现有系统，实现无缝对接"
      ],
      img: caseImages[0],
    },
    {
      title: "支持数字可视化的台账管理智能体系统",
      client: "某科创产业园",
      description: "该产业园管理大量楼盘信息和租赁数据，传统Excel管理方式已无法满足快速查询和数据分析需求。我们为其开发了支持数字可视化的台账管理智能体系统，采用Python进行数据清洗，结合deepseek进行智能化字段数据补充。",
      results: "系统上线后，产业园的数据管理效率提升了200%，决策分析时间缩短了60%，租赁管理流程实现了智能化，大幅提升了运营效率。",
      advantages: [
        "数据自动录入与整理，从多种数据源自动采集台账数据",
        "直观的可视化展示，支持用户自定义图表类型和展示维度",
        "智能预警功能，对关键指标进行实时监测，及时发出预警通知",
        "自然语言查询能力，用户可通过自然语言输入快速检索相关信息"
      ],
      img: caseImages[1],
    },
    {
      title: "智能客户管理与营销分析系统",
      client: "某汽车销售4S店",
      description: "该4S店面临客户数据分散、营销跟进效率低等问题。我们为其搭建了智能客户管理与营销分析系统，实现客户信息统一管理、自动化营销跟进和销售数据智能分析。",
      results: "系统上线后，客户转化率提升30%，销售团队跟进效率提升50%，营销活动ROI显著提升。",
      advantages: [
        "客户数据统一归集，支持多渠道数据导入",
        "自动化营销提醒，提升客户跟进及时性",
        "销售数据智能分析，辅助决策",
        "移动端支持，随时随地管理客户"
      ],
      img: caseImages[2],
    },
    {
      title: "智慧停车场管理平台",
      client: "某市停车场管理公司",
      description: "该公司管理全市数十个停车场，人工收费与管理效率低。我们为其开发了智慧停车场管理平台，实现车牌识别自动进出、在线支付、数据可视化和远程监控。",
      results: "平台上线后，停车场通行效率提升60%，人工成本降低40%，用户满意度大幅提升。",
      advantages: [
        "车牌识别自动进出，提升通行效率",
        "在线支付与发票，提升用户体验",
        "数据可视化，实时监控运营状况",
        "远程管理，降低人工成本"
      ],
      img: caseImages[3],
    }
  ];

  return (
    <section className="case-showcase-bg">
      <div className="case-showcase-container">
        <h2 className="case-showcase-title">成功案例展示</h2>
        <div className="case-card-list-horizontal">
          {cases.map((caseItem, index) => (
            <div className="case-card-horizontal" key={index}>
              <div className="case-card-img-wrap-horizontal">
                <img className="case-card-img-horizontal" src={caseItem.img} alt={caseItem.title} />
                  </div>
              <div className="case-card-content-horizontal">
                <div className="case-card-client-horizontal">{caseItem.client}</div>
                <div className="case-card-title2-horizontal">{caseItem.title}</div>
                <div className="case-card-desc-horizontal">{caseItem.description}</div>
                <div className="case-card-results-horizontal">{caseItem.results}</div>
                <div className="case-card-adv-title-horizontal">核心优势：</div>
                <ul className="case-card-adv-list-horizontal">
                  {caseItem.advantages.map((adv, i) => (
                    <li key={i} className="case-card-adv-item-horizontal">{adv}</li>
                    ))}
                  </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="case-showcase-btn-wrap">
          <Link to="/cases" className="case-showcase-btn">查看更多案例</Link>
        </div>
      </div>
    </section>
  );
};

export default CaseShowcase;
