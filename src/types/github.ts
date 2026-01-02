export type CommitIntent =
  | 'bugfix'
  | 'feature'
  | 'refactor'
  | 'test'
  | 'docs'
  | 'chore'
  | 'unknown'

export type Commit = {
  sha: string
  message: string
  author: string
  date: string
  url: string
  intent?: CommitIntent
}
