import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.less';
import { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_PHONE, COMPANY_EMAIL } from '../constants/companyInfo';

const Footer: React.FC = () => {
  return (
    <footer className="footer-bg">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <h3 className="footer-title">科图AI产业赋能研究院</h3>
            <p className="footer-desc">
              专注于为企业提供AI加速器服务，助力企业数字化转型与智能化升级。
            </p>
          </div>
          <div>
            <h3 className="footer-title">服务</h3>
            <ul className="footer-list">
              <li><Link to="/contact">AI赋能咨询</Link></li>
              <li><Link to="/contact">AI应用开发</Link></li>
              <li><Link to="/contact">知识库构建</Link></li>
              <li><Link to="/contact">AI培训服务</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-title">关于</h3>
            <ul className="footer-list">
              <li><Link to="/about">关于我们</Link></li>
              <li><Link to="/cases">成功案例</Link></li>
              <li><Link to="/team">团队介绍</Link></li>
              <li><Link to="/careers">加入我们</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-title">联系我们</h3>
            <ul className="footer-list">
              <li>{COMPANY_NAME}</li>
              <li>{COMPANY_ADDRESS}</li>
              <li>{COMPANY_PHONE}</li>
              <li>{COMPANY_EMAIL}</li>
            </ul>
            <div className="footer-socials">
              <a href="#" title="微信"><span className="sr-only">微信</span></a>
              <a href="#" title="微博"><span className="sr-only">微博</span></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. 保留所有权利.</p>
          <ul className="footer-bottom-links">
            <li><Link to="/privacy">隐私政策</Link></li>
            <li><Link to="/terms">服务条款</Link></li>
            <li><Link to="/sitemap">网站地图</Link></li>
            </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
