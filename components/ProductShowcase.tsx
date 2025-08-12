import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";

type AppView = 'home' | 'login' | 'register' | 'business-dashboard' | 'customer-marketplace';

interface ProductShowcaseProps {
  onProductClick?: (product: Product) => void;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  shopName: string;
  rating: number;
  isNew?: boolean;
  discount?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Bazë Ndriçuese",
    category: "Makeup",
    price: "€39",
    originalPrice: "€52",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
    shopName: "Glow Beauty Co.",
    rating: 4.8,
    discount: "-25%",
  },
  {
    id: 2,
    name: "Set Buzëkuqësh Luksoz",
    category: "Makeup",
    price: "€79",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=500&fit=crop",
    shopName: "Elite Cosmetics",
    rating: 4.9,
    isNew: true,
  },
  {
    id: 3,
    name: "Serum Kundër Plakjes",
    category: "Kujdesi i lëkurës",
    price: "€59",
    originalPrice: "€69",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=500&fit=crop",
    shopName: "Pure Skin Labs",
    rating: 4.7,
    discount: "-15%",
  },
  {
    id: 4,
    name: "Vaj Argan për Flokë",
    category: "Kujdesi për flokët",
    price: "€29",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
    shopName: "Natural Hair Co.",
    rating: 4.6,
    isNew: true,
  },
  {
    id: 5,
    name: "Lotion Trupi me Trëndafil",
    category: "Kujdesi i trupit",
    price: "€24",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=500&fit=crop",
    shopName: "Bloom & Bliss",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Parfum Luksoz",
    category: "Aroma",
    price: "€109",
    originalPrice: "€139",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=500&fit=crop",
    shopName: "Scent Studio",
    rating: 4.9,
    discount: "-20%",
  },
];

export function ProductShowcase({ onProductClick }: ProductShowcaseProps) {
  return (
    <div className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">Produkte të Veçuara</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Produktet më të kërkuara nga dyqanet tona me vlerësim të lartë</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <button key={product.id} type="button" onClick={() => onProductClick?.(product)} className="group cursor-pointer text-left">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-50 to-slate-50 p-4 mb-4 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl border border-gray-100">
                {(product.isNew || product.discount) && (
                  <div className="absolute top-4 right-4 z-10">
                    {product.isNew && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">E RE</Badge>
                    )}
                    {product.discount && (
                      <Badge className="bg-gradient-to-r from-red-500 to-rose-500 text-white border-0 ml-2">{product.discount}</Badge>
                    )}
                  </div>
                )}
                
                <div className="aspect-square relative">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-blue-600 mb-1">{product.category}</p>
                <h3 className="text-lg mb-1 text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">nga {product.shopName}</p>
                
                <div className="flex justify-center items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.rating})</span>
                </div>
                
                <div className="flex justify-center items-center gap-2">
                  <span className="text-xl text-gray-900">{product.price}</span>
                  {product.originalPrice && (<span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>)}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}