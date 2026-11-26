// NusaStat — data statistik nasional Indonesia, 2019-2024.
// Angka diringkas dari publikasi resmi: BPS (Badan Pusat Statistik),
// Bank Dunia (World Development Indicators) dan Kemenkes (SSGI/SKI).
// Nilai dibulatkan ke satu desimal agar mudah dibaca; lihat catatan
// sumber di kaki setiap halaman untuk definisi dan tanggal rilis.

export const YEARS = [2019, 2020, 2021, 2022, 2023, 2024];

export const POPULATION = {
  // Juta jiwa, pertengahan tahun (BPS, Proyeksi Penduduk 2020-2050;
  // 2020 = hasil Sensus Penduduk 2020).
  total: [268.07, 270.2, 272.68, 275.77, 278.7, 281.6],
  // Laju pertumbuhan penduduk, % per tahun.
  growth: [1.15, 0.79, 0.92, 1.13, 1.06, 1.04],
  // Juta jiwa, 2024: laki-laki dan perempuan (BPS).
  male2024: 141.9,
  female2024: 139.7,
  // Jiwa per km persegi, 2023.
  density2023: 147,
  // Lima provinsi berpenduduk terbanyak, juta jiwa, proyeksi 2024 (BPS).
  provinces2024: [
    { name: 'Jawa Barat', value: 49.94 },
    { name: 'Jawa Timur', value: 41.81 },
    { name: 'Jawa Tengah', value: 37.89 },
    { name: 'Sumatera Utara', value: 15.59 },
    { name: 'Banten', value: 12.43 },
  ],
};

export const ECONOMY = {
  // Pertumbuhan PDB riil, % yoy (BPS).
  gdpGrowth: [5.02, -2.07, 3.69, 5.31, 5.05, 5.03],
  // PDB nominal, triliun USD (Bank Dunia).
  gdpNominal: [1.12, 1.06, 1.19, 1.32, 1.37, 1.4],
  // PDB per kapita nominal, USD (Bank Dunia).
  gdpPerCapita: [4107, 3854, 4287, 4731, 4876, 4925],
};

export const PRICES = {
  // Inflasi IHK Desember, % yoy (BPS).
  cpiDecember: [2.72, 1.68, 1.87, 5.51, 2.61, 1.57],
  // Inflasi IHK rata-rata tahunan, % (Bank Dunia).
  cpiAverage: [3.03, 1.92, 1.56, 4.21, 3.67, 2.18],
};

export const LABOUR = {
  // Tingkat Pengangguran Terbuka, % angkatan kerja, Agustus (BPS).
  unemployment: [5.23, 7.07, 6.49, 5.86, 5.32, 4.91],
  // Juta orang, Agustus 2024 (BPS, Sakernas).
  labourForce2024: 149.38,
  employed2024: 142.05,
  unemployed2024: 7.33,
};

export const POVERTY = {
  // Persentase penduduk miskin, September (BPS).
  rate: [9.22, 10.19, 9.71, 9.57, 9.36, 8.57],
  // Juta orang miskin, September 2024 (BPS).
  poor2024: 24.06,
};

export const TRADE = {
  // Miliar USD (BPS).
  exports: [167.7, 163.2, 231.6, 291.9, 258.8, 264.7],
  imports: [171.3, 141.6, 196.2, 237.5, 221.9, 233.7],
  // Neraca perdagangan, miliar USD (ekspor dikurangi impor).
  balance: [-3.6, 21.6, 35.4, 54.4, 36.9, 31.0],
};

export const HEALTH = {
  // Prevalensi stunting balita, % (SSGI Kemenkes; 2020 tidak ada survei,
  // 2023 dari Survei Kesehatan Indonesia/SKI; 2024 = 19,8%).
  stunting: [27.7, null, 24.4, 21.6, 21.5, 19.8],
  // Status gizi balita 2024, % (SSGI 2024, Kemenkes).
  wasting2024: 7.4,
  underweight2024: 16.8,
  // Angka Harapan Hidup saat lahir, tahun (BPS).
  lifeExpectancy2023: 73.93,
  lifeExpectancy2024: 74.15,
  // Prevalensi stunting tertinggi dan terendah menurut provinsi, 2024 (SSGI).
  stuntingProvinces2024: [
    { name: 'Papua Pegunungan', value: 40.0 },
    { name: 'Nusa Tenggara Timur', value: 37.0 },
    { name: 'Sulawesi Barat', value: 35.4 },
    { name: 'Bali (terendah)', value: 8.7 },
  ],
};

export const EDUCATION = {
  // Indeks Pembangunan Manusia (BPS, seri revisi rilis 2025-2026).
  hdi: [71.92, 72.81, 73.16, 73.77, 74.39, 75.02],
  // Harapan Lama Sekolah, tahun (BPS).
  expectedSchooling: [12.87, 12.98, 13.05, 13.1, 13.15, 13.21],
  // Rata-rata Lama Sekolah penduduk 25+, tahun (BPS).
  meanSchooling: [8.34, 8.36, 8.54, 8.69, 8.82, 8.97],
};

export const SOURCES = {
  bps: 'Badan Pusat Statistik (BPS) — bps.go.id',
  worldBank: 'Bank Dunia, World Development Indicators',
  ssgi: 'Kemenkes RI — Survei Status Gizi Indonesia (SSGI) & SKI',
};
