import { Helmet } from 'react-helmet-async';
import { Link, Navigate, NavLink, Outlet, Route, Routes } from 'react-router-dom';
import { site } from '../../config/site.js';
import Logo from '../../components/Logo.jsx';
import { AuthProvider, ProtectedRoute, useAuth } from './auth.jsx';
import LoginPage from './LoginPage.jsx';
import EnquiriesPage from './EnquiriesPage.jsx';
import SettingsPage from './SettingsPage.jsx';

/** Admin area, code-split from the public site and kept out of search results. */
export default function AdminApp() {
  return (
    <AuthProvider>
      <Helmet>
        <title>Admin | {site.name}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EnquiriesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AuthProvider>
  );
}

function AdminLayout() {
  const { user, signOut } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-4">
            <Link to="/admin" aria-label="Admin home">
              <Logo className="h-12 w-auto" />
            </Link>
            <span className="rounded-full bg-brand-blue px-3 py-1 text-sm font-bold text-white">Admin</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="hidden sm:inline">{user?.email}</span>
            <Link to="/" className="font-bold text-brand-blue underline">
              View website
            </Link>
            <button type="button" onClick={signOut} className="btn btn-primary min-h-9 px-4 py-1.5 text-sm">
              Sign out
            </button>
          </div>
        </div>
        <nav aria-label="Admin" className="container-page">
          <ul className="flex gap-1">
            {[
              ['/admin', 'Enquiries'],
              ['/admin/settings', 'Settings'],
            ].map(([to, label]) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    `-mb-px inline-block border-b-3 px-4 py-2.5 font-bold ${
                      isActive ? 'border-brand-blue text-brand-blue' : 'border-transparent text-gray-700 hover:text-brand-blue'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="container-page py-8">
        <Outlet />
      </main>
    </div>
  );
}
