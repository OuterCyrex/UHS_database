import { createI18n } from 'vue-i18n'

import enUS from './language/en-US.json'
import zhCN from './language/zh-CN.json'

export const supportedLocales = ['en-US', 'zh-CN'] as const
export type SupportedLocale = (typeof supportedLocales)[number]

export const defaultLocale: SupportedLocale = 'en-US'

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

export default i18n
