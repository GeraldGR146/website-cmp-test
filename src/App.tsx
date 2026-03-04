import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigationType,
} from 'react-router-dom';
import { useEffect } from 'react';
import { LocaleProvider, useLocale } from '@/i18n/LocaleContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { ContactPage } from '@/pages/ContactPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function ScrollManager() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(
        `scroll-${pathname}`,
        String(window.scrollY)
      );
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (navigationType === 'PUSH') {
      window.scrollTo(0, 0);
    } else {
      const saved = sessionStorage.getItem(`scroll-${pathname}`);
      if (saved) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(saved));
        }, 50);
      }
    }
  }, [pathname, navigationType]);

  return null;
}

function LocaleRedirect() {
  const { locale } = useLocale();
  return <Navigate to={`/${locale}`} replace />;
}

function AppLayout() {
  return (
    <>
      <ScrollManager />

      <div className="min-h-screen flex flex-col bg-white">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LocaleRedirect />} />

            {/* English Routes */}
            <Route path="/en" element={<HomePage />} />
            <Route path="/en/about" element={<AboutPage />} />
            <Route path="/en/products" element={<ProductsPage />} />
            <Route path="/en/contact" element={<ContactPage />} />

            {/* Indonesian Routes */}
            <Route path="/id" element={<HomePage />} />
            <Route path="/id/about" element={<AboutPage />} />
            <Route path="/id/products" element={<ProductsPage />} />
            <Route path="/id/contact" element={<ContactPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <LocaleProvider>
        <AppLayout />
      </LocaleProvider>
    </Router>
  );
}