import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import { i18n } from '../next-i18next.config'
import { boolean, optional, assert, object, string, array, type Infer } from 'superstruct'

const PortfolioModel = array(object({
  title: string(),
  tag: string(),
  image: string(),
  description: string(),
  demo_link: optional(string()),
  code_link: optional(string()),
  highlight: optional(boolean())
}))

export type PortfolioData = Infer<typeof PortfolioModel>

export async function getPortfolioData (locale: typeof i18n.locales[number]): Promise<PortfolioData> {
  const lng = locale.length > 0 ? locale : i18n.defaultLocale
  const filePath = path.join(process.cwd(), 'data', lng, 'portfolio.yml')
  const file = fs.readFileSync(filePath, 'utf8')
  const data = YAML.parse(file)
  assert(data, PortfolioModel)
  return data
}
