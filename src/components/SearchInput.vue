<script setup lang="ts">
import { Search } from 'lucide-vue-next'

const model = defineModel('modelValue')

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div
    class="flex items-center bg-white dark:bg-dark-blue gap-2 focus-within:ring-1 focus-within:ring-offset-1 focus-within:ring-dark-blue rounded-md px-2 h-10 placeholder:text-dark-gray shadow-md dark:text-white"
  >
    <Search class="size-4 text-current" />
    <input
      v-bind="$attrs"
      v-model="model"
      class="w-full h-full dark:placeholder:text-white placeholder:text-dark-gray bg-transparent text-sm focus-visible:outline-none"
    />
  </div>
</template>
