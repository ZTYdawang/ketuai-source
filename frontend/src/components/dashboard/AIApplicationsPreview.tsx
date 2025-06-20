import React from 'react';

interface AIApplicationProps {
  applications: Array<{
    id: number;
    name: string;
    description: string;
    platform: string;
    type: string;
    status: string;
    icon: string;
    color: string;
    usage: {
      tokens: number;
      conversations: number;
      users: number;
    };
    lastUsed: string;
  }>;
}

const AIApplicationsPreview: React.FC<AIApplicationProps> = ({ applications }) => {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">最近使用的AI应用</h2>
        <a href="/ai-department" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          查看全部
        </a>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white overflow-hidden shadow rounded-lg border border-gray-200"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${app.color}`}>
                  <span className="text-2xl">{app.icon}</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">
                      {app.platform}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {app.name}
                      </div>
                    </dd>
                  </dl>
                </div>
                <div className="flex-shrink-0">
                  {app.status === 'active' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      活跃
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      未激活
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-5 py-3">
              <p className="text-sm text-gray-500 line-clamp-2">
                {app.description}
              </p>
            </div>
            <div className="border-t border-gray-200 px-5 py-3 bg-gray-50">
              <div className="text-xs text-gray-500 flex justify-between">
                <span>使用量: {app.usage.tokens.toLocaleString()} tokens</span>
                <span>对话: {app.usage.conversations}</span>
                <span>用户: {app.usage.users}</span>
              </div>
            </div>
            <div className="border-t border-gray-200 px-5 py-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  最近使用: {new Date(app.lastUsed).toLocaleDateString('zh-CN')}
                </span>
                <a
                  href={`/ai-department/${app.id}`}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  立即使用
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIApplicationsPreview;
