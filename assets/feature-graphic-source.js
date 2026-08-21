// Generates the Play Store feature graphic (1024x500) and the site hero.
//
// Deliberately a script rather than a hand-made PNG, for the same reason
// the app's icons are (`~/savingsplan/assets/icon-source.js`): the
// artwork and the palette are defined once, so changing the tagline or
// the colour is an edit rather than a redraw. The geometry below is
// lifted from that file so the two can't drift apart.
//
// Usage (resvg isn't a committed dependency -- install it where you run
// this, same convention as the icon script):
//   npm install @resvg/resvg-js
//   node assets/feature-graphic-source.js assets/images

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { Resvg } = require('@resvg/resvg-js');

const OUT = process.argv[2] || path.join(__dirname, 'images');

// ---- copy of the app icon's palette, so the store listing and the
// ---- installed app are visibly the same product ----
const NAVY_TOP = '#1b3661';
const NAVY_BOTTOM = '#092144';
const GREEN_LIGHT = '#adf4b1';
const GREEN_DARK = '#4caf7d';
const TEAL_GLOW = '#236e7c';

const WORDMARK = 'Horizon';
const TAGLINE = 'Know where you\u2019re headed.'; // curly apostrophe, not a typewriter one

const W = 1024;
const H = 500;

// ---- icon geometry, in the icon's own 1024x1024 coordinate space ----
const CX = 512;
const CY = 460;
const RING_R = 300;
const RING_W = 42;
const GAP_HALF = 55;
const HORIZON_Y = 486;
const SUN_CX = 512;
const SUN_CY = 440;
const SUN_R = 118;
const DOLLAR_SIZE = 145;
const DOLLAR_BASELINE = 447;

