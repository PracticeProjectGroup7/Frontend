<script setup>
const FILENAME = 'UserProfileEditModal.vue';

import { ref } from 'vue';
import { editUserProfileData } from '../../api/profile';

// ==

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['save', 'close']);

const editedUser = ref(props.user);
const password = ref('');

const saveProfile = async () => {
  if (!password.value || password.value.length < 8) {
    // Display a message about the password requirement
    alert('Password is required and must be at least 8 characters.');
    return; // Exit the function without saving
  }
  // Implement the logic to save the edited profile data
  const lastSpaceIndex = editedUser.value.user.name.lastIndexOf(' ');
  const userInfo = {
    'email': editedUser.value.user.email,
    'firstName': editedUser.value.user.name.substring(0, lastSpaceIndex),
    'lastName': editedUser.value.user.name.substring(lastSpaceIndex+1),
    'password': password.value,
    'gender': editedUser.value.user.gender,
    'dateOfBirth': editedUser.value.user.dateOfBirth,
    'address': editedUser.value.user.address,
    'phone': editedUser.value.user.phone,
    'nric': editedUser.value.user.nric,
    'medicalConditions': editedUser.value.medicalCondition,
  };
  await editUserProfileData( { userInfo } );
  emit('save', editedUser.value); // Emit an event to save the data
};

const closeModal = () => {
  emit('close'); // Emit an event to close the modal
};
</script>

<template>
  <div class="modal modal-open">
    <div class="modal-content">
      <h2 class="text-2xl font-semibold mb-4">Edit Profile</h2>
      <div class="space-y-4">
        <!-- Add form fields for editing profile data -->
        <div class="form-field">
          <label for="email" class="font-semibold">Email: </label>
          <input class="input-field" type="text" id="email" v-model="editedUser.user.email" required autocomplete="email" />
        </div>
        <div class="form-field">
          <label for="name" class="font-semibold">Name: </label>
          <input class="input-field" type="text" id="name" v-model="editedUser.user.name" required autocomplete="name" />
        </div>
        <div class="form-field">
          <label for="name" class="font-semibold">Password: </label>
          <input class="input-field" type="password" id="password" v-model="password" required minlength="8" autocomplete="current-password" />
        </div>
        <div class="form-field">
          <label for="phone" class="font-semibold">Phone: </label>
          <input class="input-field" type="text" id="phone" v-model="editedUser.user.phone" required autocomplete="tel"
            min="6000000000" max="9999999999" />
        </div>
        <div class="form-field">
          <label for="nricOrPassport" class="font-semibold">NRIC / Passport: </label>
          <input class="input-field" type="text" id="nricOrPassport" v-model="editedUser.user.nric" required
            minlength="8" />
        </div>
        <div class="form-field">
          <label for="address" class="font-semibold">Address: </label>
          <input class="input-field" type="text" id="address" v-model="editedUser.user.address" required
            autocomplete="street-address" />
        </div>
        <div class="form-field">
          <label for="medConditions" class="font-semibold">Medical Conditions: </label>
          <input class="input-field" type="text" id="medConditions" v-model="editedUser.medicalCondition" />
        </div>
        <div class="form-field">
          <label for="gender" class="font-semibold">Gender: </label>
          <select class="input-field" v-model="editedUser.user.gender" required autocomplete="sex">
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Others</option>
          </select>
        </div>
        <div class="form-field">
          <label for="dob" class="font-semibold">Date of Birth: </label>
          <input class="input-field" type="date" id="dob" v-model="editedUser.user.dateOfBirth" autocomplete="bday" />
        </div>

        <div class="modal-actions btn-container">
          <button @click="saveProfile" class="btn btn-gray">Save</button>
          <button @click="closeModal" class="btn btn-orange">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-content {
  @apply bg-white p-4 rounded text-left;
}

.form-field {
  @apply text-sm;
}

select {
  @apply w-32;
}

.input-field {
  @apply border border-gray-300 rounded px-3 py-2;
}

.btn-container {
  @apply flex justify-between;
}

.btn {
  @apply px-4 py-2 rounded cursor-pointer transition;
}

.btn-gray {
  @apply text-black bg-gray-200;
}

.btn-orange {
  @apply bg-orange-200 text-black;
}

.btn-gray:hover {
  @apply bg-gray-300;
}

.btn-orange:hover {
  @apply bg-orange-300;
}
</style>
