import { formatUtcString } from '@/utils/data-format'
import { App } from 'vue'

export function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
