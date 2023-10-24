<script setup>
import { ref } from 'vue';
import { dummyUserProfile } from '../../_dummy_data/userProfile';

const FILENAME = 'UserProfileVue';

const user = ref(dummyUserProfile);

const editProfile = () => {
  // Implement your edit profile logic here
  console.log('Edit profile clicked');
};

const deactivateProfile = () => {
  // Implement your deactivate profile logic here
  console.log('Deactivate profile clicked');
};
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div v-if="user" class="p-4 space-y-4">
      <h2 class="text-4xl font-semibold">User Profile</h2>
      <div class="space-y-2">
        <div class="data-container">
          <label for="email" class="font-semibold">Email: </label>
          <span id="email">{{ user.email }}</span>
        </div>
        <div class="data-container">
          <label for="name" class="font-semibold">Name: </label>
          <span id="name">{{ user.name }}</span>
        </div>
        <div class="data-container">
          <label for="phone" class="font-semibold">Phone: </label>
          <span id="phone">{{ user.phone }}</span>
        </div>
        <div class="data-container">
          <label for="nricOrPassport" class="font-semibold">NRIC / Passport: </label>
          <span id="nricOrPassport">{{ user.nricOrPassport }}</span>
        </div>
        <div class="data-container">
          <label for="address" class="font-semibold">Address: </label>
          <span id="address">{{ user.address }}</span>
        </div>
        <div class="data-container">
          <label for="medConditions" class="font-semibold">Medical Conditions: </label>
          <span id="medConditions">{{ user.medConditions }}</span>
        </div>
        <div class="data-container">
          <label for="gender" class="font-semibold">Gender: </label>
          <span id="gender">{{ user.gender }}</span>
        </div>
        <div class="data-container">
          <label for="dob" class="font-semibold">Date of Birth: </label>
          <span id="dob">{{ user.dob }}</span>
        </div>
        <div class="data space-x-4">
          <button @click="editProfile" class="btn btn-blue">Edit Profile</button>
          <button @click="deactivateProfile" class="btn btn-red">Deactivate Profile</button>
        </div>
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
  flex-direction: column; /* Display data below labels */
}

span {
  @apply pl-4;
}

.btn {
  @apply px-4 py-2 rounded cursor-pointer transition;
}

.btn-blue {
  @apply bg-blue-500 text-white;
}

&:hover {
  @apply bg-blue-700;
}

.btn-red {
  @apply bg-red-500 text-white;
}
</style>
