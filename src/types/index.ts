export interface LocalizedField {
  en: string;
  id: string;
}

export interface Product {
  id: string;
  name: LocalizedField;
  description: LocalizedField;
  category: ProductCategory;
  image: string;
  featured: boolean;
}

export type ProductCategory = 'all' | '2wheel' | '4wheel' | 'household' | 'screenOil' | 'rubber' | 'cnc' | 'pvc' | 'others';

// src/types/index.ts
export interface TimelineEvent {
  year: string;
  title: LocalizedField;
  description: LocalizedField;
  image?: string;
  video?: {
    type: 'youtube' | 'vimeo' | 'local' | 'cloudinary';
    src: string;
    poster?: string;
  };
}

export interface Stat {
  value: string;
  label: LocalizedField;
}

export interface ClientLogo {
  name: string;
  image: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: LocalizedField;
  googleMapsUrl: string;
  mapEmbedUrl: string;
}
