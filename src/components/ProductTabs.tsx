import { useLocale } from '@/i18n/LocaleContext';
import type { ProductCategory } from '@/types';

interface ProductTabsProps {
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
}

const categories: ProductCategory[] = [
  'all', '2wheel', '4wheel', 'household', 'screenOil', 'rubber', 'others'
];

export function ProductTabs({ activeCategory, onCategoryChange }: ProductTabsProps) {
  const { t } = useLocale();

  const getCategoryLabel = (cat: ProductCategory) => {
    return t.products.categories[cat as keyof typeof t.products.categories] || cat;
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 overflow-hidden ${
            activeCategory === cat
              ? 'bg-[#0B2A59] text-white shadow-lg shadow-[#0B2A59]/25 scale-105'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 hover:scale-105'
          }`}
        >
          <span className="relative z-10">{getCategoryLabel(cat)}</span>
        </button>
      ))}
    </div>
  );
}
