<script setup>
const FILENAME = 'AppointmentBill.vue';

import { computed, onBeforeMount, ref, inject, onMounted, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';


import AppointmentBillPaymentModal from '../Modals/AppointmentBillPaymentModal.vue';

// ====

const props = defineProps({
  billDetails: {
    type: Object,
    required: true,
    default: () => { },
  },
  allowedToUpdatePayment: {
    type: Boolean,
    required: false,
    default: true, // TODO
  },
});

const loading = ref(true);
const modalOpen = ref(false);
const paymentStatus = ref(null);

watch(modalOpen, (e) => {
  console.log(FILENAME, 'watch modalOpen', e);
});

onBeforeMount(async () => {
  console.log(FILENAME, 'beforeMount', 'start');
  loading.value = false;

  paymentStatus.value = props.billDetails.status;

  console.log(FILENAME, 'beforeMount', 'end');
});

function _handleOpenModal() {
  console.log(FILENAME, '_handleOpenModal');
  modalOpen.value = true;
}

function _updateBillStatus({ billId, status }) {
  console.log(FILENAME, '_updateBillStatus', { billId, status });
  loading.value = true;

  // ....
  // .... UPDATE STATUS
  // ....

  paymentStatus.value = 'PAID';
}

</script>

<template data-theme="corporate">
  <div class="text-center w-full">
    <span class="custom_loading" :style="{
      'opacity': (loading ? 100 : 0)
    }"></span>
  </div>

  <div>
    BILL DETSILS {{ paymentStatus }}

    <button v-if="allowedToUpdatePayment" v-on:click="_handleOpenModal" class="btn"> Update Billing Status </button>
  </div>

  <AppointmentBillPaymentModal :billDetails="billDetails" v-if="allowedToUpdatePayment && modalOpen"
    v-model:modalOpen="modalOpen" @updateBillStatus="_updateBillStatus" />
</template>

<style>
</style>
