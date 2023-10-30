<script setup>
const FILENAME = 'DoctorAppointments.vue';
import { ref, computed, onMounted } from 'vue';
import BookAppointmentModal from '../Modals/BookAppointmentModal.vue';
import { BOOKING_TYPE_DOCTOR } from '../../config/constants';
import { fetchCatalog } from '../../api/serviceCatalog.js';

const props = defineProps({
  loggedIn: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const searchedItem = ref('');
const doctors = ref([]);
const doctorModals = ref({}); // Object to track modal state for each doctor

onMounted(async () => {
  const data = await fetchCatalog(BOOKING_TYPE_DOCTOR); // Use the fetchCatalog function
  if (data) {
    doctors.value = data; // Update the doctors array with the API response data
  }
});

const filteredDoctors = computed(() => {
  return doctors.value.filter((doctor) =>
    doctor.specialty.toLowerCase().includes(searchedItem.value.toLowerCase()),
  );
});

const bookAppointment = (doctorId) => {
  // Set the modal state for the specific doctor to true
  doctorModals.value[doctorId] = true;
  console.log(FILENAME, 'Booking appointment with doctor ID:', doctorId);
};

const closeModal = (doctorId) => {
  // Set the modal state for the specific doctor to false
  console.log(FILENAME, 'Closing Modal for doctor ID...', doctorId);
  doctorModals.value[doctorId] = false;
};

const isModalOpen = (doctorId) => {
  // Check if the modal is open for the specific doctor
  return doctorModals.value[doctorId] || false;
};
</script>

<template>
  <div class="doctor-appointments">
    <div class="search">
      <input placeholder="Search by specialty..." v-model="searchedItem">
    </div>
    <div class="doctor-cards">
      <div class="doctor-card" v-for="doctor in filteredDoctors" :key="doctor.id">
        <div class="doctor-details">
          <h2>{{ doctor.name }}</h2>
          <p>{{ doctor.specialty }}</p>
          <p>Experience: {{ doctor.yearsOfExperience }} years</p>
        </div>
        <button v-if="loggedIn" class="book-appointment" v-on:click="bookAppointment(doctor.id)">
          Book Appointment
        </button>
        <div v-else>
          Please log in to book appointments.
        </div>

        <!-- Modal component to book appointment -->
        <BookAppointmentModal v-if="isModalOpen(doctor.id)" :doctor="doctor" @close="closeModal(doctor.id)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.doctor-appointments {
  @apply p-5 space-y-5; /* Use DaisyUI and Tailwind classes for padding and spacing */
}

.search {
  @apply flex flex-col mb-5; /* Flex and margin classes */
}

.doctor-cards {
  @apply flex flex-wrap gap-5; /* Flex, wrap, and gap classes */
}

.doctor-card {
  @apply border border-gray-300 p-5 rounded w-72; /* Border, padding, rounded, and width classes */
}

.doctor-details {
  @apply mb-5; /* Margin class */
}

.book-appointment {
  @apply bg-green-500 text-white rounded py-2 px-5 cursor-pointer; /* Background, text color, and padding classes */

  &:hover{
    @apply bg-blue-500; /* Background color on hover */
  }
}
</style>
