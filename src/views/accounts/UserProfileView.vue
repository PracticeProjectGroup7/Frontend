<script setup>
const FILENAME = 'UserProfileView';

import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';

import UserProfileEditModal from '../../components/Modals/UserProfileEditModal.vue';
import { fetchUserProfileData } from '../../api/profile';
import { USER_AUTH_STORE_INJECT } from '../../config/injectKeys';


// ==

const { loggedIn, role: userRole, userInfo, logout } = inject(USER_AUTH_STORE_INJECT);

const props = defineProps({
  patientId: {
    type: String,
    required: true,
    default: '-1',
  },
});

const user = ref(null);
const isEditModalOpen = ref(false);

function _logout(e) {
  e.preventDefault();
  const done = window.confirm('Are you sure you want to logout ?');
  if (done) {
    logout();
  }
}

const openEditModal = () => {
  console.log(FILENAME, 'Edit profile clicked');
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  console.log(FILENAME, 'Closing Edit Profile Modal');
  isEditModalOpen.value = false;
};

const saveEditedProfile = (editedUserData) => {
  // Implement the logic to save the edited profile data here
  console.log(FILENAME, 'Edited Profile Data:', editedUserData);
  // Update user data in the parent component here
  user.value = editedUserData;
  closeEditModal();
};

const fetchUserProfile = async () => {
  user.value = await fetchUserProfileData();
};

// Fetch user profile data when the component is mounted
onMounted(() => {
  fetchUserProfile();
});
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div v-if="user != null" class="p-4 space-y-4">
      <h2 class="text-4xl font-semibold">User Profile</h2>
      <div class="space-y-2">
        <div class="data-container">
          <label for="email" class="font-semibold">Email: </label>
          <span id="email">{{ user.user.email }}</span>
        </div>
        <div class="data-container">
          <label for="name" class="font-semibold">Name: </label>
          <span id="name">{{ user.user.name }}</span>
        </div>
        <div class="data-container">
          <label for="phone" class="font-semibold">Phone: </label>
          <span id="phone">{{ user.user.phone }}</span>
        </div>
        <div class="data-container">
          <label for="nricOrPassport" class="font-semibold">NRIC / Passport: </label>
          <span id="nricOrPassport">{{ user.user.nric }}</span>
        </div>
        <div class="data-container">
          <label for="address" class="font-semibold">Address: </label>
          <span id="address">{{ user.user.address }}</span>
        </div>
        <div class="data-container">
          <label for="medConditions" class="font-semibold">Medical Conditions: </label>
          <span id="medConditions">{{ user.medicalCondition }}</span>
        </div>
        <div class="data-container">
          <label for="gender" class="font-semibold">Gender: </label>
          <span id="gender">{{ user.user.gender }}</span>
        </div>
        <div class="data-container">
          <label for="dob" class="font-semibold">Date of Birth: </label>
          <span id="dob">{{ user.user.dateOfBirth }}</span>
        </div>
        <div class="data-container btn-container">
          <button @click="openEditModal" class="btn btn-white">Edit Profile</button>
          <button @click="_logout" class="btn btn-red">Log Out</button>
        </div>

        <!-- Conditionally render the edit profile modal -->
        <UserProfileEditModal v-if="isEditModalOpen" :user="user" @save="saveEditedProfile" @close="closeEditModal" />
      </div>
    </div>
    <div v-else>
      <p class="text-red-500">User not found.</p>
    </div>
  </div>
</template>

<style scoped>
.data-container {
  @apply flex justify-between text-sm;
  flex-direction: column;
  /* Display data below labels */
}

span {
  @apply pl-4;
}

.btn-container {
  @apply flex flex-col space-y-2;
}

.btn {
  @apply px-4 py-2 rounded cursor-pointer w-52 transition;
}

.btn-white {
  @apply border border-black text-black bg-white;
}

.btn-red {
  @apply bg-red-500 text-white;
}
</style>
