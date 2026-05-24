import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import { assert, object, number, boolean, string, array, optional, type Infer } from 'superstruct'
import { i18n } from '../next-i18next.config'

const AboutModel = object({
  education: array(object({
    title: string(),
    subTitle: string(),
    startedAt: string(),
    endedAt: string(),
    highlights: array(string())
  })),
  works: array(object({
    title: string(),
    subTitle: string(),
    startedAt: string(),
    endedAt: string(),
    highlights: optional((array(string())))
  })),
  achievements: array(object({
    title: string(),
    isFull: boolean(),
    highlights: array(string())
  })),
  skillsList: array(object({
    title: string(),
    skills: array(object({
      name: string(),
      proficiency: number()
    }))
  }
  ))
})

export type AboutData = Infer<typeof AboutModel>

export async function getAboutData (locale: typeof i18n.locales[number]): Promise<AboutData> {
  const lng = locale.length > 0 ? locale : i18n.defaultLocale
  const filePath = path.join(process.cwd(), 'data', lng, 'about.yml')
  const file = fs.readFileSync(filePath, 'utf8')
  const data = YAML.parse(file)
  assert(data, AboutModel)
  return data
}
