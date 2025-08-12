import { NavLink, Outlet } from 'react-router-dom'
import { Button } from '../../ui/button'
import { Moon, Sun, Bell, BarChart3, LayoutDashboard, ShoppingBag, Users, LineChart, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'

function useDarkMode() {
  const [enabled, setEnabled] = useState<boolean>(() => localStorage.getItem('theme') === 'dark')
  useEffect(() => {
    const root = document.documentElement
    if (enabled) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [enabled])
  return { enabled, toggle: () => setEnabled((v) => !v) }
}

interface AdminLayoutProps { onLogout: () => void }

export function AdminLayout({ onLogout }: AdminLayoutProps) {
  const { enabled, toggle } = useDarkMode()

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="w-64 shrink-0 border-r hidden md:flex md:flex-col">
        <div className="h-16 flex items-center px-4 text-xl font-semibold">Paneli</div>
        <nav className="flex-1 px-2 space-y-1">
          <NavLink className={({isActive}) => `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent ${isActive ? 'bg-accent' : ''}`} to="/admin">
            <LayoutDashboard className="w-4 h-4"/> Dashboard
          </NavLink>
          <NavLink className={({isActive}) => `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent ${isActive ? 'bg-accent' : ''}`} to="/admin/sales">
            <BarChart3 className="w-4 h-4"/> Sales
          </NavLink>
          <NavLink className={({isActive}) => `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent ${isActive ? 'bg-accent' : ''}`} to="/admin/products">
            <ShoppingBag className="w-4 h-4"/> Products
          </NavLink>
          <NavLink className={({isActive}) => `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent ${isActive ? 'bg-accent' : ''}`} to="/admin/customers">
            <Users className="w-4 h-4"/> Customers
          </NavLink>
          <NavLink className={({isActive}) => `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent ${isActive ? 'bg-accent' : ''}`} to="/admin/reports">
            <LineChart className="w-4 h-4"/> Reports
          </NavLink>
          <NavLink className={({isActive}) => `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent ${isActive ? 'bg-accent' : ''}`} to="/admin/settings">
            <Settings className="w-4 h-4"/> Settings
          </NavLink>
        </nav>
        <div className="p-3">
          <Button variant="outline" className="w-full" onClick={onLogout}>Logout</Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b flex items-center justify-between px-4 gap-2">
          <div className="flex items-center gap-2 md:hidden">
            <span className="text-lg font-semibold">Paneli</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" onClick={toggle}>{enabled ? <Sun/> : <Moon/>}</Button>
            <Button variant="ghost"><Bell/></Button>
            <div className="w-9 h-9 rounded-full bg-muted"/>
          </div>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

