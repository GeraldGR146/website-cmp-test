import { useLocale } from '@/i18n/LocaleContext';
import { motion } from 'framer-motion';
import { FileX } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  const { locale, t } = useLocale();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center pt-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-indigo-100">
              <FileX className="w-12 h-12 text-indigo-600" />
            </div>
          </div>

          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black text-slate-900 mb-6"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-4"
          >
            {t.notFound.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-slate-600 max-w-md mx-auto mb-8"
          >
            {t.notFound.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link
              to={`/${locale}`}
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
              </svg>
              {t.notFound.backHome}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
