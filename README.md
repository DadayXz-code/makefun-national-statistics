# makefun-national-statistics

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/DadayXz-code/makefun-national-statistics/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/DadayXz-code/makefun-national-statistics/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**NusaStat** — portal statistik nasional Indonesia: angka resmi 2019–2024 untuk penduduk, ekonomi, harga, tenaga kerja, perdagangan, kesehatan, dan pendidikan, dalam 8 halaman statis dengan grafik kanvas yang digambar di perangkat pengunjung (tanpa jaringan saat dibuka). Data diringkas dari publikasi BPS, Bank Dunia (World Development Indicators), dan Kemenkes (SSGI/SKI), dengan catatan sumber di kaki setiap halaman.

## Run it

```sh
node serve.ts
```

Lalu buka http://localhost:8080. Untuk membangun dossier yang dinilai juri:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Isi situs

- `app/index.html` — beranda: 6 indikator utama 2024 + grafik PDB dan kemiskinan.
- `app/population.html`, `economy.html`, `prices.html`, `labour.html`, `trade.html`, `health.html`, `education.html` — satu halaman per topik, masing-masing dengan kartu KPI, grafik, dan tabel tahunan 2019–2024.
- `app/data.js` — semua angka (BPS, Bank Dunia, SSGI/SKI); `app/charts.js` — grafik garis/batang kanvas; `app/main.js` — pengikat halaman.
- `screenshots/` — 4 tangkapan layar asli dari situs yang berjalan (desktop + ponsel).

---

<sub>Entered on [make.fun](https://make.fun/?ref=c1yxpfdh&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
