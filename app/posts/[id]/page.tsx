import GithubAPI from '../../lib/githubAPI'
import { i18n } from '../../next-i18next.config'
import PostClient from './client'

export default async function PostPage({ params }: { params: { id: string } }) {
  const locale = i18n.defaultLocale
  const { id } = params
  const result = await GithubAPI.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
    owner: 'jhang-jhe-wei',
    repo: 'jhang-jhe-wei.github.com',
    issue_number: id,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  return <PostClient locale={locale} post={result.data} />
}
