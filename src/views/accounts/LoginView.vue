<script setup>
const FILENAME = 'LoginVue.vue';

import { onBeforeMount } from 'vue';
import { computed, ref } from 'vue';
import { inject } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

import { USER_AUTH_STORE_INJECT } from '../../config/injectKeys';
import { userAuthStore as _userAuthStore } from '../../stores/userAuth';

import StaticHero from '../../components/static/StaticHero.vue';
import { ROUTE_REGISTER } from '../../router';

import { UserAuthAPIClient } from '../../api/userAuth';


// =====

const router = useRouter();

const { authInfo, login: appLogin } = inject(USER_AUTH_STORE_INJECT);
const { loggedIn } = authInfo.value;

const userAuthStore = _userAuthStore();

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

const email = ref(null);
const password = ref(null);

// Internal functions

async function login(e) {
  console.log(FILENAME, 'login', 'start');

  e.preventDefault();
  loading.value = true;
  displayError.value = null;

  const loginInfo = {
    email: email.value,
    password: password.value,
  };

  const result = await userAuthStore.login(loginInfo);

  console.log(FILENAME, 'login', result);

  if (result.done) {
    appLogin(result.body.authInfo);
    await router.push('/');
  }

  if (result.userError) {
    displayError.value = 'Username/Password was incorrect';
  } else {
    displayError.value = 'Something went wrong';
  }

  loading.value = false;
  console.log(FILENAME, 'login', 'end');
}

</script>

<template data-theme="corporate">
  <StaticHero v-if="!internal" />

  <div class="w-1/3 mx-auto">
    <form action="/" method="POST" v-on:submit="login" class="login_regiser_form">

      <div class="text-center w-full">
        <span class="custom_loading" :style="{
          'opacity': (loading ? 100 : 0)
        }"></span>
      </div>

      <div class="join join-vertical w-full">
        <label class="form_label_label">
          <span class="form_label_span">Email</span>
        </label>
        <input v-model="email" type="email" class="form_input" required autocomplete="email" />
      </div>

      <div class="join join-vertical w-full">
        <label class="form_label_label">
          <span class="form_label_span">Password</span>
        </label>
        <input v-model="password" type="password" class="form_input" required minlength="8"
          autocomplete="current-password" />
      </div>

      <div class="join join-vertical w-full">
        <label class="form_label_label py-0 -my-2">
        </label>
        <input v-if="!internal" type="submit" value="Login" class="main_btn" placeholder="lisndn" />
        <input v-else type="submit" value="Hospital Staff Login" class="main_btn" placeholder="lisndn" />
      </div>

      <div v-if="!internal" class="join join-vertical w-full">
        <label class="label pb-0 px-0">
          <RouterLink class="link_to_other" :to="{ name: ROUTE_REGISTER }">
            Don't have an account yet ? Register here"
          </RouterLink>
        </label>
      </div>

      <div class="join join-vertical w-full" ref="displayErrorElement">
        <template v-if="displayError != null">
          <label class="label">
            <span class="label-text text-red-700 font-bold">Error : </span> <br>
          </label>
          <label class="label">
            <span class="label-text text-red-700">{{ displayError }}</span>
          </label>
        </template>
      </div>
    </form>
  </div>
</template>
