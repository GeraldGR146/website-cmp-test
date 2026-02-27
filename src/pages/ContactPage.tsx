import { useLocale } from '@/i18n/LocaleContext';
import { ContactForm } from '@/components/ContactForm';
import { AnimatedSection } from '@/components/AnimatedSection';
import { contactInfo } from '@/cms/contact';
import { CloudinaryImage } from '@/components/CloudinaryImage';

export function ContactPage() {
  const { locale, t } = useLocale();

  return (
    <div className="pt-16 page-enter min-h-screen bg-white">
      {/* Centered CMP Logo + Title */}
      <section className="pt-16 pb-10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 text-center">
          <AnimatedSection animation="scale-up">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-[#FFFFFF] shadow-2xl shadow-[#0B2A59]/30 mb-6">
                            <CloudinaryImage
                              src="https://res.cloudinary.com/dtny14e7t/image/upload/Logo_CMP.png"
                              alt="CMP"
                              loading="eager"
                              className="p-1"
                            />
              </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={100}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">{t.contact.title}</h1>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto text-base">
              {t.contact.subtitle}
            </p>
          </AnimatedSection>

          {/* Contact email highlight */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mt-6 inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-5 py-2.5
              hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <svg className="w-4 h-4 text-[#0B2A59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-semibold text-[#0B2A59]">{t.contact.email}</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Form + Map side by side */}
      <section className="pb-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden border border-gray-200 shadow-xl">

            {/* Left: Contact Form */}
            <div className="lg:col-span-3 p-8 sm:p-10 lg:p-12 bg-white">
              <AnimatedSection animation="fade-right" delay={100}>
                <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#0B2A59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  {t.contact.sendUsMessage}
                </h2>
                <p className="text-sm text-gray-400 mb-8">{t.contact.subtitle}</p>
                <ContactForm />
              </AnimatedSection>
            </div>

            {/* Right: Map + Contact Info */}
            <div className="lg:col-span-2 bg-[#0B2A59] text-white flex flex-col">
              {/* Contact Information */}
              <AnimatedSection animation="fade-left" delay={200} className="p-8 sm:p-10 flex-1">
                <h2 className="text-lg font-bold mb-1">{t.contact.contactInformation}</h2>
                <p className="text-xs text-blue-200 mb-8">{t.contact.reachOut}</p>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 
                      group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                      <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-blue-300 font-medium uppercase tracking-wider mb-1">
                        {locale === 'en' ? 'Phone' : 'Telepon'}
                      </p>
                      <p className="text-sm text-white font-medium">{contactInfo.phone}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0
                      group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                      <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-blue-300 font-medium uppercase tracking-wider mb-1">Email</p>
                      <p className="text-sm text-white font-medium">{contactInfo.email}</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0
                      group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                      <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-blue-300 font-medium uppercase tracking-wider mb-1">
                        {locale === 'en' ? 'Address' : 'Alamat'}
                      </p>
                      <p className="text-sm text-blue-100 leading-relaxed">{contactInfo.address[locale]}</p>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0
                      group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                      <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-blue-300 font-medium uppercase tracking-wider mb-1">{t.contact.officeHours}</p>
                      <p className="text-sm text-white font-medium">{t.contact.officeHoursValue}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Real Embedded Map */}
              <AnimatedSection
                animation="fade-up"
                delay={300}
                className="relative mt-auto"
              >
                <div className="relative h-52 overflow-hidden">
                  <iframe
                    src={contactInfo.mapEmbedUrl}
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </AnimatedSection>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
