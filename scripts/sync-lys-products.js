// Sync products from lys-cosmetics.com into public/data/lysProducts.json
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.LYS_BASE_URL || 'https://www.lys-cosmetics.com';
const OUTPUT_PATH = path.resolve(__dirname, '../public/data/lysProducts.json');

async function fetchJson(url, init = {}) {
  const res = await fetch(url, { headers: { 'accept': 'application/json' }, ...init });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function fetchViaPublicList() {
  const products = [];
  const limit = 250;
  for (let page = 1; page <= 20; page++) {
    const url = `${BASE_URL}/products.json?limit=${limit}&page=${page}`;
    try {
      const data = await fetchJson(url);
      if (!data?.products?.length) break;
      products.push(...data.products);
      if (data.products.length < limit) break;
    } catch (e) {
      if (products.length === 0) return null;
      break;
    }
  }
  return products;
}

function parseSitemapProducts(xml) {
  const handles = [];
  const locRegex = /<loc>\s*([^<]+)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    const url = match[1];
    const idx = url.indexOf('/products/');
    if (idx !== -1) {
      const handle = url.substring(idx + '/products/'.length).replace(/\/?(#.*)?$/, '').trim();
      if (handle) handles.push(handle);
    }
  }
  return Array.from(new Set(handles));
}

async function fetchViaSitemap() {
  try {
    const xmlIndex = await fetchText(`${BASE_URL}/sitemap.xml`);
    const m = xmlIndex.match(/<loc>\s*([^<]*sitemap_products[^<]*)<\/loc>/);
    const productSitemapUrl = m ? m[1] : `${BASE_URL}/sitemap_products_1.xml`;
    const xml = await fetchText(productSitemapUrl);
    const handles = parseSitemapProducts(xml).slice(0, 200);
    const products = [];
    for (const handle of handles) {
      try {
        const data = await fetchJson(`${BASE_URL}/products/${handle}.json`);
        if (data?.product) products.push(data.product);
      } catch {}
    }
    return products;
  } catch {
    return null;
  }
}

function mapToZbukurohuProducts(shopifyProducts) {
  return shopifyProducts.map((p) => {
    const firstVariant = Array.isArray(p.variants) && p.variants.length > 0 ? p.variants[0] : null;
    const firstImage = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null;
    const stock = typeof firstVariant?.inventory_quantity === 'number' ? Math.max(0, firstVariant.inventory_quantity) : (firstVariant?.available ? 10 : 0);
    const priceNumber = firstVariant?.price ? Number(firstVariant.price) : 0;
    return {
      id: String(p.id ?? p.handle ?? Math.random().toString(36).slice(2)),
      name: p.title ?? 'Produkt',
      category: p.product_type || 'Të tjera',
      brand: p.vendor || 'LYS',
      price: Number.isFinite(priceNumber) ? priceNumber : 0,
      stock,
      shopName: 'LYS Cosmetics',
      shopCity: 'Kosovë',
      image: firstImage?.src || null,
      description: (p.body_html || '').replace(/<[^>]+>/g, '').slice(0, 300),
      rating: 4.6,
      reviews: Math.floor(50 + Math.random() * 300),
    };
  });
}

async function main() {
  console.log('Syncing products from', BASE_URL);
  let products = await fetchViaPublicList();
  if (!products || products.length === 0) {
    console.log('Public list blocked or empty. Trying sitemap...');
    products = await fetchViaSitemap();
  }
  if (!products || products.length === 0) {
    console.error('No products fetched. Provide Shopify Storefront API creds in .env to enable full sync.');
    process.exit(1);
  }

  const mapped = mapToZbukurohuProducts(products);
  await fs.promises.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.promises.writeFile(OUTPUT_PATH, JSON.stringify(mapped, null, 2), 'utf8');
  console.log(`Saved ${mapped.length} products to ${path.relative(process.cwd(), OUTPUT_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
