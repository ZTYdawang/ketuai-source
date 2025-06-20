import React from 'react';
import { Row, Col, Card } from 'antd';
import './ServiceBlocks.less';

  const services = [
    {
      title: "AI物料构建",
    description: "为企业提供知识库构建、数据库搭建和云托管服务，整合企业内部资料和行业知识，打造专属AI知识库。",
      icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="service-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "服务构建 - AI化迁移与托管",
    description: "支持本地化、在线和混合部署，自动化设计减少人工干预，提高企业工作效率。",
      icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="service-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    {
      title: "产品调试开发",
    description: "从需求沟通到开发测试，三阶段流程保障AI赋能方案高效落地，助力企业创新升级。",
      icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="service-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "后续使用教学",
    description: "为企业员工提供AI系统操作与业务流程培训，助力团队高效掌握AI工具。",
      icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="service-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ];

const ServiceBlocks: React.FC = () => {
  return (
    <section className="service-blocks-bg">
      <div className="service-blocks-container">
        <h2 className="service-blocks-title">主要业务构成</h2>
        <Row gutter={[32, 32]} justify="center">
          {services.map((service, idx) => (
            <Col xs={24} sm={12} md={12} lg={6} key={idx}>
              <Card
                className="service-card"
                hoverable
                variant="outlined"
                styles={{ body: { padding: 24 } }}
                style={{ maxWidth: 260, margin: '0 auto' }}
              >
                <div className="service-card-icon">{service.icon}</div>
                <div className="service-card-title">{service.title}</div>
                <div className="service-card-desc">{service.description}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default ServiceBlocks;
