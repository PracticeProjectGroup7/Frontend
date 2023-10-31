<script setup>
const FILENAME = 'ServicesCatalogView.vue';

import { ref, computed, inject } from 'vue';
import DoctorAppointments from '../../components/ServiceCatalog/DoctorAppointments.vue';
import LabTests from '../../components/ServiceCatalog/LabTests.vue';
import { USER_AUTH_STORE_INJECT } from '../../config/injectKeys';
import { BOOKING_TYPE_LAB, BOOKING_TYPE_DOCTOR } from '../../config/constants';


const currentContent = ref(BOOKING_TYPE_DOCTOR);

function showContent(type) {
  currentContent.value = type;
}

const { loggedIn, role: userRole, userInfo } = inject(USER_AUTH_STORE_INJECT);
</script>

<template>
  <div class="services">
    <!-- Our #nav div contains our beloved menu -->
    <div class="nav">
      <a class="font-bold">AVAILABLE SERVICES</a>
      <a id="doctor-appointments" @click="showContent(BOOKING_TYPE_DOCTOR)" :class="{ 'font-bold': currentContent === BOOKING_TYPE_DOCTOR }"
        class="nav-link">Doctor Appointments</a>
      <a id="lab-tests" @click="showContent(BOOKING_TYPE_LAB)" :class="{ 'font-bold': currentContent === BOOKING_TYPE_LAB }" class="nav-link">Lab Tests
        & Scans</a>
    </div>

    <div class="content">
      <DoctorAppointments v-if="currentContent === BOOKING_TYPE_DOCTOR" :loggedIn="loggedIn" />
      <LabTests v-if="currentContent === BOOKING_TYPE_LAB" :loggedIn="loggedIn" />
    </div>
  </div>
</template>

<style scoped>
.nav {
  @apply pt-10 pb-2 space-y-8; /* Padding and spacing classes */

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
  @apply pb-5 pt-0; /* Padding class */
}
</style>
