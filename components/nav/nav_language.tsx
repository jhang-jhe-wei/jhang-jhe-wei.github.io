import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector, useAppDispatch } from '../../reducers/store'
import { changeLanguage } from '../../reducers/locale_slice'

const lngs = {
  en: { nativeName: 'English' },
  'zh-TW': { nativeName: '繁體中文' }
}

const NavLanguage = (): React.ReactElement => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()
  const { language } = useAppSelector(state => state.locale)
  const dispatch = useAppDispatch()

  const handleDropdownToggle = (): void => {
    setIsDropdownOpen(isDropdownOpen => !isDropdownOpen)
  }

  const onToggleLanguageClick = (newLocale: string): void => {
    const { pathname, query } = router
    void router.push({ pathname, query }, router.asPath, { locale: newLocale })
  }

  return (
    <div className="relative inline-block mx-6">
      <button
        type="button"
        className="flex items-center justify-center space-x-1 text-primary dark:text-white hover:text-secondary dark:hover:text-secondary"
        onClick={handleDropdownToggle}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 w-40 mt-2 bg-white shadow-md rounded-md dark:bg-gray-800">
          {Object.keys(lngs).map((lng) => (
            <button
              key={lng}
              className={`
                block
                w-full
                px-4
                py-2
                text-left
                ${
                  language === lng
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white dark:hover:text-secondary hover:text-secondary'
                }`
              }
              onClick={() => {
                onToggleLanguageClick(lng)
                setIsDropdownOpen(false)
                dispatch(changeLanguage(lng))
              }}
              disabled={language === lng}
            >
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default NavLanguage
