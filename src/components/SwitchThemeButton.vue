<script setup lang="ts">
import { MoonIcon, SunIcon } from 'lucide-vue-next'
import useTheme from '@/hooks/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button
    class="flex items-center gap-2 font-medium dark:text-white text-black"
    @click="toggleTheme"
  >
    <MoonIcon v-if="theme === 'dark'" class="mb-0.5 size-4 fill-white" />
    <SunIcon v-else class="mb-0.5 size-4" />
    {{ theme === 'dark' ? 'Dark Mode' : 'Light Mode' }}
  </button>
</template>
