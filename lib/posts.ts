import GithubAPI from '@/lib/githubAPI'
import { codeToHtml } from 'shiki'

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

export interface PostDetail extends Post {
  highlightedBlocks: string[]
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

  try {
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
  } catch (err) {
    console.warn('[posts] getAllPosts failed, deferring posts to on-demand SSG. Set GITHUB_TOKEN env to avoid this:', err)
    return []
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

const CODE_FENCE_RE = /^( {0,3})```([^\n`]*)\n([\s\S]*?)\n?\1```[ \t]*$/gm

export async function getPostDetailById (id: number): Promise<PostDetail | null> {
  const post = await getPostById(id)
  if (post == null) return null

  const blocks: Array<{ code: string, lang: string }> = []
  const rewritten = post.body.replace(CODE_FENCE_RE, (_match, _indent: string, info: string, code: string) => {
    const lang = info.trim().split(/\s+/)[0] ?? ''
    const index = blocks.length
    blocks.push({ code, lang })
    return `<div data-shiki="${index}"></div>`
  })

  const highlightedBlocks = await Promise.all(
    blocks.map(async ({ code, lang }) =>
      await codeToHtml(code, {
        lang: isSupportedLang(lang) ? lang : 'text',
        theme: 'github-dark'
      })
    )
  )

  return { ...post, body: rewritten, highlightedBlocks }
}

const SUPPORTED_LANGS = new Set([
  'bash', 'sh', 'shell', 'zsh', 'c', 'cpp', 'css', 'diff', 'docker', 'dockerfile',
  'go', 'graphql', 'html', 'java', 'javascript', 'js', 'json', 'jsx', 'kotlin',
  'less', 'lua', 'makefile', 'markdown', 'md', 'mdx', 'nginx', 'objective-c',
  'perl', 'php', 'powershell', 'ps', 'ps1', 'python', 'py', 'r', 'ruby', 'rb',
  'rust', 'rs', 'sass', 'scala', 'scss', 'sql', 'swift', 'toml', 'ts', 'tsx',
  'typescript', 'vue', 'xml', 'yaml', 'yml', 'erb', 'text', 'plaintext'
])

function isSupportedLang (lang: string): boolean {
  return SUPPORTED_LANGS.has(lang.toLowerCase())
}

export function getTotalPage (totalPosts: number): number {
  return Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE))
}

export function paginatePosts (posts: Post[], page: number): PostSummary[] {
  const start = (page - 1) * POSTS_PER_PAGE
  return posts.slice(start, start + POSTS_PER_PAGE).map(({ body, ...rest }) => rest)
}
