import { useState } from "react";

type Props = {
  page: number;
  total: number;
  onPageChange: (p: number) => void;
};

export default function Pagination({ page, total, onPageChange }: Props) {
  const [jump, setJump] = useState<string>('');

  const totalPages = Math.ceil(total / 1); 
  const siblingCount = 1;
  const boundaryCount = 1;

  
  const items: (number | 'ellipsis' | 'first' | 'prev' | 'next' | 'last')[] = [];

  items.push('first', 'prev');

  
  for (let i = 1; i <= boundaryCount; i++) items.push(i);

  
  if (page > boundaryCount + siblingCount + 1) items.push('ellipsis');

  
  const start = Math.max(boundaryCount + 1, page - siblingCount);
  const end = Math.min(totalPages - boundaryCount, page + siblingCount);
  for (let i = start; i <= end; i++) items.push(i);

  
  if (page < totalPages - (boundaryCount + siblingCount)) items.push('ellipsis');

  
  for (let i = totalPages - boundaryCount + 1; i <= totalPages; i++) {
    if (i > boundaryCount) items.push(i);
  }

  items.push('next', 'last');

  const goto = () => {
    const p = Number(jump);
    if (p >= 1 && p <= totalPages && p !== page) {
      onPageChange(p);
    }
    setJump('');
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
      {items.map((item, idx) => {
        if (item === 'first') {
          return (
            <button
              key={idx}
              disabled={page === 1}
              onClick={() => onPageChange(1)}
              className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700"
            >
              « First
            </button>
          );
        }
        if (item === 'prev') {
          return (
            <button
              key={idx}
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
              className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700"
            >
              ‹ Prev
            </button>
          );
        }
        if (item === 'next') {
          return (
            <button
              key={idx}
              disabled={page === totalPages}
              onClick={() => onPageChange(page + 1)}
              className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700"
            >
              Next ›
            </button>
          );
        }
        if (item === 'last') {
          return (
            <button
              key={idx}
              disabled={page === totalPages}
              onClick={() => onPageChange(totalPages)}
              className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700"
            >
              Last »
            </button>
          );
        }
        if (item === 'ellipsis') {
          return <span key={idx} aria-hidden="true">…</span>;
        }
        
        const p = item as number;
        return (
          <button
            key={idx}
            onClick={() => onPageChange(p)}
            disabled={p === page}
            className={`px-3 py-1 rounded ${
              p === page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            {p}
          </button>
        );
      })}

      {}
      <div className="flex items-center gap-1">
        <input
          type="number"
          min="1"
          max={totalPages}
          value={jump}
          onChange={e => setJump(e.target.value)}
          placeholder="Go to"
          className="w-16 px-2 py-1 border rounded text-sm"
        />
        <button
          onClick={goto}
          className="px-2 py-1 bg-blue-600 text-white rounded text-sm"
        >
          Go
        </button>
      </div>
    </div>
  );
}
