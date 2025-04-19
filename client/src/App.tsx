// src/App.tsx
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ResultsTable from './components/ResultsTable';
import { SanctionResult } from './types';

const App: React.FC = () => {
  const [results, setResults] = useState<SanctionResult[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchResults = (data: { total: number; results: SanctionResult[] }) => {
    setResults(data.results);
    setTotalResults(data.total);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sanctions Screening Tool</h1>
      </header>
      <main className="app-content">
        <SearchBar 
          onResults={handleSearchResults} 
          setLoading={setLoading}
          setError={setError}
        />
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <ResultsTable 
          results={results} 
          totalResults={totalResults}
          loading={loading}
        />
      </main>
    </div>
  );
};

export default App;