const FILENAME = 'AppointmentHistory';
<script setup>

import { computed, onBeforeMount, ref, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';

import IconLabTest from '../icons/IconLabTest.vue';

// =====

const props = defineProps({
  appointmentInfo: {
    type: Object,
    required: true,
    default: function() {
      return {
        name: '',
        userId: '',
      };
    },
  },
});

const emit = defineEmits(['openModal']);

// =====

onBeforeMount(() => {

});

// Internal functions

let humanDate = computed(() => {
  return props.appointmentInfo.appointmentDate;
});

let isInFuture = computed(() => {
  return props.appointmentInfo.appointmentDate;
});

function openModal(e) {
  emit('openModal', 'myId');
}

</script>

<template>
  <div>

    <IconLabTest />

    {{ isInFuture }}
    {{ appointmentInfo.appointmentId }}

    {{ humanDate }}

    <button v-on:click="openModal">AS</button>

  </div>
  <div></div>
</template>
