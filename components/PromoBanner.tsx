import { Button } from "./ui/button";
import { Store, Users, Globe, TrendingUp } from "lucide-react";

type AppView = 'home' | 'login' | 'register' | 'business-dashboard' | 'customer-marketplace';

interface PromoBannerProps {
  onNavigate?: (view: AppView) => void;
}

export function PromoBanner({ onNavigate }: PromoBannerProps) {
  return (
    <div className="py-16 px-6 bg-gradient-to-r from-blue-600 via-slate-700 to-gray-800 dark:from-slate-800 dark:via-slate-900 dark:to-black relative overflow-hidden">
      {/* Decorative icons */}
      <div className="absolute inset-0 opacity-10">
        <Store className="absolute top-8 left-12 w-8 h-8 animate-pulse" />
        <Users className="absolute top-1/3 right-16 w-6 h-6 animate-bounce" />
        <Globe className="absolute bottom-12 left-1/4 w-7 h-7 animate-pulse" />
        <TrendingUp className="absolute bottom-8 right-8 w-9 h-9 animate-bounce" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-white text-sm mb-4 backdrop-blur-sm">PËR DYQANET E BUKURISË</span>
          <h2 className="text-4xl md:text-6xl text-white mb-4">Rrit Biznesin Tënd</h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">Bashkohu me mijëra dyqane që arrijnë klientë në gjithë Kosovën. Pa tarifa vendosjeje, komision transparent.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button type="button" onClick={() => onNavigate?.('register')}>
            <Button size="lg" variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-full">Fillo Shitjen Sot</Button>
          </button>
          <button type="button" onClick={() => onNavigate?.('customer-marketplace')}>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-full backdrop-blur-sm">Mëso Më Shumë</Button>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
          <div className="text-center">
            <div className="text-2xl md:text-3xl mb-2">0%</div>
            <div className="text-sm text-blue-100">Tarifa Vendosjeje</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl mb-2">24/7</div>
            <div className="text-sm text-blue-100">Mbështetje për Shitësit</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl mb-2">Mbarë</div>
            <div className="text-sm text-blue-100">Arritje në Treg</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl mb-2">Shpejt</div>
            <div className="text-sm text-blue-100">Pagesa</div>
          </div>
        </div>
      </div>
    </div>
  );
}