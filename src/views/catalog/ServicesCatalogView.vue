<script setup>
const FILENAME = 'ServicesCatalogView.vue';

import { ref, computed } from 'vue';

import DoctorAppointments from './DoctorAppointments.vue';
import LabTests from './LabTests.vue';

import { BOOKING_TYPE_LAB, BOOKING_TYPE_DOCTOR } from '../../config/constants';

// ==

const currentContent = ref(BOOKING_TYPE_DOCTOR);

function showContent(type) {
  currentContent.value = type;
}

</script>

<template>
  <div class="services">
    <!-- Our #nav div contains our beloved menu -->
    <div class="nav">
      <a class="font-bold">AVAILABLE SERVICES</a>
      <a @click="showContent(BOOKING_TYPE_DOCTOR)" :class="{ 'font-bold': currentContent === BOOKING_TYPE_DOCTOR }"
        class="nav-link">Doctor Appointments</a>
      <a @click="showContent(BOOKING_TYPE_LAB)" :class="{ 'font-bold': currentContent === BOOKING_TYPE_LAB }" class="nav-link">Lab Tests
        & Scans</a>
    </div>

    <div class="content">
      <div v-if="currentContent === BOOKING_TYPE_DOCTOR">
        <DoctorAppointments :loggedIn="true" />
      </div>

      <div v-if="currentContent === BOOKING_TYPE_LAB">
        <LabTests :loggedIn="true" />
      </div>
    </div>
  </div>
</template>

<style>
.nav {
  @apply p-10 space-y-8; /* Padding and spacing classes */

  a {
    @apply text-gray-900 m-8 no-underline; /* Text color, margin, and no underline */
  }
}

.nav-link {
  @apply text-gray-900 m-8 no-underline cursor-pointer transition duration-300; /* Text color, margin, no underline, cursor, and transition */

  &:hover {
    @apply bg-gray-200; /* Background color on hover */
  }
}

.content {
  @apply p-5; /* Padding class */
}
</style>
