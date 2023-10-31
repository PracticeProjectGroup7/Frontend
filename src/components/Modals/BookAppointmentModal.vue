<script setup>
const FILENAME = 'BookAppointmentModal.vue';

import { ref, watch, inject } from 'vue';


import { timeSlots } from '../../config/timeSlots';
import { bookServices, fetchDoctorSlots } from '../../api/booking';
import { USER_AUTH_STORE_INJECT } from '../../config/injectKeys';
import FormErrors from '../FormErrors.vue';

// ==


const { loggedIn, role: userRole, userInfo } = inject(USER_AUTH_STORE_INJECT);
console.log('isModalOpen:', true);

const props = defineProps({
  doctorService: {
    type: Object,
    required: true,
  },
});

const loading = ref(false);
const selectedDate = ref(null); // Step 1: Create a data property for the selected date
const upcomingSlots = ref([]);

const selectedSlot = ref(null);

const emit = defineEmits(['close']); // Declare 'close' event

// Step 2: Watch for changes in the selected date and update upcomingSlots
watch(selectedDate, async () => {
  selectedSlot.value = null;
  calculateSlots(); // Pass the selected date to calculateSlots
});

const calculateSlots = async () => {
  loading.value = true;
  const data = await fetchDoctorSlots(props.doctorService.serviceId, selectedDate.value); // Use the fetchCatalog function
  console.log(FILENAME, 'Doctor slots: ', data);
  if (data) {
    upcomingSlots.value = data.map((slotNumber) => timeSlots[slotNumber]); // Map slot numbers to time slots
    loading.value = false;
  }
};

const bookAppointment = async () => {
  const selectedSlotNumber = selectedSlot.value + 1;
  if (selectedSlotNumber != null) {
    loading.value = true;

    // Send the selected slot number to the backend for booking
    console.log(FILENAME, `Selected Slot Number: ${selectedSlotNumber}`);
    console.log(FILENAME, 'Booking service ID...', props.doctorService.serviceId);
    const bookingInfo = {
      'serviceId': props.doctorService.serviceId,
      'patientId': userInfo.value.roleId,
      'appointmentDate': selectedDate.value,
      'selectedSlot': selectedSlotNumber,
      'type': 'APPOINTMENT',
    };
    await bookServices({ bookingInfo });
    emit('close');
    loading.value = false;
  }
};

const closeModal = () => {
  console.log(FILENAME, 'Closing Modal...');
  emit('close');
};
</script>

<template>
  <dialog class="modal modal-open">

    <div class="modal-box">

      <div class="custom-modal-title">
        Book Appointment
        <div class="text-center w-full">
          <span class="custom_loading" :style="{
            'opacity': (loading ? 100 : 0)
          }"></span>
        </div>
      </div>


      <form class="login_regiser_form">
        <div class="modal-body">

          <div class="grid grid-cols-1 gap-4">
            <h2 class="text-xl font-semibold">{{ doctorService.name }}</h2>
            <h3 class="text-base">{{ doctorService.specialty }}</h3>
          </div>

          <hr class="my-6">

          <div class="grid grid-cols-1 gap-4 w-full">
            <div class="join join-horizontal w-full">
              <label class="form_label_label w-1/2">
                <span class="form_label_span text-lg">Select a Date:</span>
              </label>
              <input v-model="selectedDate" type="date" id="date" name="date" class="w-1/2">
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 w-full mt-4">
            <div class="join join-horizontal w-full">
              <label class="form_label_label w-1/2">
                <span class="form_label_span text-lg">Upcoming Appointment Slots</span>
              </label>
              <select v-model="selectedSlot" :disabled="loading || selectedDate == null" class="w-1/2">
                <option value="null" disabled hidden selected>Select a slot</option>
                <template v-for="(slot, slotNumber) in upcomingSlots" :key="slotNumber">
                  <option :value="slotNumber">{{ slot }}</option>
                </template>
              </select>

            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 w-full mt-4">
            <div class="join join-horizontal w-full">
              <template v-if="!loading && selectedDate && upcomingSlots.length === 0">
                <FormErrors :error="'No slots available!'" />
              </template>
              <template v-else-if="!loading && selectedDate && selectedSlot">
                <label class="form_label_label w-1/2 mx-auto charges" >
                  <span class="form_label_span text-lg font-mono">Estimated Charges:</span>
                  <span class="form_label_span text-black font-mono"> ${{ doctorService.estimatedPrice }} </span>
                </label>
              </template>
              <p class="mt-2"></p>
            </div>
          </div>
        </div>

        <div class="modal-action justify-center">
          <button @click="closeModal" class="bg-red-500">Cancel</button>
          <button @click="bookAppointment" class="bg-green-500 ml-2" :disabled="selectedSlot === null">Book</button>
        </div>
      </form>

    </div>

    <div class="modal-backdrop" v-on:click="closeModal">
      <button>close</button>
    </div>
  </dialog>
</template>

<style scoped>
@import './modalStyle.css';

.custom-modal-title {
  @apply text-xl font-semibold;

  @apply text-center;

  @apply pt-6 pb-0 px-6;
}

.modal-box {
  max-height: calc(100vh - 0rem);
  min-width: calc(100vw - 70rem);
}

label.form_label_label,
span.form_label_span {
  @apply text-base;
}

.charges {
  @apply justify-center;
}
</style>
