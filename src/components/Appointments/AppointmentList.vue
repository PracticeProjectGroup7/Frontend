<script setup>
const FILENAME = 'AppointmentList.vue';

import { computed, onBeforeMount, ref, inject, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';

import AppointmentListItem from './AppointmentListItem.vue';
import AppointmentDetailsModal from '../Modals/AppointmentDetailsModal.vue';

// =====

const props = defineProps({
  appointmentList: {
    type: Array,
    required: true,
    default: () => [],
  },
});

// =====

const selectedAppointment = ref(null);
const modalOpen = ref(false);

onBeforeMount(() => {
  console.log(FILENAME, 'beforeMount', 'start');

  console.log(FILENAME, 'beforeMount', 'end');
});

function _handleOpenModal({ appointmentId }) {
  console.log(FILENAME, '_handleOpenModal', appointmentId);

  for (let i = 0; i < props.appointmentList.length; i++) {
    if (props.appointmentList[i].appointmentId === appointmentId) {
      selectedAppointment.value = props.appointmentList[i];
      break;
    }
  }

  modalOpen.value = true;
}

</script>

<template data-theme="corporate">
  <div class="w-1/2 mx-auto">
    <table class="table">
      <tbody>
        <template v-for="(appointment) in appointmentList" :key="appointment.id">
          <AppointmentListItem :appointmentInfo="appointment" @openModal="_handleOpenModal" />
        </template>
      </tbody>
    </table>
  </div>
  <AppointmentDetailsModal :appointmentDetails="selectedAppointment" v-if="modalOpen" v-model:modalOpen="modalOpen" />
</template>

<style>
</style>
