import { SanctionType, SanctionSearchResult, APIResponse } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const searchSanctions = async (query: string, type: SanctionType = 'all'): Promise<SanctionSearchResult> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/sanctions/search?query=${encodeURIComponent(query)}&type=${type}`
    );
    
    if (!response.ok) {
      const errorData: APIResponse<null> = await response.json();
      throw new Error(errorData.message || 'Failed to fetch results');
    }
    
    const data: APIResponse<SanctionSearchResult> = await response.json();
    
    if (!data.success || !data.data) {
      throw new Error('Invalid response from server');
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching sanctions data:', error);
    throw error;
  }
};