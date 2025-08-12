import { Button } from "../ui/button";

export interface LoginFormProps {
  onLogin: (userType: 'business' | 'personal', credentials: any) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Hyr</h2>
      <div className="flex gap-2">
        <Button onClick={() => onLogin('personal', { email: 'user@example.com' })}>Hyr si Klient</Button>
        <Button onClick={() => onLogin('business', { email: 'biz@example.com', businessName: 'Dyqani' })}>Hyr si Dyqan</Button>
      </div>
    </div>
  );
}
