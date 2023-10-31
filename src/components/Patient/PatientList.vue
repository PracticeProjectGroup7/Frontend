<script setup>
const FILENAME = 'PatientList.vue';

import { computed, onBeforeMount, ref, inject, defineEmits } from 'vue';
import { vInfiniteScroll } from '@vueuse/components';

import { vh } from '../../utils/utils';

import PatientListItem from './PatientListItem.vue';

// =====


const emit = defineEmits(['loadMore']);

const props = defineProps({
  patientList: {
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
  <div class="table_body overflow-x-auto" v-infinite-scroll="[onLoadMore, { distance: vh(1), interval: 100 }]">
    <table class="table table-pin-rows" v-if="patientList.length > 0">
      <thead class="text-base text-black font-bold">
        <tr>
          <th class="text-left">Name</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(patient) in patientList" :key="patient.patientId">
          <PatientListItem :patientInfo="patient" />
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table_body {
  height: 55vh;
}
</style>
