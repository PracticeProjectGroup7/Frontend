<script setup>
const FILENAME = 'StaffView.vue';

import { computed, onBeforeMount, ref, inject, onMounted, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import { isPrivilegedUser } from '../../utils/permissions';
import { USER_AUTH_STORE_INJECT } from '../../config/injectKeys';

import NotFoundBanner from '../../components/static/NotFoundBanner.vue';
import URLCorrectBanner from '../../components/static/URLCorrectBanner.vue';
import BookingBill from '../../components/Bookings/BookingBill.vue';
import StaffList from '../../components/Staff/StaffList.vue';
import StaffFormModal from '../../components/Modals/StaffFormModal.vue';

import { staffList as dummyStaffList } from '../../_dummy_data/staff';
import { ROLE_ADMIN } from '../../config/constants';

import { StaffManagementAPIClient } from '../../api/staffManagement';

// ==

const router = useRouter();

const { loggedIn, role: userRole } = inject(USER_AUTH_STORE_INJECT);

// ==

const loading = ref(true);
const modalOpen = ref(false);

const createStaffDisplayError = ref(null);
const searchTerm = ref('');
const staffList = ref([]);


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


  console.log(FILENAME, 'Getting staff list');


  // GET THE DATA
  // bookingList.value = []

  staffList.value = dummyStaffList;
  //

  console.log(FILENAME, 'beforeMount', 'end');
  loading.value = false;
});


watch(modalOpen, (newValue) => {
  if (newValue) {
    createStaffDisplayError.value = null;
  }
});

function openCreateStaffModal() {
  console.log(FILENAME, '_handleOpenModal');
  modalOpen.value = true;
}

async function registerStaff({ newStaffInfo }) {
  loading.value = true;

  console.log(FILENAME, 'registerStaff', 'start');

  console.log(FILENAME, 'registerStaff', { newStaffInfo });

  createStaffDisplayError.value = null;

  const res = await StaffManagementAPIClient.newStaff({ newStaffInfo });
  console.log(FILENAME, 'registerStaff', res, { res });

  if (res.done) {
    staffList.value.push({ ...newStaffInfo, staffId: res.body.data });
    modalOpen.value = false;
  } else {
    createStaffDisplayError.value = 'SOMW ERROR';
  }

  console.log(FILENAME, 'registerStaff', 'end');
  loading.value = false;
};

const filteredStaffList = computed(() => {
  if (searchTerm.value == '') {
    return staffList.value;
  }

  return staffList.value.filter((staffInfo) =>
    (staffInfo.firstName + ' ' + staffInfo.lastName).toLowerCase().includes(searchTerm.value.toLowerCase() ||
      staffInfo.email.toLowerCase().includes(searchTerm.value.toLowerCase(),
      ),
    ));
});


</script>

<template>
  <div class="w-1/2 mx-auto">
    <div class="text-center w-full">
      <span class="custom_loading" :style="{
        'opacity': (loading ? 100 : 0)
      }"></span>
    </div>
    <div class="flex justify-between pb-2">
      <h1 class="text-2xl font-bold">Browse Staff</h1>
      <button v-on:click="openCreateStaffModal" class="btn btn-accent btn-outline">Register Staff</button>
    </div>
    <div class="pb-2">
      <input v-model="searchTerm" placeholder="Search by name" class="w-full">
    </div>
    <div>
      <StaffList :staffList="filteredStaffList" />
    </div>

    <StaffFormModal v-if="modalOpen" v-model:modalOpen="modalOpen" @registerStaff="registerStaff"
      :disableButtons="loading" :displayError="createStaffDisplayError" :mode='"create"' />
  </div>
</template>

<style scoped>
</style>
