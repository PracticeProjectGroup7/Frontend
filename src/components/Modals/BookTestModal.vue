<script setup>
const FILENAME = 'BookTestModal.vue';
import { ref } from 'vue';
import { labTestSlots } from '../../_dummy_data/servicesCatalog';

console.log(FILENAME, 'isModalOpen:', true);

const props = defineProps({
  labTestService: {
    type: Object,
    required: true,
  },
});

console.log(FILENAME, 'labTestService:', props.labTestService);
const upcomingSlots = ref(labTestSlots);
const selectedSlot = ref(null);

const emits = defineEmits(['close']); // Declare 'close' event

const bookLabTest = (labTestId) => {
  // TODO: Implement the booking logic
  console.log(FILENAME, 'Booking service ID...', labTestId);
  emits('close');
};

const closeModal = (labTestId) => {
  emits('close');
};
</script>

<template>
  <div class="modal modal-open">
    <div class="modal-content">
      <h2 class="text-2xl font-semibold mb-3">Book Test/Scan</h2>
      <hr>

      <div class="mb-4">
        <h3 class="text-lg font-semibold">{{ labTestService.name }}</h3>
        <p class="text-gray-600">{{ labTestService.description }}</p>
      </div>

      <hr>

      <!-- Step 2: Change slot selector to a date selector -->
      <label for="date" class="text-lg font-semibold">Select a Date:</label>
      <input v-model="selectedSlot" type="date" id="date" name="date" class="mb-2">

      <!-- Conditional message when no slots are available -->
      <p v-if="upcomingSlots.length === 0" class="error-msg">No slots available!</p>

      <p v-else-if="selectedSlot" class="mt-2">Estimated Charges: ${{ labTestService.estimatedPrice }}</p>

      <div class="mt-4 modal-action">
        <button @click="closeModal(labTestService.id)" class="bg-red-500">Cancel</button>
        <button @click="bookLabTest(labTestService.id)" class="bg-green-500 ml-2" :disabled="!selectedSlot">Book</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './bookServicesModalStyle.css';
</style>
