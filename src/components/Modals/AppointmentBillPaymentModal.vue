<script setup>
const FILENAME = 'AppointmentBillPaymentModal.vue';

import { computed, onBeforeMount } from 'vue';

import { mixedAppointmentList } from '../../_dummy_data/appointments';

// ==

const props = defineProps({
  modalOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
  billDetails: {
    type: Object,
    required: true,
    default: () => { },
  },
});

const emit = defineEmits(['update:modalOpen', 'updateBillStatus']);

onBeforeMount(() => {
  console.log(FILENAME, 'beforeMount', 'start');
  console.log(FILENAME, props.billDetails);
  console.log(FILENAME, 'beforeMount', 'end');
});

function closeModal() {
  console.log(FILENAME, 'closeModal');
  emit('update:modalOpen', false);
}

function updatePayment() {
  console.log(FILENAME, 'updatePayment');
  emit('updateBillStatus', { billId: 'jjj', status: 'status' });
}


</script>

<template>
  <dialog class="modal modal-open">

    <div class="modal-box">

      <div class="custom-modal-title">Set Status of Bill #{{ billDetails.billId }}
      </div>

      <div class="modal-body">

        <div>
          <span class="font-bold text-md pb-2"> Current Status </span>
          <span class="text-md">{{ billDetails.billStatus }}</span>
        </div>

        <div>
          <span class="font-bold text-md pb-2"> New Status </span>
          <span class="text-md">
            <select class="select select-bordered w-full max-w-xs">
              <option disabled selected>Who shot first?</option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </span>
        </div>

      </div>

      <div class="modal-action">
        <button v-on:click="closeModal" class="custom-btn-outline"> Cancel </button>
        <button v-on:click="updatePayment"> Update Status </button>
      </div>
    </div>

    <div class="modal-backdrop" v-on:click="closeModal">
      <button>close</button>
    </div>
  </dialog>
</template>

<style scoped>
@import './modalStyle.css';
</style>
