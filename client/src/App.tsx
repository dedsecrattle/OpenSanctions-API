import React, { useState, useEffect } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import { searchSanctions } from './services/sanctionsService';
import { Result } from './types';
import Pagination from './components/Pagination';

const ITEMS_PER_PAGE = 10;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60_000,
      gcTime: 30 * 60_000,
      refetchOnWindowFocus: false
    }
  }
});

interface SanctionsData {
  total: number;
  results: Result[];
}

const AppContent: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [type, setType] = useState<'all' | 'individuals' | 'entities'>('all');
  const [page, setPage] = useState<number>(1);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const offset = (page - 1) * ITEMS_PER_PAGE;

  const queryResult = useQuery<SanctionsData, Error>({
    queryKey: ['sanctions', query, type, page],
    queryFn: () => searchSanctions(query, type, ITEMS_PER_PAGE, offset),
    enabled: trigger
  });

  const { data, error, isFetching, isSuccess, isError, refetch } = queryResult;

  useEffect(() => {
    if (isSuccess || isError) setTrigger(false);
  }, [isSuccess, isError]);

  const handleSearch = () => {
    if (!query.trim()) return;
    setPage(1);
    setTrigger(true);
    void refetch();
  };

  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">

          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                OFAC Sanctions Search Tool
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Search the Office of Foreign Assets Control (OFAC) sanctions lists
              </p>
            </div>
            <button
              onClick={() => setDarkMode(d => !d)}
              className="ml-4 text-gray-600 dark:text-gray-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? '🌞' : '🌙'}
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
            <SearchBar
              query={query}
              setQuery={setQuery}
              type={type}
              setType={setType}
              onSearch={handleSearch}
            />
          </div>
          {isFetching && (
            <p className="text-center text-gray-600 dark:text-gray-300">Loading…</p>
          )}
          {error && (
            <p className="text-center text-red-500">{error.message}</p>
          )}
          {data && data.results.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <ResultsList total={data.total} results={data.results} />
                <Pagination
                  page={page}
                  total={totalPages}
                  onPageChange={p => {
                    setPage(p);
                    setTrigger(true);
                    void refetch();
                  }}
                />
            </div>
          )}
          {data && data.results.length === 0 && !isFetching && (
            <p className="text-center text-gray-700 dark:text-gray-300 mt-4">
              No results found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
);

export default App;
