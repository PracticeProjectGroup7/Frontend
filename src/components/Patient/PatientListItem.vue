<script setup>
const FILENAME = 'PatientListItem.vue';

import { computed, onBeforeMount, ref, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';

import { ROUTE_USER_PROFILE } from '../../router/index';

// =====

const props = defineProps({
  patientInfo: {
    type: Object,
    required: true,
  },
});

// =====

onBeforeMount(() => {});

// Internal functions

</script>

<template>
  <tr class="shadow-xs">
    <td class="text-left">{{ patientInfo.firstName }} {{ patientInfo.lastName }}</td>
    <td>{{ patientInfo.email }}</td>
    <td class="text-right">
      <RouterLink :to="{ name: ROUTE_USER_PROFILE, params: { patientId: patientInfo.patientId } }"
        class="btn-neutral btn">
        View Profile
      </RouterLink>
    </td>
  </tr>
</template>

<style scoped>
tr>td {
  @apply py-1;
}
</style>
