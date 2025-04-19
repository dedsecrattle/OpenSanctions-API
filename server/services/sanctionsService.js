import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const API_URL = 'https://api.opensanctions.org/match/default';
const API_KEY = process.env.OPENSANCTIONS_API_KEY;

if (!API_KEY) {
  throw new Error('Please set the OPENSANCTIONS_API_KEY environment variable');
}

export const searchSanctions = async (query, type = 'all') => {
  try {
    const headers = {
      'Authorization': API_KEY,
      'Content-Type': 'application/json'
    };

    const schema =
      type === 'individuals' ? 'Person' :
      type === 'entities' ? 'Organization' :
      undefined;

    const requestBody = {
      queries: {
        q1: {
          schema,
          properties: {
            name: [query]
          }
        }
      }
    };

    const response = await axios.post(requestBody, { headers });

    const results = response.data.responses.q1.results || [];

    return {
      total: results.length,
      results: results.map(result => ({
        id: result.id,
        name: result.caption || result.name,
        type: result.schema,
        identifier: result.properties?.sdn_id?.[0] || result.properties?.wikidataId?.[0] || null,
        nationality: result.properties?.nationality?.[0] || null,
        birthDate: result.properties?.birthDate?.[0] || null,
        birthPlace: result.properties?.birthPlace?.[0] || null,
        location: result.properties?.country?.[0] || result.properties?.address?.[0] || null
      }))
    };
  } catch (error) {
    console.error('OpenSanctions API error:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.detail || error.message || 'Failed to fetch sanctions data'
    );
  }
};
