export interface LanguageAlternate {
  hrefLang: string
  href: string
}

export const SITE_URL = 'https://wells.tw'

export const OG_DEFAULT_IMAGE = `${SITE_URL}/og-default.png`
export const OG_DEFAULT_IMAGE_WIDTH = 671
export const OG_DEFAULT_IMAGE_HEIGHT = 438

export function localePath (locale: string, path: string): string {
  return locale === 'en' ? `/en${path}` : path
}

export function buildLanguageAlternates (pathWithoutLocale: string): LanguageAlternate[] {
  const zhHref = `${SITE_URL}${pathWithoutLocale}`
  const enHref = `${SITE_URL}/en${pathWithoutLocale}`
  return [
    { hrefLang: 'zh-TW', href: zhHref },
    { hrefLang: 'en', href: enHref },
    { hrefLang: 'x-default', href: zhHref }
  ]
}

export function excerpt (markdown: string, max = 160): string {
  let text = markdown
  text = text.replace(/```[\s\S]*?```/g, ' ')
  text = text.replace(/`[^`]*`/g, ' ')
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
  text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  text = text.replace(/<[^>]+>/g, ' ')
  text = text.replace(/^\s{0,3}#{1,6}\s+/gm, '')
  text = text.replace(/^\s{0,3}>\s?/gm, '')
  text = text.replace(/^\s{0,3}(?:[-*+]|\d+\.)\s+/gm, '')
  text = text.replace(/(\*\*|__)(.*?)\1/g, '$2')
  text = text.replace(/(\*|_)(.*?)\1/g, '$2')
  text = text.replace(/~~(.*?)~~/g, '$1')
  text = text.replace(/\s+/g, ' ').trim()
  if (text.length <= max) return text
  return text.slice(0, max) + '…'
}
