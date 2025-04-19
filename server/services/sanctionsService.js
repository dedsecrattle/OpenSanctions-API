import axios from 'axios';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = 'https://api.opensanctions.org/match/default';
const API_KEY = process.env.OPENSANCTIONS_API_KEY;
const ttl = Number(process.env.CACHE_TTL) || 600;

if (!API_KEY) throw new Error('Missing OPENSANCTIONS_API_KEY');

const cache = new NodeCache({ stdTTL: ttl });

export const searchSanctionsService = async (
  query,
  type = 'all',
  limit = 10,
  offset = 0
) => {
  const cacheKey = `${query}:${type}:${limit}:${offset}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const headers = {
    Authorization: API_KEY,
    'Content-Type': 'application/json'
  };
  const schema =
    type === 'individuals' ? 'Person' :
    type === 'entities' ? 'Organization' :
    'LegalEntity';


  const body = {
    queries: {
      q1: {
        properties: { name: [query] },
        ...(schema && { schema }),
      }
    }
  };
  const params = { limit: 100 };

  const resp = await axios.post(API_URL, body, { headers, params });
  const all = resp.data.responses.q1.results || [];
  const total = all.length;
  const pageSlice = all.slice(offset, offset + limit).map(r => ({
    id: r.id,
    name: r.caption || r.name,
    type: r.schema,
    identifier: r.properties?.sdn_id?.[0] || r.properties?.wikidataId?.[0] || null,
    nationality: r.properties?.nationality?.[0] || null,
    birthDate: r.properties?.birthDate?.[0] || null,
    birthPlace: r.properties?.birthPlace?.[0] || null,
    location: r.properties?.country?.[0] || r.properties?.address?.[0] || null
  }));

  const result = { total, results: pageSlice };
  cache.set(cacheKey, result);
  return result;
};
