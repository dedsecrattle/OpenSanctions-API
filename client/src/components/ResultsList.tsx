import { UserIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { Result } from '../types';

type Props = {
  total: number;
  results: Result[];
};

export default function ResultsList({ total, results }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Search Results
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {total} {total === 1 ? 'match' : 'matches'} found
        </p>
      </div>

      <ul className="space-y-4">
        {results.map(r => (
          <li key={r.id} className="flex items-start gap-3">
            {r.type === 'Person' ? (
              <UserIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
            ) : (
              <BuildingOffice2Icon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
            )}

            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-gray-100">{r.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {r.identifier && <>SDN‑{r.identifier} · </>}
                <span className="capitalize">{r.type.toLowerCase()}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {r.birthDate && <>DOB: {r.birthDate} · </>}
                {r.birthPlace && <>POB: {r.birthPlace} · </>}
                {r.nationality && <>Nationality: {r.nationality}</>}
                {!r.birthDate && !r.birthPlace && !r.nationality && r.location && (
                  <>Location: {r.location}</>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
