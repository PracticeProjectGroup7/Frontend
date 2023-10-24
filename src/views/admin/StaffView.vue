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
import CreateStaffModal from '../../components/Modals/CreateStaffModal.vue';

import { staffList as dummyStaffList } from '../../_dummy_data/staff';
import { ROLE_ADMIN } from '../../config/constants';

// ==

const router = useRouter();

const { authInfo } = inject(USER_AUTH_STORE_INJECT);
const { loggedIn, role: userRole, userInfo } = authInfo.value;

// ==

const loading = ref(true);
const modalOpen = ref(false);

const searchTerm = ref('');
const staffList = ref([]);


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


  console.log(FILENAME, 'Getting staff list');


  // GET THE DATA
  // bookingList.value = []

  staffList.value = dummyStaffList;
  //

  console.log(FILENAME, 'beforeMount', 'end');
  loading.value = false;
});


function openCreateStaffModal() {
  console.log(FILENAME, '_handleOpenModal');
  modalOpen.value = true;
}

function registerStaff({ newStaffInfo }) {
  console.log(FILENAME, 'registerStaff', { newStaffInfo });
  loading.value = true;

  // ....
  // .... TODO UPDATE STATUS
  // ....

  setTimeout(() => {
    loading.value = false;
    modalOpen.value = false;

    staffList.value.push({});
  }, 5000);
};

const filteredStaffList = computed(() => {
  if (searchTerm.value == '') {
    return staffList.value;
  }
  return staffList.value;
});


</script>

<template>
  <div class="w-2/3 mx-auto">
    <div class="text-center w-full">
      <span class="custom_loading" :style="{
        'opacity': (loading ? 100 : 0)
      }"></span>
    </div>
    <div class="flex justify-end">
      <button v-on:click="openCreateStaffModal" class="btn btn-primary">Register Staff</button>
    </div>
    <div>
      <input v-model="searchTerm" placeholder="Search by name">
    </div>
    <div>
      <StaffList :staffList="filteredStaffList" />
    </div>

    <CreateStaffModal v-if="modalOpen" v-model:modalOpen="modalOpen" @registerStaff="registerStaff"
      :disableButtons="loading" />
  </div>
</template>

<style scoped>
</style>
