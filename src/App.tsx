import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function LocaleRedirect() {
  const { locale } = useLocale();
  return <Navigate to={`/${locale}`} replace />;
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
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