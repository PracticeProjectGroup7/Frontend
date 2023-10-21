<script setup>
const FILENAME = 'BookingHistory.vue';

import { computed, onBeforeMount, ref, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';

import IconLabTest from '../icons/IconLabTest.vue';
import IconDoctor from '../icons/IconDoctor.vue';

import { humanizeDate } from '../../utils/utils';

import { BOOKING_TYPE_LAB, BOOKING_TYPE_DOCTOR } from '../../config/constants';

// =====

const props = defineProps({
  bookingInfo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['openModal']);

// =====

onBeforeMount(() => {

});

// Internal functions

let bookingDate = computed(() => {
  return humanizeDate(props.bookingInfo.bookingDate);
});

let isInFuture = computed(() => {
  return props.bookingInfo.bookingDate > Date.now();
});

let bookingType = computed(() => {
  return props.bookingInfo.bookingType;
});

function _handleOpenModal() {
  console.log(FILENAME, '_handleOpenModal');
  emit('openModal', { type: bookingType.value, bookingId: props.bookingInfo.bookingId });
}

</script>

<template>
  <tr class="shadow-md">
    <td>
      <div class="flex items-center justify-center">
        <div class="w-12 h-12">
          <IconLabTest v-if="bookingType == BOOKING_TYPE_LAB" />
          <IconDoctor v-if="bookingType == BOOKING_TYPE_DOCTOR" />
        </div>
      </div>
    </td>
    <td>
      <div>
        <div class="font-medium"> {{ bookingDate }}
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
        <button v-if="bookingType == BOOKING_TYPE_LAB" class="booking_modal_buttom" v-on:click="_handleOpenModal">
          See test results
        </button>
        <button v-if="bookingType == BOOKING_TYPE_DOCTOR" class="booking_modal_buttom" v-on:click="_handleOpenModal">
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

.booking_modal_button {
  @apply link p-2 link-secondary;
}
</style>
