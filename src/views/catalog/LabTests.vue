<script setup>
const FILENAME = 'LabTests.vue';

import { ref, computed } from 'vue';

import { labTestCatalog } from '../../_dummy_data/servicesCatalog';


const props = defineProps({
  loggedIn: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const searchedItem = ref('');

const labTests = ref(labTestCatalog);

const filteredTests = computed(() => {
  return labTests.value.filter((labTest) =>
    labTest.name.toLowerCase().includes(searchedItem.value.toLowerCase()),
  );
});

const bookLabTest = (labTestId) => {
  // TODO: logic to book
  console.log(FILENAME, 'Booking lab test with test ID:', labTestId);
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
      </div>
    </div>
  </div>
</template>

<style>
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
