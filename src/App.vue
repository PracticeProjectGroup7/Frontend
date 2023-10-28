<script setup>
const FILENAME = 'App.vue';

import { computed, inject, provide, readonly, ref } from 'vue';
import { RouterView } from 'vue-router';

import TheStaticFooter from './components/TheStaticFooter.vue';
import TheNavBar from './components/TheNavBar.vue';

import { userAuthStore as _userAuthStore } from './stores/userAuth';

import { HOME_NAME, BUILD_INFO } from './config';
import { USER_AUTH_STORE_INJECT, USER_AUTH_STORE_INJECT_TESTING } from './config/injectKeys';

import { ROLE_ADMIN, ROLE_PATIENT, BACKEND_TO_ROLE } from './config/constants';

// =====

let loggedIn = false; // TODO
let role = ROLE_PATIENT; // TODO
let userInfo = { name: 'Dummy User', userId: '12233636' };

const userAuthStore = _userAuthStore();

if (userAuthStore.loggedIn && userAuthStore.authInfo) {
  console.debug(FILENAME, 'authInfo from store', userAuthStore.authInfo);

  loggedIn = true;
  role = BACKEND_TO_ROLE[userAuthStore.authInfo.ROLE];
  userInfo = userAuthStore.authInfo;

  console.debug(FILENAME, 'authInfo from store', { loggedIn, role, userInfo });
}

const tetsingAuthInfo = inject(USER_AUTH_STORE_INJECT_TESTING);
if (tetsingAuthInfo) {
  console.log(FILENAME, 'authInfo from inject', tetsingAuthInfo.value.authInfo);

  loggedIn = tetsingAuthInfo.value.authInfo.loggedIn;
  role = tetsingAuthInfo.value.authInfo.role;
  userInfo = tetsingAuthInfo.value.authInfo.userInfo;
}

const authInfo = ref({ loggedIn, role, userInfo });
const login = (loginInfo) => {
  console.debug(FILENAME, 'loginInfo', 'called with', loginInfo);

  authInfo.value.loggedIn = true;
  authInfo.value.role = BACKEND_TO_ROLE[loginInfo.ROLE];
  authInfo.value.userInfo = loginInfo;
};

provide(USER_AUTH_STORE_INJECT, {
  authInfo: readonly(authInfo),
  login,
});

</script>

<template>
  <TheNavBar :appName=HOME_NAME />

  <div class="mx-auto bg-base-100 min-h-screen">
    <RouterView :key="$route.fullPath" />
  </div>

  <TheStaticFooter :buildInfo="BUILD_INFO" />
</template>

