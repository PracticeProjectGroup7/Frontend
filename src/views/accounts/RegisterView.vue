<script setup>
const FILENAME = 'RegisterView.vue';

import { onBeforeMount } from 'vue';
import { computed, ref } from 'vue';
import { inject } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

import { userAuthStore as _userAuthStore } from '../../stores/userAuth';
import { USER_AUTH_STORE_INJECT } from '../../config/injectKeys';

import StaticHero from '../../components/static/StaticHero.vue';

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
const loading = ref(false);

const email = ref(null);
const password = ref(null);
const phoneNumber = ref(null);
const nric = ref(null);
const dob = ref(null);
const gender = ref(null);

// Internal functions

async function register(e) {
  e.preventDefault();
  console.log('register');

  loading.value = true;
  console.log(FILENAME, 'register', 'start');

  displayError.value = null;


  const result = await userAuthStore.register();
}

</script>

<template data-theme="corporate">
  <body>
    <StaticHero />

    <div class="w-1/3 mx-auto">
      <form action="/" method="POST" v-on:submit="register" class="login_regiser_form">


        <div class="text-center w-full">
          <span class="custom_loading" :style="{
            'opacity': (loading ? 100 : 100) // TODO : 100 : 0
          }"></span>
        </div>


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

        <div class="join join-vertical w-full">
          <label class="form_label_label">
            <span class="form_label_span">Phone Number</span>
          </label>
          <input type="number" class="form_input" required minlength="8" v-model="phoneNumber" />
        </div>

        <div class="join join-vertical w-full">
          <label class="form_label_label">
            <span class="form_label_span">NRIC</span>
          </label>
          <input type="text" class="form_input" required minlength="8" v-model="nric" />
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

        <div class="join join-vertical w-full">
          <label class="form_label_label py-0 -my-2">
          </label>
          <input type="submit" value="Register" class="main_btn" />
        </div>

        <div class="join join-vertical w-full">
          <label class="label pb-0 px-0">
            <RouterLink class="link_to_other" :to="{ name: 'login' }">
              Already have an account ? Login"
            </RouterLink>
          </label>
        </div>

        <div class="join join-vertical w-full" v-if="displayError != null">
          <label class="label font-bold pb-0 px-0">
            <span class="label-text text-red-700 font-bold">Error : </span> <br>
          </label>
          <label class="label pt-0 px-0">
            <span class="label-text text-red-700">{{ displayError }}</span>
          </label>
        </div>
      </form>
    </div>
  </body>
</template>
