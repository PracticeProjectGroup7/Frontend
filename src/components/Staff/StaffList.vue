<script setup>
const FILENAME = 'StaffList.vue';

import { computed, onBeforeMount, ref, inject, defineEmits } from 'vue';
import { vInfiniteScroll } from '@vueuse/components';

import { vh } from '../../utils/utils';

import StaffListItem from './StaffListItem.vue';

// =====


const emit = defineEmits(['loadMore']);

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

function onLoadMore() {
  emit('loadMore');
}


</script>

<template>
  <div class="table_body overflow-x-auto" v-infinite-scroll="[onLoadMore, { distance: vh(1), interval: 500 }]">
    <table class="table table-pin-rows" v-if="staffList.length > 0">
      <thead class="text-base text-black font-bold">
        <tr>
          <th class="text-left">Name</th>
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
  </div>
</template>

<style scoped>
.table_body {
  height: 59vh;
}
</style>
