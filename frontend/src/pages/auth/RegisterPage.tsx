import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LegalModal from '../../components/LegalModal';
import { TERMS_CONTENT, PRIVACY_CONTENT } from '../../constants/legalContents';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    position: '',
    agreeTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      setLoading(false);
      return;
    }
    if (!formData.agreeTerms) {
      setError('请阅读并同意服务条款和隐私政策');
      setLoading(false);
      return;
    }
    try {
      // 调用后端注册接口
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name: formData.name,
        email: formData.email,
          password: formData.password,
        company: formData.company,
          position: formData.position
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || '注册失败，请稍后再试');
      }

      // 保存 token 和用户信息
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/admin');
    } catch (error) {
      setError(error instanceof Error ? error.message : '注册失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 背景图片 */}
      <img src="/images/login.jpg" className="absolute inset-0 w-full h-full object-cover z-0" alt="背景" />
      {/* 半透明渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/40 to-white/10 z-10" />
      {/* 注册表单区 */}
      <div className="relative z-20 flex items-center justify-center h-full w-full">
        <div className="w-full max-w-xl min-w-[320px] p-10 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-md flex flex-col items-center">
          <div className="flex items-center space-x-4 mb-8">
            <img src="/logo.png" alt="logo" className="h-12 w-auto" />
            <span className="text-2xl font-bold text-blue-600">科图产业赋能研究院</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-left w-full">欢迎注册</h2>
          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-4 w-full">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}
          <form className="space-y-6 w-full" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">姓名</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="姓名"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">邮箱地址</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="邮箱地址"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="company" className="sr-only">公司名称</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="公司名称"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="position" className="sr-only">职位</label>
                <input
                  id="position"
                  name="position"
                  type="text"
                  autoComplete="organization-title"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="职位"
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">密码</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="密码"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">确认密码</label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="确认密码"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agreeTerms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
                我已阅读并同意 
                <a href="#" onClick={(e)=>{e.preventDefault();setModalType('terms');}} className="text-blue-600 hover:text-blue-500">服务条款</a>
                {' '}和{' '}
                <a href="#" onClick={(e)=>{e.preventDefault();setModalType('privacy');}} className="text-blue-600 hover:text-blue-500">隐私政策</a>
              </label>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {loading ? '注册中...' : '注册'}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm text-gray-500 w-full">
            已有账号？<Link to="/auth/login" className="text-blue-600 hover:text-blue-500 ml-1">去登录</Link>
          </div>
        </div>
      </div>
      <LegalModal 
        open={modalType!==null}
        title={modalType==='terms' ? '服务条款' : '隐私政策'}
        content={modalType==='terms' ? TERMS_CONTENT : PRIVACY_CONTENT}
        onClose={()=>setModalType(null)}
      />
    </div>
  );
};

export default RegisterPage;
