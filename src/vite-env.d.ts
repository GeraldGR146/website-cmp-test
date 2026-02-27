/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLOUDINARY_CLOUD_NAME: string;
  readonly VITE_CLOUDINARY_API_KEY: string;
  readonly VITE_CLOUDINARY_UPLOAD_PRESET: string;
  readonly VITE_CMS_PROVIDER: string;
  readonly VITE_CMS_API_URL: string;
  readonly VITE_CMS_API_KEY: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_GOOGLE_MAPS_EMBED_URL: string;
  readonly VITE_CONTACT_FORM_ENDPOINT: string;
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_GTM_ID: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_DEFAULT_LOCALE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
