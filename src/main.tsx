import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '../styles/globals.css'
import { AppRouter } from '../components/AppRouter'
const AdminRouterLazy = lazy(() => import('../components/admin/AdminRouter').then(m => ({ default: m.AdminRouter })))

const router = createBrowserRouter([
  { path: '/', element: <AppRouter /> },
  { path: '/admin/*', element: (
      <Suspense fallback={null}>
        <AdminRouterLazy />
      </Suspense>
    )
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
