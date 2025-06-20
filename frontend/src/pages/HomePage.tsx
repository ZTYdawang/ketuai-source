import React from 'react';

// 导入组件（后续实现）
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBanner from '../components/home/HeroBanner';
import BusinessIntro from '../components/home/BusinessIntro';
import ServiceBlocks from '../components/home/ServiceBlocks';
import CaseShowcase from '../components/home/CaseShowcase';
import PricingSection from '../components/home/PricingSection';
import ContactSection from '../components/home/ContactSection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* 主视觉横幅区 */}
        <HeroBanner />
        
        {/* 业务介绍区 */}
        <BusinessIntro />
        
        {/* 主要业务构成区 */}
        <ServiceBlocks />
        
        {/* 成功案例展示区 */}
        <CaseShowcase />
        
        {/* 收费模式说明区 */}
        <PricingSection />
        
        {/* 联系我们区 */}
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
