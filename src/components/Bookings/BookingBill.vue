<script setup>
const FILENAME = 'BookingBill.vue';

import { computed, onBeforeMount, ref, inject, onMounted, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import BookingBillPaymentModal from '../Modals/BookingBillPaymentModal.vue';
import { humanizeDate } from '../../utils/utils';

import { PAYMENT_STATS_PAID, PAYMENT_STATS_UNPAID } from '../../config/constants';

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
const paymentTimestamp = ref(null);


watch(modalOpen, (e) => {
  console.log(FILENAME, 'watch modalOpen', e);
});

onBeforeMount(async () => {
  console.log(FILENAME, 'beforeMount', 'start');
  loading.value = false;

  paymentStatus.value = props.billDetails.paymentStatus;
  paymentTimestamp.value = props.billDetails.paymentDate || '';

  console.log(FILENAME, 'beforeMount', 'end');
});

function _handleOpenModal() {
  console.log(FILENAME, '_handleOpenModal');
  modalOpen.value = true;
}

function _updateBillStatus({ paymentStatus: newPaymentStatus }) {
  console.log(FILENAME, '_updateBillStatus', { newPaymentStatus });
  loading.value = true;

  // ....
  // .... TODO UPDATE STATUS
  // ....
  setTimeout(() => {
    paymentStatus.value = newPaymentStatus;
    paymentTimestamp.value = newPaymentStatus == PAYMENT_STATS_PAID ? Date.now() : '';
    loading.value = false;
    modalOpen.value = false;
  }, 5000);
}

const _billDetails = computed(() => {
  return {
    ...props.billDetails,
    bookingDetails: `Booking with ${props.billDetails.bookingPerson} on ${humanizeDate(props.billDetails.bookingDate)}`,
    paymentStatus: paymentStatus.value,
    paymentDate: paymentTimestamp.value ? humanizeDate(paymentTimestamp.value) : '',
  };
});

</script>

<template data-theme="corporate">
  <div class="text-center w-full">
    <span class="custom_loading" :style="{
      'opacity': (loading ? 100 : 0)
    }"></span>
  </div>

  <div>
    <div class="flex items-center mb-2">
      <span class="text-3xl font-bold">Bill #{{ _billDetails.billId }}</span>

      <span v-if="_billDetails.paymentStatus == PAYMENT_STATS_PAID" class="payment-status-badge paid">Paid</span>
      <span v-if="_billDetails.paymentStatus == PAYMENT_STATS_UNPAID" class="payment-status-badge unpaid">Unpaid</span>

      <button v-if="allowedToUpdatePayment" v-on:click="_handleOpenModal"
        class="btn-outline btn btn-neutral btn-md rounded-md ml-auto"> Update Bill Status </button>
    </div>

    <div class="text-2xl font-bold mb-4">Booking Summary</div>

    <div class="mb-2 text-lg">
      <div class="font-bold">Service Type</div>
      <div class="font-medium">{{ _billDetails.serviceType }}</div>
    </div>
    <div class="mb-2 text-lg">
      <div class="font-bold">Details</div>
      <div class="font-medium">{{ _billDetails.bookingDetails }}</div>
    </div>

    <div class="mb-4">
      <div class="font-bold text-lg">Charges</div>

      <table class="table w-3/4">
        <tbody>
          <template v-for="(fee, i) in _billDetails.fees" :key="i">
            <tr>
              <td class="font-medium py-2"> {{ fee.name }} </td>
              <td class="py-2 text-right"> S$ {{ fee.amount }}</td>
            </tr>
          </template>
        </tbody>

        <tfoot class="border-t-2 border-b-0">
          <tr class="text-base-content">
            <td class="font-bold text-lg pl-0 text-base-content py-1"> Total Charges </td>
            <td class="text-right font-medium text-base-content text-base py-1"> S$ {{ _billDetails.total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div v-if="_billDetails.paymentStatus == PAYMENT_STATS_PAID" class="text-lg">
      <div class="font-bold">Payment time</div>
      <div class="font-medium">{{ _billDetails.paymentDate }}</div>
    </div>

  </div>

  <BookingBillPaymentModal :billDetails="_billDetails" v-if="allowedToUpdatePayment && modalOpen"
    v-model:modalOpen="modalOpen" @updateBillStatus="_updateBillStatus" :disableButtons="loading" />
</template>

<style>
.payment-status-badge {
  @apply badge badge-lg font-normal py-2 rounded ml-4;

  background-color: hsl(var(--su));
  color: hsl(var(--nc));
}

.payment-status-badge.paid {
  @apply bg-success-content;
}

.payment-status-badge.unpaid {
  @apply bg-error;
}
</style>
