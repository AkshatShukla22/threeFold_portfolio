import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Toast from './components/Toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManageHero from './pages/ManageHero';
import ManageServices from './pages/ManageServices';
import ManageProjects from './pages/ManageProjects';
import ManageTestimonials from './pages/ManageTestimonials';
import ManageFAQs from './pages/ManageFAQs';
import ManageTeam from './pages/ManageTeam';
import ManageContacts from './pages/ManageContacts';
import WebSettings from './pages/WebSettings';

const AdminLayout = ({ children }) => (
  <div className="admin-layout">
    <Sidebar />
    <div className="admin-main">
      <Topbar />
      <div className="admin-page fade-in">{children}</div>
    </div>
  </div>
);

function App() {
  const { toasts } = useSelector((s) => s.toast);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/"                element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/hero"            element={<AdminLayout><ManageHero /></AdminLayout>} />
          <Route path="/services"        element={<AdminLayout><ManageServices /></AdminLayout>} />
          <Route path="/projects"        element={<AdminLayout><ManageProjects /></AdminLayout>} />
          <Route path="/testimonials"    element={<AdminLayout><ManageTestimonials /></AdminLayout>} />
          <Route path="/faqs"            element={<AdminLayout><ManageFAQs /></AdminLayout>} />
          <Route path="/team"            element={<AdminLayout><ManageTeam /></AdminLayout>} />
          <Route path="/contacts"        element={<AdminLayout><ManageContacts /></AdminLayout>} />
          <Route path="/settings"        element={<AdminLayout><WebSettings /></AdminLayout>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toast toasts={toasts} />
    </BrowserRouter>
  );
}

export default App;
