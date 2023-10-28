<script setup>
const FILENAME = 'LabTestDetailsView.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { labTestBookingDetails } from '../../_dummy_data/labTestBookings';
import Breadcrumb from '../../components/Breadcrumb.vue';

const searchStatus = ref('');
const router = useRouter();
console.log(FILENAME, 'On details page');
const viewDetails = (booking) => {
  // router.push(`/${booking.id}`);
};

const filteredLabTestBookings = computed(() => {
  return labTestBookings.filter((booking) =>
    booking.status.toLowerCase().includes(searchStatus.value.toLowerCase()),
  );
});

const booking = ref(labTestBookingDetails);

const breadcrumbItems = [
  { text: 'Test Management', to: '/test-management' },
  { text: 'View Test Details', to: `/test-management/${booking.value.id}` },
];

</script>

<template data-theme="corporate">
  <div class="p-8">
    <Breadcrumb :items="breadcrumbItems" />

    <div class="p-8">
      <div class="flex items-center"> <!-- Add a flex container -->
        <h2 class="text-xl font-semibold mb-2">Lab Test Details - Booking #{{ booking.id }}</h2>
        <span
          :class="{
            'bg-orange-700': booking.status === 'pending',
            'bg-green-700': booking.status === 'completed',
          }"
          class="rounded-full py-1 px-2 text-white ml-4"
        >
          {{ booking.status }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2 ml-8">
      <div>
        <!-- <h3 class="text-lg font-semibold">Patient Information</h3> -->
        <ul>
          <li><strong>Patient Name:</strong> {{ booking.patientName }}</li>
          <li><strong>Date of Birth:</strong> {{ booking.dob }}</li>
          <li><strong>Gender:</strong> {{ booking.gender }}</li>
        </ul>
      </div>

      <div>
        <!-- <h3 class="text-lg font-semibold">Test Information</h3> -->
        <ul>
          <li><strong>Test Name:</strong> {{ booking.testName }}</li>
          <li><strong>Test Date:</strong> {{ booking.testDate }}</li>
          <li><strong>Test Result:</strong> {{ booking.testResult }}</li>
        </ul>
      </div>
    </div>

    <div class="mt-4 space-x-4 p-8">
      <button class="view-history-button">View Appointment History</button>
      <button class="update-status-button">Update Status</button>
    </div>
  </div>
</template>

<style scoped>
li {
  @apply mb-2;
}

.view-history-button,
.update-status-button {
  @apply bg-white text-black border border-black px-4 py-2 rounded cursor-pointer transition-colors duration-300;
}

.view-history-button:hover,
.update-status-button:hover {
  @apply bg-black text-white;
}
</style>
