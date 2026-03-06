import { Link } from 'react-router-dom'
import { useLocale } from '@/i18n/LocaleContext'
import { AnimatedSection } from '@/components/AnimatedSection'
import { contactInfo } from '@/cms/contact'

import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export function Footer() {
  const { locale, t } = useLocale()

  const quickLinks = [
    { label: t.nav.home, path: `/${locale}` },
    { label: t.nav.about, path: `/${locale}/about` },
    { label: t.nav.products, path: `/${locale}/products` },
    { label: t.nav.contact, path: `/${locale}/contact` }
  ]

  return (
    <footer className="bg-[#0B2A59] text-white relative overflow-hidden">

      {/* subtle background shapes */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-white/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-white/[0.02] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative mx-auto max-w-[1200px] px-6 py-16">

        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* COMPANY */}
          <AnimatedSection
            animation="fade-up"
            className="lg:col-span-4"
          >

            <div className="flex items-center gap-3 mb-6">

              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-md overflow-hidden">
                <img
                  src="/logos/Logo_CMP.png"
                  alt="CMP"
                  className="h-10 w-auto object-contain"
                />
              </div>

              <div>
                <div className="text-base font-bold tracking-wide">
                  CMP
                </div>

                <div className="text-[11px] text-blue-200 tracking-wider">
                  CIPTA METALINDO PERSADA
                </div>
              </div>

            </div>

            <p className="text-sm text-blue-200 leading-relaxed max-w-sm">
              {t.footer.description}
            </p>

          </AnimatedSection>

          {/* NAVIGATION */}
          <AnimatedSection
            animation="fade-up"
            delay={100}
            className="lg:col-span-2"
          >

            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300 mb-6">
              {t.footer.navigation}
            </h3>

            <ul className="space-y-3">

              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="
                    text-sm text-blue-200
                    hover:text-white
                    transition-colors
                    duration-200
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

            </ul>

          </AnimatedSection>

          {/* CONTACT */}
          <AnimatedSection
            animation="fade-up"
            delay={200}
            className="lg:col-span-3"
          >

            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300 mb-6">
              {t.footer.contactInfo}
            </h3>

            <ul className="space-y-4">

              <li className="flex items-start gap-3">

                <EnvelopeIcon className="w-4 h-4 mt-[3px] text-blue-300" />

                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-blue-200 hover:text-white transition"
                >
                  {contactInfo.email}
                </a>

              </li>

              <li className="flex items-start gap-3">

                <PhoneIcon className="w-4 h-4 mt-[3px] text-blue-300" />

                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-sm text-blue-200 hover:text-white transition"
                >
                  {contactInfo.phone}
                </a>

              </li>

              <li className="flex items-start gap-3">

                <MapPinIcon className="w-4 h-4 mt-0.5 text-blue-300 shrink-0 group-hover:text-white transition-colors" />

                <a
                  href={contactInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-200 hover:text-white transition leading-relaxed"
                >
                  {contactInfo.address[locale]}
                </a>

              </li>

              <li className="flex items-start gap-3">

                <ClockIcon className="w-4 h-4 mt-[3px] text-blue-300" />

                <span className="text-sm text-blue-200">
                  Mon – Fri : 08:00 – 17:00
                </span>

              </li>

            </ul>

          </AnimatedSection>

          {/* MAP */}
          <AnimatedSection
            animation="fade-up"
            delay={300}
            className="lg:col-span-3"
          >

            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300 mb-6">
              {t.footer.location}
            </h3>

            <div className="rounded-xl overflow-hidden border border-white/10 shadow-md">

              <iframe
                src={contactInfo.mapEmbedUrl}
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="CMP Location"
              />

            </div>

          </AnimatedSection>

        </div>

        {/* BOTTOM */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-xs text-blue-300">
            © {new Date().getFullYear()} PT Cipta Metalindo Persada. {t.footer.rights}
          </p>

          <div className="flex items-center gap-6 text-xs text-blue-300">

            <button className="hover:text-white transition">
              {t.footer.privacy}
            </button>

            <button className="hover:text-white transition">
              {t.footer.terms}
            </button>

          </div>

        </div>

      </div>

    </footer>
  )
}