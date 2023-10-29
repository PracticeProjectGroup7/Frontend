<script setup>
const FILENAME = 'BookingDetailsView.vue';
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { isDoctorType } from '../../utils/utils';
import { doctorBooking, labBooking } from '../../_dummy_data/bookings';
import { ROUTE_BOOKING_HISTORY_OTHERS } from '../../router';
import UpdateBookingStatusModal from '../../components/Modals/UpdateBookingStatusModal.vue';

const props = defineProps({
  'testId': String,
  'bookingType': String,
});
const showModal = ref(false);
const openModal = () => {
  showModal.value = true;
};
const isDoctorTypeBooking = isDoctorType(props.bookingType);

const bookingTypeStr = computed(() => {
  return isDoctorTypeBooking ? 'Appointment' : 'Test';
});
const breadcrumbPath = computed(() => {
  return isDoctorTypeBooking ? '/appointment-management' : '/test-management';
});

console.log(FILENAME, 'On details page');

const booking = ref(isDoctorTypeBooking ? doctorBooking : labBooking);

const handleStatusSaved = (data) => {
  // Handle the updated status data here
  console.log(FILENAME, 'Status saved:', data);
};

const closeModal = () => {
  showModal.value = false;
};

</script>

<template data-theme="corporate">
  <div class="p-8">
    <div class="text-sm breadcrumbs">
      <ul>
      <li><RouterLink :to="breadcrumbPath">
        {{ bookingTypeStr }} Management
      </RouterLink></li>
      <li>View {{ bookingTypeStr }} Details</li>
      </ul>
    </div>
    <div class="p-8">
      <div class="flex items-center"> <!-- Add a flex container -->
        <h2 class="text-xl font-semibold mb-2">
          {{ isDoctorTypeBooking ? 'Appointment' : 'Lab Test' }} Details - Booking #{{ booking.id }}
        </h2>
        <span
          :class="{
            'bg-orange-700': booking.status === 'pending',
            'bg-green-700': booking.status === 'completed',
          }"
          class="rounded-full py-1 px-2 text-white ml-4"
        >
          {{ booking.status }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2 ml-8">
      <div>
        <ul>
          <li><strong>Patient Name:</strong> {{ booking.patientName }}</li>
          <li><strong>Date of Birth:</strong> {{ booking.dob }}</li>
          <li><strong>Gender:</strong> {{ booking.gender }}</li>
        </ul>
      </div>

      <div>
        <ul>
          <li>
            <strong>
              {{ bookingTypeStr }} Name:
            </strong>
            {{ isDoctorTypeBooking ? booking.doctorName : booking.testName }}
          </li>
          <li>
            <strong>
              {{ bookingTypeStr }} Date:
            </strong>
            {{ isDoctorTypeBooking ? booking.appointmentDate : booking.testDate }}
          </li>
          <li>
            <strong>
              {{ bookingTypeStr }} Result:
            </strong>
            {{ isDoctorTypeBooking ? booking.diagnosis : booking.testResult }}
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-4 space-x-4 p-8">
      <RouterLink :to="{ name: ROUTE_BOOKING_HISTORY_OTHERS, params: { patientId: booking.patientId } }">
        <button class="view-history-button">View Appointment History</button>
      </RouterLink>
      <button class="update-status-button" @click="openModal">Update Status</button>
    </div>
  </div>
  <UpdateBookingStatusModal
      v-if="showModal"
      :booking="booking"
      :isDoctorTypeBooking="isDoctorTypeBooking"
      @status-saved="handleStatusSaved"
      @close="closeModal"
    />
</template>

<style scoped>
li {
  @apply mb-2;
}

.view-history-button,
.update-status-button {
  @apply bg-white text-black border border-black px-4 py-2 rounded cursor-pointer transition-colors duration-300;
}

.view-history-button:hover,
.update-status-button:hover {
  @apply bg-black text-white;
}
</style>
