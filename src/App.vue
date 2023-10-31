<script setup>
const FILENAME = 'App.vue';

import { computed, inject, provide, readonly, ref, onBeforeMount, watch } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import TheStaticFooter from './components/TheStaticFooter.vue';
import TheNavBar from './components/TheNavBar.vue';

import { userAuthStore as _userAuthStore } from './stores/userAuth';

import { HOME_NAME, BUILD_INFO } from './config';
import { USER_AUTH_STORE_INJECT, USER_AUTH_STORE_INJECT_TESTING } from './config/injectKeys';

import { ROLE_ADMIN, ROLE_PATIENT, BACKEND_TO_ROLE } from './config/constants';
import { ROUTE_HOME } from './router';

// =====

const router = useRouter();
const userAuthStore = _userAuthStore();


let lastLoginUpdateTime = Date.now();


let loggedIn = false; // TODO
let role = ROLE_PATIENT; // TODO
let userInfo = {};
if (userAuthStore.loggedIn && userAuthStore.authInfo) {
  console.debug(FILENAME, 'authInfo from store', userAuthStore.authInfo);

  loggedIn = true;
  role = BACKEND_TO_ROLE[userAuthStore.authInfo.ROLE];
  userInfo = userAuthStore.authInfo;

  console.debug(FILENAME, 'authInfo from store', { loggedIn, role, userInfo });
}

onBeforeMount(async () => {
  if (userAuthStore != null) {
    userAuthStore.initRefresh();
  }
});

const tetsingAuthInfo = inject(USER_AUTH_STORE_INJECT_TESTING);
if (tetsingAuthInfo) {
  console.log(FILENAME, 'authInfo from inject', tetsingAuthInfo.value.authInfo);

  loggedIn = tetsingAuthInfo.value.authInfo.loggedIn;
  role = tetsingAuthInfo.value.authInfo.role;
  userInfo = tetsingAuthInfo.value.authInfo.userInfo;
}

const loggedInRef = ref(loggedIn);
const roleRef = ref(role);
const userInfoRef = ref(userInfo);
const logout = async () => {
  loggedInRef.value = false;
  roleRef.value = ROLE_PATIENT;
  userInfoRef.value = {};

  userAuthStore.logout();

  await router.push({ name: ROUTE_HOME });
};

provide(USER_AUTH_STORE_INJECT, {
  userInfo: userInfoRef,
  loggedIn: loggedInRef,
  role: roleRef,
  logout: logout,
});

if (userAuthStore != null) {
  console.log('watching _loggedIn');

  const { loggedIn: _loggedIn } = storeToRefs(userAuthStore);

  watch(_loggedIn, (newValue) => {
    if (newValue) {
      loggedInRef.value = true;
      roleRef.value = BACKEND_TO_ROLE[userAuthStore.authInfo.ROLE];
      userInfoRef.value = userAuthStore.authInfo;
    } else {
      logout();
    }
    console.log('watching _loggedIn', 'new loggedIn', newValue);
    lastLoginUpdateTime = Date.now();
  });
}


</script>

<template>
  <TheNavBar :key="`nav_${lastLoginUpdateTime}`" :appName=HOME_NAME />

  <div class="mx-auto bg-base-100 w-4/5 min-h-4_5">
    <RouterView :key="`${$route.fullPath}_${lastLoginUpdateTime}`" />
  </div>

  <TheStaticFooter :buildInfo="BUILD_INFO" />
</template>

<style scoped>
.min-h-4_5 {
  min-height: 79vh;
}
</style>
