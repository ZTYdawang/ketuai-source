import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 路由切换时自动滚动到页面顶部，避免保持上一页面的滚动位置。
 * 兼容异步内容撑高导致的滚动异常。
 */
const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    // 使用 window.scrollTo 而非 document.documentElement.scrollTop，以兼容各种浏览器
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default ScrollToTop; 