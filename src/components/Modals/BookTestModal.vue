<script setup>
const FILENAME = 'BookTestModal.vue';
import { ref } from 'vue';
import { labTestSlots } from '../../_dummy_data/servicesCatalog';

console.log('isModalOpen:', true);

const props = defineProps({
  labTest: {
    type: Object,
    required: true,
  },
});
const upcomingSlots = ref(labTestSlots);
const selectedSlot = ref(null);

const emits = defineEmits(['close']); // Declare 'close' event

const calculateCharges = () => {
  // Return the calculated charges.
  return '150';
};

const calculateSlots = () => {
  // TODO : logic to retrieve available bookings for the labTest
  return;
};

const bookLabTest = () => {
  // TODO: Implement the booking logic
  // reduce available slots by 1 for the selected date
  emits('close');
};

const closeModal = (labTestId) => {
  console.log(FILENAME, 'Closing Modal for test ID...', labTestId);
  emits('close');
};

function getDateWithoutTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}
</script>

<template>
  <div class="modal modal-open">
    <div class="modal-content">
      <h2 class="text-2xl font-semibold mb-3">Book Test/Scan</h2>
      <hr>

      <div class="mb-4">
        <h3 class="text-lg font-semibold">{{ labTest.name }}</h3>
        <p class="text-gray-600">{{ labTest.description }}</p>
      </div>

      <hr>

      <h3 class="text-lg font-semibold">Available dates</h3>
      <select v-model="selectedSlot">
        <option value="null" disabled hidden selected>Select a slot</option>
        <option v-for="slot in upcomingSlots">{{ getDateWithoutTime(slot.date) }}</option>
      </select>

      <!-- Conditional message when no slots are available -->
      <p v-if="upcomingSlots.length === 0" class="error-msg">No slots available!</p>

      <p v-else-if="selectedSlot" class="mt-2">Estimated Charges: ${{ calculateCharges(selectedSlot) }}</p>

      <div class="mt-4 modal-action">
        <button @click="closeModal(labTest.id)" class="bg-red-500">Cancel</button>
        <button @click="bookLabTest" class="bg-green-500 ml-2" :disabled="!selectedSlot">Book</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './bookServicesModalStyle.css';
</style>
