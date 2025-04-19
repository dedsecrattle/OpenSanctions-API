import { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import { searchSanctions } from './services/sanctionsService';
import { Result } from './types';

const queryClient = new QueryClient();

function AppContent() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'all' | 'individuals' | 'entities'>('all');
  const [page, setPage] = useState(1);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ['sanctions', query, type, page],
    queryFn: () => searchSanctions(query, type, 10, (page - 1) * 10),
    enabled: triggerSearch,
    onSettled: () => setTriggerSearch(false)
  });

  const handleSearch = () => {
    if (!query.trim()) return;
    setPage(1);
    setTriggerSearch(true);
    refetch();
  };

  const totalPages = data ? Math.ceil(data.total / 10) : 0;

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen py-10 px-4 md:px-10 bg-gray-100 dark:bg-gray-900`}>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center w-full text-gray-800 dark:text-gray-100">Sanctions Screening</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-5 right-6 text-sm text-gray-600 dark:text-gray-300"
          >
            {darkMode ? '🌞 Light' : '🌙 Dark'}
          </button>
        </div>

        <SearchBar query={query} setQuery={setQuery} type={type} setType={setType} onSearch={handleSearch} />

        {isFetching && <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>}
        {error && <p className="text-center text-red-500">{(error as Error).message}</p>}

        {data && data.results.length > 0 && (
          <>
            <ResultsList results={data.results} total={data.total} />
            <div className="flex justify-center mt-4 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPage(p);
                    setTriggerSearch(true);
                    refetch();
                  }}
                  className={`px-3 py-1 rounded-md border ${p === page ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
