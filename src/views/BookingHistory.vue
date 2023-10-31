<script setup>
const FILENAME = 'BookingHistory.vue';

import { computed, onBeforeMount, ref, inject, onMounted, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import { isPrivilegedUser } from '../utils/permissions';
import { USER_AUTH_STORE_INJECT } from '../config/injectKeys';

import NotFoundBanner from '../components/static/NotFoundBanner.vue';
import URLCorrectBanner from '../components/static/URLCorrectBanner.vue';
import BookingList from '../components/Bookings/BookingList.vue';

import { mixedBookingList } from '../_dummy_data/bookings';

// ====

const router = useRouter();

const { loggedIn, role: userRole, userInfo } = inject(USER_AUTH_STORE_INJECT);

// ====

const props = defineProps({
  patientId: {
    type: String,
    required: true,
    default: '-1',
  },
});

const loading = ref(true);
const actualPatientId = ref(-1);
const bookingList = ref([]);
bookingList.value = mixedBookingList; // TODO : remove

onBeforeMount(async () => {
  loading.value = true;
  console.log(FILENAME, 'beforeMount', 'start');

  if (!loggedIn.value) {
    console.log(FILENAME, 'Not logged in');
    await router.push('/login');
    loading.value = false;
    return;
  }

  console.log(FILENAME, 'Initial patientId', props.patientId);
  actualPatientId.value = determineActualPatientId();
  console.log(FILENAME, 'Selected patientId', actualPatientId.value);

  if (actualPatientId.value != -1) {
    console.log(FILENAME, 'Getting Data', actualPatientId.value);
    // GET THE DATA
    // bookingList.value = []
    //
  }

  console.log(FILENAME, 'beforeMount', 'end');
  loading.value = false;
});

// Internal functions

// Priveleged User -> Patient Id must be present
// Non Priveleged User -> Patient Id must not be present OR must be equal to Patient Id
function determineActualPatientId() {
  if (isPrivilegedUser(userRole.value)) {
    if (props.patientId == '-1') {
      return -1;
    }

    return props.patientId;
  }

  if (props.patientId == '-1') {
    return userInfo.value.userId;
  }

  if (props.patientId == userInfo.value.userId) {
    return props.patientId;
  }

  return -1;
};

const allowedToView = computed(() => {
  return actualPatientId.value != '-1';
});

const _isPrivilegedUser = computed(() => {
  return isPrivilegedUser(userRole.value);
});

</script>

<template>
  <div>
    <NotFoundBanner v-if="!loading && !allowedToView" />
    <URLCorrectBanner v-if="!loading && !allowedToView && _isPrivilegedUser" />
    <div>
      <div class="text-center w-full">
        <span class="custom_loading" :style="{
          'opacity': (loading ? 100 : 0)
        }"></span>
      </div>
    </div>
    <div v-if="allowedToView">
      <BookingList :bookingList="bookingList" />
    </div>
  </div>
</template>

<style scoped>
</style>
