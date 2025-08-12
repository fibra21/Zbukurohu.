import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface ProductDetailProps {
  product: {
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
  } | null;
  onBack?: () => void;
}

export function ProductDetail({ product, onBack }: ProductDetailProps) {
  if (!product) return null;

  return (
    <div className="px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square">
          <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover rounded-2xl" />
        </div>
        <div className="space-y-4">
          <button type="button" onClick={onBack} className="text-sm text-gray-500 hover:text-gray-700">← Kthehu</button>
          <p className="text-sm text-blue-600">{product.category}</p>
          <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>
          <p className="text-sm text-gray-500">nga {product.shopName}</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl text-gray-900">{product.price}</span>
            {product.originalPrice && <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>}
          </div>
          <div className="pt-4 flex items-center gap-3">
            <Button>Blej Tani</Button>
            <Button variant="outline">Shto në Shportë</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

