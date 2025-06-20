import React from 'react';
import './BusinessIntro.less';

const BusinessIntro: React.FC = () => {
  return (
    <section className="business-intro-bg">
      <div className="business-intro-container">
        <div className="business-intro-content">
          <div className="business-intro-left">
            <h2 className="business-intro-title">核心价值主张</h2>
            <p className="business-intro-desc">
              科图AI产业赋能研究院致力于为企业提供全面、定制化的产业AI化解决方案。我们摒弃指定软件和内容的传统模式，专注于以灵活、高效的方式助力企业实现业务的智能化转型，推动产业升级。
            </p>
            <ul className="business-intro-list">
              <li>量身定制AI赋能方案，深度理解企业痛点</li>
              <li>专业团队全程陪伴，助力业务流程优化</li>
              <li>平台化管理，AI工具灵活分配与监控</li>
              <li>让AI真正融入企业日常，提升效率与创新</li>
            </ul>
          </div>
          <div className="business-intro-right">
            <img src="/images/ai-empower.jpg" alt="AI赋能插画" className="business-intro-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessIntro;
