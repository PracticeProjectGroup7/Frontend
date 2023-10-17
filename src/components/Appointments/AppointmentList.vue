<script setup>
const FILENAME = 'AppointmentList.vue';

import { computed, onBeforeMount, ref, inject, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';

import AppointmentListItem from './AppointmentListItem.vue';

import { mixedAppointmentList } from '../../_dummy_data/appointments';

// =====

const props = defineProps({
  appointmentList: {
    type: Array,
    required: true,
    default: () => mixedAppointmentList,
  },
});

const emit = defineEmits(['openModal']);

// =====

onBeforeMount(() => {
  console.log(FILENAME, 'beforeMount', 'start');

  console.log(FILENAME, 'beforeMount', 'end');
});

function openModal({ type, appointmentId }) {
  console.log(FILENAME, 'openModal', { type, appointmentId });
  emit('openModal', { type, appointmentId });
}

</script>

<template data-theme="corporate">
  <div class="w-1/2 mx-auto">
    <div class="overflow-x-auto">
      <table class="table">
        <tbody>
          <template v-for="(appointment) in appointmentList" :key="appointment.id">
            <AppointmentListItem :appointmentInfo="appointment" @openModal="openModal" />
          </template>
        </tbody>
      </table>
    </div>

  </div>
</template>

<style>
</style>
