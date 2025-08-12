import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

type UserType = 'personal' | 'business';
type Mode = 'login' | 'register';

export interface AuthPageProps {
  initialMode?: Mode;
  initialUserType?: UserType;
  onLogin: (userType: UserType, credentials: any) => void;
  onRegister: (userType: UserType, data: any) => void;
}

export function AuthPage({ initialMode = 'login', initialUserType = 'personal', onLogin, onRegister }: AuthPageProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [userType, setUserType] = useState<UserType>(initialUserType);

  // Parse URL hash to preselect type/mode e.g. #login=business or #mode=register&type=personal
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const pairs = new URLSearchParams(hash);
    const loginType = pairs.get('login');
    const type = (pairs.get('type') as UserType | null) ?? null;
    const modeParam = (pairs.get('mode') as Mode | null) ?? (loginType ? 'login' : null);
    if (loginType === 'business' || type === 'business') setUserType('business');
    if (loginType === 'personal' || type === 'personal') setUserType('personal');
    if (modeParam === 'login' || modeParam === 'register') setMode(modeParam);
  }, []);

  // Client fields
  const [clientLogin, setClientLogin] = useState({ email: "", phone: "", password: "" });
  const [clientRegister, setClientRegister] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", city: "Prishtinë" });

  // Business fields
  const [bizLogin, setBizLogin] = useState({ email: "", password: "" });
  const [bizRegister, setBizRegister] = useState({ businessName: "", businessNumber: "", contactNumber: "", email: "", instagram: "", password: "", city: "Prishtinë" });

  const loginDisabled = useMemo(() => {
    if (userType === 'personal') {
      const hasContact = !!clientLogin.email || !!clientLogin.phone;
      return !hasContact || !clientLogin.password;
    }
    return !bizLogin.email || !bizLogin.password;
  }, [userType, clientLogin, bizLogin]);

  const registerDisabled = useMemo(() => {
    if (userType === 'personal') {
      const d = clientRegister;
      const hasContact = !!d.email || !!d.phone;
      return !hasContact || !d.password; // names & city optional per request
    }
    const d = bizRegister;
    const hasContact = !!d.email || !!d.instagram;
    return !d.businessName || !d.businessNumber || !d.contactNumber || !hasContact || !d.password || !d.city;
  }, [userType, clientRegister, bizRegister]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      if (userType === 'personal') onLogin('personal', { ...clientLogin });
      else onLogin('business', { ...bizLogin });
    } else {
      if (userType === 'personal') onRegister('personal', { ...clientRegister });
      else onRegister('business', { ...bizRegister });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)} className="mb-6">
        <TabsList>
          <TabsTrigger value="login">Hyr</TabsTrigger>
          <TabsTrigger value="register">Regjistrohu</TabsTrigger>
        </TabsList>
        <TabsContent value="login" />
        <TabsContent value="register" />
      </Tabs>

      <Tabs value={userType} onValueChange={(v) => setUserType(v as UserType)}>
        <TabsList>
          <TabsTrigger value="personal">Klient</TabsTrigger>
          <TabsTrigger value="business">Dyqan</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'login' && userType === 'personal' && (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="client-email">Email (opsionale)</Label>
                  <Input id="client-email" type="email" placeholder="klient@shembull.com" value={clientLogin.email} onChange={(e) => setClientLogin({ ...clientLogin, email: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-phone">Numri i telefonit (opsionale)</Label>
                  <Input id="client-phone" type="tel" placeholder="+383 44 000 000" value={clientLogin.phone} onChange={(e) => setClientLogin({ ...clientLogin, phone: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-password">Fjalëkalimi</Label>
                  <Input id="client-password" type="password" placeholder="••••••••" value={clientLogin.password} onChange={(e) => setClientLogin({ ...clientLogin, password: e.target.value })} />
                </div>
              </div>
            )}

            {mode === 'login' && userType === 'business' && (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="biz-email">Email i dyqanit</Label>
                  <Input id="biz-email" type="email" placeholder="dyqan@shembull.com" value={bizLogin.email} onChange={(e) => setBizLogin({ ...bizLogin, email: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="biz-password">Fjalëkalimi</Label>
                  <Input id="biz-password" type="password" placeholder="••••••••" value={bizLogin.password} onChange={(e) => setBizLogin({ ...bizLogin, password: e.target.value })} />
                </div>
              </div>
            )}

            {mode === 'register' && userType === 'personal' && (
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="client-first">Emri</Label>
                    <Input id="client-first" placeholder="Arta" value={clientRegister.firstName} onChange={(e) => setClientRegister({ ...clientRegister, firstName: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="client-last">Mbiemri</Label>
                    <Input id="client-last" placeholder="Krasniqi" value={clientRegister.lastName} onChange={(e) => setClientRegister({ ...clientRegister, lastName: e.target.value })} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-email-reg">Email (ose numri i telefonit)</Label>
                  <Input id="client-email-reg" type="email" placeholder="klient@shembull.com" value={clientRegister.email} onChange={(e) => setClientRegister({ ...clientRegister, email: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-phone-reg">Numri i telefonit</Label>
                  <Input id="client-phone-reg" type="tel" placeholder="+383 44 000 000" value={clientRegister.phone} onChange={(e) => setClientRegister({ ...clientRegister, phone: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-password-reg">Fjalëkalimi</Label>
                  <Input id="client-password-reg" type="password" placeholder="••••••••" value={clientRegister.password} onChange={(e) => setClientRegister({ ...clientRegister, password: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-city">Qyteti</Label>
                  <Input id="client-city" placeholder="Prishtinë" value={clientRegister.city} onChange={(e) => setClientRegister({ ...clientRegister, city: e.target.value })} />
                </div>
              </div>
            )}

            {mode === 'register' && userType === 'business' && (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="biz-name">Emri i Dyqanit</Label>
                  <Input id="biz-name" placeholder="Zbukurohu Shop" value={bizRegister.businessName} onChange={(e) => setBizRegister({ ...bizRegister, businessName: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="biz-number">Numri i Biznesit</Label>
                  <Input id="biz-number" placeholder="123456789" value={bizRegister.businessNumber} onChange={(e) => setBizRegister({ ...bizRegister, businessNumber: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="biz-contact">Numri i Kontaktit</Label>
                  <Input id="biz-contact" type="tel" placeholder="+383 44 000 000" value={bizRegister.contactNumber} onChange={(e) => setBizRegister({ ...bizRegister, contactNumber: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="biz-email-reg">Email (ose Instagram)</Label>
                  <Input id="biz-email-reg" type="email" placeholder="dyqan@shembull.com" value={bizRegister.email} onChange={(e) => setBizRegister({ ...bizRegister, email: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="biz-instagram">Instagram</Label>
                  <Input id="biz-instagram" placeholder="@emri_dyqanit" value={bizRegister.instagram} onChange={(e) => setBizRegister({ ...bizRegister, instagram: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="biz-password-reg">Fjalëkalimi</Label>
                  <Input id="biz-password-reg" type="password" placeholder="••••••••" value={bizRegister.password} onChange={(e) => setBizRegister({ ...bizRegister, password: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="biz-city">Qyteti</Label>
                  <Input id="biz-city" placeholder="Prishtinë" value={bizRegister.city} onChange={(e) => setBizRegister({ ...bizRegister, city: e.target.value })} />
                </div>
              </div>
            )}

            <div className="pt-2">
              {mode === 'login' ? (
                <Button type="submit" disabled={loginDisabled} className="w-full">Hyr</Button>
              ) : (
                <Button type="submit" disabled={registerDisabled} className="w-full">Regjistrohu</Button>
              )}
            </div>
          </form>
        </div>
      </Tabs>
    </div>
  );
}

