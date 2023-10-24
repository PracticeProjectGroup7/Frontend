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
    <td>
      <div class="flex items-center justify-center">
        {{ staffInfo.name }}
      </div>
    </td>
    <td>
      <div>
        {{ staffInfo.email }}
      </div>
    </td>
    <td class="text-center">
      <RouterLink :to="{ name: ROUTE_STAFF_PROFILE, params: { staffId: staffInfo.staffId } }" class="btn-outline btn">
        View Profile
      </RouterLink>
    </td>
  </tr>
</template>
