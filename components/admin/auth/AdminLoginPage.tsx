import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'

interface AdminLoginPageProps { onLogin: () => void }

export function AdminLoginPage({ onLogin }: AdminLoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('admin_token', 'dummy_token')
    onLogin()
    navigate('/admin')
  }

  return (
    <div className="min-h-screen grid place-items-center bg-background text-foreground p-6">
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 border rounded-lg p-6">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <div className="grid gap-2">
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="password">Password</label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <Button type="submit" className="w-full" disabled={!email || !password}>Login</Button>
      </form>
    </div>
  )
}

