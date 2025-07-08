import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_PHONE, COMPANY_EMAIL } from '../constants/companyInfo';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // 移除未使用
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 修正默认marker图标（Leaflet默认图标在webpack下不显示）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-indigo-50 min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 pt-32">
        {/* 顶部说明性内容 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-4">欢迎与我们取得联系</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            无论您是企业客户、合作伙伴还是媒体朋友，{COMPANY_NAME}都欢迎您的咨询与合作。我们致力于为各行业客户提供专业的AI解决方案与技术支持，助力企业数字化转型与智能升级。请通过下方表单或联系方式与我们取得联系，我们的团队会在1个工作日内与您沟通。
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* 联系表单卡片（提前） */}
          <div className="bg-white shadow-xl rounded-xl p-0 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-500 w-full"></div>
            <div className="p-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-blue-700">发送咨询</h2>
              <p className="mt-4 text-lg text-gray-500">
                  请填写您的信息和需求，我们会尽快与您联系。
              </p>
            </div>
            <div className="mt-12">
              <form action="#" method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    姓名
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    公司
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      autoComplete="organization"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    电子邮件
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    电话
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    主题
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex justify-between">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      消息
                    </label>
                    <span id="message-max" className="text-sm text-gray-500">
                      最多500字
                    </span>
                  </div>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md"
                      aria-describedby="message-max"
                    ></textarea>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <input
                        id="privacy"
                        name="privacy"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base text-gray-500">
                        我同意{COMPANY_NAME}根据{' '}
                        <a href="#" className="font-medium text-gray-700 underline">
                          隐私政策
                        </a>{' '}
                        处理我的个人信息。
                      </p>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    提交
                  </button>
                </div>
              </form>
              </div>
            </div>
          </div>
          {/* 联系方式卡片（后置） */}
          <div className="bg-white shadow-xl rounded-xl p-0 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-500 w-full"></div>
            <div className="p-8">
              <h2 className="text-2xl font-extrabold text-blue-700 sm:text-3xl sm:tracking-tight mb-8">联系我们</h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">咨询服务</h3>
                  <dl className="mt-2 text-base text-gray-500">
                    <div>
                      <dt className="sr-only">电子邮件</dt>
                      <dd>{COMPANY_EMAIL}</dd>
                    </div>
                    <div className="mt-1">
                      <dt className="sr-only">电话号码</dt>
                      <dd>{COMPANY_PHONE}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">技术支持</h3>
                  <dl className="mt-2 text-base text-gray-500">
                    <div>
                      <dt className="sr-only">电子邮件</dt>
                      <dd>{COMPANY_EMAIL}</dd>
                    </div>
                    <div className="mt-1">
                      <dt className="sr-only">电话号码</dt>
                      <dd>{COMPANY_PHONE}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">媒体合作</h3>
                  <dl className="mt-2 text-base text-gray-500">
                    <div>
                      <dt className="sr-only">电子邮件</dt>
                      <dd>{COMPANY_EMAIL}</dd>
                    </div>
                    <div className="mt-1">
                      <dt className="sr-only">电话号码</dt>
                      <dd>{COMPANY_PHONE}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">商务合作</h3>
                  <dl className="mt-2 text-base text-gray-500">
                    <div>
                      <dt className="sr-only">电子邮件</dt>
                      <dd>{COMPANY_EMAIL}</dd>
                    </div>
                    <div className="mt-1">
                      <dt className="sr-only">电话号码</dt>
                      <dd>{COMPANY_PHONE}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 地图卡片 */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-indigo-50">
        <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="bg-white shadow-xl rounded-xl p-0 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-500 w-full"></div>
            <div className="overflow-hidden h-96 flex items-center justify-center">
              {/* <iframe
                title="公司位置地图"
                src="https://www.amap.com/maps?zoom=16&center=118.059159,24.612632&markers=118.059159,24.612632"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '350px', minWidth: '100%' }}
                allowFullScreen
                loading="lazy"
              ></iframe> */}
            </div>
            <div className="text-center mt-4 text-gray-700 text-base">
              公司地址：{COMPANY_ADDRESS}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
