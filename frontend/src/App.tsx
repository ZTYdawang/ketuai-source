import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import './page-transition.css';
import FeishuLayout from './layouts/FeishuLayout';
import MainSiteLayout from './layouts/MainSiteLayout';
import ScrollToTop from './components/ScrollToTop';

// 页面组件导入（后续实现）
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CasesPage from './pages/CasesPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import AIDepartmentPage from './pages/dashboard/AIDepartmentPage';
import EmployeesPage from './pages/dashboard/EmployeesPage';
import RequirementsPage from './pages/dashboard/RequirementsPage';
import ConsultationPage from './pages/consultation/ConsultationPage';
import NewConsultationPage from './pages/consultation/NewConsultationPage';
import AdminPage from './pages/admin/AdminPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminAgentsPage from './pages/admin/AdminAgentsPage';
import AdminStatisticsPage from './pages/admin/AdminStatisticsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import TokenManagementPage from './pages/admin/TokenManagementPage';
import AIAgentStatsPage from './pages/admin/AIAgentStatsPage';
import AdminRequirementsPage from './pages/admin/AdminRequirementsPage';
import AdminCompaniesPage from './pages/admin/AdminCompaniesPage';
import HRBotChatPage from './pages/HRBotChatPage';
import DocSummaryPage from './pages/DocSummaryPage';
import MeetingPage from './pages/MeetingPage';
import LayoutDemo from './pages/LayoutDemo';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

// 创建 QueryClient 实例
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {/* 页面跳转时自动回到顶部 */}
        <ScrollToTop />
        <Routes>
          {/* 主站页面（无侧边栏） */}
          <Route element={<MainSiteLayout><Outlet /></MainSiteLayout>}>
            <Route path="/" element={<FadePage><HomePage /></FadePage>} />
            <Route path="/about" element={<FadePage><AboutPage /></FadePage>} />
            <Route path="/cases" element={<FadePage><CasesPage /></FadePage>} />
            <Route path="/pricing" element={<FadePage><PricingPage /></FadePage>} />
            <Route path="/contact" element={<FadePage><ContactPage /></FadePage>} />
            <Route path="/terms" element={<FadePage><TermsPage /></FadePage>} />
            <Route path="/privacy" element={<FadePage><PrivacyPage /></FadePage>} />
            <Route path="/auth/login" element={<FadePage><LoginPage /></FadePage>} />
            <Route path="/auth/register" element={<FadePage><RegisterPage /></FadePage>} />
          </Route>
          {/* 后台/智能体页面（飞书风格） */}
          <Route element={<FeishuLayout><Outlet /></FeishuLayout>}>
            <Route path="/dashboard" element={<FadePage><DashboardPage /></FadePage>} />
            <Route path="/dashboard/ai-department" element={<FadePage><AIDepartmentPage /></FadePage>} />
            <Route path="/dashboard/employees" element={<FadePage><EmployeesPage /></FadePage>} />
            <Route path="/dashboard/requirements" element={<FadePage><RequirementsPage /></FadePage>} />
            <Route path="/consultation" element={<FadePage><ConsultationPage /></FadePage>} />
            <Route path="/consultation/new" element={<FadePage><NewConsultationPage /></FadePage>} />
            <Route path="/admin" element={<FadePage><AdminPage /></FadePage>} />
            <Route path="/admin/users" element={<FadePage><AdminUsersPage /></FadePage>} />
            <Route path="/admin/agents" element={<FadePage><AdminAgentsPage /></FadePage>} />
            <Route path="/admin/statistics" element={<FadePage><AdminStatisticsPage /></FadePage>} />
            <Route path="/admin/settings" element={<FadePage><AdminSettingsPage /></FadePage>} />
            <Route path="/admin/tokens" element={<FadePage><TokenManagementPage /></FadePage>} />
            <Route path="/admin/stats" element={<FadePage><AIAgentStatsPage /></FadePage>} />
            <Route path="/admin/requirements" element={<FadePage><AdminRequirementsPage /></FadePage>} />
            <Route path="/admin/companies" element={<FadePage><AdminCompaniesPage /></FadePage>} />
            <Route path="/ai-assistant/hr" element={<FadePage><HRBotChatPage /></FadePage>} />
            <Route path="/ai-assistant/doc-summary" element={<FadePage><DocSummaryPage /></FadePage>} />
            <Route path="/ai-assistant/meeting" element={<FadePage><MeetingPage /></FadePage>} />
            <Route path="/layout-demo" element={<FadePage><LayoutDemo /></FadePage>} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

function FadePage({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default App;
