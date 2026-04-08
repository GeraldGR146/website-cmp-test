import { useLocale } from '@/i18n/LocaleContext';
import type { ProductCategory } from '@/types';

interface ProductTabsProps {
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
}

const categories: ProductCategory[] = [
  'all',
  '2wheel',
  '4wheel',
  'household',
  'screenOil',
  'rubber',
  'pvc',
  'cnc',
  'others',
];

export function ProductTabs({ activeCategory, onCategoryChange }: ProductTabsProps) {
  const { t } = useLocale();

  const getCategoryLabel = (cat: ProductCategory) =>
    t.products.categories[cat as keyof typeof t.products.categories] || cat;

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {categories.map((cat) => {
        const active = activeCategory === cat;

        return (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={[
              'group relative overflow-hidden rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300',
              'border backdrop-blur-md',
              active
                ? 'border-indigo-500/30 bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/20'
                : 'border-white/80 bg-white/80 text-slate-600 hover:border-indigo-200 hover:bg-white hover:text-slate-900 hover:shadow-md',
            ].join(' ')}
          >
            {!active && (
              <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-indigo-50 to-sky-50" />
            )}

            <span className="relative z-10">{getCategoryLabel(cat)}</span>
          </button>
        );
      })}
    </div>
  );
}