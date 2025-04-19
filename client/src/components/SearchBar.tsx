
type Props = {
  query: string;
  setQuery: (val: string) => void;
  type: 'all' | 'individuals' | 'entities';
  setType: (val: 'all' | 'individuals' | 'entities') => void;
  onSearch: () => void;
};

export default function SearchBar({ query, setQuery, type, setType, onSearch }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
      <input
        type="text"
        placeholder="Enter name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
      />
      <div className="flex gap-2">
        {['all', 'individuals', 'entities'].map((val) => (
          <label key={val} className="flex items-center gap-1 capitalize">
            <input
              type="radio"
              name="type"
              value={val}
              checked={type === val}
              onChange={() => setType(val as typeof type)}
            />
            {val}
          </label>
        ))}
      </div>
      <button
        onClick={onSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
      >
        Search
      </button>
    </div>
  );
}
