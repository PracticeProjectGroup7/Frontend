<script setup>
const FILENAME = 'EditStaffProfileModal.vue';

import { computed, onBeforeMount, ref } from 'vue';

import { PAYMENT_STATS_PAID, PAYMENT_STATS_UNPAID } from '../../config/constants';

// ==

const props = defineProps({
  modalOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
  staffProfile: {
    type: Object,
    required: true,
    default: () => { },
  },
  disableButtons: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['update:modalOpen', 'updateStaffProfile']);

const paymentStatus = ref(PAYMENT_STATS_UNPAID);

onBeforeMount(() => {
  console.log(FILENAME, 'beforeMount', 'start');
  console.log(FILENAME, props.billDetails);

  paymentStatus.value = props.billDetails.paymentStatus;
  console.log(FILENAME, paymentStatus);

  console.log(FILENAME, 'beforeMount', 'end');
});

function closeModal() {
  console.log(FILENAME, 'closeModal');
  if (props.disableButtons) {
    return;
  }
  emit('update:modalOpen', false);
}

function updatePayment() {
  console.log(FILENAME, 'updatePayment');
  emit('updateBillStatus', { paymentStatus: paymentStatus.value });
}

const updateButtonDisabled = computed(() => {
  return paymentStatus.value == props.billDetails.paymentStatus;
});

</script>

<template>
  <dialog class="modal modal-open">

    <div class="modal-box">

      <div class="custom-modal-title">Set Status of Bill #{{ billDetails.billId }}
      </div>

      <div class="modal-body">

        <div class="mb-4">
          <div class="font-bold text-base w-1/2 inline-block"> Current Status </div>
          <div class="text-base font-semibold w-1/2 inline-block capitalize">{{ billDetails.billStatus ||
            PAYMENT_STATS_UNPAID }}</div>
        </div>

        <div class="mb-4">
          <div class="font-bold text-base w-1/2 inline-block"> New Status </div>
          <div class="text-base w-1/2 inline-block">
            <select class="select select-bordered w-full max-w-xs font-semibold text-base capitalize"
              v-model="paymentStatus">
              <option disabled>Select bill status</option>
              <option :value="PAYMENT_STATS_PAID">Paid</option>
              <option :value="PAYMENT_STATS_UNPAID">Unpaid</option>
            </select>
          </div>
        </div>

      </div>

      <div class="modal-action">
        <button v-on:click="closeModal" :disabled="disableButtons" class="custom-btn-outline"> Cancel </button>

        <button v-on:click="updatePayment" :disabled="updateButtonDisabled || disableButtons" autocomplete="off"> Update
          Status </button>
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
