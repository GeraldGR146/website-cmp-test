import { contactInfo } from '@/cms/contact'
import { AnimatedSection } from '@/components/AnimatedSection'
import { ContactForm } from '@/components/ContactForm'
import { useLocale } from '@/i18n/LocaleContext'
import { useState } from 'react'

export function ContactPage() {
  const { locale, t } = useLocale()
  const [mapLoaded, setMapLoaded] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A172F]">

      {/* HERO BACKGROUND */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-br from-[#0B2A59] via-[#123A7A] to-[#0B2A59] -z-10" />

      {/* MAIN WRAPPER - Adjusted for transparent header */}
      <div className="pt-32 pb-20 bg-gradient-to-b from-transparent via-slate-50 to-slate-50 dark:via-[#0A172F] dark:to-[#0A172F]">

        {/* HERO CONTENT */}
        <section className="text-center pb-12">

          <AnimatedSection animation="scale-up">
            <div className="flex justify-center py-10">
              {/* Light mode logo */}
              <img
                src="/logos/Logo_CMP.png"
                alt="CMP"
                className="w-[240px] md:w-[280px] object-contain drop-shadow-lg dark:hidden"
              />
              {/* Dark mode logo */}
              <img
                src="/logos/Logo_CMP_white.png"
                alt="CMP"
                className="w-[240px] md:w-[280px] object-contain drop-shadow-lg hidden dark:block"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white drop-shadow-md">
              {t.contact.title}
            </h1>

            <p className="mt-4 text-sm sm:text-base text-black dark:text-white/80 max-w-lg mx-auto drop-shadow">
              {t.contact.subtitle}
            </p>
          </AnimatedSection>

        </section>

        {/* MAIN CONTENT */}
        <section>
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">

            <div className="grid grid-cols-1 lg:grid-cols-5 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F223F]">

              {/* LEFT — FORM */}
              <div className="lg:col-span-3 p-8 sm:p-10 lg:p-12">

                <AnimatedSection animation="fade-right">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {t.contact.sendUsMessage}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                    {t.contact.subtitle}
                  </p>

                  <ContactForm />
                </AnimatedSection>

              </div>

              {/* RIGHT PANEL */}
              <div className="lg:col-span-2 flex flex-col bg-gradient-to-br from-[#0B2A59] to-indigo-700">

                {/* INFO */}
                <div className="p-8 sm:p-10 flex-1 flex flex-col justify-center">

                  <AnimatedSection animation="fade-left">
                    <h2 className="text-lg font-bold mb-2 text-white">
                      {t.contact.contactInformation}
                    </h2>
                    <p className="text-xs text-blue-200 mb-8">
                      {t.contact.reachOut}
                    </p>

                    <div className="space-y-5">

                      {/* PHONE */}
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="flex items-start gap-3 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 transition group-hover:bg-white/20 group-hover:scale-110">
                          <span className="text-base">📞</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-blue-300 uppercase tracking-wide mb-0.5">
                            Phone
                          </p>
                          <p className="text-sm text-white group-hover:text-blue-200 transition break-all">
                            {contactInfo.phone}
                          </p>
                        </div>
                      </a>

                      {/* EMAIL */}
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="flex items-start gap-3 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 transition group-hover:bg-white/20 group-hover:scale-110">
                          <span className="text-base">✉️</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-blue-300 uppercase tracking-wide mb-0.5">
                            Email
                          </p>
                          <p className="text-sm text-white group-hover:text-blue-200 transition break-all">
                            {contactInfo.email}
                          </p>
                        </div>
                      </a>

                      {/* ADDRESS */}
                      <a
                        href={contactInfo.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 transition group-hover:bg-white/20 group-hover:scale-110">
                          <span className="text-base">📍</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-blue-300 uppercase tracking-wide mb-0.5">
                            {locale === 'en' ? 'Address' : 'Alamat'}
                          </p>
                          <p className="text-sm leading-relaxed text-blue-100 group-hover:text-white transition">
                            {contactInfo.address[locale]}
                          </p>
                        </div>
                      </a>

                      {/* WORKING HOURS */}
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-base">🕒</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-blue-300 uppercase tracking-wide mb-0.5">
                            {t.contact.officeHours}
                          </p>
                          <p className="text-sm text-white">
                            {t.contact.officeHoursValue}
                          </p>
                        </div>
                      </div>

                    </div>
                  </AnimatedSection>

                </div>

                {/* MAP */}
                <div className="relative h-56 border-t border-white/20">

                  {!mapLoaded && (
                    <div className="absolute inset-0 bg-white/10 animate-pulse flex items-center justify-center">
                      <div className="text-white/60 text-sm">Loading map...</div>
                    </div>
                  )}

                  <iframe
                    src={contactInfo.mapEmbedUrl}
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                    onLoad={() => setMapLoaded(true)}
                    title="Office Location Map"
                  />

                </div>

              </div>

            </div>

          </div>
        </section>

      </div>
    </div>
  )
}
