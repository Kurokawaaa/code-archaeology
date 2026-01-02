type GitHubCommit = {
  sha: string
  html_url: string
  commit: {
    message: string
    author: {
      name: string
      date: string
    } | null
  }
}

function normalizeRepo(input: string) {
  let repo = input.trim()

  if (repo.startsWith('http')) {
    repo = repo.replace('https://github.com/', '')
  }

  repo = repo.replace('.git', '')
  return repo
}

function detectIntent(message: string) {
  const msg = message.toLowerCase()

  if (msg.startsWith('fix') || msg.includes('bug')) return 'bugfix'
  if (msg.startsWith('feat') || msg.includes('add')) return 'feature'
  if (msg.includes('refactor')) return 'refactor'
  if (msg.includes('docs')) return 'docs'
  if (msg.includes('test')) return 'test'

  return 'chore'
}

export async function fetchCommits(repoInput: string) {
  const repo = repoInput
    .replace('https://github.com/', '')
    .replace('.git', '')
    .trim()

  const res = await fetch(
    `https://api.github.com/repos/${repo}/commits`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'code-archaeology-app', // 🔥 WAJIB
      },
    }
  )

  const data = await res.json()

  // 🔎 DEBUG KELIATAN JELAS
  console.log('GITHUB RESPONSE:', data)

  // 🚨 JANGAN DIAM-DIAM RETURN []
  if (!Array.isArray(data)) {
    throw new Error(
      `GitHub API error: ${data?.message ?? 'Unknown'}`
    )
  }

  return data.map((item: any) => ({
    sha: item.sha,
    message: item.commit.message,
    author: item.commit.author?.name ?? 'Unknown',
    date: item.commit.author?.date ?? '',
    url: item.html_url,
    intent: detectIntent(item.commit.message)

  }))
}

