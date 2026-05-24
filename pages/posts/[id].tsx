import { NextSeo } from 'next-seo'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'
import Layout from '../../components/layout'
import rehypeRaw from 'rehype-raw'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useAppDispatch } from 'reducers/store'
import { changeLanguage } from 'reducers/locale_slice'
import { useEffect, useRef } from 'react'
import { i18n } from 'next-i18next.config'
import DefaultSeo from '../../next-seo.config'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPosts, getPostById, type Post } from '@/lib/posts'

interface PostProps {
  locale: typeof i18n.locales[number]
  post: Post
}

export default function PostPage (props: PostProps): React.ReactElement {
  const { post, locale } = props
  const dispatch = useAppDispatch()
  const giscusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(changeLanguage(locale))
  }, [dispatch, locale])

  useEffect(() => {
    const container = giscusRef.current
    if (container == null || container.firstChild != null) return

    const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID
    const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID
    if (repoId == null || repoId === '' || categoryId == null || categoryId === '') return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('data-repo', 'jhang-jhe-wei/jhang-jhe-wei.github.io')
    script.setAttribute('data-repo-id', repoId)
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', categoryId)
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', 'preferred_color_scheme')
    script.setAttribute('data-lang', locale === 'zh-TW' ? 'zh-TW' : 'en')
    container.appendChild(script)
  }, [locale])

  return (
    <>
      <NextSeo
        title={post.title}
        canonical={`https://wells.tw/posts/${post.id}`}
        openGraph={{
          ...DefaultSeo.openGraph,
          locale,
          url: `https://wells.tw/posts/${post.id}`,
          title: post.title
        }}
      />
      <Layout>
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24">
          <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
            <article className="w-full max-w-2xl mx-auto format format-sm sm:format-base lg:format-lg format-blue dark:format-invert prose dark:prose-invert">
              <h1 className="text-4xl font-bold text-center">{post.title}</h1>
              <div className="py-1 react-markdown box-border">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    img: ({ node, ...props }) => (
                      <img
                        {...props}
                        width={800}
                        height={800}
                      />
                    ),
                    code: (props) => {
                      const { children, className, node, ref, ...rest } = props
                      const match = /language-(\w+)/.exec(className ?? '')
                      return (match != null)
                        ? (
                          <SyntaxHighlighter
                            PreTag="div"
                            language={match[1]}
                            wrapLines={true}
                            style={a11yDark}
                            customStyle={{ backgroundColor: 'transparent' }}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                          )
                        : (
                          <code {...rest} className={className}>
                            {children}
                          </code>
                          )
                    }
                  }}
                >
                  {post.body}
                </ReactMarkdown>
              </div>
              <div ref={giscusRef} className="giscus mt-8"></div>
            </article>
          </div>
        </main>
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts()
  return {
    paths: posts.map((post) => ({ params: { id: String(post.id) } })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  const lng = context.locale ?? i18n.defaultLocale
  const id = Number(context.params?.id)

  if (!Number.isFinite(id)) {
    return { notFound: true }
  }

  const post = await getPostById(id)
  if (post == null) {
    return { notFound: true }
  }

  return {
    props: {
      locale: lng,
      post,
      ...(await serverSideTranslations(lng, [
        'common'
      ]))
    }
  }
}
