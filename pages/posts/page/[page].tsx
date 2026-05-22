import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { i18n } from 'next-i18next.config'
import { useAppDispatch } from '@/reducers/store'
import { changeLanguage } from '@/reducers/locale_slice'
import { useEffect } from 'react'
import { NextSeo } from 'next-seo'
import Pagination from '../../../components/blog/pagination'
import Layout from '../../../components/layout'
import Link from 'next/link'
import DefaultSeo from '../../../next-seo.config'
import { useTranslation } from 'next-i18next'
import GithubAPI from '@/lib/githubAPI'
import tinytime from 'tinytime'

interface Post {
  title: string
  createdAt: string
  updatedAt: string
  id: number
  labels: string[]
}

interface PostProps {
  posts: Post[]
  locale: typeof i18n.locales[number]
  page: number
  totalPage: number
}

const postDateTemplate = tinytime('{MMMM} {DD}, {YYYY}')
export default function PostPage (props: PostProps): React.ReactElement {
  const {
    posts,
    locale,
    page,
    totalPage
  } = props
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(changeLanguage(locale))
  }, [])

  return (
    <>
      <NextSeo
        title={t('blog')}
        description={t('blogDescription')}
        canonical={'https://wells.tw/posts/page'}
        openGraph={{
          ...DefaultSeo.openGraph,
          locale,
          url: 'https://wells.tw/posts/page',
          title: t('blog'),
          description: t('blogDescription')
        }}
      />
      <Layout>
        <div className="container mx-auto">
          <main>
            <div className="divide-y divide-gray-200">
              <div className="pt-6 pb-8 space-y-2 md:space-y-5">
                <h1 className="text-3xl text-primary dark:text-light tracking-tight sm:text-4xl md:text-[4rem] md:leading-[3.5rem]">
                  { t('blog') }
                </h1>
                <p className="text-lg text-primary dark:text-light">
                  { t('blogDescription') }
                </p>
              </div>
              <ul className="divide-y divide-gray-200">
                {posts.map(post => {
                  return (
                    <li key={post.title} className="py-4">
                      <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                        <dl>
                          <dt className="sr-only">Last Updated on</dt>
                          <dd className="text-base font-medium text-primary dark:text-light">
                            <time dateTime={post.updatedAt}>
                              {postDateTemplate.render(new Date(post.updatedAt))}
                            </time>
                          </dd>
                        </dl>
                        <div className="space-y-3 xl:col-span-3">
                          <div className="space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight">
                              <Link href={`/posts/${post.id}`} className="text-primary dark:text-light">
                                {post.title}
                              </Link>
                            </h2>
                            <div className="text-primary dark:text-light prose max-w-none">
                              { post.labels.map((label) => `#${label}`).join(' ') }
                            </div>
                          </div>
                          <div className="text-base font-medium">
                            <Link
                              href={`/posts/${post.id}`}
                              className="text-teal-600 hover:text-teal-700"
                              aria-label={`Read "${post.title}"`}>
                              Go to read &rarr;
                            </Link>
                          </div>
                        </div>
                      </article>
                    </li>
                  )
                })}
              </ul>
            </div>
          </main>
          <div className="flex justify-center pt-8 pb-4">
            <Pagination currentPage={page} totalPage={totalPage}/>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PostProps> = async (context) => {
  const lng = (context.locale ?? i18n.defaultLocale) as typeof i18n.locales[number]
  const page = Number(context.params?.page ?? 1)

  const result = await GithubAPI.request('GET /repos/{owner}/{repo}/issues', {
    owner: 'jhang-jhe-wei',
    repo: 'jhang-jhe-wei.github.com',
    state: 'closed',
    sort: 'updated',
    page,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  const issues = result.data
    .filter((issue) => !Object.prototype.hasOwnProperty.call(issue, 'pull_request'))
    .map((issue) => ({
      title: issue.title,
      id: issue.number,
      sort: 'updated',
      createdAt: issue.created_at,
      updatedAt: issue.updated_at,
      labels: issue.labels.map((label) => (typeof label === 'string' ? label : (label.name ?? '')))
    }))

  return {
    props: {
      posts: issues,
      locale: lng,
      page,
      totalPage: page,
      ...(await serverSideTranslations(lng, [
        'common'
      ]))
    }
  }
}
