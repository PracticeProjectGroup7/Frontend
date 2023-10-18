<script setup>
const FILENAME = 'AppointmentList.vue';

import { computed, onBeforeMount, ref, inject, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';

import AppointmentListItem from './AppointmentListItem.vue';

// =====

const props = defineProps({
  appointmentList: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(['openModal']);

// =====

onBeforeMount(() => {
  console.log(FILENAME, 'beforeMount', 'start');

  console.log(FILENAME, 'beforeMount', 'end');
});

function _handleOpenModal({ type, appointmentId }) {
  console.log(FILENAME, '_handleOpenModal', { type, appointmentId });
  emit('openModal', { type, appointmentId });
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
</template>

<style>
</style>
