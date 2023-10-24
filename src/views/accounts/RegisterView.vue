<script setup>
const FILENAME = 'RegisterView.vue';

import { onBeforeMount } from 'vue';
import { computed, ref } from 'vue';
import { inject } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

import { userAuthStore as _userAuthStore } from '../../stores/userAuth';
import { USER_AUTH_STORE_INJECT } from '../../config/injectKeys';

import StaticHero from '../../components/static/StaticHero.vue';
import { ROUTE_LOGIN } from '../../router';

// =====

const router = useRouter();
const userAuthStore = _userAuthStore();

const { authInfo } = inject(USER_AUTH_STORE_INJECT);
const { loggedIn } = authInfo.value;

// =====

const props = defineProps({
  internal: Boolean,
});

// =====

onBeforeMount(async () => {
  loading.value = true;
  console.log(FILENAME, 'beforeMount', 'start');

  if (loggedIn) {
    console.log(FILENAME, 'Already logged in');
    await router.push('/');
    loading.value = false;
    return;
  }

  console.log(FILENAME, 'beforeMount', 'end');
  loading.value = false;
});


// Internal Data
const displayError = ref(null);
const displayErrorElement = ref(null);
const loading = ref(false);

const firstName = ref(null);
const lastName = ref(null);
const email = ref(null);
const password = ref(null);
const phoneNumber = ref(null);
const nric = ref(null);
const address = ref(null);
const dob = ref(null);
const gender = ref(null);

// Internal functions

async function register(e) {
  console.log(FILENAME, 'register', 'start');

  e.preventDefault();
  loading.value = true;
  displayError.value = null;

  const result = await userAuthStore.registerPatient({
    'patientInfo': {
      'firstName': firstName.value, 'lastName': lastName.value,
      'email': email.value, 'password': password.value,
      'phone': phoneNumber.value, 'nric': nric.value,
      'address': address.value,
      'dateOfBirth': dob.value,
    },
  });

  console.log(FILENAME, 'register', result);

  if (result.done) {
    loading.value = false;
    await router.push({ name: ROUTE_LOGIN });
    console.log(FILENAME, 'register', 'end');
  } else if (result.user_error) {
    displayError.value = result.errorMessage;
    await window.scrollTo(0, displayErrorElement.value.offsetTop + displayErrorElement.value.offsetHeight);
  }

  loading.value = false;
  console.log(FILENAME, 'register', 'end');
}

</script>

<template data-theme="corporate">
  <StaticHero />

  <div class="w-1/3 mx-auto">
    <form action="/" method="POST" v-on:submit="register" class="login_regiser_form">

      <div class="text-center w-full">
        <span class="custom_loading" :style="{
          'opacity': (loading ? 100 : 0)
        }"></span>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="join join-vertical">
          <label class="form_label_label">
            <span class="form_label_span">First Name</span>
          </label>
          <input v-model="firstName" type="text" class="form_input" required autocomplete="given-name" />
        </div>

        <div class="join join-vertical">
          <label class="form_label_label">
            <span class="form_label_span">Last Name</span>
          </label>
          <input v-model="lastName" type="text" class="form_input" required autocomplete="family-name" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="join join-vertical">
          <label class="form_label_label">
            <span class="form_label_span">Email</span>
          </label>
          <input v-model="email" type="email" class="form_input" required autocomplete="email" />
        </div>

        <div class="join join-vertical">
          <label class="form_label_label">
            <span class="form_label_span">Password</span>
          </label>
          <input v-model="password" type="password" class="form_input" required minlength="8"
            autocomplete="new-password" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="join join-vertical">
          <label class="form_label_label">
            <span class="form_label_span">Phone Number</span>
          </label>
          <input v-model="phoneNumber" type="number" class="form_input" required autocomplete="tel" min="6000000000"
            max="9999999999" />
        </div>

        <div class="join join-vertical">
          <label class="form_label_label">
            <span class="form_label_span">NRIC</span>
          </label>
          <input v-model="nric" type="text" class="form_input" required minlength="8" />
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4">
        <div class="join join-vertical">
          <label class="form_label_label">
            <span class="form_label_span">Address</span>
          </label>
          <input v-model="address" type="text" class="form_input" required autocomplete="street-address" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="join join-vertical">
          <label class="form_label_label">
            <span class="form_label_span">DOB</span>
          </label>
          <input v-model="dob" type="date" class="form_input" required minlength="8" autocomplete="bday" />
        </div>

        <div class="join join-vertical">
          <label class="form_label_label">
            <span class="form_label_span">Gender</span>
          </label>
          <select v-model="gender" class="select form_input" required autocomplete="sex">
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Others</option>
          </select>
        </div>
      </div>

      <div class="join join-vertical w-full">
        <label class="form_label_label py-0 -my-2">
        </label>
        <input type="submit" value="Register" class="main_btn" />
      </div>

      <div class="join join-vertical w-full">
        <label class="label pb-0 px-0">
          <RouterLink class="link_to_other" :to="{ name: ROUTE_LOGIN }">
            Already have an account ? Login"
          </RouterLink>
        </label>
      </div>

      <div class="join w-full" ref="displayErrorElement">
        <template v-if="displayError != null">
          <label class="label">
            <span class="label-text text-red-700 font-bold text-lg">Error : </span> <br>
          </label>
          <label class="label">
            <span class="label-text text-red-700 text-lg">{{ displayError }}</span>
          </label>
        </template>
      </div>
    </form>
  </div>
</template>
