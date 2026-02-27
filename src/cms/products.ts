import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'prod-001',
    name: { en: 'Motorcycle Exhaust Bracket', id: 'Bracket Knalpot Motor' },
    description: { en: 'High-strength steel bracket for motorcycle exhaust systems', id: 'Bracket baja kekuatan tinggi untuk sistem knalpot motor' },
    category: '2wheel',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop',
    featured: true
  },
  {
    id: 'prod-002',
    name: { en: 'Brake Disc Component', id: 'Komponen Cakram Rem' },
    description: { en: 'Precision-machined brake disc for 2-wheel vehicles', id: 'Cakram rem presisi untuk kendaraan roda 2' },
    category: '2wheel',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop',
    featured: true
  },
  {
    id: 'prod-003',
    name: { en: 'Chain Sprocket Assembly', id: 'Rakitan Sproket Rantai' },
    description: { en: 'Durable chain sprocket for motorcycle drivetrains', id: 'Sproket rantai tahan lama untuk drivetrain motor' },
    category: '2wheel',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=400&fit=crop',
    featured: false
  },
  {
    id: 'prod-004',
    name: { en: 'Car Door Hinge', id: 'Engsel Pintu Mobil' },
    description: { en: 'Heavy-duty door hinge for automotive applications', id: 'Engsel pintu tugas berat untuk aplikasi otomotif' },
    category: '4wheel',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop',
    featured: true
  },
  {
    id: 'prod-005',
    name: { en: 'Engine Mount Bracket', id: 'Bracket Dudukan Mesin' },
    description: { en: 'Vibration-dampening engine mount for cars', id: 'Dudukan mesin peredam getaran untuk mobil' },
    category: '4wheel',
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=400&fit=crop',
    featured: true
  },
  {
    id: 'prod-006',
    name: { en: 'Suspension Arm', id: 'Lengan Suspensi' },
    description: { en: 'Forged aluminum suspension arm for passenger vehicles', id: 'Lengan suspensi aluminium tempa untuk kendaraan penumpang' },
    category: '4wheel',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=400&fit=crop',
    featured: false
  },
  {
    id: 'prod-007',
    name: { en: 'Stainless Steel Cookware Handle', id: 'Gagang Peralatan Masak Stainless' },
    description: { en: 'Ergonomic handle for premium cookware', id: 'Gagang ergonomis untuk peralatan masak premium' },
    category: 'household',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    featured: true
  },
  {
    id: 'prod-008',
    name: { en: 'Cabinet Hardware Set', id: 'Set Perangkat Keras Kabinet' },
    description: { en: 'Modern cabinet knobs and pulls in brushed steel', id: 'Knob dan tarikan kabinet modern dari baja sikat' },
    category: 'household',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop',
    featured: false
  },
  {
    id: 'prod-009',
    name: { en: 'Industrial Screen Filter', id: 'Filter Saringan Industri' },
    description: { en: 'Fine mesh screen for oil filtration systems', id: 'Saringan mesh halus untuk sistem filtrasi minyak' },
    category: 'screenOil',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=400&fit=crop',
    featured: true
  },
  {
    id: 'prod-010',
    name: { en: 'Oil Separator Component', id: 'Komponen Pemisah Minyak' },
    description: { en: 'High-efficiency oil separator for industrial use', id: 'Pemisah minyak efisiensi tinggi untuk penggunaan industri' },
    category: 'screenOil',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=400&fit=crop',
    featured: false
  },
  {
    id: 'prod-011',
    name: { en: 'Vibration Damper Rubber', id: 'Karet Peredam Getaran' },
    description: { en: 'High-performance rubber damper for machinery', id: 'Peredam karet performa tinggi untuk mesin' },
    category: 'rubber',
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&h=400&fit=crop',
    featured: true
  },
  {
    id: 'prod-012',
    name: { en: 'Seal Ring Gasket', id: 'Gasket Cincin Segel' },
    description: { en: 'Precision rubber seal for hydraulic systems', id: 'Segel karet presisi untuk sistem hidrolik' },
    category: 'rubber',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=400&fit=crop',
    featured: false
  },
  {
    id: 'prod-013',
    name: { en: 'Custom Metal Stamping', id: 'Stempel Metal Kustom' },
    description: { en: 'Custom precision metal stamping services', id: 'Layanan stempel metal presisi kustom' },
    category: 'others',
    image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=400&h=400&fit=crop',
    featured: false
  },
  {
    id: 'prod-014',
    name: { en: 'Wire Form Component', id: 'Komponen Bentuk Kawat' },
    description: { en: 'Custom wire forming for various applications', id: 'Pembentukan kawat kustom untuk berbagai aplikasi' },
    category: 'others',
    image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=400&h=400&fit=crop',
    featured: false
  },
  {
    id: 'prod-015',
    name: { en: 'Furniture Leg Cap', id: 'Tutup Kaki Furnitur' },
    description: { en: 'Protective metal caps for furniture legs', id: 'Tutup metal pelindung untuk kaki furnitur' },
    category: 'household',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    featured: true
  }
];

export function getProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}
