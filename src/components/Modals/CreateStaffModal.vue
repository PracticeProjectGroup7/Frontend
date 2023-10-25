<script setup>
const FILENAME = 'CreateStaffModal.vue';

import { computed, onBeforeMount, ref } from 'vue';


import { ROLE_DOCTOR, ROLE_STAFF } from '../../config/constants';
import { specialities } from '../../config/specialities';

import { titlize } from '../../utils/utils';

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
  displayError: {
    type: String,
    required: false,
    default: null,
  },
});

const emit = defineEmits(['update:modalOpen', 'registerStaff']);

// ==

const firstName = ref(null);
const lastName = ref(null);
const email = ref(null);
const password = ref(null);
const nric = ref(null);
const phoneNumber = ref(null);
const role = ref(null);
const speciality = ref(null);
const _form = ref(null);

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
      'firstName': firstName.value, 'lastName': lastName.value,
      'email': email.value, 'password': password.value,
      'phone': phoneNumber.value, 'nric': nric.value,
      'role': role.value, 'speciality': speciality.value,
    },
  });
}

const allowedRolesToCreate = [ROLE_STAFF, ROLE_DOCTOR];

const allowedRolesToCreateStr = computed(() => {
  return allowedRolesToCreate.reduce((current, role) => ({ ...current, [role]: titlize(role.split('_')[1]) }), {});
});

</script>

<template>
  <dialog class="modal modal-open">

    <div class="modal-box">

      <div class="custom-modal-title">Register Staff </div>

      <form action="/" method="POST" v-on:submit="registerStaff" class="login_regiser_form" ref="_form">
        <div class="modal-body">


          <div class="grid grid-cols-2 gap-4">
            <div class="join join-vertical">
              <label class="form_label_label">
                <span class="form_label_span">First Name</span>
              </label>
              <input v-model="firstName" type="text" class="form_input" required />
            </div>

            <div class="join join-vertical">
              <label class="form_label_label">
                <span class="form_label_span">Last Name</span>
              </label>
              <input v-model="lastName" type="text" class="form_input" required />
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
              <input type="password" class="form_input" required minlength="8" v-model="password"
                autocomplete="new-password " />
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
                <span class="form_label_span">Role</span>
              </label>
              <select class="select form_input" required v-model="role">
                <template v-for="role in allowedRolesToCreate" :key="role">
                  <option :value="role">{{ allowedRolesToCreateStr[role] }}</option>
                </template>
              </select>
            </div>

            <div class="join join-vertical" v-if="role == ROLE_DOCTOR">
              <label class="form_label_label">
                <span class="form_label_span">Speciality</span>
              </label>
              <select class="select form_input" required v-model="speciality">
                <template v-for="speciality in specialities" :key="speciality">
                  <option :value="speciality">{{ speciality }}</option>
                </template>
              </select>
            </div>
          </div>

          <div class="join join-vertical w-full" :class="{ invisible: displayError == null }">
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
          <input type="submit" value="Register Staff" class="btn btn-neutral" :disabled="disableButtons" />
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

.custom-modal-title {
  @apply text-2xl font-semibold;

  @apply text-center;

  @apply py-8 px-6;
}
</style>
