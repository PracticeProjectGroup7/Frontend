<script setup>
const FILENAME = 'BookingDetailsView.vue';
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { isDoctorType } from '../../utils/utils';
import { BOOKING_TYPE_DOCTOR, BOOKING_TYPE_LAB } from '../../config/constants';
import { ROUTE_BOOKING_HISTORY_OTHERS } from '../../router';
import { fetchBookingDetails } from '../../api/staffBookingManagement';
import UpdateBookingStatusModal from '../../components/Modals/UpdateBookingStatusModal.vue';

const props = defineProps({
  'bookingId': {
    type: String,
    required: true,
  },
});
const booking = ref();
const isDoctorTypeBooking = ref();
const bookingTypeStr = ref();
const breadcrumbPath = ref();
const bookingStatus = ref();
onMounted(async () => {
  const data = await fetchBookingDetails(props.bookingId);
  console.log(FILENAME, 'Fetched booking data:', data);
  if (data) {
    booking.value = data;
    const bookingType = (booking.value.bookingType == 'APPOINTMENT') ? BOOKING_TYPE_DOCTOR : BOOKING_TYPE_LAB;
    isDoctorTypeBooking.value = isDoctorType(bookingType);
    bookingTypeStr.value = isDoctorTypeBooking.value ? 'Appointment' : 'Test';
    breadcrumbPath.value = isDoctorTypeBooking.value ? '/appointment-management' : '/test-management';
    bookingStatus.value = isDoctorTypeBooking.value ?
      booking.value.details.appointmentStatus : booking.value.details.testStatus;
  }
});

const showModal = ref(false);
const openModal = () => {
  showModal.value = true;
};

console.log(FILENAME, 'On details page. BookingId: ', props.bookingId);

const handleStatusSaved = (data) => {
  // Handle the updated status data here
  console.log(FILENAME, 'Status saved:', data);

  // Update the bookingStatus and comments/testResult properties
  bookingStatus.value = data.newStatus;
  if (isDoctorTypeBooking.value) {
    booking.value.details.comments = data.result;
  } else {
    booking.value.details.testResult = data.result;
  }
};

const closeModal = () => {
  showModal.value = false;
};

</script>

<template>
  <div v-if="booking" class="p-8">
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
          {{ isDoctorTypeBooking ? 'Appointment' : 'Lab Test' }} Details - Booking #{{ bookingId }}
        </h2>
        <span
          :class="{
            'bg-orange-700': bookingStatus.toLowerCase() == 'pending',
            'bg-green-700': bookingStatus.toLowerCase() == 'completed',
          }"
          class="rounded-full py-1 px-2 text-white ml-4"
        >
          {{ bookingStatus }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2 ml-8">
      <div>
        <ul>
          <li><strong>Patient Name:</strong> {{ booking.patientDetails.patientName }}</li>
          <li><strong>Date of Birth:</strong> {{ booking.patientDetails.dateOfBirth }}</li>
          <li><strong>Gender:</strong> {{ booking.patientDetails.gender }}</li>
        </ul>
      </div>

      <div>
        <ul>
          <li>
            <strong>
              {{ isDoctorTypeBooking ? 'Doctor' : 'Test' }} Name:
            </strong>
            {{ isDoctorTypeBooking ? booking.details.doctorName : booking.details.testName }}
          </li>
          <li>
            <strong>
              {{ bookingTypeStr }} Date:
            </strong>
            {{ booking.bookingDate }}
          </li>
          <li>
            <strong>
              {{ isDoctorTypeBooking ? 'Diagnosis' : 'Test Result' }}:
            </strong>
            {{ isDoctorTypeBooking ? booking.details.comments : booking.details.testResult }}
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-4 space-x-4 p-8">
      <!-- </RouterLink> -->
      <button class="update-status-button" @click="openModal">Update Status</button>
      <!-- <RouterLink :to="{ name: ROUTE_BOOKING_HISTORY_OTHERS, params: { patientId: booking.patientId } }"> -->
        <button class="view-history-button hidden">View Appointment History</button>
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
