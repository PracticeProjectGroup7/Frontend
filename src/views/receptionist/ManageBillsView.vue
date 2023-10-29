<script setup>
const FILENAME = 'ManageBillsView';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { genericBookingList } from '../../_dummy_data/bookings';

const searchStatus = ref('');
const router = useRouter();

const bookings = ref(genericBookingList);

const viewBill = (booking) => {
  console.log(FILENAME, 'Clicked on View Bill');
  router.push(`/bill-management/${booking.billId}`);
};

const filteredBookings = computed(() => {
  return bookings.value.filter((booking) =>
    booking.id.toLowerCase().includes(searchStatus.value.toLowerCase()),
  );
});
</script>

<template data-theme="corporate">
  <div class="p-8">
    <h1 class="text-xl font-semibold mb-4">
      Manage Bills
    </h1>
    <input v-model="searchStatus" class="w-full p-2 mb-4 border rounded" placeholder="Search by booking ID..." />
    <table>
      <caption hidden>
        List of bookings
      </caption>
      <thead>
        <tr>
          <th class="table-item">Booking ID</th>
          <th class="table-item">Patient Name</th>
          <th class="table-item">Date</th>
          <th class="table-item"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in filteredBookings" :key="booking.id">
          <td class="table-item">{{ booking.id }}</td>
          <td class="table-item">{{ booking.patientName }}</td>
          <td class="table-item">{{ booking.bookingDate }}</td>
          <td class="table-item">
            <button @click="viewBill(booking)" class="view-bill-button">View Bill</button>
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

.view-bill-button {
  @apply bg-white text-black border border-black px-4 py-2 rounded cursor-pointer transition-colors duration-300;
}

.view-bill-button:hover {
  @apply bg-black text-white; /* Update hover styles to reverse colors */
}
</style>
