<script setup>
const FILENAME = 'LabTestManagementView.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { labTestBookings } from '../../_dummy_data/labTestBookings';

const searchStatus = ref('');
const router = useRouter();

const viewDetails = (booking) => {
  console.log(FILENAME, 'Clicked on View Details');
  router.push(`/test-management/${booking.id}`);
};

const filteredLabTestBookings = computed(() => {
  return labTestBookings.filter((booking) =>
    booking.status.toLowerCase().includes(searchStatus.value.toLowerCase()),
  );
});

</script>

<template data-theme="corporate">
  <div class="p-8">
    <h1 class="text-xl font-semibold mb-4">View Booked Tests</h1>
    <input v-model="searchStatus" class="w-full p-2 mb-4 border rounded" placeholder="Search by Test Status" />
    <table>
      <thead>
        <tr>
          <th class="table-item">Patient Name</th>
          <th class="table-item">Test Name</th>
          <th class="table-item">Test Date</th>
          <th class="table-item">Status</th>
          <th class="table-item"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in filteredLabTestBookings" :key="booking.id">
          <td class="table-item">{{ booking.patientName }}</td>
          <td class="table-item">{{ booking.testName }}</td>
          <td class="table-item">{{ booking.testDate }}</td>
          <td class="table-item">
            <span :class="{'bg-orange-700': booking.status === 'pending', 'bg-green-700': booking.status === 'completed'}" class="status">
              {{ booking.status }}
            </span>
          </td>
          <td class="table-item">
            <button @click="viewDetails(booking)" class="view-details-button">View Details</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.status {
  @apply rounded-full py-1 px-2 text-white;
}

.table-item {
  @apply p-2;
  border-bottom-width: 1px; /* Add border-bottom for all table items */
}

table {
  @apply w-full border-collapse;
  border: none; /* Remove the outer border of the table */
}

th {
  @apply p-2 border-b text-left;
}

.view-details-button {
  @apply bg-white text-black border border-black px-4 py-2 rounded cursor-pointer transition-colors duration-300;
}

.view-details-button:hover {
  @apply bg-black text-white; /* Update hover styles to reverse colors */
}
</style>
