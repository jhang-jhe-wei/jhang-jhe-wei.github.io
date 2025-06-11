import GithubAPI from '../../../lib/githubAPI'
import { i18n } from '../../../next-i18next.config'
import PostPageClient from './client'

export default async function PostPage({ params }: { params: { page: string } }) {
  const locale = i18n.defaultLocale
  const { page } = params
  const result = await GithubAPI.request('GET /repos/{owner}/{repo}/issues', {
    owner: 'jhang-jhe-wei',
    repo: 'jhang-jhe-wei.github.com',
    state: 'closed',
    sort: 'updated',
    page: Number(page),
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  const issues = result.data
    .filter((issue: any) => !issue.hasOwnProperty('pull_request'))
    .map((issue: any) => ({
      title: issue.title,
      id: issue.number,
      sort: 'updated',
      createdAt: issue.created_at,
      updatedAt: issue.updated_at,
      labels: issue.labels.map((label: any) => label.name),
    }))

  const totalPage = 1
  return <PostPageClient posts={issues} locale={locale} page={Number(page)} totalPage={totalPage} />
}
