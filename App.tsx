import { HeroSection } from "./components/HeroSection";
import { CategoriesSection } from "./components/CategoriesSection";
import { ProductShowcase } from "./components/ProductShowcase";
import { PromoBanner } from "./components/PromoBanner";

export default function App() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
      <ProductShowcase />
      <PromoBanner />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Zbukurohu</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">Platforma e Kosovës për dyqane dhe shpërndarës të kozmetikës.</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-blue-400 transition-colors">Për Shitësit</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Për Blerësit</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Mbështetje</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Privatësia</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Kushtet</a>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500 text-sm">© 2025 Zbukurohu. Të gjitha të drejtat e rezervuara.</div>
        </div>
      </footer>
    </div>
  );
}