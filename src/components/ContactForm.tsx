import { useState } from 'react';
import { useLocale } from '@/i18n/LocaleContext';

export function ContactForm() {
  const { t, locale } = useLocale();
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
      const response = await fetch('https://formspree.io/f/mwvnzedb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Form submission failed');

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

  const inputBase =
    "w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-300";

  const inputStyle =
    `${inputBase}
    border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400
    focus:ring-2 focus:ring-[#0B2A59]/20 focus:border-[#0B2A59] focus:bg-white focus:shadow-md

    dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-gray-400
    dark:focus:ring-white/20 dark:focus:border-white/30 dark:focus:bg-white/10`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Success */}
      {submitted && (
        <div className="p-4 rounded-xl text-sm flex items-center gap-2
          bg-green-50 border border-green-200 text-green-700
          dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-300">
          ✔ {t.contact.formSuccess}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl text-sm flex items-center gap-2
          bg-red-50 border border-red-200 text-red-700
          dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-300">
          ⚠ {t.contact.formError}
        </div>
      )}

      {/* Name */}
      <div className="group/field">
        <label className="block text-sm font-medium mb-1.5
          text-gray-700 group-focus-within/field:text-[#0B2A59]
          dark:text-gray-300 dark:group-focus-within/field:text-white transition-colors">
          {t.contact.formName}
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={inputStyle}
          placeholder={locale === 'en' ? 'Input Your Full Name' : 'Masukkan Nama Lengkap Anda'}
        />
      </div>

      {/* Email */}
      <div className="group/field">
        <label className="block text-sm font-medium mb-1.5
          text-gray-700 group-focus-within/field:text-[#0B2A59]
          dark:text-gray-300 dark:group-focus-within/field:text-white transition-colors">
          {t.contact.formEmail}
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={inputStyle}
          placeholder={locale === 'en' ? 'Input Your Email' : 'Masukkan Email Anda'}
        />
      </div>

      {/* Subject */}
      <div className="group/field">
        <label className="block text-sm font-medium mb-1.5
          text-gray-700 group-focus-within/field:text-[#0B2A59]
          dark:text-gray-300 dark:group-focus-within/field:text-white transition-colors">
          {t.contact.formSubject}
        </label>
        <input
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className={inputStyle}
          placeholder={locale === 'en' ? 'Input Subject' : 'Masukkan Subjek'}
        />
      </div>

      {/* Message */}
      <div className="group/field">
        <label className="block text-sm font-medium mb-1.5
          text-gray-700 group-focus-within/field:text-[#0B2A59]
          dark:text-gray-300 dark:group-focus-within/field:text-white transition-colors">
          {t.contact.formMessage}
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={inputStyle + " resize-none"}
          placeholder={locale === 'en' ? 'Input Your Message' : 'Masukkan Pesan Anda'}
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={sending}
        className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2
        bg-[#0B2A59] text-white hover:bg-[#0d3470]
        dark:bg-white dark:text-[#0B2A59] dark:hover:bg-gray-200

        transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5
        disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {sending ? 'Sending...' : t.contact.formSubmit}
      </button>
    </form>
  );
}
