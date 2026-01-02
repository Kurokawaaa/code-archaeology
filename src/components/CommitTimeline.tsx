import { Commit } from '@/types/github'
import CommitCard from './CommitCard'

export default function CommitTimeline({ commits }: { commits: Commit[] }) {
  return (
    <div className="space-y-4">
      {commits.map(commit => (
        <CommitCard key={commit.sha} commit={commit} />
      ))}
    </div>
  )
}
