<script setup>
const FILENAME = 'AppointmentHistory.vue';

import { computed, onBeforeMount, ref, inject, onMounted, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import { isPrivilegedUser } from '../utils/permissions';
import { USER_AUTH_STORE_INJECT } from '../config/injectKeys';

import NotFoundBanner from '../components/static/NotFoundBanner.vue';
import URLCorrectBanner from '../components/static/URLCorrectBanner.vue';
import AppointmentList from '../components/Appointments/AppointmentList.vue';

import { mixedAppointmentList } from '../_dummy_data/appointments';

// ====

const router = useRouter();

const { authInfo } = inject(USER_AUTH_STORE_INJECT);
const { loggedIn, role: userRole, userInfo } = authInfo.value;

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
const appointmentList = ref([]);
appointmentList.value = mixedAppointmentList; // TODO : remove

onBeforeMount(async () => {
  loading.value = true;
  console.log(FILENAME, 'beforeMount', 'start');

  if (!loggedIn) {
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
    // appointmentList.value = []
    //
  }

  console.log(FILENAME, 'beforeMount', 'end');
  loading.value = false;
});

// Internal functions

// Priveleged User -> Patient Id must be present
// Non Priveleged User -> Patient Id must not be present OR must be equal to Patient Id
function determineActualPatientId() {
  if (isPrivilegedUser(userRole)) {
    if (props.patientId == '-1') {
      return -1;
    }

    return props.patientId;
  }

  if (props.patientId == '-1') {
    return userInfo.userId;
  }

  if (props.patientId == userInfo.userId) {
    return props.patientId;
  }

  return -1;
};

const allowedToView = computed(() => {
  return actualPatientId.value != '-1';
});

const _isPrivilegedUser = computed(() => {
  return isPrivilegedUser(userRole);
});

</script>

<template data-theme="corporate">
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
      <AppointmentList :appointmentList="appointmentList" />
    </div>
  </div>
</template>

<style>
</style>
