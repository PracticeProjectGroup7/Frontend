<script setup>
const FILENAME = 'LabTestDetailsView.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { labTestBookings } from '../../_dummy_data/labTestBookings';

const searchStatus = ref('');
const router = useRouter();

const viewDetails = (booking) => {
  // Implement the logic to view details of the selected booking
  // You can use router to navigate to the details page or show a modal, etc.
  // Example: router.push(`/details/${booking.id}`);
};

const filteredLabTestBookings = computed(() => {
  return labTestBookings.filter((booking) =>
    booking.status.toLowerCase().includes(searchStatus.value.toLowerCase()),
  );
});

const props = defineProps({
  billId: {
    type: String,
    required: true,
    default: '-1',
  },
});

</script>

<template data-theme="corporate">
  <div>
    <h1>View Booked Tests</h1>
    <input v-model="searchStatus" placeholder="Search by Test Status" />
    <div v-for="booking in filteredLabTestBookings" :key="booking.id">
      <div class="test-details">
        <div class="detail">
          <strong>Patient Name:</strong> {{ booking.patientName }}
        </div>
        <div class="detail">
          <strong>Patient ID:</strong> {{ booking.patientId }}
        </div>
        <div class="detail">
          <strong>Test Name:</strong> {{ booking.testName }}
        </div>
        <div class="detail">
          <strong>Test Date:</strong> {{ booking.testDate }}
        </div>
        <div class="detail">
          <strong>Status:</strong> {{ booking.status }}
        </div>
        <button @click="viewDetails(booking)">View Details</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
