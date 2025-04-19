export interface SanctionResult {
    id: string;
    name: string;
    type: string;
    identifier: string | null;
    nationality: string | null;
    birthDate: string | null;
    birthPlace: string | null;
    location: string | null;
  }
  
  export interface SanctionSearchResult {
    total: number;
    results: SanctionResult[];
  }
  
  export interface APIResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: unknown;
  }
  
  export type SanctionType = 'all' | 'individuals' | 'entities';
  
  export interface SearchBarProps {
    onResults: (data: SanctionSearchResult) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
  }
  
  export interface ResultsTableProps {
    results: SanctionResult[];
    totalResults: number;
    loading: boolean;
  }