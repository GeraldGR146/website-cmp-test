import { useLocale } from '@/i18n/LocaleContext';
import { HeroSection } from '@/components/HeroSection';
import { Timeline } from '@/components/Timeline';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useCountUp, useScrollAnimation } from '@/hooks/useScrollAnimation';
import { stats, timeline } from '@/cms/about';

function StatCard({ stat, index }: { stat: typeof stats[number]; index: number }) {
  const { locale } = useLocale();
  const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ''), 10);
  const suffix = stat.value.replace(/[0-9]/g, '');
  const { ref, count, isVisible } = useCountUp(numericValue, 2000);

  return (
    <div
      ref={ref}
      className={`anim-bounce-up ${isVisible ? 'anim-visible' : ''} relative group`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="relative overflow-hidden bg-white rounded-2xl p-8 border border-gray-100 shadow-sm 
        hover:shadow-xl hover:-translate-y-2 transition-all duration-500 text-center">
        {/* Decorative gradient orb */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#0B2A59]/5 to-blue-400/10 
          rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        
        {/* Icon background */}
        <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B2A59]/10 to-blue-400/10 
          flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          {index === 0 && (
            <svg className="w-7 h-7 text-[#0B2A59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {index === 1 && (
            <svg className="w-7 h-7 text-[#0B2A59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          )}
          {index === 2 && (
            <svg className="w-7 h-7 text-[#0B2A59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          )}
          {index === 3 && (
            <svg className="w-7 h-7 text-[#0B2A59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          )}
        </div>

        <div className="relative">
          <div className="text-4xl lg:text-5xl font-bold text-[#0B2A59] counter-value">
            {count}{suffix}
          </div>
          <div className="mt-2 text-sm font-medium text-gray-500">{stat.label[locale]}</div>
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  const { locale, t } = useLocale();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation();

  return (
    <div className="page-enter">
      {/* Hero */}
      <HeroSection
        title={t.about.heroTitle}
        subtitle={t.about.heroSubtitle}
        backgroundVideo="https://res.cloudinary.com/dalb8mpfd/video/upload/v1770360399/samples/dance-2.mp4"
        overlay="blue"
        size="medium"
      />

      {/* Company Description */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50/80 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-blue-50/60 to-transparent rounded-full translate-y-1/2 -translate-x-1/3" />

        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fade-right" className="order-2 lg:order-1">
              <div className="inline-block mb-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B2A59] bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                  {locale === 'en' ? '✦ Who We Are' : '✦ Siapa Kami'}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                {t.about.companyTitle}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-5">
                {t.about.companyDesc}
              </p>
              <p className="text-gray-500 leading-relaxed">
                {t.about.companyDesc2}
              </p>

              {/* Mini highlights */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">
                    {locale === 'en' ? 'ISO Certified' : 'Bersertifikat ISO'}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">
                    {locale === 'en' ? 'Global Reach' : 'Jangkauan Global'}
                  </span>
                </div>
              </div>
            </AnimatedSection>

            <div ref={imageRef} className={`relative order-1 lg:order-2 anim-zoom-rotate ${imageVisible ? 'anim-visible' : ''}`}>
              <img
                src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=500&fit=crop"
                alt="Factory"
                className="rounded-3xl shadow-2xl w-full h-auto object-cover"
                loading="lazy"
              />
              {/* Floating stats badge */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-[#0B2A59] to-[#1e5aad] rounded-2xl p-6 shadow-2xl hidden lg:block
                animate-float">
                <div className="text-4xl font-bold text-white">11+</div>
                <div className="text-xs text-blue-200 mt-1 font-medium">{t.about.statsYears}</div>
              </div>
              {/* Top-right decorative badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl hidden lg:flex items-center gap-2
                animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">ISO 9001</div>
                  <div className="text-[10px] text-gray-500">{locale === 'en' ? 'Certified' : 'Tersertifikasi'}</div>
                </div>
              </div>
              {/* Background decorative shape */}
              <div className="absolute -z-10 -top-6 -right-6 w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230B2A59' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 relative">
          <AnimatedSection animation="fade-up" className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B2A59] bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
              {locale === 'en' ? '✦ By The Numbers' : '✦ Dalam Angka'}
            </span>
            <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-gray-900">
              {locale === 'en' ? 'Our Impact & Growth' : 'Dampak & Pertumbuhan Kami'}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B2A59] bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
              {locale === 'en' ? '✦ Our Purpose' : '✦ Tujuan Kami'}
            </span>
            <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-gray-900">
              {locale === 'en' ? 'Vision & Mission' : 'Visi & Misi'}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vision */}
            <AnimatedSection animation="fade-right" delay={100}>
              <div className="relative bg-gradient-to-br from-[#0B2A59] to-[#0d3470] rounded-3xl p-8 lg:p-10 text-white overflow-hidden
                hover:shadow-2xl transition-shadow duration-500 h-full">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />

                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center
                      border border-white/20 shadow-lg">
                      <svg className="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold">{t.about.visionTitle}</h3>
                  </div>
                  <p className="text-blue-100 leading-relaxed text-lg">{t.about.visionDesc}</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Mission */}
            <AnimatedSection animation="fade-left" delay={200}>
              <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B2A59]/10 to-blue-400/10 flex items-center justify-center
                    shadow-sm border border-[#0B2A59]/5">
                    <svg className="w-7 h-7 text-[#0B2A59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{t.about.missionTitle}</h3>
                </div>
                <ul className="space-y-4">
                  {[t.about.mission1, t.about.mission2, t.about.mission3, t.about.mission4].map((m, i) => (
                    <li key={i} className="flex items-start gap-4 group/item">
                      <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0 mt-0.5
                        group-hover/item:bg-green-100 group-hover/item:scale-110 transition-all duration-300">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600 leading-relaxed group-hover/item:text-gray-900 transition-colors">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-50/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-50/40 rounded-full blur-3xl" />

        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 relative">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B2A59] bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
              {locale === 'en' ? '✦ Our Journey' : '✦ Perjalanan Kami'}
            </span>
            <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              {t.about.timelineTitle}
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              {locale === 'en'
                ? 'From humble beginnings to industry leadership — our story of growth and innovation.'
                : 'Dari awal yang sederhana hingga kepemimpinan industri — cerita pertumbuhan dan inovasi kami.'}
            </p>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto">
            <Timeline events={timeline} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0B2A59] via-[#0d3470] to-[#0B2A59] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />

        <AnimatedSection animation="scale-up" className="mx-auto max-w-[1200px] px-4 sm:px-6 text-center relative">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {locale === 'en' ? 'Ready to Partner With Us?' : 'Siap Bermitra Dengan Kami?'}
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto mb-10">
            {locale === 'en'
              ? 'Let\'s discuss how we can bring your manufacturing vision to life with precision and quality.'
              : 'Mari diskusikan bagaimana kami dapat mewujudkan visi manufaktur Anda dengan presisi dan kualitas.'}
          </p>
          <button
            onClick={() => {
              window.history.pushState({}, '', '#contact');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-4 text-base font-bold text-[#0B2A59] 
              shadow-xl hover:shadow-2xl hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1
              hover:scale-105"
          >
            {locale === 'en' ? 'Get In Touch' : 'Hubungi Kami'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </AnimatedSection>
      </section>
    </div>
  );
}
