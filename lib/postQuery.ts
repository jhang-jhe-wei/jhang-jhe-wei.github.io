const PARAMS_KV_JOINER = '-'
const PARAMS_JOINER = '_'

interface PageParams {
  page: number
}

export const genQuery = ({ page }: PageParams): string => Object.entries({
  page: page + 1
}).map(
  p => p.join(PARAMS_KV_JOINER)
).join(PARAMS_JOINER)

export const genLinkProps = (params: PageParams): { href: string, as?: string } => params.page === 0
  ? ({
      href: '/'
    })
  : ({
      href: '/posts/[q]', as: `/posts/${genQuery(params)}`
    })

export const parseQuery = (query: string): PageParams => {
  const { page } = Object.fromEntries(
    query.split(PARAMS_JOINER).map((q: string) => q.split(PARAMS_KV_JOINER))
  )
  return {
    page: parseInt(page) - 1
  }
}
