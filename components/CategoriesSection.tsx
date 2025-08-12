import { Palette, Droplets, Scissors, Sparkles, Heart, Star } from "lucide-react";

const categories = [
  { id: 1, name: "Makeup", description: "Bazë, buzëkuq, hije & më shumë", icon: Palette, productCount: "1,200+", color: "from-blue-500 to-cyan-500" },
  { id: 2, name: "Kujdesi i lëkurës", description: "Serume, kremra hidratues & trajtime", icon: Droplets, productCount: "890+", color: "from-green-500 to-emerald-500" },
  { id: 3, name: "Kujdesi për flokët", description: "Shampo, balsam & stilim", icon: Scissors, productCount: "650+", color: "from-purple-500 to-violet-500" },
  { id: 4, name: "Aroma", description: "Parfume, spërkatje & esenca", icon: Sparkles, productCount: "420+", color: "from-amber-500 to-orange-500" },
  { id: 5, name: "Kujdesi i trupit", description: "Locione, skrabe & trajtime trupi", icon: Heart, productCount: "380+", color: "from-rose-500 to-pink-500" },
  { id: 6, name: "Thonjtë", description: "Llak, mjete & art thonjsh", icon: Star, productCount: "290+", color: "from-indigo-500 to-blue-500" },
];

interface CategoriesSectionProps {
  onBrowseCategory?: (categoryName: string) => void;
}

export function CategoriesSection({ onBrowseCategory }: CategoriesSectionProps) {
  return (
    <div className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">Bli sipas Kategorisë</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Zbuloni mijëra produkte nga dyqanet e verifikuara të kozmetikës në të gjitha kategoritë e bukurisë</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onBrowseCategory?.(category.name)}
                className="group text-left bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-2 text-gray-900">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.productCount} produkte</span>
                  <span className="text-blue-600 group-hover:text-blue-700 transition-colors">Shfleto →</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}