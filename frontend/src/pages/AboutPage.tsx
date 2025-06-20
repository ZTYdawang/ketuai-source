import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { COMPANY_NAME } from '../constants/companyInfo';
import './AboutPage.less';

const features = [
  {
    title: '全球视野',
    desc: '我们与全球顶尖AI研究机构和企业保持紧密合作，持续跟踪国际前沿技术发展动态，为客户提供具有国际水准的AI解决方案。',
    icon: (
      <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
    )
  },
  {
    title: '技术创新',
    desc: '我们拥有一支由AI领域专家组成的研发团队，专注于人工智能技术的创新与应用，为企业提供定制化的AI解决方案。',
    icon: (
      <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    )
  },
  {
    title: '产业赋能',
    desc: '我们深入了解各行业痛点，将AI技术与产业需求紧密结合，帮助企业实现降本增效、提升竞争力的目标。',
    icon: (
      <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    )
  },
  {
    title: '安全可靠',
    desc: '我们高度重视数据安全和隐私保护，采用严格的安全措施和合规流程，确保客户数据的安全性和保密性。',
    icon: (
      <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
    )
  },
  {
    title: '成效导向',
    desc: '我们注重AI应用的实际效果，通过数据驱动的方法，持续优化AI模型和解决方案，确保为客户创造实际价值。',
    icon: (
      <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
    )
  },
  {
    title: '长期陪伴',
    desc: '我们不仅提供一次性解决方案，更注重与客户建立长期合作关系，持续提供技术支持和升级服务，陪伴企业成长。',
    icon: (
      <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    )
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">关于{COMPANY_NAME}</h1>
          <p className="about-hero-desc">专注AI产业化，赋能企业数字化转型</p>
          <p className="about-hero-intro">{COMPANY_NAME}是一家专注于人工智能技术产业化应用的科技公司，致力于为企业提供全方位的AI赋能服务，帮助传统企业实现数字化转型，提升核心竞争力。</p>
        </div>
      </section>
      {/* 六大优势卡片区 */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">我们的核心优势</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 group">
              <div className="mb-4 flex items-center justify-center w-16 h-16 bg-gray-900 group-hover:bg-blue-700 transition-colors duration-300" style={{borderRadius: 0}}>
                {React.cloneElement(f.icon, { className: 'h-10 w-10 text-white' })}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-base text-center">{f.desc}</p>
            </div>
          ))}
            </div>
          </div>
      {/* 使命愿景价值观团队区 */}
      <div className="py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">我们的使命</h2>
            <p className="text-gray-700 text-lg">赋能千行百业，让AI成为企业的核心竞争力。</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">我们的愿景</h2>
            <p className="text-gray-700 text-lg">成为中国领先的AI产业赋能平台，推动人工智能技术在各行业的深度应用，促进产业升级和数字化转型。</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center md:col-span-2">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">我们的价值观</h2>
            <p className="text-gray-700 text-lg">创新、专业、协作、诚信、责任。我们相信技术创新是推动社会进步的核心动力，专业能力是服务客户的基础，协作精神是团队成功的关键，诚信和责任是我们对客户和社会的承诺。</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center md:col-span-2">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">我们的团队</h2>
            <p className="text-gray-700 text-lg">我们的团队由AI领域的专家、工程师、产品经理和行业顾问组成，拥有丰富的技术经验和行业知识，能够为客户提供全方位的AI赋能服务。</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
