import {
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

type Props = {
  query: string;
  setQuery: (q: string) => void;
  type: 'all' | 'individuals' | 'entities';
  setType: (t: 'all' | 'individuals' | 'entities') => void;
  onSearch: () => void;
};

export default function SearchBar({
  query,
  setQuery,
  type,
  setType,
  onSearch
}: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
      {/* Search Input */}
      <div className="relative flex-1">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search sanctions…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg
                     bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute top-1/2 right-3 w-5 h-5 text-gray-400 transform -translate-y-1/2"
          >
            <XMarkIcon />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        {['all', 'individuals', 'entities'].map(v => (
          <label key={v} className="flex items-center gap-1 text-gray-700 dark:text-gray-300 capitalize">
            <input
              type="radio"
              name="type"
              value={v}
              checked={type === v}
              onChange={() => setType(v as any)}
              className="form-radio h-4 w-4 text-blue-600 dark:text-blue-400"
            />
            {v}
          </label>
        ))}
      </div>

      {/* Search Button */}
      <button
        onClick={onSearch}
        className="ml-auto sm:ml-0 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex-shrink-0"
      >
        Search
      </button>
    </div>
  );
}
