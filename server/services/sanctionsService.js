import axios from 'axios';

const API_BASE_URL = 'https://api.opensanctions.org/v1';
const API_KEY = process.env.OPENSANCTIONS_API_KEY;

export const searchSanctions = async (query, type = 'all') => {
  try {
    const params = {
      q: query,
      api_key: API_KEY,
      limit: 10
    };
    
    if (type === 'individuals') {
      params.schema = 'Person';
    } else if (type === 'entities') {
      params.schema = 'Organization';
    }
    
    const response = await axios.get(`${API_BASE_URL}/match`, { params });
    
    return {
      total: response.data.total,
      results: response.data.results.map(result => ({
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
    throw new Error('Failed to fetch sanctions data');
  }
};