<script setup>
const FILENAME = 'App.vue';

import { computed, inject, provide, readonly, ref } from 'vue';
import { RouterView } from 'vue-router';

import TheStaticFooter from './components/TheStaticFooter.vue';
import TheNavBar from './components/TheNavBar.vue';

import { userAuthStore as _userAuthStore } from './stores/userAuth';

import { HOME_NAME, BUILD_INFO } from './config';
import { USER_AUTH_STORE_INJECT, USER_AUTH_STORE_INJECT_TESTING } from './config/injectKeys';

// =====

let loggedIn = false;
let role = 'admin';
let userInfo = { name: 'Dummy User', userId: '12233636' };

if (_userAuthStore.loggedIn && _userAuthStore.userInfo.role) {
  console.log(FILENAME, 'authInfo from store', tetsingAuthInfo);

  loggedIn = _userAuthStore.loggedIn;
  role = _userAuthStore.authInfo.role;
  userInfo = _userAuthStore.authInfo.userInfo;
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
  console.log(FILENAME, 'loginInfo', 'called with', loginInfo);
  authInfo.value.loggedIn = true;
  authInfo.value.role = true;
};

provide(USER_AUTH_STORE_INJECT, {
  authInfo: readonly(authInfo),
  login,
});

</script>

<template>
  <TheNavBar :appName=HOME_NAME />

  <div class="mx-auto bg-base-100 min-h-screen">
    <RouterView :key="$route.fullPath"/>
  </div>

  <TheStaticFooter :buildInfo="BUILD_INFO"/>
</template>

