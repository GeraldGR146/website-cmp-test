import { contactInfo } from '@/cms/contact'
import { AnimatedSection } from '@/components/AnimatedSection'
import { useLocale } from '@/i18n/LocaleContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import {
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon
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

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.025] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 py-20">

        {/* 🔥 LOGO HERO (MATCH CONTACT PAGE) */}
        <AnimatedSection animation="scale-up">
          <div className="flex flex-col items-center text-center mb-16">

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <img
                src="/logos/Logo_CMP_white.png"
                alt="CMP"
                className="
                  w-[200px] md:w-[240px] lg:w-[260px]
                  h-auto object-contain
                  drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                "
              />
            </motion.div>

            <p className="text-sm text-white/60 max-w-md leading-relaxed">
              {t.footer.description}
            </p>

          </div>
        </AnimatedSection>

        {/* Divider */}
        <div className="border-t border-white/10 mb-14" />

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-10">

          {/* NAVIGATION */}
          <AnimatedSection animation="fade-up" className="lg:col-span-3">

            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40 mb-6">
              {t.footer.navigation}
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="
                      text-sm text-white/70
                      hover:text-white
                      transition-all duration-300
                      hover:translate-x-1
                      inline-block
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

          </AnimatedSection>

          {/* CONTACT */}
          <AnimatedSection animation="fade-up" delay={100} className="lg:col-span-4">

            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40 mb-6">
              {t.footer.contactInfo}
            </h3>

            <ul className="space-y-4">

              <li className="flex items-start gap-3 group">
                <EnvelopeIcon className="w-4 h-4 mt-[3px] text-white/40 group-hover:text-white transition" />
                <a href={`mailto:${contactInfo.email}`} className="text-sm text-white/70 group-hover:text-white transition">
                  {contactInfo.email}
                </a>
              </li>

              <li className="flex items-start gap-3 group">
                <PhoneIcon className="w-4 h-4 mt-[3px] text-white/40 group-hover:text-white transition" />
                <a href={`tel:${contactInfo.phone}`} className="text-sm text-white/70 group-hover:text-white transition">
                  {contactInfo.phone}
                </a>
              </li>

              <li className="flex items-start gap-3 group">
                <MapPinIcon className="w-4 h-4 mt-0.5 text-white/40 shrink-0 group-hover:text-white transition" />
                <a href={contactInfo.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 group-hover:text-white transition leading-relaxed">
                  {contactInfo.address[locale]}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <ClockIcon className="w-4 h-4 mt-[3px] text-white/40" />
                <span className="text-sm text-white/70">
                  {t.contact.officeHoursValue}
                </span>
              </li>

            </ul>

          </AnimatedSection>

          {/* MAP */}
          <AnimatedSection animation="fade-up" delay={200} className="lg:col-span-5">

            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40 mb-6">
              {t.footer.location}
            </h3>

            <div className="
              rounded-2xl overflow-hidden
              border border-white/10
              bg-white/[0.02]
              backdrop-blur-sm
              shadow-[0_10px_30px_rgba(0,0,0,0.25)]
              hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)]
              transition-all duration-500
            ">
              <iframe
                src={contactInfo.mapEmbedUrl}
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="CMP Location"
              />
            </div>

          </AnimatedSection>

        </div>

        {/* BOTTOM */}
        <div className="
          mt-16 pt-8
          border-t border-white/10
          flex flex-col md:flex-row
          items-center justify-between gap-4
        ">

          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} PT Cipta Metalindo Persada. {t.footer.rights}
          </p>

          <div className="flex items-center gap-6 text-xs text-white/40">

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
