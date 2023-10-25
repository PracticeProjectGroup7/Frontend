<script setup>
const FILENAME = 'StaffProfileView';


import { computed, onBeforeMount, ref, inject, onMounted, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import { isPrivilegedUser } from '../../utils/permissions';
import { USER_AUTH_STORE_INJECT } from '../../config/injectKeys';

import NotFoundBanner from '../../components/static/NotFoundBanner.vue';
import URLCorrectBanner from '../../components/static/URLCorrectBanner.vue';
import BookingBill from '../../components/Bookings/BookingBill.vue';
import StaffList from '../../components/Staff/StaffList.vue';
import CreateStaffModal from '../../components/Modals/CreateStaffModal.vue';

import { staffList as dummyStaffList } from '../../_dummy_data/staff';
import { ROLE_ADMIN } from '../../config/constants';

// ==

const { authInfo } = inject(USER_AUTH_STORE_INJECT);
const { loggedIn, role: userRole, userInfo } = authInfo.value;


// ==

const props = defineProps({
  staffId: {
    type: String,
    required: true,
    default: '-1',
  },
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

  if (userRole != ROLE_ADMIN) {
    console.log(FILENAME, 'Not logged in');
    await router.push('/');
    loading.value = false;
    return;
  }

  console.log(FILENAME, 'Getting staff profile');


  // GET THE DATA
  // bookingList.value = []

  staffList.value = dummyStaffList;
  //

  console.log(FILENAME, 'beforeMount', 'end');
  loading.value = false;
});

</script>

<template>
  <div>
    <p></p>
  </div>
</template>

<style scoped>
</style>
