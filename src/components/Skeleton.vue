<script lang="ts">
export default {
  name: 'SkeletonItem'
}
</script>

<template>
  <div class="animate-pulse bg-dark-gray rounded-md dark:bg-very-dark-blue-text">
    <slot />
  </div>
</template>
