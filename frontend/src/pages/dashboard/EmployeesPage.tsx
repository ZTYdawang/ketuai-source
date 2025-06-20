import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';

const EmployeesPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // 实际项目中应该调用后端API
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }
        
        // 模拟API调用
        // const response = await axios.get('/api/employees', {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // });
        
        // 设置员工数据
        // setEmployees(response.data);
        
        // 使用模拟数据
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (err: any) {
        setError('获取员工数据失败');
        // 如果是401错误，重定向到登录页
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
        setLoading(false);
      }
    };
    
    fetchEmployees();
  }, [navigate]);

  // 模拟数据，实际项目中应该从API获取
  const mockEmployees = [
    {
      id: 1,
      name: '张三',
      position: 'AI产品经理',
      department: '产品部',
      email: 'zhangsan@example.com',
      phone: '13800138001',
      status: 'active',
      avatar: '/avatars/avatar1.jpg',
      aiApps: [
        { id: 1, name: '智能客服助手' },
        { id: 3, name: '文档摘要工具' }
      ],
      joinDate: '2023-01-15T00:00:00Z'
    },
    {
      id: 2,
      name: '李四',
      position: '销售总监',
      department: '销售部',
      email: 'lisi@example.com',
      phone: '13800138002',
      status: 'active',
      avatar: '/avatars/avatar2.jpg',
      aiApps: [
        { id: 2, name: '销售数据分析师' }
      ],
      joinDate: '2023-02-20T00:00:00Z'
    },
    {
      id: 3,
      name: '王五',
      position: '市场专员',
      department: '市场部',
      email: 'wangwu@example.com',
      phone: '13800138003',
      status: 'active',
      avatar: '/avatars/avatar3.jpg',
      aiApps: [
        { id: 4, name: '市场调研助手' }
      ],
      joinDate: '2023-03-10T00:00:00Z'
    },
    {
      id: 4,
      name: '赵六',
      position: '行政主管',
      department: '行政部',
      email: 'zhaoliu@example.com',
      phone: '13800138004',
      status: 'active',
      avatar: '/avatars/avatar4.jpg',
      aiApps: [
        { id: 5, name: '会议纪要生成器' }
      ],
      joinDate: '2023-04-05T00:00:00Z'
    },
    {
      id: 5,
      name: '钱七',
      position: '产品设计师',
      department: '产品部',
      email: 'qianqi@example.com',
      phone: '13800138005',
      status: 'inactive',
      avatar: '/avatars/avatar5.jpg',
      aiApps: [
        { id: 6, name: '产品创意生成器' }
      ],
      joinDate: '2023-05-01T00:00:00Z'
    }
  ];

  // 模拟部门数据
  const mockDepartments = [
    { id: 1, name: '全部部门', count: mockEmployees.length },
    { id: 2, name: '产品部', count: mockEmployees.filter(emp => emp.department === '产品部').length },
    { id: 3, name: '销售部', count: mockEmployees.filter(emp => emp.department === '销售部').length },
    { id: 4, name: '市场部', count: mockEmployees.filter(emp => emp.department === '市场部').length },
    { id: 5, name: '行政部', count: mockEmployees.filter(emp => emp.department === '行政部').length }
  ];

  const [selectedDepartment, setSelectedDepartment] = useState('全部部门');
  const [searchTerm, setSearchTerm] = useState('');

  const handleDepartmentChange = (deptName: string) => {
    setSelectedDepartment(deptName);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 根据部门和搜索词筛选员工
  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesDepartment = selectedDepartment === '全部部门' || employee.department === selectedDepartment;
    const matchesSearch = searchTerm === '' || 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDepartment && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">员工管理</h1>
            <p className="mt-1 text-sm text-gray-500">
              管理您的员工和AI应用权限
            </p>
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
          
          {/* 筛选和搜索 */}
          <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-6">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-medium leading-6 text-gray-900">员工列表</h2>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => navigate('/employees/add')}
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  添加员工
                </button>
              </div>
            </div>
            
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
                {mockDepartments.map((dept) => (
                  <button
                    key={dept.id}
                    type="button"
                    className={`inline-flex items-center px-3 py-1.5 border text-xs font-medium rounded-full ${
                      selectedDepartment === dept.name
                        ? 'border-transparent bg-blue-100 text-blue-800'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    onClick={() => handleDepartmentChange(dept.name)}
                  >
                    {dept.name} ({dept.count})
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="搜索员工"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          
          {/* 员工列表 */}
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          员工
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          部门/职位
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          联系方式
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          AI应用权限
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          状态
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">操作</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredEmployees.map((employee) => (
                        <tr key={employee.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-medium">
                                  {employee.name.charAt(0)}
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {employee.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  加入于 {new Date(employee.joinDate).toLocaleDateString('zh-CN')}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{employee.department}</div>
                            <div className="text-sm text-gray-500">{employee.position}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{employee.email}</div>
                            <div className="text-sm text-gray-500">{employee.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {employee.aiApps.map((app) => (
                                <span key={app.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {app.name}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {employee.status === 'active' ? '在职' : '离职'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href={`/employees/${employee.id}`} className="text-blue-600 hover:text-blue-900 mr-4">查看</a>
                            <a href={`/employees/${employee.id}/edit`} className="text-blue-600 hover:text-blue-900">编辑</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          {/* 分页 */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4">
            <div className="flex-1 flex justify-between sm:hidden">
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                上一页
              </a>
              <a
                href="#"
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                下一页
              </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  显示第 <span className="font-medium">1</span> 至 <span className="font-medium">{filteredEmployees.length}</span> 条，共 <span className="font-medium">{filteredEmployees.length}</span> 条结果
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">上一页</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">下一页</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeesPage;
