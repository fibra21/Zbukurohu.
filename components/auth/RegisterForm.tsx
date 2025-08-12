import { Button } from "../ui/button";

export interface RegisterFormProps {
  onRegister: (userType: 'business' | 'personal', data: any) => void;
}

export function RegisterForm({ onRegister }: RegisterFormProps) {
  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Regjistrohu</h2>
      <div className="flex gap-2">
        <Button onClick={() => onRegister('personal', { email: 'user@example.com' })}>Klient</Button>
        <Button onClick={() => onRegister('business', { email: 'biz@example.com', businessName: 'Dyqani' })}>Dyqan</Button>
      </div>
    </div>
  );
}
