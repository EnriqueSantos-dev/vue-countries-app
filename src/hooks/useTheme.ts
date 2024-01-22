import { onMounted, ref } from 'vue'

const THEME_KEY = 'countries-app-theme'

export default function useTheme() {
  const theme = ref<'light' | 'dark'>('light')

  const isValidTheme = (theme: string) => theme === 'light' || theme === 'dark'

  const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    theme.value = newTheme
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    window.localStorage.setItem(THEME_KEY, newTheme)
  }

  onMounted(() => {
    const themeStored = window.localStorage.getItem(THEME_KEY)

    console.log(themeStored)

    if (!themeStored) return

    if (isValidTheme(themeStored) && theme.value === 'light') {
      theme.value = themeStored as 'light' | 'dark'
    }

    if (themeStored === 'dark') {
      document.documentElement.classList.add('dark')
    }
  })

  return {
    theme,
    toggleTheme
  }
}
