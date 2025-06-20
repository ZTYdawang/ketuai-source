import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './HeroBanner.less';

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-banner-bg">
      <div className="hero-banner-content">
        <div className="hero-banner-text">
          <h1 className="hero-title">
            科图AI产业赋能 <span className="hero-title-highlight">助力企业数字化转型</span>
              </h1>
          <p className="hero-desc">
                科图AI产业赋能研究院致力于为企业提供AI技术赋能，助力企业数字化转型，提升业务效率和创新能力。我们的AI加速器服务帮助企业快速构建自己的AI部门，实现业务智能化升级。
              </p>
          <div className="hero-btn-group">
            <Button type="primary" size="large" shape="round" onClick={() => navigate('/auth/register')}>
              立即开始
            </Button>
            <Button size="large" shape="round" style={{ marginLeft: 16 }} onClick={() => navigate('/cases')}>
                    查看案例
            </Button>
                </div>
              </div>
        <div className="hero-banner-img">
          <img src="/images/hero-banner.jpg" alt="AI赋能企业" />
          {/* 可选：SVG点线装饰 */}
          <svg className="hero-banner-svg" width="320" height="220">
            <circle cx="60" cy="60" r="40" fill="#e6f0ff" />
            <circle cx="260" cy="160" r="30" fill="#e6f0ff" />
            <line x1="60" y1="60" x2="260" y2="160" stroke="#b3d1ff" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
