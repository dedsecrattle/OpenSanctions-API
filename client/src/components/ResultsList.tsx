import React from 'react';
import { Result } from '../types';

type Props = {
  results: Result[];
  total: number;
};

export default function ResultsList({ results, total }: Props) {
  return (
    <div className="mt-6">
      <p className="text-sm mb-2 text-gray-700 dark:text-gray-200">Total matches found: {total}</p>
      <div className="space-y-4">
        {results.map((r) => (
          <div key={r.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700 shadow-sm">
            <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">{r.name}</h2>
            <p><span className="font-medium">Type:</span> {r.type}</p>
            {r.identifier && <p><span className="font-medium">Identifier:</span> {r.identifier}</p>}
            {r.nationality && <p><span className="font-medium">Nationality:</span> {r.nationality}</p>}
            {r.birthDate && <p><span className="font-medium">Date of Birth:</span> {r.birthDate}</p>}
            {r.birthPlace && <p><span className="font-medium">Place of Birth:</span> {r.birthPlace}</p>}
            {r.location && <p><span className="font-medium">Location:</span> {r.location}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
