<script setup>
const FILENAME = 'AppointmentHistory.vue';

import { computed, onBeforeMount, ref, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';

import IconLabTest from '../icons/IconLabTest.vue';
import IconDoctor from '../icons/IconDoctor.vue';


import { BOOKING_TYPE_LAB, BOOKING_TYPE_DOCTOR } from '../../config/constants';

// =====

const props = defineProps({
  appointmentInfo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['openModal']);

// =====

onBeforeMount(() => {

});

// Internal functions

let humanDate = computed(() => {
  return (new Date(parseInt(props.appointmentInfo.appointmentDate, 10))).toDateString();
});

let isInFuture = computed(() => {
  return props.appointmentInfo.appointmentDate > Date.now();
});

let appointmentType = computed(() => {
  return props.appointmentInfo.appointmentType;
});

function _handleOpenModal() {
  console.log(FILENAME, '_handleOpenModal');
  emit('openModal', { type: appointmentType.value, appointmentId: props.appointmentInfo.appointmentId });
}

</script>

<template>
  <tr class="shadow-md">
    <td>
      <div class="flex items-center justify-center">
        <div class="w-12 h-12">
          <IconLabTest v-if="appointmentType == BOOKING_TYPE_LAB" />
          <IconDoctor v-if="appointmentType == BOOKING_TYPE_DOCTOR" />
        </div>
      </div>
    </td>
    <td>
      <div>
        <div class="font-medium"> {{ appointmentDate }}
          <span v-if="isInFuture" class="upcoming-badge">Upcoming</span>
        </div>
        <div class="font-bold py-2">INFO</div>
      </div>
    </td>
    <td class="text-center">
      <template v-if="isInFuture">
        <button class="btn btn-outline btn-success btn-md border-2">
          Modify Booking
        </button>
      </template>
      <template v-else>
        <button v-if="appointmentType == BOOKING_TYPE_LAB" class="link p-2 link-secondary" v-on:click="_handleOpenModal">
          See test results
        </button>
        <button v-if="appointmentType == BOOKING_TYPE_DOCTOR" class="link p-2 link-secondary"
          v-on:click="_handleOpenModal">
          See details
        </button>
      </template>
    </td>
  </tr>
</template>

<style scoped>
.upcoming-badge {
  @apply badge badge-md font-medium py-4 ml-6 rounded;

  background-color: hsl(var(--su));
  color: hsl(var(--nc));
}
</style>
