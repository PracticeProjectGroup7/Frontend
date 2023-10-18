<script setup>
const FILENAME = 'AppointmentDetailsModal.vue';

import { computed, onBeforeMount } from 'vue';

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


</script>

<template>
  <dialog class="modal modal-open">
    <div class="modal-box p-0 rounded-xl">

      <div class="font-bold text-lg px-6 py-4 border-b-2 border-neutral-300">{{ labels.modalTitle }}</div>

      <div class="px-6 py-6 modal-body">

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
        <button class="btn-outline"> View Bills </button>
        <button v-on:click='emit("update:modalOpen", false)'> Close </button>
      </div>
    </div>

    <div class="modal-backdrop" v-on:click='emit("update:modalOpen", false)'>
      <button>close</button>
    </div>
  </dialog>
</template>

<style scoped>
.modal-action {
  @apply px-6 py-4 border-t-2 border-neutral-300 my-0;

  button {
    @apply btn btn-neutral rounded-md;
  }
}
</style>
