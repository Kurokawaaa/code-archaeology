'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Commit } from '@/types/github'
import CommitTimeline from '@/components/CommitTimeline'

export default function AnalyzePage() {
  const searchParams = useSearchParams()
  const repo = searchParams.get('repo')

  const [commits, setCommits] = useState<Commit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  if (!repo) return

  fetch(`/api/analyze?repo=${repo}`)
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setCommits(data)
      } else {
        console.error('Invalid commits data:', data)
        setCommits([])
      }
      setLoading(false)
    })
    .catch(err => {
      console.error(err)
      setCommits([])
      setLoading(false)
    })
}, [repo])


  if (loading) {
    return <p className="text-white p-8">Excavating commits...</p>
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Commit Timeline</h1>
      <CommitTimeline commits={commits} />
    </main>
  )
}
