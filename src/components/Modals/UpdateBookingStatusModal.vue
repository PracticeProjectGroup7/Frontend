<script setup>
import { ref } from 'vue';

const FILENAME = 'UpdateBookingStatusModal';

const props = defineProps({
  booking: Object,
  isDoctorTypeBooking: Boolean,
});

const newStatus = ref('pending');
const result = ref('');
const emits = defineEmits(['close', 'status-saved']);
const closeModal = () => {
  console.log(FILENAME, 'Closing modal...');
  emits('close'); // Emit a 'close' event to the parent component
};

const saveStatus = () => {
  // Handle saving the new status and test result
  // Emit an event to the parent component with the new data
  console.log(FILENAME, 'Updating status...');
  emits('status-saved', { newStatus: newStatus.value, result: result.value });
  closeModal();
};
</script>

<template>
    <div class="modal modal-open">
      <div class="modal-content">
        <h2 class="modal-title">Set {{ props.isDoctorTypeBooking ? 'Appointment' : 'Lab Test' }} Status</h2>
        <hr class="modal-hr mb-2" />

        <!-- Patient information -->
        <div class="modal-info mb-2">
          <p><strong>Patient Name:</strong> {{ booking.patientName }}</p>
          <p>
            <strong>
              {{ props.isDoctorTypeBooking ? 'Appointment' : 'Test' }} Date:
            </strong>
            {{ props.isDoctorTypeBooking ? booking.appointmentDate : booking.testDate }}
          </p>
          <p>
            <strong>
              {{ props.isDoctorTypeBooking ? 'Appointment' : 'Test' }} Name:
            </strong>
            {{ props.isDoctorTypeBooking ? booking.doctorName : booking.testName }}
          </p>
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
              <label for="result">{{ props.isDoctorTypeBooking ? 'Diagnosis' : 'Test Result' }}: </label>
              <input type="text" id="result" v-model="result" />
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
