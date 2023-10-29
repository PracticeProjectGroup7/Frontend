<script setup>
const FILENAME = 'LabTests.vue';
import { ref, computed, onMounted } from 'vue';
import BookTestModal from '../Modals/BookTestModal.vue';
import { BOOKING_TYPE_LAB } from '../../config/constants';
import { fetchCatalog } from '../../api/serviceCatalog.js';

const props = defineProps({
  loggedIn: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const searchedItem = ref('');
const labTests = ref([]);
const labTestModal = ref({});

onMounted(async () => {
  const data = await fetchCatalog(BOOKING_TYPE_LAB); // Use the fetchCatalog function
  if (data) {
    labTests.value = data; // Update the labTests array with the API response data
  }
});

const filteredTests = computed(() => {
  return labTests.value.filter((labTest) =>
    labTest.name.toLowerCase().includes(searchedItem.value.toLowerCase()),
  );
});

const bookLabTest = (labTestId) => {
  // TODO: logic to book
  labTestModal.value[labTestId] = true;
  console.log(FILENAME, 'Booking lab test with ID:', labTestId);
};

const closeModal = (labTestId) => {
  // Set the modal state for the specific doctor to false
  console.log(FILENAME, 'Closing Modal for test ID...', labTestId);
  labTestModal.value[labTestId] = false;
};

const isModalOpen = (labTestId) => {
  // Check if the modal is open for the specific doctor
  return labTestModal.value[labTestId] || false;
};
</script>

<template>
  <div class="labTest-catalog">
    <div class="search">
      <input placeholder="Search by name..." v-model="searchedItem">
    </div>
    <div class="labTest-cards">
      <div class="labTest-card" v-for="labTest in filteredTests" :key="labTest.id">
        <div class="labTest-details">
          <h2>{{ labTest.name }}</h2>
          <p>{{ labTest.description }}</p>
        </div>
        <button v-if="loggedIn" class="book-labTest" v-on:click="bookLabTest(labTest.id)">
          Book Test/Scan
        </button>
        <div v-else>
          Please log in to book tests or scans.
        </div>
        <!-- Modal component to book lab test -->
        <BookTestModal v-if="isModalOpen(labTest.id)" :labTest="labTest" @close="closeModal(labTest.id)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.labTest-catalog {
  @apply p-5 space-y-5; /* Use DaisyUI and Tailwind classes for padding and spacing */
}

.search {
  @apply flex flex-col mb-5; /* Flex and margin classes */
}

.labTest-cards {
  @apply flex flex-wrap gap-5; /* Flex, wrap, and gap classes */
}

.labTest-card {
  @apply border border-gray-300 p-5 rounded w-72; /* Border, padding, rounded, and width classes */
}

.labTest-details {
  @apply mb-5; /* Margin class */
}

.book-labTest {
  @apply bg-green-500 text-white rounded py-2 px-5 cursor-pointer; /* Background, text color, and padding classes */

  &:hover {
    @apply bg-blue-500; /* Background color on hover */
  }
}
</style>
