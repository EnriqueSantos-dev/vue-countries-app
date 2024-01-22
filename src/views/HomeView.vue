<script setup lang="ts">
import { useDebounce } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

import CountryCard from '@/components/CountryCard.vue'
import SearchInput from '@/components/SearchInput.vue'
import Skeleton from '@/components/Skeleton.vue'

import { baseURL } from '@/constants/api'
import { regions } from '@/constants/regions'

import type { Country } from '@/types'
import { mapApiResponseToEntity } from '@/helpers/map-api-response-to-entity'

type Regions = (typeof regions)[number] | ''

const status = ref<'idle' | 'loading' | 'error'>('idle')
const countries = ref<Country[]>([])
const region = ref<Regions>('All')
const search = ref<string>('')

const debouncedSearch = useDebounce(search, 500)

const fetchCountries = async (url: string) => {
  try {
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error('Something went wrong')
    }

    const data = await res.json()
    countries.value = data.map(mapApiResponseToEntity)
    status.value = 'idle'
  } catch {
    status.value = 'error'
  }
}

onMounted(() => {
  status.value = 'loading'
  fetchCountries(`${baseURL}/all`)
})

watch(region, () => {
  const regionValue = region.value
  const url =
    regionValue === 'All' ? `${baseURL}/all` : `${baseURL}/region/${regionValue.toLowerCase()}`
  status.value = 'loading'
  fetchCountries(url)
})

watch(debouncedSearch, () => {
  const searchValue = debouncedSearch.value
  const url = searchValue === '' ? `${baseURL}/all` : `${baseURL}/name/${searchValue.toLowerCase()}`
  status.value = 'loading'
  fetchCountries(url)
})
</script>

<template>
  <div class="flex flex-col gap-10 md:flex-row md:justify-between mb-10">
    <SearchInput v-model="search" placeholder="Search for a country..." />
    <select
      v-model="region"
      class="focus-within:ring-1 w-fit focus-within:ring-offset-1 focus-within:ring-dark-blue rounded-md px-2 h-10 placeholder:text-dark-gray shadow-md bg-white dark:bg-dark-blue dark:text-white"
    >
      <option v-for="region in regions" :key="region" :value="region">
        {{ region }}
      </option>
    </select>
  </div>
  <div
    class="relative grid grid-cols-1 md:grid-cols-[repeat(auto-fill,320px)] place-content-evenly gap-5"
  >
    <template v-if="status === 'loading'">
      <Skeleton v-for="index in 20" :key="index" class="aspect-[3/3.5]" />
    </template>
    <div v-else-if="status === 'error'" class="text-center">
      <span class="text-xl left-1/2 -translate-x-1/2 inline-block dark:text-white absolute">
        {{ search === '' ? 'No countries found' : 'No countries found for this search' }}
      </span>
    </div>
    <template v-else>
      <CountryCard v-for="country in countries" :key="country.name.common" :country="country" />
    </template>
  </div>
</template>
