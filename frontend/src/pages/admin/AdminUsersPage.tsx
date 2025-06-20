import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../components/ui/select';

// 定义User类型
interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  company: string;
  role: 'company_admin' | 'company_user';
  status: 'active' | 'inactive';
  created_at: string;
  last_login: string;
}

const AdminUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // 用户编辑状态
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    // 检查管理员是否已登录
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/auth/login');
      return;
    }
    
    // 获取用户列表
    const fetchUsers = async () => {
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 模拟用户数据
        const companyList = [
          '杭州云智信息技术有限公司',
          '深圳数联智能科技有限公司',
          '北京慧算数据有限公司',
          '上海云帆网络科技有限公司',
          '成都智链科技有限公司',
          '南京数云信息有限公司',
          '广州云脉智能有限公司',
          '苏州慧联数据科技有限公司',
          '武汉云启信息技术有限公司',
          '西安智谷科技有限公司',
        ];
        const mockUsers = [
          {
            id: 1,
            username: 'zhang_san',
            name: '张三',
            email: 'zhangsan@example.com',
            company: companyList[0],
            role: 'company_admin',
            status: 'active',
            created_at: '2025-04-15',
            last_login: '2025-05-27'
          },
          {
            id: 2,
            username: 'li_si',
            name: '李四',
            email: 'lisi@example.com',
            company: companyList[1],
            role: 'company_user',
            status: 'active',
            created_at: '2025-04-18',
            last_login: '2025-05-26'
          },
          {
            id: 3,
            username: 'wang_wu',
            name: '王五',
            email: 'wangwu@example.com',
            company: companyList[2],
            role: 'company_admin',
            status: 'active',
            created_at: '2025-04-20',
            last_login: '2025-05-25'
          },
          {
            id: 4,
            username: 'zhao_liu',
            name: '赵六',
            email: 'zhaoliu@example.com',
            company: companyList[3],
            role: 'company_user',
            status: 'inactive',
            created_at: '2025-04-22',
            last_login: '2025-05-20'
          },
          {
            id: 5,
            username: 'qian_qi',
            name: '钱七',
            email: 'qianqi@example.com',
            company: companyList[4],
            role: 'company_admin',
            status: 'active',
            created_at: '2025-04-25',
            last_login: '2025-05-27'
          }
        ] as User[];
        
        setUsers(mockUsers);
        setLoading(false);
      } catch {
        setError('获取用户列表失败');
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [navigate]);

  // 过滤用户列表
  const filteredUsers = users.filter(user => {
    // 搜索条件
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 角色过滤
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    // 状态过滤
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEditUser = (user: User) => {
    setEditingUser({...user});
    setIsEditing(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditingUser((prev: User | null) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleSaveUser = async () => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 更新用户列表
      setUsers(prev => 
        prev.map(user => 
          user.id === editingUser?.id ? editingUser : user
        )
      );
      
      setIsEditing(false);
      setEditingUser(null);
    } catch {
      setError('保存用户信息失败');
    }
  };

  const handleToggleStatus = async (userId: number, currentStatus: string) => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 更新用户状态
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      
      setUsers(prev => 
        prev.map(user => 
          user.id === userId ? {...user, status: newStatus} : user
        )
      );
    } catch {
      setError('更新用户状态失败');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full py-24">
            <svg className="animate-spin h-12 w-12 text-blue-500" viewBox="0 0 50 50">
              <circle className="opacity-25" cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="5" />
              <path className="opacity-75" fill="currentColor" d="M25 5a20 20 0 0 1 20 20h-5a15 15 0 1 0-15 15v5A20 20 0 0 1 25 5z" />
            </svg>
      </div>
    );
  }

  return (
    <>
      <main className="flex-1 p-6 w-full">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
              <p className="mt-1 text-sm text-gray-500">
                管理平台上的所有用户账号
              </p>
            </div>
            
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              添加用户
            </button>
          </div>
          
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:space-x-4 gap-2 sm:gap-0 items-stretch w-full max-w-xl">
                <div className="flex-1 min-w-[120px]">
                  <label htmlFor="role-filter" className="sr-only">角色筛选</label>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-full h-10 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400">
                      <SelectValue placeholder="所有角色" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有角色</SelectItem>
                      <SelectItem value="company_admin">企业管理员</SelectItem>
                      <SelectItem value="company_user">企业用户</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 min-w-[120px]">
                  <label htmlFor="status-filter" className="sr-only">状态筛选</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full h-10 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400">
                      <SelectValue placeholder="所有状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有状态</SelectItem>
                      <SelectItem value="active">活跃</SelectItem>
                      <SelectItem value="inactive">停用</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label htmlFor="search" className="sr-only">搜索用户</label>
                  <div className="relative rounded-md shadow-sm h-10">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full h-10 pl-10 sm:text-sm border border-gray-300 rounded-md"
                      placeholder="搜索用户名、姓名、邮箱或公司"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {isEditing && editingUser && (
              <div className="px-4 py-5 sm:p-6 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  编辑用户信息
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      姓名
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={editingUser.name}
                        onChange={handleEditChange}
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      邮箱
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={editingUser.email}
                        onChange={handleEditChange}
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      公司
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={editingUser.company}
                        onChange={handleEditChange}
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      角色
                    </label>
                    <div className="mt-1">
                      <select
                        id="role"
                        name="role"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={editingUser.role}
                        onChange={handleEditChange}
                      >
                        <option value="company_admin">企业管理员</option>
                        <option value="company_user">企业用户</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleSaveUser}
                  >
                    保存
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingUser(null);
                    }}
                  >
                    取消
                  </button>
                </div>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      用户信息
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      公司
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      角色
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      注册日期
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      最后登录
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">操作</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 font-medium">{user.name.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            <div className="text-sm text-gray-500">@{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.company}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'company_admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role === 'company_admin' ? '企业管理员' : '企业用户'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status === 'active' ? '活跃' : '停用'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.created_at}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.last_login}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          编辑
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user.id, user.status)}
                          className={`${
                            user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {user.status === 'active' ? '停用' : '启用'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
    </>
  );
};

export default AdminUsersPage;
