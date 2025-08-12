import { useState } from "react";
import { LoginForm } from "./auth/LoginForm";
import { RegisterForm } from "./auth/RegisterForm";
import { AuthPage } from "./auth/AuthPage";
import { BusinessDashboard } from "./dashboard/BusinessDashboard";
import { CustomerMarketplace } from "./marketplace/CustomerMarketplace";
import { HeroSection } from "./HeroSection";
import { CategoriesSection } from "./CategoriesSection";
import { ProductShowcase } from "./ProductShowcase";
import { PromoBanner } from "./PromoBanner";
import { Navigation } from "./Navigation";
import { DebugPanel } from "./DebugPanel";
import { ProductDetail } from "./ProductDetail";

type AppView = 'home' | 'login' | 'register' | 'business-dashboard' | 'customer-marketplace' | 'product-detail';

interface User {
  id: string;
  type: 'business' | 'personal';
  name: string;
  email: string;
  city: string;
  businessName?: string;
}

export function AppRouter() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const handleLogin = (userType: 'business' | 'personal', credentials: any) => {
    const user: User = {
      id: Date.now().toString(),
      type: userType,
      name: userType === 'business' ? credentials.businessName : `${credentials.firstName ?? ''} ${credentials.lastName ?? ''}`.trim(),
      email: credentials.email,
      city: credentials.city || 'Prishtinë',
      businessName: userType === 'business' ? credentials.businessName : undefined
    };
    setCurrentUser(user);
    setCurrentView(userType === 'business' ? 'business-dashboard' : 'customer-marketplace');
  };

  const handleRegister = (userType: 'business' | 'personal', userData: any) => {
    const user: User = {
      id: Date.now().toString(),
      type: userType,
      name: userType === 'business' ? userData.businessName : `${userData.firstName ?? ''} ${userData.lastName ?? ''}`.trim(),
      email: userData.email,
      city: userData.city,
      businessName: userType === 'business' ? userData.businessName : undefined
    };
    setCurrentUser(user);
    setCurrentView(userType === 'business' ? 'business-dashboard' : 'customer-marketplace');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleBrowseCategory = (categoryName: string) => {
    // For now just navigate to marketplace; could set a filter via hash
    window.location.hash = `category=${encodeURIComponent(categoryName)}`;
    setCurrentView('customer-marketplace');
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="min-h-screen">
            <HeroSection onNavigate={setCurrentView} />
            <CategoriesSection onBrowseCategory={handleBrowseCategory} />
            <ProductShowcase onProductClick={(p) => { setSelectedProduct(p); setCurrentView('product-detail'); }} />
            <PromoBanner onNavigate={setCurrentView} />
          </div>
        );
      case 'login':
        return <AuthPage initialMode="login" onLogin={handleLogin} onRegister={handleRegister} />;
      case 'register':
        return <AuthPage initialMode="register" onLogin={handleLogin} onRegister={handleRegister} />;
      case 'business-dashboard':
        return <BusinessDashboard />;
      case 'customer-marketplace':
        return <CustomerMarketplace />;
      case 'product-detail':
        return <ProductDetail product={selectedProduct} onBack={() => setCurrentView('home')} />;
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div>
      <Navigation currentView={currentView} onNavigate={setCurrentView} onLogout={handleLogout} />
      {renderView()}
      <DebugPanel currentView={currentView} currentUser={currentUser} onNavigate={setCurrentView} />
    </div>
  );
}
