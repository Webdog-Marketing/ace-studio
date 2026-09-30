import { fallbackServices, fallbackTeam } from '../data/fallback.js';

const TOKEN = import.meta.env.AIRTABLE_TOKEN;
const BASE = import.meta.env.AIRTABLE_BASE_ID;

// Fetches every row with "Show" ticked, sorted by "Order".
// Returns null when Airtable isn't configured or the request fails.
async function fetchTable(table) {
  if (!TOKEN || !BASE) {
    console.warn(`[airtable] Not configured, using fallback data for ${table}.`);
    return null;
  }
  const rows = [];
  let offset;
  try {
    do {
      const url = new URL(`https://api.airtable.com/v0/${BASE}/${encodeURIComponent(table)}`);
      url.searchParams.set('filterByFormula', '{Show}');
      url.searchParams.set('sort[0][field]', 'Order');
      url.searchParams.set('sort[0][direction]', 'asc');
      if (offset) url.searchParams.set('offset', offset);
      const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } });
      if (!res.ok) {
        console.warn(`[airtable] ${table}: ${res.status} ${await res.text()}`);
        return null;
      }
      const data = await res.json();
      rows.push(...data.records.map((r) => r.fields));
      offset = data.offset;
    } while (offset);
    return rows;
  } catch (err) {
    console.warn(`[airtable] ${table}: ${err.message}`);
    return null;
  }
}

const num = (v) => (typeof v === 'number' ? v : undefined);
const firstPhoto = (v) => (Array.isArray(v) && v[0]?.url) || null;
const handle = (v) =>
  (v || '').trim().replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/^@/, '').replace(/\/$/, '');

export async function getServices() {
  const rows = await fetchTable('Services');
  if (!rows) return fallbackServices;
  return rows
    .filter((f) => f.Name)
    .map((f) => ({
      name: f.Name,
      price: num(f.Price),
      studentPrice: num(f['Student Price']),
      from: Boolean(f['Price From']),
      comingSoon: Boolean(f['Coming Soon']),
      description: f.Description || '',
    }));
}

export async function getTeam() {
  const rows = await fetchTable('Team');
  if (!rows) return fallbackTeam;
  return rows
    .filter((f) => f.Name)
    .map((f) => ({
      name: f.Name,
      role: f.Role || 'Barber',
      instagram: handle(f.Instagram),
      photo: firstPhoto(f.Photo),
    }));
}

export async function getGallery() {
  const rows = await fetchTable('Gallery');
  if (!rows) return [];
  return rows
    .map((f) => ({ photo: firstPhoto(f.Photo), alt: f['Alt Text'] || 'Haircut at ACE Studio, Exeter' }))
    .filter((g) => g.photo);
}
