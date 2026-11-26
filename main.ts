// NusaStat — entrypoint (Node 22, standard library only).
//
// The site is the static app/ folder beside this file: plain HTML, CSS
// and ES modules, no build step, nothing fetched over the network at
// runtime. This program hands it in: it copies app/ and screenshots/
// into the output directory and writes output/dossier.json, the summary
// the judge reads, using the vendored make.fun dossier library.
//
// The output directory itself is never deleted — the grader's filesystem
// is read-only except for that volume, so only its contents are cleared.
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function clearContents(dir) {
  // Remove everything inside dir, never dir itself.
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

mkdirSync(out, { recursive: true });
clearContents(out);

cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The scorer's own caps: only text_max_bytes shapes the bytes; the
// others refuse an entry the scorer would refuse (more than 4
// screenshots or one over 256 KiB; more than 993 entries in app/ or
// 16 MiB of app files).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);

console.log(`NusaStat dossier written to ${join(out, 'dossier.json')}`);
