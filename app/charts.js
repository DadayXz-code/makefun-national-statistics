// NusaStat — grafik kanvas tanpa dependensi dan tanpa jaringan.
// Menggambar grafik garis dan batang di elemen <canvas> yang diberi
// atribut data-chart. Semua warna datar supaya tampil konsisten.

const COLORS = {
  line: '#0b5d3b',
  line2: '#c8102e',
  bar: '#0b5d3b',
  barAlt: '#2e86ab',
  grid: '#e3e6e3',
  axis: '#5a625c',
  text: '#22301f',
};

function fitCanvas(canvas) {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(280, Math.round(rect.width));
  const height = Number(canvas.getAttribute('height') || 260);
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  const ctx = canvas.getContext('2d');
  ctx.scale(ratio, ratio);
  return { ctx, width, height };
}

function niceMax(values) {
  const max = Math.max(...values.filter((v) => v !== null && v !== undefined));
  const min = Math.min(...values.filter((v) => v !== null && v !== undefined));
  const span = max - min || 1;
  const step = Math.pow(10, Math.floor(Math.log10(span)));
  return { lo: Math.floor(min / step) * step - step * 0.2, hi: Math.ceil(max / step) * step + step * 0.2 };
}

export function drawLine(canvas, labels, values, options = {}) {
  const { ctx, width, height } = fitCanvas(canvas);
  const pad = { l: 52, r: 16, t: 16, b: 30 };
  const plotW = width - pad.l - pad.r;
  const plotH = height - pad.t - pad.b;
  const { lo, hi } = niceMax(values);
  const x = (i) => pad.l + (i / (labels.length - 1)) * plotW;
  const y = (v) => pad.t + (1 - (v - lo) / (hi - lo)) * plotH;

  ctx.font = '12px system-ui, sans-serif';
  ctx.fillStyle = COLORS.axis;
  ctx.strokeStyle = COLORS.grid;
  ctx.lineWidth = 1;
  for (let g = 0; g <= 4; g += 1) {
    const gv = lo + ((hi - lo) * g) / 4;
    const gy = y(gv);
    ctx.beginPath();
    ctx.moveTo(pad.l, gy);
    ctx.lineTo(width - pad.r, gy);
    ctx.stroke();
    ctx.textAlign = 'right';
    ctx.fillText((Math.abs(gv) < 0.05 ? 0 : gv).toFixed(1), pad.l - 8, gy + 4);
  }
  // Garis nol bila rentang melewatinya (mis. pertumbuhan PDB 2020).
  if (lo < 0 && hi > 0) {
    ctx.strokeStyle = '#9aa39c';
    ctx.beginPath();
    ctx.moveTo(pad.l, y(0));
    ctx.lineTo(width - pad.r, y(0));
    ctx.stroke();
  }
  ctx.textAlign = 'center';
  labels.forEach((label, i) => ctx.fillText(String(label), x(i), height - 8));

  const color = options.color || COLORS.line;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  let started = false;
  values.forEach((v, i) => {
    if (v === null || v === undefined) { started = false; return; }
    if (!started) { ctx.moveTo(x(i), y(v)); started = true; }
    else ctx.lineTo(x(i), y(v));
  });
  ctx.stroke();

  ctx.fillStyle = color;
  values.forEach((v, i) => {
    if (v === null || v === undefined) return;
    ctx.beginPath();
    ctx.arc(x(i), y(v), 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLORS.text;
    ctx.textAlign = 'center';
    ctx.fillText(v.toFixed(options.decimals ?? 1), x(i), y(v) - 10);
    ctx.fillStyle = color;
  });
}

export function drawBars(canvas, labels, values, options = {}) {
  const { ctx, width, height } = fitCanvas(canvas);
  const pad = { l: 52, r: 16, t: 16, b: 30 };
  const plotW = width - pad.l - pad.r;
  const plotH = height - pad.t - pad.b;
  const max = Math.max(...values.map((v) => Math.abs(v)));
  const lo = Math.min(0, ...values);
  const hi = max * 1.15 || 1;
  const x = (i) => pad.l + (i + 0.5) * (plotW / labels.length);
  const y = (v) => pad.t + (1 - (v - lo) / (hi - lo)) * plotH;
  const barW = Math.min(56, (plotW / labels.length) * 0.6);

  ctx.font = '12px system-ui, sans-serif';
  ctx.fillStyle = COLORS.axis;
  ctx.strokeStyle = COLORS.grid;
  ctx.lineWidth = 1;
  for (let g = 0; g <= 4; g += 1) {
    const gv = lo + ((hi - lo) * g) / 4;
    const gy = y(gv);
    ctx.beginPath();
    ctx.moveTo(pad.l, gy);
    ctx.lineTo(width - pad.r, gy);
    ctx.stroke();
    ctx.textAlign = 'right';
    ctx.fillText((Math.abs(gv) < 0.05 ? 0 : gv).toFixed(0), pad.l - 8, gy + 4);
  }
  if (lo < 0) {
    ctx.strokeStyle = '#9aa39c';
    ctx.beginPath();
    ctx.moveTo(pad.l, y(0));
    ctx.lineTo(width - pad.r, y(0));
    ctx.stroke();
  }
  ctx.textAlign = 'center';
  labels.forEach((label, i) => ctx.fillText(String(label), x(i), height - 8));

  values.forEach((v, i) => {
    const negative = v < 0;
    const top = negative ? y(0) : y(v);
    const h = Math.abs(y(v) - y(0));
    ctx.fillStyle = negative ? COLORS.line2 : (options.color || COLORS.bar);
    ctx.fillRect(x(i) - barW / 2, top, barW, Math.max(h, 1));
    if (negative) {
      // Nilai negatif: label putih di dalam batang, supaya tidak
      // bertabrakan dengan label tahun di bawah grafik.
      ctx.fillStyle = '#ffffff';
      ctx.fillText(v.toFixed(options.decimals ?? 1), x(i), top + h / 2 + 4);
    } else {
      ctx.fillStyle = COLORS.text;
      ctx.fillText(v.toFixed(options.decimals ?? 1), x(i), top - 6);
    }
  });
}

export function drawGroupedBars(canvas, labels, series, options = {}) {
  const { ctx, width, height } = fitCanvas(canvas);
  const pad = { l: 52, r: 16, t: 16, b: 30 };
  const plotW = width - pad.l - pad.r;
  const plotH = height - pad.t - pad.b;
  const all = series.flatMap((s) => s.values);
  const hi = Math.max(...all) * 1.15 || 1;
  const x = (i) => pad.l + (i + 0.5) * (plotW / labels.length);
  const y = (v) => pad.t + (1 - v / hi) * plotH;
  const groupW = Math.min(96, (plotW / labels.length) * 0.72);
  const barW = groupW / series.length;

  ctx.font = '12px system-ui, sans-serif';
  ctx.fillStyle = COLORS.axis;
  ctx.strokeStyle = COLORS.grid;
  ctx.lineWidth = 1;
  for (let g = 0; g <= 4; g += 1) {
    const gv = (hi * g) / 4;
    const gy = y(gv);
    ctx.beginPath();
    ctx.moveTo(pad.l, gy);
    ctx.lineTo(width - pad.r, gy);
    ctx.stroke();
    ctx.textAlign = 'right';
    ctx.fillText(gv.toFixed(0), pad.l - 8, gy + 4);
  }
  ctx.textAlign = 'center';
  labels.forEach((label, i) => ctx.fillText(String(label), x(i), height - 8));

  series.forEach((s, si) => {
    ctx.fillStyle = s.color || (si === 0 ? COLORS.bar : COLORS.barAlt);
    s.values.forEach((v, i) => {
      const bx = x(i) - groupW / 2 + si * barW;
      ctx.fillRect(bx + 1, y(v), barW - 2, Math.max(pad.t + plotH - y(v), 1));
    });
  });

  // Legenda sederhana di atas grafik.
  ctx.textAlign = 'left';
  series.forEach((s, si) => {
    const lx = pad.l + si * 150;
    ctx.fillStyle = s.color || (si === 0 ? COLORS.bar : COLORS.barAlt);
    ctx.fillRect(lx, 2, 12, 12);
    ctx.fillStyle = COLORS.text;
    ctx.fillText(s.label, lx + 17, 12);
  });
}
