<script setup>
const FILENAME = 'StaffFormModal.vue';

import { computed, onBeforeMount, ref, watch } from 'vue';
import { watchDebounced } from '@vueuse/core';

import FormErrors from '../FormErrors.vue';

import { ROLE_DOCTOR, ROLE_STAFF, ROLE_TO_BACKEND } from '../../config/constants';
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
    required: true,
    default: 'create',
  },
  displayError: {
    type: String,
    required: false,
    default: null,
  },
  existingStaffInfo: {
    type: Object,
    required: false,
    default: () => { },
  },
});

const emit = defineEmits(['update:modalOpen', 'registerStaff', 'notifyFieldChanged']);

// ==

const firstName = ref(null);
const lastName = ref(null);
const email = ref(null);
const password = ref(null);
const nric = ref(null);
const phoneNumber = ref(null);
const role = ref(null);
const specialty = ref(null);
const consultationFees = ref(null);
const yearsOfExperience = ref(null);
const _form = ref(null);

onBeforeMount(() => {
  console.log(FILENAME, 'beforeMount', 'start');

  console.log(FILENAME, 'beforeMount', 'mode', props.mode);

  if (props.mode === 'edit') {
    firstName.value = props.existingStaffInfo.firstName;
    lastName.value = props.existingStaffInfo.lastName;
    email.value = props.existingStaffInfo.email;
    nric.value = props.existingStaffInfo.nric;
    phoneNumber.value = props.existingStaffInfo.phone;
    role.value = props.existingStaffInfo.role || props.existingStaffInfo.type;
    specialty.value = props.existingStaffInfo.specialty;
    consultationFees.value = props.existingStaffInfo.consultationFees;
    yearsOfExperience.value = props.existingStaffInfo.yearsOfExperience;
  }

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
      'role': role.value, 'specialty': specialty.value,
      'consultationFees': consultationFees.value,
      'yearsOfExperience': yearsOfExperience.value,
    },
  });
}

const allowedRolesToCreate = [ROLE_STAFF, ROLE_DOCTOR];

const allowedRolesToCreateStr = computed(() => {
  return allowedRolesToCreate.reduce((current, role) => ({ ...current, [role]: titlize(role.split('_')[1]) }), {});
});

const modalLabels = computed(() => {
  return {
    modalTitle: props.mode == 'create' ? 'Register Staff' : 'Edit Staff',
    buttonTitle: props.mode == 'create' ? 'Register Staff' : 'Edit Staff',
  };
});

watchDebounced(
  () => [email.value, nric.value, role.value, specialty.value, consultationFees.value],
  () => {
    emit('notifyFieldChanged');
  },
  { debounce: 500, maxWait: 1000 },
);

</script>

<template>
  <dialog class="modal modal-open">

    <div class="modal-box">

      <div class="custom-modal-title">{{ modalLabels.modalTitle }} </div>

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
              <input type="password" class="form_input" :required="mode == 'create'" minlength="8" v-model="password"
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

          <div class="grid grid-cols-1 gap-4">
            <div class="join join-vertical">
              <label class="form_label_label">
                <span class="form_label_span">Role</span>
              </label>
              <select class="select form_input" required v-model="role">
                <template v-for="role in allowedRolesToCreate" :key="role">
                  <option :value="ROLE_TO_BACKEND[role]">{{ allowedRolesToCreateStr[role] }}</option>
                </template>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2" v-if="role == ROLE_TO_BACKEND[ROLE_DOCTOR]">
            <div class="join join-vertical">
              <label class="form_label_label">
                <span class="form_label_span">Specialty</span>
              </label>
              <select class="select form_input" required v-model="specialty">
                <template v-for="specialty in specialities" :key="specialty">
                  <option :value="specialty">{{ specialty }}</option>
                </template>
              </select>
            </div>

            <div class="join join-vertical">
              <label class="form_label_label">
                <span class="form_label_span">Consultation Fees</span>
              </label>
              <input type="number" class="form_input" required min="5" step="5" v-model="consultationFees">
            </div>

            <div class="join join-vertical">
              <label class="form_label_label">
                <span class="form_label_span">Years Of Experience</span>
              </label>
              <input type="number" class="form_input" required min="1" step="1" v-model="yearsOfExperience">
            </div>
          </div>

          <div class="join join-vertical w-full" :class="{ invisible: displayError == null }">
            <FormErrors :error="displayError" />
          </div>

        </div>

        <div class="modal-action justify-center">
          <label class="form_label_label py-0 -my-2">
          </label>
          <input type="submit" :value="modalLabels.buttonTitle" class="btn btn-neutral" :disabled="disableButtons" />
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

  @apply py-6 px-6;
}

.modal-box {
  max-height: calc(100vh - 0rem);
  min-width: calc(100vw - 70rem);
}

label.form_label_label,
span.form_label_span {
  @apply text-sm;
}
</style>
