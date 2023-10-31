<script setup>
const FILENAME = 'StaffProfileView';


import { computed, onBeforeMount, ref, inject, onMounted, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';


import { ROUTE_STAFF_LIST } from '../../router/index';
import { isPrivilegedUser } from '../../utils/permissions';
import { createPatch } from '../../utils/utils';
import { USER_AUTH_STORE_INJECT } from '../../config/injectKeys';

import NotFoundBanner from '../../components/static/NotFoundBanner.vue';
import URLCorrectBanner from '../../components/static/URLCorrectBanner.vue';
import BookingBill from '../../components/Bookings/BookingBill.vue';
import StaffList from '../../components/Staff/StaffList.vue';
import FormErrors from '../../components/FormErrors.vue';
import StaffFormModal from '../../components/Modals/StaffFormModal.vue';

import { staffList as dummyStaffList } from '../../_dummy_data/staff';
import { ROLE_ADMIN, ROLE_DOCTOR, ROLE_TO_DISPLAY, BACKEND_TO_ROLE } from '../../config/constants';
import { StaffManagementAPIClient } from '../../api/staffManagement';

// ==

const router = useRouter();

const { userInfo, loggedIn, role: userRole } = inject(USER_AUTH_STORE_INJECT);

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

const notFound = ref(false);
const staffInfo = ref(null);

onBeforeMount(async () => {
  loading.value = true;
  console.log(FILENAME, 'beforeMount', 'start');

  if (!loggedIn.value) {
    console.log(FILENAME, 'Not logged in');
    await router.push('/login');
    loading.value = false;
    return;
  }

  if (userRole.value != ROLE_ADMIN) {
    console.log(FILENAME, 'Not logged in');
    await router.push('/');
    loading.value = false;
    return;
  }


  if (props.staffId != -1) {
    console.log(FILENAME, 'Getting staff profile', props.staffId);

    let result = await StaffManagementAPIClient.getStaff(props.staffId);

    console.log(FILENAME, 'getStaff', result);

    if (result.userError && result.body?.status == 404) {
      notFound.value = true;
    } else if (result.done) {
      staffInfo.value = {
        ...result.body.data,
        ...result.body.data.user,
      };
    }


    // GET THE DATA
    // bookingList.value = []
    //
  } else {
    // ...
  }


  console.log(FILENAME, 'beforeMount', 'end');
  loading.value = false;


  console.log(loading.value, notFound.value, staffInfo.value);
});

function _handleOpenStaffEditModal() {
  console.log(FILENAME, '_handleOpenStaffEditModal', 'end');
  editModalOpen.value = true;
}

async function _updateStaffProfile({ newStaffInfo }) {
  console.log(FILENAME, '_updateStaffProfile', 'start');
  editStaffDisplayError.value = null;
  opLoading.value = true;

  const staffPatch = createPatch(staffInfo.value, newStaffInfo);
  delete staffPatch.email;
  delete staffPatch.role;

  const result = await StaffManagementAPIClient.updateStaff(staffInfo.value.userId, staffPatch);
  console.log(FILENAME, 'getStaff', result);
  if (result.done) {
    staffInfo.value = {
      ...result.body.data,
      ...result.body.data.user,
    };
  }

  console.log(FILENAME, 'old', staffInfo.value);
  console.log(FILENAME, 'new', newStaffInfo);
  console.log(FILENAME, 'PATCH', staffPatch);

  opLoading.value = false;
  editModalOpen.value = false;
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

function fieldChanged() {
  editStaffDisplayError.value = null;
};


</script>

<template>
  <div class="text-center w-full">
    <span class="custom_loading" :style="{ 'opacity': ((loading || opLoading) ? 100 : 0) }"></span>
  </div>

  <NotFoundBanner v-if="!loading && notFound" />
  <URLCorrectBanner v-if="!loading && !notFound && staffInfo == null" />

  <div v-if="!loading && staffInfo != null" class="w-2/5 mx-auto">
    <div class="flex items-center mb-2">
      <span class="text-2xl font-bold">Staff</span>
      <span class="text-xl font-bold">#{{ staffInfo.staffId }}</span>
    </div>

    <div class="mb-2 text-lg">
      <div class="font-bold">Full Name</div>
      <div class="font-medium">{{ staffInfo.firstName }} {{ staffInfo.lastName }}</div>
    </div>

    <div class="mb-2 text-lg">
      <div class="font-bold">Role</div>
      <div class="font-medium">{{ ROLE_TO_DISPLAY[BACKEND_TO_ROLE[staffInfo.role || staffInfo.type]] }}</div>
    </div>

    <template v-if="staffInfo.role == ROLE_DOCTOR || staffInfo.type == ROLE_DOCTOR">
      <div class="mb-2 text-lg">
        <div class="font-bold">Specialty</div>
        <div class="font-medium">{{ staffInfo.specialty }}</div>
      </div>

      <div class="mb-2 text-lg">
        <div class="font-bold">Experience</div>
        <div class="font-medium">{{ staffInfo.yearsOfExperience }}</div>
      </div>

    </template>

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
      <div class="font-medium">{{ staffInfo.phone }}</div>
    </div>

    <div class="flex justify-around">
      <button v-if="allowedToUpdateStaff" v-on:click="_handleOpenStaffEditModal"
        class="btn-outline btn btn-neutral btn-md rounded-sm w-1/5"> Edit Staff </button>

      <button v-if="allowedToUpdateStaff" v-on:click="_handleOpenStaffDeleteModal"
        class="btn btn-error btn-md rounded-sm w-1/5"> Delete Staff </button>

    </div>

    <div class="join join-vertical w-full" :class="{ invisible: deleteStaffDisplayError == null }">
      <FormErrors :error="deleteStaffDisplayError" />
    </div>


    <StaffFormModal v-if="allowedToUpdateStaff && editModalOpen" v-model:modalOpen="editModalOpen"
      @registerStaff="_updateStaffProfile" :disableButtons="loading || opLoading" :displayError="editStaffDisplayError"
      :mode='"edit"' :existingStaffInfo="staffInfo" @notifyFieldChanged="fieldChanged" />

  </div>
</template>


<style scoped>
</style>
