// Generates favicons and app icons from the logo mark. Run with `npm run icons` after changing the logo.
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const out = new URL("../public/", import.meta.url);

const halves = `<path d="M30 16a18 18 0 0 0 0 36z" fill="#c6f432"/><path d="M34 12a18 18 0 0 1 0 36z" fill="#f2f2ec"/>`;

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#0e0f0d"/>${halves}</svg>`;

// Full-bleed with extra padding so the mark survives circular masks.
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#0e0f0d"/><g transform="translate(9.6 9.6) scale(0.7)">${halves}</g></svg>`;

// iOS adds its own rounded corners.
const square = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#0e0f0d"/><g transform="translate(4.8 4.8) scale(0.85)">${halves}</g></svg>`;

const png = (svg, size) => sharp(Buffer.from(svg), { density: 1024 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

/** ICO container with embedded PNG images (supported by every modern browser). */
const ico = (images) => {
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0);
    header.writeUInt16LE(1, 2);
    header.writeUInt16LE(images.length, 4);
    let offset = 6 + images.length * 16;
    const entries = images.map(({ size, data }) => {
        const entry = Buffer.alloc(16);
        entry.writeUInt8(size >= 256 ? 0 : size, 0);
        entry.writeUInt8(size >= 256 ? 0 : size, 1);
        entry.writeUInt8(0, 2);
        entry.writeUInt8(0, 3);
        entry.writeUInt16LE(1, 4);
        entry.writeUInt16LE(32, 6);
        entry.writeUInt32LE(data.length, 8);
        entry.writeUInt32LE(offset, 12);
        offset += data.length;
        return entry;
    });
    return Buffer.concat([header, ...entries, ...images.map(({ data }) => data)]);
};

await writeFile(new URL("favicon.svg", out), mark);
await writeFile(new URL("favicon.ico", out), ico([{ size: 16, data: await png(mark, 16) }, { size: 32, data: await png(mark, 32) }, { size: 48, data: await png(mark, 48) }]));
await writeFile(new URL("apple-touch-icon.png", out), await png(square, 180));
await writeFile(new URL("icon-192.png", out), await png(mark, 192));
await writeFile(new URL("icon-512.png", out), await png(mark, 512));
await writeFile(new URL("icon-maskable-512.png", out), await png(maskable, 512));

console.log("Icons written to public/");
