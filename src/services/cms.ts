/**
 * CMS Fetch Abstraction Layer
 *
 * This service provides a unified interface for fetching content
 * from any headless CMS. Currently uses static data from /cms/*.ts
 * but can be swapped for Strapi, Contentful, Sanity, or any API.
 *
 * Architecture:
 * - All CMS functions are async-ready for API migration
 * - Returns typed DTOs defined in /types/index.ts
 * - Supports localized content via LocalizedField
 * - Server-component compatible (no client state)
 */

import type { Product, ProductCategory, TimelineEvent, Stat, ClientLogo, ContactInfo } from '@/types';
import { products, getFeaturedProducts as _getFeatured, getProductsByCategory as _getByCategory, getProductById as _getById } from '@/cms/products';
import { stats, timeline } from '@/cms/about';
import { clientLogos } from '@/cms/homepage';
import { contactInfo } from '@/cms/contact';

// ========================================
// Configuration
// ========================================

const CMS_PROVIDER = import.meta.env.VITE_CMS_PROVIDER || 'static';
const _CMS_API_URL = import.meta.env.VITE_CMS_API_URL || '';
const _CMS_API_KEY = import.meta.env.VITE_CMS_API_KEY || '';

/**
 * Generic fetch wrapper for CMS API calls.
 * Handles authentication, error handling, and response parsing.
 *
 * Enable this when migrating to a headless CMS by uncommenting
 * and calling from the service functions below.
 */
export async function fetchFromCMS<T>(endpoint: string): Promise<T> {
  if (CMS_PROVIDER === 'static') {
    throw new Error('Static CMS provider does not support API calls');
  }

  const response = await fetch(`${_CMS_API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${_CMS_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`CMS API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// ========================================
// Product Services
// ========================================

export async function getAllProducts(): Promise<Product[]> {
  return Promise.resolve(products);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return Promise.resolve(_getFeatured());
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  return Promise.resolve(_getByCategory(category));
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return Promise.resolve(_getById(id));
}

// ========================================
// About Services
// ========================================

export async function getStats(): Promise<Stat[]> {
  return Promise.resolve(stats);
}

export async function getTimeline(): Promise<TimelineEvent[]> {
  return Promise.resolve(timeline);
}

// ========================================
// Homepage Services
// ========================================

export async function getClientLogos(): Promise<ClientLogo[]> {
  return Promise.resolve(clientLogos);
}

// ========================================
// Contact Services
// ========================================

export async function getContactInfo(): Promise<ContactInfo> {
  return Promise.resolve(contactInfo);
}

/**
 * Submit contact form data.
 * Currently logs to console; replace with actual API endpoint.
 */
export async function submitContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return { success: false, message: 'Failed to submit form. Please try again.' };
    }

    return { success: true, message: 'Message sent successfully!' };
  }

  // Fallback: simulate successful submission
  console.log('[CMS] Contact form submitted:', data);
  return { success: true, message: 'Message sent successfully!' };
}
