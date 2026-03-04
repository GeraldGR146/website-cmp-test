import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/LocaleContext';

export function NotFoundPage() {
  const { locale, t } = useLocale();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#0B2A59]/10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#0B2A59]/15 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-[#0B2A59]/5 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3.5s' }} />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-[#0B2A59]/10 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.8s' }} />
      </div>

      <div className="text-center px-6 relative z-10">
        {/* 404 Number */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-2 border-[#0B2A59]/5 animate-ping" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full border border-[#0B2A59]/5 animate-ping" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
          </div>

          <h1
            className="text-[10rem] md:text-[14rem] font-black leading-none bg-gradient-to-br from-[#0B2A59] to-indigo-600 bg-clip-text text-transparent select-none"
            style={{ animation: 'float 3s ease-in-out infinite' }}
          >
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#0B2A59] mb-4 anim-fade-up anim-visible">
          {t.notFound.title}
        </h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8 anim-fade-up anim-visible" style={{ animationDelay: '0.1s' }}>
          {t.notFound.description}
        </p>

        {/* Back to Home button */}
        <Link
          to={`/${locale}`}
          className="inline-flex items-center gap-2 bg-[#0B2A59] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#0B2A59]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg anim-scale-up anim-visible"
          style={{ animationDelay: '0.2s' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
          </svg>
          {t.notFound.backHome}
        </Link>
      </div>
    </div>
  );
}
