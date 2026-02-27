import { useState } from 'react';
import { useLocale } from '@/i18n/LocaleContext';

export function ContactForm() {
  const { t } = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    try {
      const response = await fetch('https://formspree.io/f/meelvrlp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setSending(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setSending(false);
      setError(true);
      setTimeout(() => setError(false), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {submitted && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 flex items-center gap-2 anim-scale-up anim-visible">
          <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {t.contact.formSuccess}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center gap-2 anim-scale-up anim-visible">
          <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {t.contact.formError}
        </div>
      )}

      <div className="group/field">
        <label className="block text-sm font-medium text-gray-700 mb-1.5 group-focus-within/field:text-[#0B2A59] transition-colors">{t.contact.formName}</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#0B2A59]/20 focus:border-[#0B2A59] outline-none 
            transition-all duration-300 bg-gray-50 focus:bg-white focus:shadow-md"
          placeholder="John Doe"
        />
      </div>

      <div className="group/field">
        <label className="block text-sm font-medium text-gray-700 mb-1.5 group-focus-within/field:text-[#0B2A59] transition-colors">{t.contact.formEmail}</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#0B2A59]/20 focus:border-[#0B2A59] outline-none 
            transition-all duration-300 bg-gray-50 focus:bg-white focus:shadow-md"
          placeholder="john@example.com"
        />
      </div>

      <div className="group/field">
        <label className="block text-sm font-medium text-gray-700 mb-1.5 group-focus-within/field:text-[#0B2A59] transition-colors">{t.contact.formSubject}</label>
        <input
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#0B2A59]/20 focus:border-[#0B2A59] outline-none 
            transition-all duration-300 bg-gray-50 focus:bg-white focus:shadow-md"
          placeholder="Product Inquiry"
        />
      </div>

      <div className="group/field">
        <label className="block text-sm font-medium text-gray-700 mb-1.5 group-focus-within/field:text-[#0B2A59] transition-colors">{t.contact.formMessage}</label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#0B2A59]/20 focus:border-[#0B2A59] outline-none 
            transition-all duration-300 resize-none bg-gray-50 focus:bg-white focus:shadow-md"
          placeholder="Tell us about your requirements..."
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full bg-[#0B2A59] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#0d3470] 
          transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2
          disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md"
      >
        {sending ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {t.contact.formSending || 'Sending...'}
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            {t.contact.formSubmit}
          </>
        )}
      </button>
    </form>
  );
}