<script setup>
const FILENAME = 'BookingBill.vue';

import { computed, onBeforeMount, ref, inject, onMounted, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import { isPrivilegedUser } from '../utils/permissions';
import { USER_AUTH_STORE_INJECT } from '../config/injectKeys';

import NotFoundBanner from '../components/static/NotFoundBanner.vue';
import URLCorrectBanner from '../components/static/URLCorrectBanner.vue';
import BookingBill from '../components/Bookings/BookingBill.vue';

import { mixedBookingList, bill as dummyBillDetails } from '../_dummy_data/bookings';

// ====

const router = useRouter();

const { authInfo } = inject(USER_AUTH_STORE_INJECT);
const { loggedIn, role: userRole, userInfo } = authInfo.value;

// ====

const props = defineProps({
  billId: {
    type: String,
    required: true,
    default: '-1',
  },
});

const loading = ref(true);
const modalOpen = ref(false);
const billDetails = ref({});

watch(modalOpen, (e) => {
  console.log(FILENAME, 'watch modalOpen', e);
});

onBeforeMount(async () => {
  loading.value = true;
  console.log(FILENAME, 'beforeMount', 'start');

  if (!loggedIn) {
    console.log(FILENAME, 'Not logged in');
    await router.push('/login');
    loading.value = false;
    return;
  }

  console.log(FILENAME, 'Initial billId', props.billId);


  if (props.billId != -1) {
    console.log(FILENAME, 'Getting Data', props.billId);

    billDetails.value = dummyBillDetails;

    loading.value = false;

    // GET THE DATA
    // bookingList.value = []
    //
  }

  console.log(FILENAME, 'beforeMount', 'end');
  loading.value = false;
});

</script>

<template data-theme="corporate">
  <div>
    <!-- <NotFoundBanner v-if="!loading" />
    <URLCorrectBanner v-if="!loading" /> -->
    <div>
      <div class="text-center w-full">
        <span class="custom_loading" :style="{
          'opacity': (loading ? 100 : 0)
        }"></span>
      </div>
    </div>
    <div v-if="!loading" class="w-2/5 mx-auto">
      <BookingBill :billDetails="billDetails" />
    </div>
  </div>
</template>

<style scoped>
</style>
