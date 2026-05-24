/** @type {import('next-sitemap').IConfig} */
const SITE_URL = 'https://wells.tw'
const OWNER = 'jhang-jhe-wei'
const REPO = 'jhang-jhe-wei.github.com'
const POSTS_PER_PAGE = 10

const ALTERNATE_REFS = [
  { href: SITE_URL, hreflang: 'zh-TW' },
  { href: `${SITE_URL}/en`, hreflang: 'en' },
  { href: SITE_URL, hreflang: 'x-default' }
]

async function fetchAllIssues () {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  }
  if (typeof process.env.GITHUB_TOKEN === 'string' && process.env.GITHUB_TOKEN !== '') {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const all = []
  for (let page = 1; page <= 10; page++) {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/issues?state=closed&sort=updated&per_page=100&page=${page}`
    const res = await fetch(url, { headers })
    if (!res.ok) throw new Error(`GitHub API ${res.status} ${res.statusText}`)
    const batch = await res.json()
    if (!Array.isArray(batch)) throw new Error('Unexpected GitHub response')
    const issues = batch.filter((it) => !Object.prototype.hasOwnProperty.call(it, 'pull_request'))
    all.push(...issues)
    if (batch.length < 100) break
  }
  return all
}

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  alternateRefs: ALTERNATE_REFS,
  transform: async (config, path) => {
    if (path.startsWith('/en')) return null
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: ALTERNATE_REFS
    }
  },
  additionalPaths: async (config) => {
    try {
      const issues = await fetchAllIssues()
      const paths = []
      for (const issue of issues) {
        paths.push({
          loc: `/posts/${issue.number}`,
          changefreq: config.changefreq,
          priority: config.priority,
          lastmod: issue.updated_at,
          alternateRefs: ALTERNATE_REFS
        })
      }
      const totalPage = Math.max(1, Math.ceil(issues.length / POSTS_PER_PAGE))
      for (let n = 1; n <= totalPage; n++) {
        paths.push({
          loc: `/posts/page/${n}`,
          changefreq: config.changefreq,
          priority: config.priority,
          lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
          alternateRefs: ALTERNATE_REFS
        })
      }
      return paths
    } catch (err) {
      console.warn('[next-sitemap] additionalPaths failed:', err)
      return []
    }
  }
}
