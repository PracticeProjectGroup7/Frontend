<script setup>
const FILENAME = 'LoginVue.vue';

import { onBeforeMount } from 'vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { userAuthStore as _userAuthStore } from '../stores/userAuth';

import StaticHero from '../components/static/StaticHero.vue';


// Static stuff

const router = useRouter();
const userAuthStore = _userAuthStore();

// computed

const loggedIn = computed(() => {
  // return userAuthStore.loggedIn;
  return false;
});

onBeforeMount(() => {
  loading.value = true;
  console.log(FILENAME, 'beforeMount', 'start');

  if (loggedIn.value) {
    console.log(FILENAME, 'Already logged in');
    loading.value = false;
    router.push('/');
    loading.value = false;

    return;
  }

  console.log(FILENAME, 'beforeMount', 'end');
  loading.value = false;
});


const props = defineProps({

});


// Internall Data
const displayError = ref(null);
const loading = ref(true);
const email = ref(null);
const password = ref(null);


// Internal functions

/**
 * @param {Event} e
 */
async function login(e) {
  e.preventDefault();
  console.log('login');

  loading.value = true;
  console.log(FILENAME, 'login', 'start');

  displayError.value = null;


  const result = await userAuthStore.login();
}

</script>

<template data-theme="corporate">
  <body>
    <StaticHero />

    <div class="w-1/3 mx-auto">
      <form action="/" method="POST" v-on:submit="login" class="login_regiser_form">


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
          <label class="form_label_label py-0 -my-2">
          </label>
          <input type="submit" value="Login" class="main_btn" />
        </div>

        <div class="join join-vertical w-full">
          <label class="label pb-0 px-0">
            <RouterLink class="link_to_other" :to="{ name: 'register' }">
              Don't have an account yet ? Register here"
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
