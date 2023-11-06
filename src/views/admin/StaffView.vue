<script setup>
const FILENAME = 'StaffView.vue';

import { computed, onBeforeMount, ref, inject, onMounted, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { vInfiniteScroll } from '@vueuse/components';

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
import { get } from '@vueuse/core';

// ==

const router = useRouter();

const { loggedIn, role: userRole } = inject(USER_AUTH_STORE_INJECT);

// ==

const loading = ref(true);
const modalOpen = ref(false);

const createStaffDisplayError = ref(null);
const searchTerm = ref('');
const staffList = ref([]);


// currentPage
// currentPageSize
// pageCount
// total: database.value.length,
//   page: 1,
//   pageSize: 10,

let from = 0;
let size = 10;
let total = Number.MIN_SAFE_INTEGER;

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

  await getData();

  // GET THE DATA
  // bookingList.value = []

  // staffList.value = dummyStaffList;
  //

  console.log(FILENAME, 'beforeMount', 'end');
});

async function getData() {
  loading.value = true;

  let res = await StaffManagementAPIClient.getAllStuff({ from, size });
  console.log(FILENAME, res, "res");

  if (res.done) {
    from = res.body.data.currentPage;
    total = Math.max(total, res.body.data.totalElements);
    staffList.value.push(...res.body.data.content);
  }
  loading.value = false;
}

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
  } else if (res.userError) {
    createStaffDisplayError.value = res.body.errorMessage;
  } else {
    createStaffDisplayError.value = 'Please Try Again';
  }

  console.log(FILENAME, 'registerStaff', 'end');
  loading.value = false;
};

function fieldChanged() {
  createStaffDisplayError.value = null;
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

async function onLoadMore() {
  // staffList.value.push(...dummyStaffList);

  console.log("onLoadMore", staffList.value.length, total);
  if (staffList.value.length >= total) {
    console.log("STOP STOP STOP");
  } else {
    await getData();
    console.log("GET DATA");
  }
}

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
    <div v-if="filteredStaffList.length > 0">
      <StaffList :staffList="filteredStaffList" @loadMore="onLoadMore" />
    </div>
    <div v-else>
      No staff found
    </div>

    <StaffFormModal v-if="modalOpen" v-model:modalOpen="modalOpen" @registerStaff="registerStaff"
      :disableButtons="loading" :displayError="createStaffDisplayError" :mode='"create"'
      @notifyFieldChanged="fieldChanged" />
  </div>
</template>

<style scoped>
</style>
