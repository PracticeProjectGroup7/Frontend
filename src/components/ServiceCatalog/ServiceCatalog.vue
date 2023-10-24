<script setup>
import { ref, computed } from 'vue';
import { doctorsCatalog, labTestCatalog } from '../../_dummy_data/servicesCatalog';
import { BOOKING_TYPE_LAB, BOOKING_TYPE_DOCTOR } from '../../config/constants';

const FILENAME = 'ServiceCatalog.vue';

const props = defineProps({
  loggedIn: {
    type: Boolean,
    required: false,
    default: false,
  },
  bookingType: String,
});

const searchedItem = ref('');
const doctorModals = ref({});
const labTestModal = ref({});
const items = ref([]);

// Load items based on the booking type
if (bookingType === BOOKING_TYPE_DOCTOR) {
  items.value = ref(doctorsCatalog);
} else if (bookingType === BOOKING_TYPE_LAB) {
  items.value = ref(labTestCatalog);
}

const filteredItems = computed(() => {
  return items.value.filter((item) =>
    isDrAppointment() ?
      item.specialization.toLowerCase().includes(searchedItem.value.toLowerCase()) :
      item.name.toLowerCase().includes(searchedItem.value.toLowerCase()),
  );
});

const bookAppointment = (itemId) => {
  // Set the modal state for the specific item to true
  isDrAppointment() ?
    (doctorModals.value[itemId] = true) :
    (labTestModal.value[itemId] = true);
  console.log(FILENAME, `Booking ${isDrAppointment() ? 'appointment' : 'test/scan'} with ID:`, itemId);
};

const closeModal = (itemId) => {
  // Set the modal state for the specific item to false
  console.log(FILENAME, `Closing Modal for ${isDrAppointment() ? 'doctor' : 'test/scan'} ID...`, itemId);
  isDrAppointment() ?
    (doctorModals.value[itemId] = false) :
    (labTestModal.value[itemId] = false);
};

const isModalOpen = (itemId) => {
  // Check if the modal is open for the specific item
  return isDrAppointment() ? doctorModals.value[itemId] || false : labTestModal.value[itemId] || false;
};

const isDrAppointment = () => bookingType === BOOKING_TYPE_DOCTOR;

const searchPlaceholder = computed(() => {
  return isDrAppointment() ? 'Search by specialty...' : 'Search by name...';
});

</script>

<template>
  <div class="booking-catalog">
    <div class="search">
      <input placeholder="searchPlaceholder" v-model="searchedItem">
    </div>
    <div class="booking-cards">
      <div v-for="item in filteredItems" :key="item.id" class="booking-card">
        <div class="booking-details">
          <h2>{{ item.name }}</h2>
          <p v-if="isDrAppointment">{{ item.specialization }}</p>
          <p v-else>{{ item.description }}</p>
          <p v-if="isDrAppointment">Experience: {{ item.experience }} years</p>
        </div>
        <button v-if="loggedIn" class="book-appointment" v-on:click="bookAppointment(item.id)">
          {{ isDrAppointment ? 'Book Appointment' : 'Book Test/Scan' }}
        </button>
        <div v-else>
          Please log in to book {{ isDrAppointment ? 'appointments' : 'tests or scans' }}.
        </div>
        <!-- Modal component to book doctor appointment or lab test -->
        <component
          v-if="isModalOpen(item.id)"
          :is="isDrAppointment ? 'BookAppointmentModal' : 'BookTestModal'"
          :doctor="item"
          :labTest="item"
          @close="closeModal(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<style>
.booking-catalog {
  @apply p-5 space-y-5; /* Use DaisyUI and Tailwind classes for padding and spacing */
}

.search {
  @apply flex flex-col mb-5; /* Flex and margin classes */
}

.booking-cards {
  @apply flex flex-wrap gap-5; /* Flex, wrap, and gap classes */
}

.booking-card {
  @apply border border-gray-300 p-5 rounded w-72; /* Border, padding, rounded, and width classes */
}

.booking-details {
  @apply mb-5; /* Margin class */
}

.book-appointment {
  @apply bg-green-500 text-white rounded py-2 px-5 cursor-pointer; /* Background, text color, and padding classes */

  &:hover {
    @apply bg-blue-500; /* Background color on hover */
  }
}
</style>
