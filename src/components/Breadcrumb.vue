<template>
  <nav class="breadcrumb">
    <template v-for="(item, index) in items" :key="index">
      <span v-if="index > 0"> &gt; </span>
      <a :href="item.to">{{ item.text }}</a>
    </template>
  </nav>
</template>

<script setup>
const props = defineProps({
  items: Array,
});
</script>

<style scoped>
  .breadcrumb {
    @apply text-gray-600;
  }
</style>

