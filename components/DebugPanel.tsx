import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type AppView = 'home' | 'login' | 'register' | 'business-dashboard' | 'customer-marketplace';

interface DebugPanelProps {
  currentView: AppView | string;
  currentUser: any;
  onNavigate: (view: AppView | string) => void;
}

export function DebugPanel({ currentView, currentUser, onNavigate }: DebugPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => setIsOpen(true)} variant="outline" size="sm" className="bg-white shadow-lg">🐛 Debug</Button>
      </div>
    );
  }
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 shadow-lg">
        <CardHeader><CardTitle className="text-sm">Debug Panel</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium">Current View: {String(currentView)}</p>
            <p className="text-sm text-gray-600">User: {currentUser ? currentUser.name : 'None'}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {['home','login','register','customer-marketplace','business-dashboard'].map(v => (
              <Button key={v} size="sm" variant="outline" onClick={() => onNavigate(v)}>{v}</Button>
            ))}
          </div>
          <Button onClick={() => setIsOpen(false)} size="sm" variant="outline">Close</Button>
        </CardContent>
      </Card>
    </div>
  );
}
