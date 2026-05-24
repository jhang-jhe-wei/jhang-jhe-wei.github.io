import { useTranslation } from 'next-i18next'

export default function Resume (): React.ReactElement {
  const { t } = useTranslation()
  return (
    <div className="pb-32 mt-32 text-center">
      <h3 className="text-center text-white font-notosans shadow-gray-700 text-7xl">Download</h3>
      <a className="mt-20 inline-block border-2 border-cyan-450 text-white px-5 pt-3 pb-2 rounded-[10px] bg-cyan-450 dark:hover:border-primary hover:bg-white hover:text-cyan-450 hover:no-underline" href="https://www.canva.com/design/DAF1Vr0QLsw/zzzOQmhW6mw-UISRj36RBg/edit?utm_content=DAF1Vr0QLsw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" target="_blank" >
        {t('download-my-resume')}
      </a>
    </div>
  )
}
