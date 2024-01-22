<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <main class="p-8 max-w-[1440px] mx-auto min-h-full">
    <router-view />
  </main>
</template>
