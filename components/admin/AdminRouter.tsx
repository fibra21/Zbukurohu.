import { useEffect, useMemo, useState } from 'react'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { AdminLayout } from './layout/AdminLayout'
import { DashboardPage } from './pages/DashboardPage'
import { SalesPage } from './pages/SalesPage'
import { ProductsPage } from './pages/ProductsPage'
import { CustomersPage } from './pages/CustomersPage'
import { ReportsPage } from './pages/ReportsPage'
import { SettingsPage } from './pages/SettingsPage'
import { AdminLoginPage } from './auth/AdminLoginPage'

function useAuthToken() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('admin_token'))
  const save = (t: string | null) => {
    if (t) localStorage.setItem('admin_token', t)
    else localStorage.removeItem('admin_token')
    setToken(t)
  }
  return { token, save }
}

function ProtectedRoute() {
  const { token } = useAuthToken()
  if (!localStorage.getItem('admin_token')) {
    return <Navigate to="/admin/login" replace />
  }
  return <Outlet />
}

export function AdminRouter() {
  const auth = useAuthToken()
  return (
    <Routes>
      <Route path="login" element={<AdminLoginPage onLogin={() => auth.save('dummy_token')} />} />
      <Route element={<ProtectedRoute />}> 
        <Route element={<AdminLayout onLogout={() => auth.save(null)} /> }>
          <Route index element={<DashboardPage />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

