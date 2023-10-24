<script setup>
const FILENAME = 'StaffList.vue';

import { computed, onBeforeMount, ref, inject, defineEmits } from 'vue';

import StaffListItem from './StaffListItem.vue';

// =====

const props = defineProps({
  staffList: {
    type: Array,
    required: true,
    default: () => [],
  },
});

// =====

onBeforeMount(() => {
  console.log(FILENAME, 'beforeMount', 'start');

  console.log(FILENAME, 'beforeMount', 'end');
});


</script>

<template data-theme="corporate">
  <table class="table" v-if="staffList.length > 0">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(staff) in staffList" :key="staff.id">
        <StaffListItem :staffInfo="staff" />
      </template>
    </tbody>
  </table>
</template>

<style>
</style>
