import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './CasesPage.less';

const cases = [
  {
    img: '/images/cases/case1.jpg',
    client: '某大型制造企业',
    title: '智能质检系统助力制造升级',
    background: '该企业在生产过程中面临质检效率低、人工成本高、检测准确率不稳定等挑战。',
    solution: [
      '基于计算机视觉的缺陷检测模型，实现生产线实时监控',
      '自动化数据采集与分析，减少人工干预',
      '与MES系统无缝集成，提升整体生产智能化水平'
    ],
    results: [
      '质检效率提升300%，人工成本降低60%',
      '缺陷检测准确率达99.5%，产品不良率降低35%',
      '系统投资回报期仅6个月'
    ],
    highlights: [
      '高精度视觉算法，适应多种复杂工况',
      '端到端自动化流程，极大提升生产效率',
      '可扩展架构，支持多条产线并发部署'
    ],
    quote: '“智能质检系统让我们的生产线焕然一新，效率和质量双提升！”'
  },
  {
    img: '/images/cases/case2.jpg',
    client: '某金融机构',
    title: 'AI风控平台保障金融安全',
    background: '该机构在贷款审批和欺诈检测中，面临风险评估慢、误判率高等问题。',
    solution: [
      '引入机器学习模型自动评估贷款风险',
      '实时大数据分析，精准识别欺诈行为',
      '与核心业务系统集成，实现全流程自动化'
    ],
    results: [
      '风险评估时间从2天缩短至5分钟',
      '欺诈检测准确率提升40%，每年减少千万级损失',
      '客户体验显著提升，审批效率提升200%'
    ],
    highlights: [
      '自研风控模型，持续自我学习优化',
      '高并发架构，支持大规模业务处理',
      '灵活策略配置，满足多业务场景需求'
    ],
    quote: '“AI风控平台让我们的业务更安全，客户更放心！”'
  },
  {
    img: '/images/cases/case3.jpg',
    client: '某电商平台',
    title: '智能客服系统提升服务体验',
    background: '平台客服压力大，人工响应慢，用户满意度不高。',
    solution: [
      '基于NLP的智能问答机器人，自动解答80%常见问题',
      '多渠道接入，统一服务入口',
      '智能分流与工单系统集成，复杂问题高效转人工'
    ],
    results: [
      '客户响应时间从15分钟缩短至30秒',
      '客服运营成本降低50%，满意度提升35%',
      '系统持续学习，服务质量不断提升'
    ],
    highlights: [
      '多语言支持，覆盖全国用户',
      '知识库自学习，持续优化问答效果',
      '数据可视化后台，服务质量一目了然'
    ],
    quote: '“智能客服让我们的服务更高效，客户更满意！”'
  },
  {
    img: '/images/cases/case4.jpg',
    client: '某医疗机构',
    title: '智能诊断辅助系统赋能医疗决策',
    background: '医疗资源紧张，医生诊断压力大，误诊风险高。',
    solution: [
      '深度学习医学影像识别，辅助医生诊断',
      '病例知识库智能检索，提供决策参考',
      '与HIS系统集成，自动生成诊断报告'
    ],
    results: [
      '影像诊断准确率提升25%，误诊率大幅降低',
      '诊断时间缩短60%，患者等待时间减少',
      '系统每天辅助分析超千例医学影像'
    ],
    highlights: [
      '算法通过三甲医院权威验证',
      '支持多种影像类型，适应不同科室',
      '数据安全合规，保护患者隐私'
    ],
    quote: '“AI辅助诊断让医生更有信心，患者更安心！”'
  }
];

const CasesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="cases-hero">
        <h2 className="cases-hero-title">成功案例</h2>
        <p className="cases-hero-desc">AI驱动行业变革，见证我们的专业实力</p>
        <p className="cases-hero-subdesc">每一个案例，都是AI赋能产业升级的真实见证。我们为不同行业客户量身打造智能化解决方案，助力其实现高质量发展。</p>
      </section>
      <div className="cases-detail-list">
        {cases.map((item, idx) => (
          <div className={`case-detail-block${idx % 2 === 1 ? ' reverse' : ''}`} key={idx}>
            <div className="case-detail-img-wrap">
              <img src={item.img} alt={item.title} />
            </div>
            <div className="case-detail-content">
              <div className="case-detail-client">{item.client}</div>
              <h3 className="case-detail-title">{item.title}</h3>
              <div className="case-detail-desc">{item.background}</div>
              <div className="case-detail-solution"><b>解决方案：</b>
                <ul>
                  {item.solution.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
              </div>
              <div className="case-detail-results"><b>核心成果：</b>
                <ul>
                  {item.results.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
              </div>
              <div className="case-detail-highlights"><b>技术亮点：</b>
                <ul>
                  {item.highlights.map((h, i) => <li key={i}>{h}</li>)}
                      </ul>
              </div>
              <div className="case-detail-quote">{item.quote}</div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default CasesPage;
