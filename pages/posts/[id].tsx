import { NextSeo } from 'next-seo'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Layout from '../../components/layout'
import rehypeRaw from 'rehype-raw'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useAppDispatch, useAppSelector } from 'reducers/store'
import { changeLanguage } from 'reducers/locale_slice'
import { useEffect, useRef } from 'react'
import { i18n } from 'next-i18next.config'
import DefaultSeo from '../../next-seo.config'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPosts, getPostDetailById, type PostDetail } from '@/lib/posts'

interface PostProps {
  locale: typeof i18n.locales[number]
  post: PostDetail
}

export default function PostPage (props: PostProps): React.ReactElement {
  const { post, locale } = props
  const dispatch = useAppDispatch()
  const mode = useAppSelector((state) => state.mode.value)
  const giscusTheme = mode === 'dark' ? 'dark' : 'light'
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
    script.setAttribute('data-theme', giscusTheme)
    script.setAttribute('data-lang', locale === 'zh-TW' ? 'zh-TW' : 'en')
    container.appendChild(script)
  }, [locale, giscusTheme])

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: giscusTheme } } },
      'https://giscus.app'
    )
  }, [giscusTheme])

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
                    img: ({ node, src, alt, ...props }) => {
                      if (typeof src !== 'string' || src.length === 0) return null
                      return (
                        <Image
                          src={src}
                          alt={alt ?? ''}
                          width={800}
                          height={800}
                          sizes="(max-width: 768px) 100vw, 800px"
                          style={{ width: '100%', height: 'auto' }}
                        />
                      )
                    },
                    div: ({ node, ...props }) => {
                      const shikiIndex = (props as Record<string, unknown>)['data-shiki']
                      if (typeof shikiIndex === 'string') {
                        const html = post.highlightedBlocks[Number(shikiIndex)]
                        if (typeof html === 'string') {
                          return <div className="shiki-wrapper" dangerouslySetInnerHTML={{ __html: html }} />
                        }
                      }
                      return <div {...props} />
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

  const post = await getPostDetailById(id)
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
