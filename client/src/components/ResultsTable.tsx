import React from 'react';
import { ResultsTableProps } from '../types';

const ResultsTable: React.FC<ResultsTableProps> = ({ results, totalResults, loading }) => {
  if (loading) {
    return <div className="loading-indicator">Loading results...</div>;
  }

  return (
    <div className="results-container">
      {results.length > 0 ? (
        <>
          <div className="results-header">
            <h2>Search Results</h2>
            <p className="results-count">{totalResults} matches found</p>
          </div>
          
          <div className="table-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Identifier</th>
                  <th>Location</th>
                  <th>Date of Birth</th>
                  <th>Place of Birth</th>
                  <th>Nationality</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.type === 'Person' ? 'Individual' : item.type}</td>
                    <td>{item.identifier || 'N/A'}</td>
                    <td>{item.location || 'N/A'}</td>
                    <td>{item.birthDate || 'N/A'}</td>
                    <td>{item.birthPlace || 'N/A'}</td>
                    <td>{item.nationality || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="no-results">
          {totalResults === 0 ? 'No results found. Try a different search term.' : 'Enter a search term to find sanctions data.'}
        </div>
      )}
    </div>
  );
};

export default ResultsTable;