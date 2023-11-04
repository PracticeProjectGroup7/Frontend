<script setup>
import { ref } from 'vue';
import { updateBookingStatus } from '../../api/staffBookingManagement';

const FILENAME = 'UpdateBookingStatusModal';

const props = defineProps({
  booking: Object,
  isDoctorTypeBooking: Boolean,
});

const newStatus = ref(props.isDoctorTypeBooking ?
  props.booking.details.appointmentStatus : props.booking.details.testStatus);
console.log(FILENAME, '[DVDVDVD] Previous status', newStatus);
const result = ref('');
const emits = defineEmits(['close', 'status-saved']);
const closeModal = () => {
  console.log(FILENAME, 'Closing modal...');
  emits('close'); // Emit a 'close' event to the parent component
};

const saveStatus = async () => {
  // Handle saving the new status and test result
  // Emit an event to the parent component with the new data
  console.log(FILENAME, 'Updating status...');
  const bookingInfo = {
    'status': newStatus.value,
    'comments': result.value,
    'result': result.value,
  };
  const bookingId = props.isDoctorTypeBooking ? props.booking.details.appointmentId : props.booking.details.testId;
  await updateBookingStatus(props.isDoctorTypeBooking, bookingId, { bookingInfo } );
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
          <p><strong>Patient Name:</strong> {{ booking.patientDetails.patientName }}</p>
          <p>
            <strong>
              {{ props.isDoctorTypeBooking ? 'Appointment' : 'Test' }} Date:
            </strong>
            {{ booking.bookingDate }}
          </p>
          <p>
            <strong>
              {{ props.isDoctorTypeBooking ? 'Doctor' : 'Test' }} Name:
            </strong>
            {{ props.isDoctorTypeBooking ? booking.details.doctorName : booking.details.testName }}
          </p>
          <p>
            <strong>Current Status: </strong>
            {{ props.isDoctorTypeBooking ? booking.details.appointmentStatus : booking.details.testStatus }}
          </p>
        </div>

        <hr class="modal-hr mb-2" />

        <!-- Form -->
        <div class="modal-form">
          <div class="modal-input">
            <div class="flex flex-col mb-2">
              <label for="newStatus">New Status: </label>
              <select id="newStatus" v-model="newStatus">
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
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
