<script setup>
const FILENAME = 'BookAppointmentModal.vue';
import { ref, watch } from 'vue';
import { fetchDoctorSlots } from '../../api/booking';

console.log('isModalOpen:', true);

const props = defineProps({
  doctorService: {
    type: Object,
    required: true,
  },
});

const selectedDate = ref(''); // Step 1: Create a data property for the selected date
const upcomingSlots = ref([]);
const timeSlots = {
  1: '09:00 - 09:30',
  2: '09:30 - 10:00',
  3: '10:00 - 10:30',
  4: '10:30 - 11:00',
  5: '11:00 - 11:30',
  6: '11:30 - 12:00',
  7: '13:00 - 13:30',
  8: '13:30 - 14:00',
  9: '14:00 - 14:30',
  10: '14:30 - 15:00',
  11: '15:00 - 15:30',
  12: '15:30 - 16:00',
  13: '16:00 - 16:30',
  14: '16:30 - 17:00',
  15: '17:00 - 17:30',
  16: '17:30 - 18:00',
};

const selectedSlot = ref(null);

const emits = defineEmits(['close']); // Declare 'close' event

// Step 2: Watch for changes in the selected date and update upcomingSlots
watch(selectedDate, async () => {
  selectedSlot.value = null;
  calculateSlots(); // Pass the selected date to calculateSlots
});

const calculateSlots = async () => {
  const data = await fetchDoctorSlots(props.doctorService.serviceId, selectedDate.value); // Use the fetchCatalog function
  console.log(FILENAME, 'Doctor slots: ', data);
  if (data) {
    upcomingSlots.value = data.map((slotNumber) => timeSlots[slotNumber]); // Map slot numbers to time slots
  }
};

const bookAppointment = () => {
  const selectedSlotNumber = selectedSlot.value + 1;
  if (selectedSlotNumber !== null) {
    // Send the selected slot number to the backend for booking
    console.log(FILENAME, `Selected Slot Number: ${selectedSlotNumber}`);
    // Implement the booking logic here
    emits('close');
  }
};

const closeModal = (doctorId) => {
  console.log(FILENAME, 'Closing Modal...', doctorId);
  emits('close');
};
</script>

<template>
  <div class="modal modal-open">
    <div class="modal-content">
      <h2 class="text-2xl font-semibold mb-3">Book Appointment</h2>
      <hr>

      <div class="mb-4">
        <h3 class="text-lg font-semibold">{{ doctorService.name }}</h3>
        <p class="text-gray-600">{{ doctorService.specialty }}</p>
      </div>

      <hr>

      <!-- Step 2: Add a date input field -->
      <label for="date" class="text-lg font-semibold">Select a Date:</label>
      <input v-model="selectedDate" type="date" id="date" name="date" class="mb-2">

      <h3 class="text-lg font-semibold">Upcoming Appointment Slots</h3>
      <select v-model="selectedSlot">
        <option value="null" disabled hidden selected>Select a slot</option>
        <option v-for="(slot, slotNumber) in upcomingSlots" :value="slotNumber">{{ slot }}</option>
      </select>

      <!-- Conditional message when no slots are available -->
      <p v-if="selectedDate && upcomingSlots.length === 0" class="error-msg">No slots available!</p>
      <p v-else-if="selectedDate && selectedSlot" class="mt-2">Estimated Charges: ${{ doctorService.estimatedPrice }}</p>

      <div class="mt-4 modal-action">
        <button @click="closeModal(doctorService.id)" class="bg-red-500">Cancel</button>
        <button @click="bookAppointment" class="bg-green-500 ml-2" :disabled="selectedSlot === null">Book</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './bookServicesModalStyle.css';
</style>
