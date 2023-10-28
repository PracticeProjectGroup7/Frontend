<script setup>
const FILENAME = 'FormErrors.vue';

import { computed, onBeforeMount, ref, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';

// =====

const props = defineProps({
  error: {
    type: String,
    required: false,
  },
});

// =====

onBeforeMount(() => {

});

// Internal functions

</script>

<template>
  <label class="label">
    <span class="label-text text-red-700 font-bold text-lg">Error : </span> <br>
  </label>
  <label class="label">
    <span class="label-text text-red-700 text-lg">{{ error }}</span>
  </label>
</template>

<style scoped>
</style>
