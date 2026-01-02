'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RepoInput() {
  const [repo, setRepo] = useState('')
  const router = useRouter()

  const handleAnalyze = () => {
    if (!repo) return
    router.push(`/analyze?repo=${encodeURIComponent(repo)}`)
  }

  return (
    <div className="w-full max-w-md p-6 bg-zinc-900 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Code Archaeology 🏺</h1>

      <input
        type="text"
        placeholder="https://github.com/user/repo"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
        className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 mb-4"
      />

      <button
        onClick={handleAnalyze}
        className="w-full bg-indigo-600 hover:bg-indigo-500 p-3 rounded font-semibold"
      >
        Excavate Repository
      </button>
    </div>
  )
}
