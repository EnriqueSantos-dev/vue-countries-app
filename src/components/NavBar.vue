<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SwitchThemeButton from './SwitchThemeButton.vue'
</script>

<template>
  <header class="h-16 bg-white shadow-xl dark:bg-dark-blue dark:text-white">
    <nav class="px-6 h-full max-w-[1440px] mx-auto flex justify-between items-center">
      <RouterLink to="/">
        <div class="text-xl font-bold mx-auto">Where in the world?</div>
      </RouterLink>
      <SwitchThemeButton />
    </nav>
  </header>
</template>
