<script setup>
const FILENAME = 'AppointmentDetailsModal.vue';

import { computed, onBeforeMount } from 'vue';

import { ROUTE_APPT_BILL } from '../../router';
import { mixedAppointmentList } from '../../_dummy_data/appointments';

// ==

const props = defineProps({
  modalOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
  appointmentDetails: {
    type: Object,
    required: true,
    default: () => { },
  },
});

const emit = defineEmits(['update:modalOpen']);

onBeforeMount(() => {
  console.log(FILENAME, 'beforeMount', 'start');
  console.log(FILENAME, props.appointmentDetails);
  console.log(FILENAME, 'beforeMount', 'end');
});


const labels = computed(() => {
  return props.appointmentDetails.appointmentType == 'doctor' ? {
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

        <div>
          <div class="font-bold text-md pb-2">{{ labels.provider }}</div>
          <div class="text-md">{{ appointmentDetails.appointmentId }}</div>
        </div>

        <div>
          <div class="font-bold text-md pb-2">{{ labels.details }}</div>
          <div class="text-md">{{ appointmentDetails.appointmentId }}</div>
        </div>

        <div>
          <div class="font-bold text-md pb-2">{{ labels.date }}</div>
          <div class="text-md">{{ appointmentDetails.appointmentId }}</div>
        </div>

        <div>
          <div class="font-bold text-md pb-2">{{ labels.result }}</div>
          <div class="text-md">{{ appointmentDetails.appointmentId }}</div>
        </div>

        <div>
          <div class="font-bold text-md pb-2">Appointment ID:</div>
          <div class="text-md">{{ appointmentDetails.appointmentId }}</div>
        </div>

      </div>

      <div class="modal-action">
        <RouterLink :to="{ name: ROUTE_APPT_BILL, params: { billId: appointmentDetails.billId } }"
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
</style>
