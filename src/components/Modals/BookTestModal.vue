<script setup>
const FILENAME = 'BookTestModal.vue';
import { ref, inject } from 'vue';


import { USER_AUTH_STORE_INJECT } from '../../config/injectKeys';
import { bookServices } from '../../api/booking';

// ==

const { loggedIn, role: userRole, userInfo } = inject(USER_AUTH_STORE_INJECT);

console.log(FILENAME, 'isModalOpen:', true);

const props = defineProps({
  labTestService: {
    type: Object,
    required: true,
  },
});

const loading = ref(false);
const selectedSlot = ref(null);

const emit = defineEmits(['close']); // Declare 'close' event

const bookLabTest = async () => {
  loading.value = true;
  console.log(FILENAME, 'Booking service ID...', props.labTestService.serviceId);
  const bookingInfo = {
    'serviceId': props.labTestService.serviceId,
    'patientId': userInfo.value.roleId,
    'appointmentDate': selectedSlot.value,
    'selectedSlot': 1,
    'type': 'TEST',
  };
  await bookServices({ bookingInfo });
  loading.value = false;
  emit('close');
};

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <dialog class="modal modal-open">

    <div class="modal-box">

      <div class="custom-modal-title">
        Book Test/Scan
        <div class="text-center w-full">
          <span class="custom_loading" :style="{
            'opacity': (loading ? 100 : 0)
          }"></span>
        </div>
      </div>


      <form class="login_regiser_form">
        <div class="modal-body">

          <div class="grid grid-cols-1 gap-4">
            <h2 class="text-xl font-semibold">{{ labTestService.name }}</h2>
            <h3 class="text-base">{{ labTestService.description }}</h3>
          </div>

          <hr class="my-6">

          <div class="grid grid-cols-1 gap-4 w-full">
            <div class="join join-horizontal w-full">
              <label class="form_label_label w-1/2">
                <span class="form_label_span text-lg font-semibold">Select a Date:</span>
              </label>
              <input v-model="selectedSlot" type="date" id="date" name="date" class="w-1/2">
            </div>
          </div>


          <div class="grid grid-cols-1 gap-4 w-full mt-4">
            <div class="join join-horizontal w-full">
              <template v-if="selectedSlot">
                <label class="form_label_label w-1/2 mx-auto charges">
                  <span class="form_label_span text-lg font-mono">Estimated Charges:</span>
                  <span class="form_label_span text-black font-mono"> ${{ labTestService.estimatedPrice }} </span>
                </label>
              </template>
              <p class="mt-2"></p>
            </div>
          </div>
        </div>

        <div class="modal-action justify-center">
          <button @click="closeModal" class="danger">Cancel</button>
          <button @click="bookLabTest" class="ml-2 success" :disabled="selectedSlot === null">Book</button>
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
