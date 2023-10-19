<template>
  <div class="services">
    <!-- Our #nav div contains our beloved menu -->
    <div class="nav">
      <a style="font-weight: bold;">AVAILABLE SERVICES</a>
      <a @click="showContent('appointments')" :class="{ 'bold-link': currentContent === 'DoctorAppointments' }" class="nav-link">Doctor Appointments</a>
      <a @click="showContent('tests')" :class="{ 'bold-link': currentContent === 'LabTests' }" class="nav-link">Lab Tests & Scans</a>
    </div>

    <div class="content">
      <div v-if="currentContent === 'DoctorAppointments'">
        <DoctorAppointments :loggedIn="true" />
      </div>

      <div v-if="currentContent === 'LabTests'">
        <LabTests :loggedIn="true" />
      </div>
    </div>
  </div>
</template>

<script>
import DoctorAppointments from './DoctorAppointments.vue';
import LabTests from './LabTests.vue';

export default {
  data() {
    return {
      currentContent: null,
      searchTerm: '',
      filter: 'all', // Set the filter to 'all' by default
    };
  },
  methods: {
    showContent(type) {
      if (type === 'appointments') {
        this.currentContent = 'DoctorAppointments';
      } else if (type === 'tests') {
        this.currentContent = 'LabTests';
      }
    },
  },
  components: {
    DoctorAppointments,
    LabTests,
  },
};
</script>

<style>
.nav {
  @apply p-10 space-y-8; /* Padding and spacing classes */

  a {
    @apply text-gray-900 m-8 no-underline; /* Text color, margin, and no underline */
  }
}

.bold-link {
  @apply font-bold; /* Font weight bold */
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
