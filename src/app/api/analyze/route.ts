import { NextResponse } from 'next/server'
import { fetchCommits } from '@/lib/github'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const repo = searchParams.get('repo')

    if (!repo) {
      return NextResponse.json([], { status: 400 })
    }

    const commits = await fetchCommits(repo)

    // PASTIKAN array
    if (!Array.isArray(commits)) {
      return NextResponse.json([], { status: 200 })
    }

    return NextResponse.json(commits)
  } catch (error) {
    console.error('API ANALYZE ERROR:', error)
    return NextResponse.json([], { status: 500 })
  }
}
