import GithubAPI from '@/lib/githubAPI'

const OWNER = 'jhang-jhe-wei'
const REPO = 'jhang-jhe-wei.github.com'
export const POSTS_PER_PAGE = 10

export interface Post {
  title: string
  id: number
  body: string
  createdAt: string
  updatedAt: string
  labels: string[]
}

export type PostSummary = Omit<Post, 'body'>

interface GhLabel {
  name?: string
}

const mapLabel = (label: string | GhLabel): string =>
  typeof label === 'string' ? label : (label.name ?? '')

let cachedAllPosts: Post[] | null = null

export async function getAllPosts (): Promise<Post[]> {
  if (cachedAllPosts != null) return cachedAllPosts

  const posts: Post[] = []
  let page = 1
  const perPage = 100

  while (true) {
    const result = await GithubAPI.request('GET /repos/{owner}/{repo}/issues', {
      owner: OWNER,
      repo: REPO,
      state: 'closed',
      sort: 'updated',
      per_page: perPage,
      page,
      headers: { 'X-GitHub-Api-Version': '2022-11-28' }
    })

    const issues = result.data
      .filter((issue) => !Object.prototype.hasOwnProperty.call(issue, 'pull_request'))
      .map((issue): Post => ({
        title: issue.title,
        id: issue.number,
        body: issue.body ?? '',
        createdAt: issue.created_at,
        updatedAt: issue.updated_at,
        labels: issue.labels.map(mapLabel)
      }))

    posts.push(...issues)
    if (result.data.length < perPage) break
    page++
  }

  cachedAllPosts = posts
  return posts
}

export async function getPostById (id: number): Promise<Post | null> {
  const posts = await getAllPosts()
  const cached = posts.find((p) => p.id === id)
  if (cached != null) return cached

  try {
    const result = await GithubAPI.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
      owner: OWNER,
      repo: REPO,
      issue_number: id,
      headers: { 'X-GitHub-Api-Version': '2022-11-28' }
    })
    const issue = result.data
    if (issue.state !== 'closed') return null
    if (Object.prototype.hasOwnProperty.call(issue, 'pull_request')) return null
    return {
      title: issue.title,
      id: issue.number,
      body: issue.body ?? '',
      createdAt: issue.created_at,
      updatedAt: issue.updated_at,
      labels: issue.labels.map(mapLabel)
    }
  } catch {
    return null
  }
}

export function getTotalPage (totalPosts: number): number {
  return Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE))
}

export function paginatePosts (posts: Post[], page: number): PostSummary[] {
  const start = (page - 1) * POSTS_PER_PAGE
  return posts.slice(start, start + POSTS_PER_PAGE).map(({ body, ...rest }) => rest)
}
