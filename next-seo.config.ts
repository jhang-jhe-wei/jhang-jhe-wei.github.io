import { DefaultSeoProps } from 'next-seo'
import {
  SITE_URL,
  OG_DEFAULT_IMAGE,
  OG_DEFAULT_IMAGE_WIDTH,
  OG_DEFAULT_IMAGE_HEIGHT,
  buildLanguageAlternates
} from './lib/seo'

const config: DefaultSeoProps = {
  title: "Wells 的個人網站",
  description: "在這裡，你可以找到我的專案、部落格、以及其他一些東西。",
  canonical: `${SITE_URL}/`,
  openGraph: {
    url: `${SITE_URL}/`,
    title: "Wells 的個人網站",
    description: "在這裡，你可以找到我的專案、部落格、以及其他一些東西。",
    images: [
      {
        url: OG_DEFAULT_IMAGE,
        width: OG_DEFAULT_IMAGE_WIDTH,
        height: OG_DEFAULT_IMAGE_HEIGHT,
        alt: "Wells 的個人網站"
      }
    ],
    type: 'website',
    siteName: "Wells's Website",
    locale: 'zh_TW'
  },
  twitter: {
    cardType: 'summary_large_image'
  },
  languageAlternates: buildLanguageAlternates('/')
}

export default config
