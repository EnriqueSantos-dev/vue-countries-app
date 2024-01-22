<script setup lang="ts">
import type { Country } from '@/types'
import type { PropType } from 'vue'
import { RouterLink } from 'vue-router'

defineProps({
  country: {
    type: Object as PropType<Country>,
    required: true
  }
})
</script>

<template>
  <div class="shadow-md rounded-md overflow-hidden dark:bg-dark-blue">
    <img class="h-1/2 w-full" :src="country.flags.png" :alt="country.flags.alt" loading="lazy" />
    <div class="px-6 pt-6 dark:text-white">
      <RouterLink
        :to="`/country/${country.name.common}`"
        class="underline hover:opacity-80 font-medium text-lg"
        >{{ country.name.common }}</RouterLink
      >
    </div>
    <ul class="space-y-2 px-6 mt-5 dark:text-white">
      <li class="font-medium text-sm">
        Population: {{ Intl.NumberFormat('en-US').format(country.population) }}
      </li>
      <li class="font-medium text-sm">Region: {{ country.region }}</li>
      <li class="font-medium text-sm">Capital: {{ country.capital[0] }}</li>
    </ul>
  </div>
</template>
