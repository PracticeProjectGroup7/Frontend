<script setup>
const FILENAME = 'StaffProfileView';


import { computed, onBeforeMount, ref, inject, onMounted, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';


import { ROUTE_STAFF_LIST } from '../../router/index';
import { isPrivilegedUser } from '../../utils/permissions';
import { USER_AUTH_STORE_INJECT } from '../../config/injectKeys';

import NotFoundBanner from '../../components/static/NotFoundBanner.vue';
import URLCorrectBanner from '../../components/static/URLCorrectBanner.vue';
import BookingBill from '../../components/Bookings/BookingBill.vue';
import StaffList from '../../components/Staff/StaffList.vue';
import FormErrors from '../../components/FormErrors.vue';
import StaffFormModal from '../../components/Modals/StaffFormModal.vue';

import { staffList as dummyStaffList } from '../../_dummy_data/staff';
import { ROLE_ADMIN, ROLE_DOCTOR, ROLE_TO_DISPLAY } from '../../config/constants';

// ==

const router = useRouter();

const { authInfo } = inject(USER_AUTH_STORE_INJECT);
const { loggedIn, role: userRole, userInfo } = authInfo.value;


// ==

const props = defineProps({
  staffId: {
    type: String,
    required: true,
    default: '-1',
  },
  allowedToUpdateStaff: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const loading = ref(true);

const opLoading = ref(false);

const editModalOpen = ref(false);
const editStaffDisplayError = ref(null);

const deleteStaffDisplayError = ref(null);

const staffInfo = ref({});

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


  if (props.staffId != -1) {
    console.log(FILENAME, 'Getting staff profile', props.staffId);

    staffInfo.value = dummyStaffList[0];

    loading.value = false;

    // GET THE DATA
    // bookingList.value = []
    //
  } else {
    // ...
  }


  console.log(FILENAME, 'beforeMount', 'end');
  loading.value = false;
});

function _handleOpenStaffEditModal() {
  console.log(FILENAME, '_handleOpenStaffEditModal', 'end');
  editModalOpen.value = true;
}

function _updateStaffProfile({ newStaffInfo }) {
  console.log(FILENAME, '_updateStaffProfile', 'start');
  editStaffDisplayError.value = null;
  opLoading.value = true;


  let staffPatch = Object.keys(newStaffInfo).reduce((current, key) => {
    if (staffInfo.value[key] == newStaffInfo[key]) {
      return current;
    } else {
      return { ...current, [key]: newStaffInfo[key] };
    }
  }, {});
  staffPatch = Object.keys(staffInfo.value).reduce((current, key) => {
    if (staffInfo.value[key] == newStaffInfo[key]) {
      return current;
    } else {
      return { ...current, [key]: newStaffInfo[key] };
    }
  }, staffPatch);
  // staffInfo


  opLoading.value = false;
  console.log(FILENAME, '_u', staffInfo.value);
  console.log(FILENAME, '_u', newStaffInfo);
  console.log(FILENAME, 'PATCH', staffPatch);
}

async function _handleOpenStaffDeleteModal() {
  const done = window.confirm('Do you want to delete this staff ?\n' + `StaffId : ${staffInfo.value.staffId}`);

  deleteStaffDisplayError.value = null;
  opLoading.value = true;

  if (done) {
    setInterval(() => {
      router.push({ name: ROUTE_STAFF_LIST });
      opLoading.value = false;
    }, 2000);
  }

  opLoading.value = false;

  console.log(FILENAME, '_handleOpenStaffDeleteModal', done);

  // DELETE
}

</script>

<template data-theme="corporate">
  <div class="text-center w-full">
    <span class="custom_loading" :style="{ 'opacity': ((loading || opLoading) ? 100 : 0) }"></span>
  </div>

  <div v-if="!loading" class="w-2/5 mx-auto">
    <div class="flex items-center mb-2">
      <span class="text-3xl font-bold">Staff #{{ staffInfo.staffId }}</span>
    </div>

    <div class="mb-2 text-lg">
      <div class="font-bold">Full Name</div>
      <div class="font-medium">{{ staffInfo.firstName }} {{ staffInfo.lastName }}</div>
    </div>

    <div class="mb-2 text-lg">
      <div class="font-bold">Role</div>
      <div class="font-medium">{{ ROLE_TO_DISPLAY[staffInfo.role || staffInfo.type] }}</div>
    </div>

    <div class="mb-2 text-lg" v-if="staffInfo.role == ROLE_DOCTOR || staffInfo.type == ROLE_DOCTOR">
      <div class="font-bold">Speciality</div>
      <div class="font-medium">{{ staffInfo.speciality }}</div>
    </div>


    <div class="mb-2 text-lg">
      <div class="font-bold">Email</div>
      <div class="font-medium">{{ staffInfo.email }}</div>
    </div>

    <div class="mb-2 text-lg">
      <div class="font-bold">NRIC</div>
      <div class="font-medium">{{ staffInfo.nric }}</div>
    </div>

    <div class="mb-8 text-lg">
      <div class="font-bold">Phone Number</div>
      <div class="font-medium">{{ staffInfo.phoneNumber }}</div>
    </div>

    <div class="flex justify-around">
      <button v-if="allowedToUpdateStaff" v-on:click="_handleOpenStaffEditModal"
        class="btn-outline btn btn-neutral btn-md rounded-sm w-1/5"> Edit Staff </button>

      <button v-if="allowedToUpdateStaff" v-on:click="_handleOpenStaffDeleteModal"
        class="btn btn-error btn-md rounded-sm w-1/5"> Delete Staff </button>

    </div>

    <div class="join join-vertical w-full" :class="{ invisible: deleteStaffDisplayError == null }">
      <FormErrors :error="deleteStaffDisplayError"/>
    </div>


    <StaffFormModal v-if="allowedToUpdateStaff && editModalOpen" v-model:modalOpen="editModalOpen"
      @registerStaff="_updateStaffProfile" :disableButtons="loading || opLoading" :displayError="editStaffDisplayError"
      :mode='"edit"' :existingStaffInfo="staffInfo" />

  </div>
</template>


<style scoped>
</style>
