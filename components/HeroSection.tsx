import { Button } from "./ui/button";

type AppView = 'home' | 'login' | 'register' | 'business-dashboard' | 'customer-marketplace';

interface HeroSectionProps {
  onNavigate?: (view: AppView) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-slate-50 to-gray-50 py-20 px-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 blur-xl"></div>
        <div className="absolute top-1/2 right-10 w-24 h-24 rounded-full bg-gradient-to-r from-slate-300 to-blue-300 blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 rounded-full bg-gradient-to-r from-gray-300 to-slate-300 blur-xl"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl mb-6 bg-gradient-to-r from-blue-600 via-slate-700 to-gray-800 bg-clip-text text-transparent">
          Zbukurohu
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Tregu më i madh i bukurisë në Kosovë që lidh pasionantët e kozmetikës me dyqanet e besuara
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button type="button" onClick={() => onNavigate?.('login')}>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full">
              Hyr si Klient
            </Button>
          </button>
          <button type="button" onClick={() => onNavigate?.('login')}>
            <Button variant="outline" size="lg" className="border-blue-300 text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-full">
              Hyr si Dyqan
            </Button>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl text-blue-600 mb-2">500+</div>
            <div className="text-sm text-gray-600">Dyqane të verifikuara</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl text-blue-600 mb-2">15K+</div>
            <div className="text-sm text-gray-600">Produkte bukurie</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl text-blue-600 mb-2">50K+</div>
            <div className="text-sm text-gray-600">Klientë të kënaqur</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl text-blue-600 mb-2">🇽🇰</div>
            <div className="text-sm text-gray-600">Kosovë</div>
          </div>
        </div>
      </div>
    </div>
  );
}