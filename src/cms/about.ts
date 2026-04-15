import type { TimelineEvent, Stat } from '@/types';

export const stats: Stat[] = [
  { value: '11+', label: { en: 'Years Experience', id: 'Tahun Pengalaman' } },
  { value: '150+', label: { en: 'More Than Employees', id: 'Lebih Dari Karyawan' } },
  { value: '200+', label: { en: 'Product Lines', id: 'Lini Produk' } },
  { value: '500K+', label: { en: 'Parts/Month', id: 'Part/Bulan' } }
];

export const timeline: TimelineEvent[] = [
  {
    year: '2014',
    title: { en: 'Company Founded', id: 'Perusahaan Didirikan' },
    description: {
      en: 'PT Cipta Metalindo Persada was established in Tangerang with a small workshop and a vision for manufacturing excellence.',
      id: 'PT Cipta Metalindo Persada didirikan di Tangerang dengan bengkel kecil dan visi untuk keunggulan manufaktur.'
    },
    image: "https://res.cloudinary.com/dtny14e7t/image/upload/samples/zoom"
  },
  {
    year: '2015',
    title: { en: 'First Major Contract', id: 'Kontrak Besar Pertama' },
    description: {
      en: 'Secured our first major automotive parts contract, marking the beginning of rapid growth in the industry.',
      id: 'Mendapatkan kontrak suku cadang otomotif besar pertama, menandai awal pertumbuhan pesat di industri.'
    },
    image: "https://res.cloudinary.com/dtny14e7t/image/upload/samples/zoom"
  },
  {
    year: '2015',
    title: { en: 'ISO 9001 Certification', id: 'Sertifikasi ISO 9001' },
    description: {
      en: 'Achieved ISO 9001:2008 certification and in 2021: ISO 9001:2015 demonstrating our commitment to international quality standards.',
      id: 'Meraih sertifikasi ISO 9001:2008 dan pada tahun 2021: ISO 9001:2015 yang menunjukkan komitmen kami terhadap standar kualitas internasional.'
    },
    image: "https://res.cloudinary.com/dtny14e7t/image/upload/samples/zoom"
  },
  {
    year: '2016',
    title: { en: 'Move to Balaraja Production Plant', id: 'Pindah ke Balaraja Production Plant' },
    description: {
      en: 'Relocated to a larger production facility in Balaraja to accommodate growing demand and expand manufacturing capabilities.',
      id: 'Pindah ke fasilitas produksi yang lebih besar di Balaraja untuk mengakomodasi permintaan yang meningkat dan memperluas kemampuan manufaktur.'
    },
    image: "https://res.cloudinary.com/dtny14e7t/image/upload/samples/zoom"
  },
  {
    year: '2019',
    title: { en: 'Factory Expansion', id: 'Ekspansi Pabrik' },
    description: {
      en: 'Expansion of Balaraja factory to increase production capacity and meet growing demand.',
      id: 'Ekspansi pabrik Balaraja untuk meningkatkan kapasitas produksi dan memenuhi permintaan yang meningkat.'
    },
    image: "https://res.cloudinary.com/dtny14e7t/image/upload/samples/coffee", 
  },
  {
    year: '2024',
    title: { en: 'Procurement of Advanced Manufacturing Machinery', id: 'Pengadaan Mesin Manufaktur Berkualitas Tinggi' },
    description: {
      en: 'Procurement of Robot Welding, Stamping Machines, and Feeder Machines to enhance production efficiency and Quality.',
      id: 'Pengadaan Robot Welding, Stamping Machines, dan Feeder Machines untuk meningkatkan efisiensi produksi dan Kualitas.'
    },
    image: "https://res.cloudinary.com/dtny14e7t/image/upload/samples/shoe",
  },

  // {
  //   year: '2028',
  //   title: { en: 'Export International Expansion', id: 'Ekspansi Pasar Ekspor' },
  //   description: {
  //     en: 'Expanded operations to serve international markets across Southeast Asia, Australia, and Europe.',
  //     id: 'Memperluas operasi untuk melayani pasar internasional di Asia Tenggara, Australia, dan Eropa.'
  //   },
  //   image: {
  //     en: "https://res.cloudinary.com/dtny14e7t/image/upload/samples/zoom",
  //     id: "https://res.cloudinary.com/dtny14e7t/image/upload/samples/zoom"
  //   }
  // },
];
