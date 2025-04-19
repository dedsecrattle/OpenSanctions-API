import React, { useState, FormEvent } from 'react';
import { searchSanctions } from '../services/sanctionsApi';
import { SearchBarProps, SanctionType } from '../types';

const SearchBar: React.FC<SearchBarProps> = ({ onResults, setLoading, setError }) => {
  const [query, setQuery] = useState<string>('');
  const [type, setType] = useState<SanctionType>('all');

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const data = await searchSanctions(query, type);
      onResults(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <div className="search-input-group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter name to search..."
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </div>
        
        <div className="filter-options">
          <div className="filter-label">Filter by:</div>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                value="all"
                checked={type === 'all'}
                onChange={() => setType('all')}
              />
              All
            </label>
            <label className="radio-option">
              <input
                type="radio"
                value="individuals"
                checked={type === 'individuals'}
                onChange={() => setType('individuals')}
              />
              Individuals
            </label>
            <label className="radio-option">
              <input
                type="radio"
                value="entities"
                checked={type === 'entities'}
                onChange={() => setType('entities')}
              />
              Entities
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;