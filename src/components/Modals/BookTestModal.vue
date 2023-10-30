<script setup>
const FILENAME = 'BookTestModal.vue';
import { ref, inject } from 'vue';
import { easyPost } from '../../api/easyFetch';
import { USER_AUTH_STORE_INJECT } from '../../config/injectKeys';
import { API_BASE_PATH } from '../../config/apiPaths';

const { loggedIn, role: userRole, userInfo } = inject(USER_AUTH_STORE_INJECT);

console.log(FILENAME, 'isModalOpen:', true);

const props = defineProps({
  labTestService: {
    type: Object,
    required: true,
  },
});

const selectedSlot = ref(null);

const emits = defineEmits(['close']); // Declare 'close' event

const bookLabTest = async () => {
  console.log(FILENAME, 'Booking service ID...', props.labTestService.serviceId);
  const url = '/api/v1/services/booking';
  const response = await easyPost({
    url: API_BASE_PATH + url,
    body:
    {
	    'serviceId': props.labTestService.serviceId,
	    'patientId': userInfo.value.roleId,
	    'appointmentDate': selectedSlot.value,
	    'type': 'TEST',
    },
  });
  if (response.done) {
    console.log(`${FILENAME} - Booking successful`, response.body);
  } else {
    console.error(`${FILENAME} - Error in booking test`);
  }
  emits('close');
};

const closeModal = () => {
  emits('close');
};
</script>

<template>
  <div class="modal modal-open">
    <div class="modal-content">
      <h2 class="text-2xl font-semibold mb-3">Book Test/Scan</h2>
      <hr>

      <div class="mb-4">
        <h3 class="text-lg font-semibold">{{ labTestService.name }}</h3>
        <p class="text-gray-600">{{ labTestService.description }}</p>
      </div>

      <hr>

      <!-- Step 2: Change slot selector to a date selector -->
      <label for="date" class="text-lg font-semibold">Select a Date:</label>
      <input v-model="selectedSlot" type="date" id="date" name="date" class="mb-2">

      <p v-if="selectedSlot" class="mt-2">Estimated Charges: ${{ labTestService.estimatedPrice }}</p>

      <div class="mt-4 modal-action">
        <button @click="closeModal" class="bg-red-500">Cancel</button>
        <button @click="bookLabTest" class="bg-green-500 ml-2" :disabled="!selectedSlot">Book</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './bookServicesModalStyle.css';
</style>
