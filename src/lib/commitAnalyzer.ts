import { CommitIntent } from '@/types/github'

export function analyzeCommitIntent(message: string): CommitIntent {
  const msg = message.toLowerCase()

  if (msg.match(/fix|bug|error|issue|hotfix/)) return 'bugfix'
  if (msg.match(/add|feature|implement|create/)) return 'feature'
  if (msg.match(/refactor|cleanup|optimize|improve/)) return 'refactor'
  if (msg.match(/test|spec|testing/)) return 'test'
  if (msg.match(/doc|readme|documentation/)) return 'docs'
  if (msg.match(/chore|config|ci|build/)) return 'chore'

  return 'unknown'
}
