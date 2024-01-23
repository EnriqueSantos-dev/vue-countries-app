<script setup lang="ts">
import { useDebounce, useFetch } from '@vueuse/core'
import { ref, watch } from 'vue'

import CountryCard from '@/components/CountryCard.vue'
import SearchInput from '@/components/SearchInput.vue'
import Skeleton from '@/components/Skeleton.vue'

import { baseURL } from '@/constants/api'
import { regions } from '@/constants/regions'

import { mapApiResponseToEntity } from '@/helpers/map-api-response-to-entity'
import type { Country } from '@/types'

type Regions = (typeof regions)[number]

const url = ref(`${baseURL}/all`)
const region = ref<Regions>('All')
const search = ref<string>('')

const {
  isFetching,
  data: countries,
  error
} = useFetch<Country[]>(url, {
  refetch: true,
  async afterFetch(ctx) {
    const countries = await ctx.response.json()
    ctx.data = countries.map(mapApiResponseToEntity)
    return ctx
  }
})

const debouncedSearch = useDebounce(search, 500)

watch(region, () => {
  const regionValue = region.value
  const newUrl =
    regionValue === 'All' ? `${baseURL}/all` : `${baseURL}/region/${regionValue.toLowerCase()}`
  url.value = newUrl
})

watch(debouncedSearch, () => {
  const searchValue = debouncedSearch.value

  const newUrl =
    searchValue === '' ? `${baseURL}/all` : `${baseURL}/name/${searchValue.toLowerCase()}`
  url.value = newUrl
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
    <template v-if="isFetching">
      <Skeleton v-for="index in 20" :key="index" class="aspect-[3/3.5]" />
    </template>
    <div v-if="error" class="text-center">
      <span
        class="text-xl left-1/2 text-center -translate-x-1/2 inline-block dark:text-white absolute"
      >
        {{ search === '' ? 'No countries found' : 'No countries found for this search' }}
      </span>
    </div>
    <template v-if="countries">
      <CountryCard v-for="country in countries" :key="country.name.common" :country="country" />
    </template>
  </div>
</template>
