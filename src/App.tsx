import { useState, useEffect, useCallback } from 'react';
import { LocaleProvider } from '@/i18n/LocaleContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { ContactPage } from '@/pages/ContactPage';

const VALID_PAGES = ['home', 'about', 'products', 'contact'];

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');

  const getPageFromPath = () => {
    const path = window.location.pathname.replace('/', '');
    return VALID_PAGES.includes(path) ? path : 'home';
  };

  const handleNavigate = useCallback((page: string) => {
    if (!VALID_PAGES.includes(page)) return;

    setCurrentPage(page);

    const newPath = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', newPath);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    // Set initial page from URL
    setCurrentPage(getPageFromPath());

    const handlePopState = () => {
      setCurrentPage(getPageFromPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'products':
        return <ProductsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export function App() {
  return (
    <LocaleProvider>
      <AppContent />
    </LocaleProvider>
  );
}