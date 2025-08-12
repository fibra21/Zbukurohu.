import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import type { AppView } from "./types";
import { useTheme } from "./theme/ThemeProvider";
import { Moon, Sun } from "lucide-react";

interface NavigationProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onLogout?: () => void;
}

export function Navigation({ currentView, onNavigate, onLogout }: NavigationProps) {
  const { theme, toggle } = useTheme();
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Zbukurohu
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Input placeholder="Kërko produkte..." className="w-72" />
            </div>
            <Badge variant="secondary">🇽🇰 Kosovo</Badge>
            <Button variant="ghost" aria-label="Toggle theme" onClick={toggle}>
              {theme === 'dark' ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
            </Button>
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  window.location.hash = 'login=personal';
                  onNavigate('login');
                }}
              >
                Hyr si Klient
              </Button>
              <Button
                onClick={() => {
                  window.location.hash = 'login=business';
                  onNavigate('login');
                }}
              >
                Hyr si Dyqan
              </Button>
            </div>
            <div className="md:hidden">
              <Button
                variant="outline"
                onClick={() => {
                  window.location.hash = 'login=personal';
                  onNavigate('login');
                }}
              >
                Hyr
              </Button>
            </div>
            {onLogout && currentView !== 'home' && (
              <Button variant="outline" onClick={onLogout}>Dil</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
