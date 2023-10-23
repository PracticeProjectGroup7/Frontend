<script setup>
const FILENAME = 'BookAppointmentModal.vue';
import { ref } from 'vue';
import { availableDoctorSlots } from '../../_dummy_data/servicesCatalog';

console.log('isModalOpen:', true);

const props = defineProps({
  doctor: {
    type: Object,
    required: true,
  },
});
const upcomingSlots = ref(availableDoctorSlots);
const selectedSlot = ref(null);

const emits = defineEmits(['close']); // Declare 'close' event

const calculateCharges = () => {
  // Return the calculated charges.
  return '150';
};

const calculateSlots = () => {
  // TODO : logic to retrieve slots from doctor's working hours
  return;
};

const bookAppointment = () => {
  // TODO
  // Implement the booking logic
  emits('close');
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
          <h3 class="text-lg font-semibold">{{ doctor.name }}</h3>
          <p class="text-gray-600">{{ doctor.specialization }}</p>
        </div>

        <hr>

        <h3 class="text-lg font-semibold">Upcoming Appointment Slots</h3>
        <select v-model="selectedSlot">
          <option value="null" disabled hidden selected>Select a slot</option>
          <option v-for="slot in upcomingSlots">{{ slot.startTime }}, Duration: {{ slot.duration }}</option>
        </select>

        <!-- Conditional message when no slots are available -->
        <p v-if="upcomingSlots.length === 0" class="error-msg">No slots available!</p>
        <p v-else-if="selectedSlot" class="mt-2">Estimated Charges: ${{ calculateCharges(selectedSlot) }}</p>

        <div class="mt-4 modal-action">
          <button @click="closeModal(doctor.id)" class="bg-red-500">Cancel</button>
          <button @click="bookAppointment" class="bg-green-500 ml-2" :disabled="!selectedSlot">Book</button>
        </div>
      </div>
    </div>
  </template>

<style>
@import './bookServicesModalStyle.css';
</style>
