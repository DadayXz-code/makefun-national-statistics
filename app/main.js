// NusaStat — logika halaman: menggambar grafik dari data.js dan
// menandai tautan navigasi halaman yang sedang dibuka.
import {
  YEARS,
  POPULATION,
  ECONOMY,
  PRICES,
  LABOUR,
  POVERTY,
  TRADE,
  HEALTH,
  EDUCATION,
} from './data.js';
import { drawLine, drawBars, drawGroupedBars } from './charts.js';

const DATA = {
  population: POPULATION.total,
  populationGrowth: POPULATION.growth,
  gdpGrowth: ECONOMY.gdpGrowth,
  gdpNominal: ECONOMY.gdpNominal,
  gdpPerCapita: ECONOMY.gdpPerCapita,
  cpiDecember: PRICES.cpiDecember,
  cpiAverage: PRICES.cpiAverage,
  unemployment: LABOUR.unemployment,
  poverty: POVERTY.rate,
  exports: TRADE.exports,
  imports: TRADE.imports,
  balance: TRADE.balance,
  stunting: HEALTH.stunting,
  hdi: EDUCATION.hdi,
  expectedSchooling: EDUCATION.expectedSchooling,
  meanSchooling: EDUCATION.meanSchooling,
};

function drawChart(canvas) {
  const kind = canvas.dataset.chart;
  const key = canvas.dataset.series;
  const decimals = Number(canvas.dataset.decimals ?? 1);
  if (kind === 'line') {
    drawLine(canvas, YEARS, DATA[key], { decimals });
  } else if (kind === 'bars') {
    drawBars(canvas, YEARS, DATA[key], { decimals });
  } else if (kind === 'grouped') {
    const series = key.split(',').map((k, i) => ({
      label: canvas.dataset.labels.split('|')[i],
      values: DATA[k.trim()],
      color: i === 0 ? '#0b5d3b' : '#2e86ab',
    }));
    drawGroupedBars(canvas, YEARS, series, { decimals });
  }
}

function renderAll() {
  document.querySelectorAll('canvas[data-chart]').forEach(drawChart);
}

function markActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach((a) => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

function fillYears() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = '2024';
  });
}

window.addEventListener('DOMContentLoaded', () => {
  renderAll();
  markActiveNav();
  fillYears();
});
window.addEventListener('resize', () => {
  // Gambar ulang supaya grafik mengikuti lebar layar baru.
  clearTimeout(window.__nusastatTimer);
  window.__nusastatTimer = setTimeout(renderAll, 150);
});
