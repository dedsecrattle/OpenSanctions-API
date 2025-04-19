import axios from 'axios';
import { Result } from '../types';

export const searchSanctions = async (
  query: string,
  type: 'all' | 'individuals' | 'entities',
  limit = 10,
  offset = 0
): Promise<{ results: Result[]; total: number }> => {
  const res = await axios.get('http://localhost:5000/api/sanctions/search', {
    params: { query, type, limit, offset },
  });
  return res.data.data;
};
