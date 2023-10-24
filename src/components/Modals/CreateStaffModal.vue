<script setup>
const FILENAME = 'CreateStaffModal.vue';

import { computed, onBeforeMount, ref } from 'vue';


import { ROLE_DOCTOR, ROLE_STAFF } from '../../config/constants';

// ==

const props = defineProps({
  modalOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
  disableButtons: {
    type: Boolean,
    required: false,
    default: false,
  },
  mode: {
    type: String,
    required: false,
    default: 'create',
  },
});

const emit = defineEmits(['update:modalOpen', 'registerStaff']);

// ==
const displayError = ref(null);

const email = ref(null);
const password = ref(null);
const dob = ref(null);
const nric = ref(null);
const phoneNumber = ref(null);
const gender = ref(null);
const role = ref(null);
const speciality = ref(null);

onBeforeMount(() => {
  console.log(FILENAME, 'beforeMount', 'start');

  console.log(FILENAME, 'beforeMount', 'end');
});

function closeModal() {
  console.log(FILENAME, 'closeModal');
  if (props.disableButtons) {
    return;
  }
  emit('update:modalOpen', false);
}

function registerStaff(e) {
  e.preventDefault();
  console.log(FILENAME, 'registerStaff');

  console.log(e.srcElement.checkValidity());

  emit('registerStaff', {
    newStaffInfo: {

    },
  });
}

const allowedRolesToCreate = [ROLE_STAFF, ROLE_DOCTOR];

</script>

<template>
  <dialog class="modal modal-open">

    <div class="modal-box">

      <div class="custom-modal-title">Register Staff </div>

      <form action="/" method="POST" v-on:submit="registerStaff" class="login_regiser_form">
        <div class="modal-body">

          <div class="grid grid-cols-1 gap-4">

            <div class="join join-vertical w-full">
              <label class="form_label_label">
                <span class="form_label_span">Full Name</span>
              </label>
              <input type="email" class="form_input" required v-model="email" />
            </div>


          </div>

          <div class="grid grid-cols-2 gap-4">

            <div class="join join-vertical w-full">
              <label class="form_label_label">
                <span class="form_label_span">Email</span>
              </label>
              <input type="email" class="form_input" required v-model="email" />
            </div>

            <div class="join join-vertical w-full">
              <label class="form_label_label">
                <span class="form_label_span">Password</span>
              </label>
              <input type="password" class="form_input" required minlength="8" v-model="password" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="join join-vertical">
              <label class="form_label_label">
                <span class="form_label_span">Phone Number</span>
              </label>
              <input type="number" class="form_input" required minlength="8" v-model="phoneNumber" />
            </div>

            <div class="join join-vertical">
              <label class="form_label_label">
                <span class="form_label_span">NRIC</span>
              </label>
              <input type="text" class="form_input" required minlength="8" v-model="nric" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="join join-vertical">
              <label class="form_label_label">
                <span class="form_label_span">DOB</span>
              </label>
              <input type="date" class="form_input" required minlength="8" v-model="dob" />
            </div>

            <div class="join join-vertical">
              <label class="form_label_label">
                <span class="form_label_span">Gender</span>
              </label>
              <select class="select form_input" required v-model="gender">
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="join join-vertical">
              <label class="form_label_label">
                <span class="form_label_span">Role</span>
              </label>
              <select class="select form_input" required v-model="role">
                <template v-for="role in allowedRolesToCreate" :key="role">
                  <option :value="role">{{ role }}</option>
                </template>
              </select>
            </div>

            <div class="join join-vertical" v-if="role == ROLE_DOCTOR">
              <label class="form_label_label">
                <span class="form_label_span">Specuality</span>
              </label>
              <select class="select form_input" required v-model="speciality">
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>
            </div>
          </div>

          <div class="join join-vertical w-full" v-if="displayError != null">
            <label class="label font-bold pb-0 px-0">
              <span class="label-text text-red-700 font-bold">Error : </span> <br>
            </label>
            <label class="label pt-0 px-0">
              <span class="label-text text-red-700">{{ displayError }}</span>
            </label>
          </div>

        </div>

        <div class="modal-action justify-center">
          <label class="form_label_label py-0 -my-2">
          </label>
          <input type="submit" value="Register Staff" class="main_btn" :disabled="disableButtons" />
        </div>
      </form>

    </div>

    <div class="modal-backdrop" v-on:click="closeModal">
      <button>close</button>
    </div>
  </dialog>
</template>

<style scoped>
@import './modalStyle.css';
</style>
