<script setup>
const FILENAME = 'BookingDetailsModal.vue';

import { computed, onBeforeMount } from 'vue';

import { ROUTE_BOOKING_BILL } from '../../router';
import { mixedBookingList } from '../../_dummy_data/bookings';

import { BOOKING_TYPE_DOCTOR } from '../../config/constants';

// ==

const props = defineProps({
  modalOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
  bookingDetails: {
    type: Object,
    required: true,
    default: () => { },
  },
});

const emit = defineEmits(['update:modalOpen']);

onBeforeMount(() => {
  console.log(FILENAME, 'beforeMount', 'start');
  console.log(FILENAME, props.bookingDetails);
  console.log(FILENAME, 'beforeMount', 'end');
});


const labels = computed(() => {
  return props.bookingDetails.bookingType == BOOKING_TYPE_DOCTOR ? {
    modalTitle: 'Appointment Details',
    provider: 'Physician',
    details: 'Department',
    date: 'Time of apppointment',
    result: 'Diagnosis & Comments',
  } : {
    modalTitle: 'Laboratory Test Details',
    provider: 'Laboratory Clinician',
    details: 'Test Name',
    date: 'Test order date',
    result: 'Test Result',
  };
});

function closeModal() {
  emit('update:modalOpen', false);
}

</script>

<template>
  <dialog class="modal modal-open">
    <div class="modal-box">

      <div class="custom-modal-title">{{ labels.modalTitle }}</div>

      <div class="modal-body">

        <div class="data-row">
          <div>{{ labels.provider }}</div>
          <div>{{ bookingDetails.bookingId }}</div>
        </div>

        <div class="data-row">
          <div>{{ labels.details }}</div>
          <div>{{ bookingDetails.bookingId }}</div>
        </div>

        <div class="data-row">
          <div>{{ labels.date }}</div>
          <div>{{ bookingDetails.bookingId }}</div>
        </div>

        <div class="data-row">
          <div>{{ labels.result }}</div>
          <div>{{ bookingDetails.bookingId }}</div>
        </div>

        <div class="data-row">
          <div>Booking ID:</div>
          <div>{{ bookingDetails.bookingId }}</div>
        </div>

      </div>

      <div class="modal-action">
        <RouterLink :to="{ name: ROUTE_BOOKING_BILL, params: { billId: bookingDetails.billId } }"
          class="custom-btn-outline">
          View Bills
        </RouterLink>
        <button v-on:click="closeModal"> Close </button>
      </div>
    </div>

    <div class="modal-backdrop" v-on:click="closeModal">
      <button>close</button>
    </div>
  </dialog>
</template>

<style scoped>
@import './modalStyle.css';

.modal-body>.data-row>div:nth-child(1) {
  @apply font-bold text-base pb-2;
}

.modal-body>.data-row>div:nth-child(2) {
  @apply text-base;
}
</style>
