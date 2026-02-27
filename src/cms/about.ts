import type { TimelineEvent, Stat } from '@/types';

export const stats: Stat[] = [
  { value: '11+', label: { en: 'Years Experience', id: 'Tahun Pengalaman' } },
  { value: '150+', label: { en: 'More Than Employees', id: 'Lebih Dari Karyawan' } },
  { value: '500K+', label: { en: 'Parts/Month', id: 'Part/Bulan' } },
  { value: '200+', label: { en: 'Product Lines', id: 'Lini Produk' } }
];

export const timeline: TimelineEvent[] = [
  {
    year: '1995',
    title: { en: 'Company Founded', id: 'Perusahaan Didirikan' },
    description: {
      en: 'PT Cipta Metalindo Persada was established in Jakarta with a small workshop and a vision for manufacturing excellence.',
      id: 'PT Cipta Metalindo Persada didirikan di Jakarta dengan bengkel kecil dan visi untuk keunggulan manufaktur.'
    }
  },
  {
    year: '2002',
    title: { en: 'First Major Contract', id: 'Kontrak Besar Pertama' },
    description: {
      en: 'Secured our first major automotive parts contract, marking the beginning of rapid growth in the industry.',
      id: 'Mendapatkan kontrak suku cadang otomotif besar pertama, menandai awal pertumbuhan pesat di industri.'
    }
  },
  {
    year: '2008',
    title: { en: 'ISO 9001 Certification', id: 'Sertifikasi ISO 9001' },
    description: {
      en: 'Achieved ISO 9001:2008 certification, demonstrating our commitment to international quality standards.',
      id: 'Meraih sertifikasi ISO 9001:2008, menunjukkan komitmen kami terhadap standar kualitas internasional.'
    }
  },
  {
    year: '2014',
    title: { en: 'New Factory Expansion', id: 'Ekspansi Pabrik Baru' },
    description: {
      en: 'Opened our second manufacturing facility with advanced CNC machinery and automated production lines.',
      id: 'Membuka fasilitas manufaktur kedua dengan mesin CNC canggih dan jalur produksi otomatis.'
    }
  },
  {
    year: '2019',
    title: { en: 'Export Market Expansion', id: 'Ekspansi Pasar Ekspor' },
    description: {
      en: 'Expanded operations to serve international markets across Southeast Asia, Australia, and Europe.',
      id: 'Memperluas operasi untuk melayani pasar internasional di Asia Tenggara, Australia, dan Eropa.'
    }
  },
  {
    year: '2024',
    title: { en: 'Industry 4.0 Integration', id: 'Integrasi Industri 4.0' },
    description: {
      en: 'Implemented smart manufacturing systems with IoT integration and real-time production monitoring.',
      id: 'Mengimplementasikan sistem manufaktur pintar dengan integrasi IoT dan pemantauan produksi real-time.'
    }
  },

  // {
  //   year: '2028',
  //   title: { en: 'Export International Expansion', id: 'Ekspansi Pasar Ekspor' },
  //   description: {
  //     en: 'Expanded operations to serve international markets across Southeast Asia, Australia, and Europe.',
  //     id: 'Memperluas operasi untuk melayani pasar internasional di Asia Tenggara, Australia, dan Eropa.'
  //   }
  // },
];
