import { Commit } from '@/types/github'

const intentColor: Record<string, string> = {
  bugfix: 'bg-red-600',
  feature: 'bg-green-600',
  refactor: 'bg-yellow-600',
  test: 'bg-blue-600',
  docs: 'bg-purple-600',
  chore: 'bg-gray-600',
  unknown: 'bg-zinc-600',
}

export default function CommitCard({ commit }: { commit: Commit }) {
  return (
    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
      <div className="flex justify-between items-start mb-1">
        <p className="font-semibold">{commit.message}</p>

        {commit.intent && (
          <span
            className={`text-xs px-2 py-1 rounded text-white ${intentColor[commit.intent]}`}
          >
            {commit.intent}
          </span>
        )}
      </div>

      <p className="text-sm text-zinc-400">
        {commit.author} • {new Date(commit.date).toLocaleString()}
      </p>

      <a
        href={commit.url}
        target="_blank"
        className="text-indigo-400 text-sm"
      >
        View on GitHub →
      </a>
    </div>
  )
}
