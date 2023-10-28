<script setup>
import { ref } from 'vue';

const FILENAME = 'UpdateLabTestStatusModal';

const props = defineProps({
  booking: Object,
});

const newStatus = ref('pending');
const testResult = ref('');
const emits = defineEmits(['close', 'status-saved']);
const closeModal = () => {
  console.log(FILENAME, 'Closing modal...');
  emits('close'); // Emit a 'close' event to the parent component
};

const saveStatus = () => {
  // Handle saving the new status and test result
  // Emit an event to the parent component with the new data
  console.log(FILENAME, 'Updating status...');
  emits('status-saved', { newStatus: newStatus.value, testResult: testResult.value });
  closeModal();
};
</script>

<template>
    <div class="modal modal-open">
      <div class="modal-content">
        <h2 class="modal-title">Set Lab Test Status</h2>
        <hr class="modal-hr mb-2" />

        <!-- Patient information -->
        <div class="modal-info mb-2">
          <p><strong>Patient Name:</strong> {{ booking.patientName }}</p>
          <p><strong>Test Date:</strong> {{ booking.testDate }}</p>
          <p><strong>Test Name:</strong> {{ booking.testName }}</p>
          <p><strong>Current Status:</strong> {{ booking.status }}</p>
        </div>

        <hr class="modal-hr mb-2" />

        <!-- Form -->
        <div class="modal-form">
          <div class="modal-input">
            <div class="flex flex-col mb-2">
              <label for="newStatus">New Status: </label>
              <select id="newStatus" v-model="newStatus">
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div class="flex flex-col mb-4">
              <label for="testResult">Test Result: </label>
              <input type="text" id="testResult" v-model="testResult" />
            </div>
          </div>

          <hr class="modal-hr" />

          <div class="modal-buttons space-x-4">
            <button class="btn-primary" @click="saveStatus">Update</button>
            <button class="btn-primary" @click="closeModal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>

<style scoped>

  .modal-content {
    @apply bg-white p-8 rounded-lg;
  }

  .btn-primary {
    @apply bg-white text-black border border-black px-4 py-2 rounded cursor-pointer transition-colors duration-300;
  }

  .btn-primary:hover {
    @apply bg-black text-white;
  }
</style>
