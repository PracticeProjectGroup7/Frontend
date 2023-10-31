<script setup>
const FILENAME = 'PatientView.vue';

import { computed, onBeforeMount, ref, inject, onMounted, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { vInfiniteScroll } from '@vueuse/components';

import { isPrivilegedUser } from '../../utils/permissions';
import { USER_AUTH_STORE_INJECT } from '../../config/injectKeys';

import NotFoundBanner from '../../components/static/NotFoundBanner.vue';
import URLCorrectBanner from '../../components/static/URLCorrectBanner.vue';
import BookingBill from '../../components/Bookings/BookingBill.vue';
import PatientList from '../../components/Patient/PatientList.vue';
// import PatientFormModal from '../../components/Modals/PatientFormModal.vue';

import { ROLE_ADMIN } from '../../config/constants';

import { PatientManagementAPIClient } from '../../api/patientManagement';
import { get } from '@vueuse/core';

// ==

const router = useRouter();

const { loggedIn, role: userRole } = inject(USER_AUTH_STORE_INJECT);

// ==

const loading = ref(true);
const modalOpen = ref(false);

const createPatientDisplayError = ref(null);
const searchTerm = ref('');
const patientList = ref([]);


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


  console.log(FILENAME, 'Getting patient list');

  await getData();

  // GET THE DATA
  // bookingList.value = []

  // patientList.value = dummyPatientList;
  //

  console.log(FILENAME, 'beforeMount', 'end');
});

async function getData() {
  loading.value = true;
  let res = await PatientManagementAPIClient.getAllStuff({ from, size });
  console.log(FILENAME, res, "res");

  if (res.done) {
    from = res.body.data.currentPage;
    total = Math.max(total, res.body.data.totalElements);
    patientList.value.push(...res.body.data.items);
    loading.value = false;
  }
}

watch(modalOpen, (newValue) => {
  if (newValue) {
    createPatientDisplayError.value = null;
  }
});

function openCreatePatientModal() {
  console.log(FILENAME, '_handleOpenModal');
  modalOpen.value = true;
}

async function registerPatient({ newPatientInfo }) {
  loading.value = true;

  console.log(FILENAME, 'registerPatient', 'start');

  console.log(FILENAME, 'registerPatient', { newPatientInfo });

  createPatientDisplayError.value = null;

  const res = await PatientManagementAPIClient.newPatient({ newPatientInfo });
  console.log(FILENAME, 'registerPatient', res, { res });

  if (res.done) {
    patientList.value.push({ ...newPatientInfo, patientId: res.body.data });
    modalOpen.value = false;
  } else if (res.userError) {
    createPatientDisplayError.value = res.body.errorMessage;
  } else {
    createPatientDisplayError.value = 'Please Try Again';
  }

  console.log(FILENAME, 'registerPatient', 'end');
  loading.value = false;
};

function fieldChanged() {
  createPatientDisplayError.value = null;
};

const filteredPatientList = computed(() => {
  if (searchTerm.value == '') {
    return patientList.value;
  }

  return patientList.value.filter((patientInfo) =>
    (patientInfo.firstName + ' ' + patientInfo.lastName).toLowerCase().includes(searchTerm.value.toLowerCase() ||
      patientInfo.email.toLowerCase().includes(searchTerm.value.toLowerCase(),
      ),
    ));
});

async function onLoadMore() {
  // patientList.value.push(...dummyPatientList);

  console.log("onLoadMore", patientList.value.length, total);
  if (patientList.value.length >= total) {
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
      <h1 class="text-2xl font-bold">Browse Patient</h1>
      <button v-on:click="openCreatePatientModal" class="btn btn-accent btn-outline">Register Patient</button>
    </div>
    <div class="pb-2">
      <input v-model="searchTerm" placeholder="Search by name" class="w-full">
    </div>
    <div v-if="filteredPatientList.length > 0">
      <PatientList :patientList="filteredPatientList" @loadMore="onLoadMore" />
    </div>
    <div v-else>
      No patient found
    </div>
<!-- 
    <PatientFormModal v-if="modalOpen" v-model:modalOpen="modalOpen" @registerPatient="registerPatient"
      :disableButtons="loading" :displayError="createPatientDisplayError" :mode='"create"'
      @notifyFieldChanged="fieldChanged" /> -->
  </div>
</template>

<style scoped>
</style>
