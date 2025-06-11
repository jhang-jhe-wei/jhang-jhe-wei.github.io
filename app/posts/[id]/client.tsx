'use client'
import { NextSeo } from 'next-seo'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'
import Layout from '../../../components/layout'
import rehypeRaw from 'rehype-raw'
import { useAppDispatch } from '../../../reducers/store'
import { changeLanguage } from '../../../reducers/locale_slice'
import { useEffect } from 'react'
import DefaultSeo from '../../../next-seo.config'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

interface Issue {
  title: string
  createdAt: string
  updatedAt: string
  id: number
  body: string
  description: string
}

interface PostProps {
  locale: string
  post: Issue
}

export default function PostClient(props: PostProps) {
  const { post, locale } = props
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(changeLanguage(locale as any))
    const gitalk = new Gitalk({
      clientID: process.env.NEXT_PUBLIC_GITALK_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GITALK_CLIENT_SECRET as string,
      repo: 'comments',
      owner: 'jhang-jhe-wei',
      admin: ['jhang-jhe-wei'],
    })
    gitalk.render('gitalk-container')
  }, [locale])

  return (
    <>
      <NextSeo
        title={post.title}
        description={post.description}
        canonical={`https://wells.tw/posts/${post.title}`}
        openGraph={{
          ...DefaultSeo.openGraph,
          locale,
          url: 'https://wells.tw/blog',
          title: post.title,
          description: post.description,
        }}
      />
      <Layout>
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24">
          <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
            <article className="w-full max-w-2xl mx-auto format format-sm sm:format-base lg:format-lg format-blue dark:format-invert prose dark:prose-invert">
              <h1 className="text-4xl font-bold text-center">{post.title}</h1>
              <ReactMarkdown
                className="py-1 react-markdown box-border"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  img: ({ node, ...props }) => (
                    <img {...props} width={800} height={800} />
                  ),
                  code: props => {
                    const { children, className, ...rest } = props as any
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, '')}
                        language={match[1]}
                        wrapLines={true}
                        style={a11yDark}
                        customStyle={{ backgroundColor: 'transparent' }}
                      />
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {post.body}
              </ReactMarkdown>
              <div id="gitalk-container"></div>
            </article>
          </div>
        </main>
      </Layout>
    </>
  )
}
