<script setup>
const FILENAME = 'StaffListItem.vue';

import { computed, onBeforeMount, ref, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';

import { ROUTE_STAFF_PROFILE } from '../../router/index';

// =====

const props = defineProps({
  staffInfo: {
    type: Object,
    required: true,
  },
});

// =====

onBeforeMount(() => {

});

// Internal functions

</script>

<template>
  <tr class="shadow-xs">
    <td class="text-left">{{ staffInfo.firstName }} {{ staffInfo.lastName }}</td>
    <td>{{ staffInfo.email }}</td>
    <td class="text-right">
      <RouterLink :to="{ name: ROUTE_STAFF_PROFILE, params: { staffId: staffInfo.staffId } }" class="btn-neutral btn">
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
