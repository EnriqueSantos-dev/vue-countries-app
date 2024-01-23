<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

import { ArrowLeft } from 'lucide-vue-next'

import SkeletonVue from '@/components/Skeleton.vue'

import { baseURL } from '@/constants/api'

import { mapApiResponseToEntity } from '@/helpers/map-api-response-to-entity'
import type { Country } from '@/types'
import { useFetch } from '@vueuse/core'

const route = useRoute()
const { data: country, isFetching } = useFetch<Country>(
  `${baseURL}/name/${route.params.name}?fullText=true`,
  {
    refetch: true,
    async afterFetch(ctx) {
      const countries = await ctx.response.json()
      ctx.data = mapApiResponseToEntity(countries[0])
      return ctx
    }
  }
)
</script>

<template>
  <router-link
    to="/"
    class="shadow-md dark:text-white dark:bg-dark-blue text-very-dark-blue-text rounded-md px-4 h-9 flex w-fit items-center text-sm"
  >
    <ArrowLeft class="inline-block mr-2 size-4" />
    Back
  </router-link>

  <div class="mt-24 flex flex-col md:flex-row items-center gap-10 md:gap-0 md:justify-around">
    <section>
      <SkeletonVue v-if="isFetching" class="size-36" />
      <img v-if="country" :src="country.flags.png" :alt="country.flags.alt" />
    </section>
    <section class="dark:text-white">
      <div v-if="country">
        <h1 class="text-bold text-2xl font-bold mb-5">{{ country.name.common }}</h1>
        <ul class="">
          <li class="text-sm">
            <span class="font-medium">Native Name: </span>{{ country.name.official }}
          </li>
          <li class="text-sm">
            <span class="font-medium">Population: </span
            >{{ Intl.NumberFormat('en-US').format(country.population) }}
          </li>
          <li class="text-sm"><span class="font-medium">Region: </span>{{ country.region }}</li>
          <li class="text-sm">
            <span class="font-medium">Capital: </span>{{ country.capital[0] }}
          </li>
          <li class="text-sm">
            <span class="font-medium">Top Level Domain: </span>{{ country.tld[0] }}
          </li>
          <li class="text-sm">
            <span class="font-medium">Currencies: </span
            >{{ Object.keys(country.currencies).join(', ') }}
          </li>
          <li class="text-sm"><span class="font-medium">Region: </span>{{ country.region }}</li>
          <li class="text-sm">
            <span class="font-medium">Languages: </span
            >{{ Object.values(country.languages).join(', ') }}
          </li>
        </ul>
        <span class="font-medium mt-5 inline-block space-x-2">
          Border Countries:&nbsp;
          <span
            v-for="border in country.borders"
            :key="border"
            class="inline-block shadow-md bg-white text-very-dark-blue-text rounded-md px-2.5 py-1 text-xs"
          >
            {{ border }}
          </span>
        </span>
      </div>
    </section>
  </div>
</template>
