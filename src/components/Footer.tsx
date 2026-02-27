import { useLocale } from '@/i18n/LocaleContext';
import { AnimatedSection } from '@/components/AnimatedSection';
import { contactInfo } from '@/cms/contact';
import { CloudinaryImage } from '@/components/CloudinaryImage';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { locale, t } = useLocale();

  return (
    <footer className="bg-[#0B2A59] text-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/[0.02] rounded-full translate-y-1/3 -translate-x-1/4" />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12 lg:py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <AnimatedSection animation="fade-up" className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFFFFF] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md overflow-hidden">
              <CloudinaryImage
                src= "Logo_CMP"
                alt="CMP"
                crop="scale"
                objectFit='contain'
                loading="eager"
                className="h-10 w-auto object-contain"
              />
            </div>
              <div>
                <div className="text-sm font-bold tracking-wide">CMP</div>
                <div className="text-[9px] text-blue-200">CIPTA METALINDO PERSADA</div>
              </div>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">
              {t.footer.description}
            </p>
          </AnimatedSection>

          {/* Quick Links */}
          <AnimatedSection animation="fade-up" delay={100}>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-blue-300">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {[
                { key: 'home', label: t.nav.home },
                { key: 'about', label: t.nav.about },
                { key: 'products', label: t.nav.products },
                { key: 'contact', label: t.nav.contact },
              ].map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => onNavigate(link.key)}
                    className="text-sm text-blue-200 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-1"
                  >
                    <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100">→</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection animation="fade-up" delay={200}>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-blue-300">
              {t.footer.contactInfo}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 text-blue-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-blue-200">{contactInfo.email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 text-blue-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm text-blue-200">{contactInfo.phone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 text-blue-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-blue-200 leading-relaxed">{contactInfo.address[locale]}</span>
              </li>
            </ul>
          </AnimatedSection>


          {/* Map */}
          <AnimatedSection animation="fade-up" delay={300}>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-blue-300">
              {t.footer.location}
            </h3>
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg hover:border-white/20 transition-colors duration-300">
              <div className="relative w-full h-40">
                <iframe
                  src={contactInfo.mapEmbedUrl}
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-blue-300">
            © {new Date().getFullYear()} PT Cipta Metalindo Persada. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <button className="text-xs text-blue-300 hover:text-white transition-colors duration-300">{t.footer.privacy}</button>
            <button className="text-xs text-blue-300 hover:text-white transition-colors duration-300">{t.footer.terms}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