function polarToCartesian(cx, cy, r, angleDeg) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function describeArc(cx, cy, r, startDeg, endDeg) {
  const start = polarToCartesian(cx, cy, r, startDeg);
  const end = polarToCartesian(cx, cy, r, endDeg);
  const sweep = (((endDeg - startDeg) % 360) + 360) % 360;
  const largeArc = sweep > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

function ray(angleDeg, len, startGap) {
  const inner = polarToCartesian(SUN_CX, SUN_CY, SUN_R + startGap, angleDeg);
  const outer = polarToCartesian(SUN_CX, SUN_CY, SUN_R + startGap + len, angleDeg);
  return `<line x1="${inner.x.toFixed(1)}" y1="${inner.y.toFixed(1)}" x2="${outer.x.toFixed(1)}" y2="${outer.y.toFixed(1)}" stroke="url(#whiteGrad)" stroke-width="26" stroke-linecap="round"/>`;
}

// The icon art spans roughly y 145..811 in its own space. Scaled to sit
// with a comfortable margin top and bottom, then nudged left so the
// wordmark has the right-hand two thirds -- the same balance Runway's
// feature graphic uses.
const SCALE = 0.62;
const ICON_CENTRE_X = 252;
const ICON_CENTRE_Y = 250;
const ART_CENTRE_Y = 478;

const artwork = `
  <g transform="translate(${(ICON_CENTRE_X - CX * SCALE).toFixed(2)} ${(ICON_CENTRE_Y - ART_CENTRE_Y * SCALE).toFixed(2)}) scale(${SCALE})">
    <circle cx="${CX}" cy="${CY}" r="300" fill="url(#glowGrad)"/>
    <path d="${describeArc(CX, CY, RING_R, 90 + GAP_HALF, 90 - GAP_HALF + 360)}"
          fill="none" stroke="url(#arcGrad)" stroke-width="${RING_W}" stroke-linecap="round"/>
    <g clip-path="url(#sunClip)">
      <circle cx="${SUN_CX}" cy="${SUN_CY}" r="${SUN_R}" fill="url(#whiteGrad)" mask="url(#sunKnockout)"/>
    </g>
    ${[-90, -52, -128].map((a) => ray(a, 76, 14)).join('\n    ')}
    <rect x="250" y="${HORIZON_Y - 15}" width="524" height="30" rx="15" fill="url(#whiteGrad)"/>
    <path d="M 512 616 L 402 782" stroke="url(#chevronGrad)" stroke-width="58" stroke-linecap="round" fill="none"/>
    <path d="M 512 616 L 622 782" stroke="url(#chevronGrad)" stroke-width="58" stroke-linecap="round" fill="none"/>
  </g>
`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0" stop-color="${NAVY_TOP}"/>
      <stop offset="1" stop-color="${NAVY_BOTTOM}"/>
    </linearGradient>
    <linearGradient id="arcGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${GREEN_LIGHT}"/>
      <stop offset="1" stop-color="${GREEN_DARK}"/>
    </linearGradient>
    <linearGradient id="chevronGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${GREEN_LIGHT}"/>
      <stop offset="1" stop-color="${GREEN_DARK}"/>
    </linearGradient>
    <radialGradient id="glowGrad" cx="0.5" cy="0.42" r="0.55">
      <stop offset="0" stop-color="${TEAL_GLOW}" stop-opacity="0.9"/>
      <stop offset="1" stop-color="${TEAL_GLOW}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="whiteGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#eef3f8"/>
    </linearGradient>
    <clipPath id="sunClip">
      <rect x="0" y="0" width="1024" height="${HORIZON_Y}"/>
    </clipPath>
    <mask id="sunKnockout" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024">
      <rect x="0" y="0" width="1024" height="1024" fill="white"/>
      <text x="${SUN_CX}" y="${DOLLAR_BASELINE}" font-family="DejaVu Sans" font-size="${DOLLAR_SIZE}"
            font-weight="bold" text-anchor="middle" fill="black">$</text>
    </mask>
  </defs>

  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#bgGrad)"/>
  ${artwork}

  <text x="500" y="238" font-family="DejaVu Sans" font-size="86" fill="#ffffff">${WORDMARK}</text>
  <text x="503" y="300" font-family="DejaVu Sans" font-size="34" fill="#e6edf6">${TAGLINE}</text>
</svg>`;

// ---- PNG surgery: drop the alpha channel ----
//
// Google Play rejects a feature graphic that has one, and resvg always
// renders RGBA. The background here is fully opaque, so every alpha byte
// is already 255 and dropping the channel changes not a single visible
// pixel -- but the file has to SAY it's opaque, and only re-encoding
// does that. Done here rather than as a manual step afterwards, because
// a manual step is one that gets skipped.

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
}

/** Re-encodes an 8-bit RGBA PNG as 8-bit RGB, discarding the alpha channel. */
function stripAlpha(pngBuffer) {
  const idat = [];
  let width = 0;
  let height = 0;

  for (let offset = 8; offset < pngBuffer.length; ) {
    const length = pngBuffer.readUInt32BE(offset);
    const type = pngBuffer.toString('ascii', offset + 4, offset + 8);
    const data = pngBuffer.subarray(offset + 8, offset + 8 + length);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      if (data[8] !== 8 || data[9] !== 6) throw new Error(`expected 8-bit RGBA, got depth ${data[8]} type ${data[9]}`);
      if (data[12] !== 0) throw new Error('interlaced PNG not handled');
    }
    if (type === 'IDAT') idat.push(data);
    offset += 12 + length;
  }

  const raw = zlib.inflateSync(Buffer.concat(idat));
  const srcStride = width * 4;
  const out = Buffer.alloc(height * (1 + width * 3));
  const line = Buffer.alloc(srcStride);
  const previous = Buffer.alloc(srcStride);

  for (let y = 0; y < height; y++) {
    const filter = raw[y * (srcStride + 1)];
    const src = raw.subarray(y * (srcStride + 1) + 1, (y + 1) * (srcStride + 1));

    // Undo the row filter, which needs the reconstructed bytes of this
    // row and the one above -- not the encoded ones.
    for (let x = 0; x < srcStride; x++) {
      const a = x >= 4 ? line[x - 4] : 0;
      const b = previous[x];
      const c = x >= 4 ? previous[x - 4] : 0;
      const value = src[x];
      line[x] =
        filter === 0 ? value
        : filter === 1 ? (value + a) & 0xff
        : filter === 2 ? (value + b) & 0xff
        : filter === 3 ? (value + ((a + b) >> 1)) & 0xff
        : filter === 4 ? (value + paeth(a, b, c)) & 0xff
        : (() => { throw new Error(`unknown PNG filter ${filter}`); })();
    }

    // Written back out unfiltered (filter 0): simpler, and deflate still
    // does the compressing.
    const rowStart = y * (1 + width * 3);
    out[rowStart] = 0;
    for (let x = 0; x < width; x++) {
      out[rowStart + 1 + x * 3] = line[x * 4];
      out[rowStart + 2 + x * 3] = line[x * 4 + 1];
      out[rowStart + 3 + x * 3] = line[x * 4 + 2];
    }
    line.copy(previous);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2; // RGB, no alpha
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(out, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

fs.mkdirSync(OUT, { recursive: true });

const rendered = new Resvg(svg, { fitTo: { mode: 'width', value: W }, background: NAVY_BOTTOM })
  .render()
  .asPng();
const opaque = stripAlpha(rendered);

fs.writeFileSync(path.join(OUT, 'feature-graphic.png'), opaque);
console.log(`wrote ${path.join(OUT, 'feature-graphic.png')} (${W}x${H}, no alpha, ${opaque.length} bytes)`);
