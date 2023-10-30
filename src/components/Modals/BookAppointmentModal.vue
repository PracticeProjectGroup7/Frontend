<script setup>
const FILENAME = 'BookAppointmentModal.vue';
import { ref, watch, inject } from 'vue';
import { easyPost } from '../../api/easyFetch';
import { USER_AUTH_STORE_INJECT } from '../../config/injectKeys';
import { timeSlots } from '../../config/timeSlots';
import { API_BASE_PATH } from '../../config/apiPaths';
import { fetchDoctorSlots } from '../../api/booking';

const { loggedIn, role: userRole, userInfo } = inject(USER_AUTH_STORE_INJECT);
console.log('isModalOpen:', true);

const props = defineProps({
  doctorService: {
    type: Object,
    required: true,
  },
});

const selectedDate = ref(''); // Step 1: Create a data property for the selected date
const upcomingSlots = ref([]);

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

const bookAppointment = async () => {
  const selectedSlotNumber = selectedSlot.value + 1;
  if (selectedSlotNumber != null) {
    // Send the selected slot number to the backend for booking
    console.log(FILENAME, `Selected Slot Number: ${selectedSlotNumber}`);
    console.log(FILENAME, 'Booking service ID...', props.doctorService.serviceId);
    const url = '/api/v1/services/booking';
    const response = await easyPost({
      url: API_BASE_PATH + url,
      body:
      {
        'serviceId': props.doctorService.serviceId,
        'patientId': userInfo.value.roleId,
        'appointmentDate': selectedDate.value,
        'selectedSlot': selectedSlotNumber,
        'type': 'APPOINTMENT',
      },
    });
    if (response.done) {
      console.log(`${FILENAME} - Booking successful`, response.body);
    } else {
      console.error(`${FILENAME} - Error in booking appointment`);
    }
    // Implement the booking logic here
    emits('close');
  }
};

const closeModal = () => {
  console.log(FILENAME, 'Closing Modal...');
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
        <button @click="closeModal" class="bg-red-500">Cancel</button>
        <button @click="bookAppointment" class="bg-green-500 ml-2" :disabled="selectedSlot === null">Book</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './bookServicesModalStyle.css';
</style>
