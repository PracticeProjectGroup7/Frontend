<script setup>
const FILENAME = 'ReceptionBookingBill.vue';

import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import BookingBill from '../../components/Bookings/BookingBill.vue';
import { ROUTE_BILL_MANAGEMENT } from '../../router';
import { mixedBookingList, bill as dummyBillDetails } from '../../_dummy_data/bookings';

// ====

const props = defineProps({
  billId: String,
});

const modalOpen = ref(false);
const billDetails = ref(dummyBillDetails);

watch(modalOpen, (e) => {
  console.log(FILENAME, 'watch modalOpen', e);
});

</script>

<template data-theme="corporate">
  <div class="p-8">
    <div class="text-sm breadcrumbs">
      <ul>
      <li><RouterLink :to="{ name: ROUTE_BILL_MANAGEMENT }">
        Bill Management
      </RouterLink></li>
      <li>View Bill</li>
      </ul>
    </div>
    <div class="w-2/5 mx-auto">
      <BookingBill :billDetails="billDetails" />
    </div>
  </div>
</template>

<style scoped>
</style>
