import React from 'react';

const PricingSection: React.FC = () => {
  const pricingCategories = [
    {
      title: "AI物料构建收费",
      description: "根据知识库、数据库的规模，以及云托管服务的存储量、计算资源使用量等，制定差异化收费标准。",
      plans: [
        { name: "小型知识库", price: "¥20,000起", features: ["基础知识库构建", "最多1000页文档", "基础数据库搭建", "标准云托管服务"] },
        { name: "中型知识库", price: "¥50,000-100,000", features: ["中型知识库构建", "最多5000页文档", "高级数据库搭建", "高性能云托管服务"] },
        { name: "大型行业知识库", price: "定制报价", features: ["大型行业知识库构建", "无限文档支持", "企业级数据库搭建", "专属云托管服务"] }
      ]
    },
    {
      title: "服务构建收费",
      description: "依据本地化工作流部署的复杂程度、在线部署服务的使用频率、混合部署模式的资源配置等因素，确定收费价格。",
      plans: [
        { name: "基础流程自动化", price: "¥30,000起", features: ["单一业务流程自动化", "基础部署服务", "标准技术支持", "基础培训服务"] },
        { name: "复杂业务流程AI化", price: "¥80,000起", features: ["多业务流程AI化", "高级部署服务", "优先技术支持", "定制化培训服务"] },
        { name: "企业级混合部署", price: "¥150,000起", features: ["全企业流程AI化", "混合部署方案", "7×24小时技术支持", "全面培训与咨询服务"] }
      ]
    },
    {
      title: "产品调试开发收费",
      description: "按照方案拟定的工作量、开发周期、技术难度等，收取相应的开发费用。",
      plans: [
        { name: "标准AI应用开发", price: "¥50,000起", features: ["标准功能开发", "基础UI设计", "单一平台适配", "基础测试与部署"] },
        { name: "定制化复杂应用", price: "¥100,000-300,000", features: ["定制化功能开发", "高级UI/UX设计", "多平台适配", "全面测试与部署"] },
        { name: "企业级AI系统集成", price: "¥500,000起", features: ["企业级系统开发", "专业UI/UX设计", "全平台适配与集成", "持续优化与升级服务"] }
      ]
    },
    {
      title: "后续使用教学收费",
      description: "根据培训方案的定制化程度、培训时长、培训人数等，制定合理的培训收费标准。",
      plans: [
        { name: "基础操作培训", price: "¥5,000/次", features: ["基础功能培训", "最多10人参与", "4小时培训时长", "基础培训资料"] },
        { name: "部门级应用培训", price: "¥15,000/次", features: ["全功能应用培训", "最多30人参与", "8小时培训时长", "详细培训资料与案例"] },
        { name: "企业级全面培训", price: "¥50,000起", features: ["全企业应用培训", "不限人数参与", "多天定制培训", "专属培训方案与资料"] }
      ]
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">收费模式说明</h2>
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-center text-gray-600">
            我们采用模块化的收费模式，根据企业的具体需求和使用情况进行灵活定价。我们也提供年度服务包，包含全方位的AI赋能服务，价格从¥200,000起，根据企业规模和需求定制。
          </p>
        </div>
        
        <div className="space-y-16">
          {pricingCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-3 text-gray-800">{category.title}</h3>
              <p className="text-gray-600 mb-8">{category.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.plans.map((plan, planIndex) => (
                  <div key={planIndex} className="bg-gray-50 rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
                    <h4 className="text-xl font-semibold mb-2 text-gray-800">{plan.name}</h4>
                    <div className="text-2xl font-bold text-blue-600 mb-4">{plan.price}</div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/contact" 
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            联系我们获取定制方案
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
