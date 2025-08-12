import { useState } from 'react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'

export function SettingsPage() {
  const [name, setName] = useState('Zbukurohu Shop')
  const [email, setEmail] = useState('shop@example.com')
  // const [password, setPassword] = useState('')

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4 space-y-3">
        <div className="font-medium">Profile Settings</div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Emri</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <Button className="mt-2">Ruaj</Button>
      </div>

      <div className="rounded-lg border p-4 space-y-3">
        <div className="font-medium">Change Password</div>
        <div className="grid md:grid-cols-3 gap-4">
          <Input type="password" placeholder="Password i vjetër" />
          <Input type="password" placeholder="Password i ri" />
          <Input type="password" placeholder="Përsërit passwordin" />
        </div>
        <Button className="mt-2" variant="outline">Ndrysho Passwordin</Button>
      </div>
    </div>
  )
}

