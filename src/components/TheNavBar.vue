<script setup>
const FILENAME = 'TheNavBar.vue';

import { computed, inject, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import {
  ROUTE_HOME, ROUTE_LOGIN, ROUTE_SERVICE_CATALOG, ROUTE_USER_PROFILE, ROUTE_LABTEST_MANAGEMENT,
  ROUTE_APPOINTMENT_MANAGEMENT, ROUTE_STAFF_LIST, ROUTE_BILL_MANAGEMENT,
} from '../router';
import { USER_AUTH_STORE_INJECT } from '../config/injectKeys';
import { isPrivilegedUser } from '../utils/permissions';
import { ROLE_ADMIN, ROLE_DOCTOR, ROLE_STAFF, ROLE_RECEPTION } from '../config/constants';

// =====

const { loggedIn, role: userRole, userInfo } = inject(USER_AUTH_STORE_INJECT);
const route = useRoute();

// =====

const props = defineProps({
  appName: {
    type: String,
    required: true,
    default: 'hms',
  },
});

// https://stackoverflow.com/a/73756909
watch(
  () => route.name,
  async (newName) => {
    console.log(FILENAME, 'newName', newName);
  },
  { immediate: true },
);

// ====

const placeHolder = computed(() => {
  return userInfo.value.name.split(' ').map((splitName) => splitName[0]).join('');
});

</script>

<template data-theme="corporate">
  <header
    class="sticky top-0 z-40 py-1 border-b-2 border-b-slate-900/10 backdrop-blur
    supports-[backdrop-blur]:bg-white/95 shadow bg-white/95">

    <div class="w-full md:w-3/4 max-w-screen-xl mx-auto pt-0 pb-0 navbar text-base-content">

      <div class="navbar-start">
        <RouterLink :to="{ name: ROUTE_HOME }" class="btn btn-ghost normal-case text-2xl">
          {{ appName }}
        </RouterLink>
      </div>

      <div class="navbar-center flex">
        <ul class="menu menu-horizontal text-lg">
          <li>
            <RouterLink :to="{ name: ROUTE_SERVICE_CATALOG }">
              Services
            </RouterLink>
          </li>
          <li v-if="loggedIn && userRole == ROLE_ADMIN">
            <RouterLink :to="{ name: ROUTE_SERVICE_CATALOG }"> <!-- TODO -->
              Patient Management
            </RouterLink>
          </li>
          <li v-if="loggedIn && isPrivilegedUser(userRole)">
            <RouterLink :to="{ name: ROUTE_STAFF_LIST }">
              Staff Management
            </RouterLink>
          </li>
          <li v-if="loggedIn && userRole == ROLE_STAFF">
            <RouterLink :to="{ name: ROUTE_LABTEST_MANAGEMENT }">
              Test Management
            </RouterLink>
          </li>
          <li v-if="loggedIn && userRole == ROLE_DOCTOR">
            <RouterLink :to="{ name: ROUTE_APPOINTMENT_MANAGEMENT }">
              Appointment Management
            </RouterLink>
          </li>
          <li v-if="loggedIn && userRole == ROLE_RECEPTION">
            <RouterLink :to="{ name: ROUTE_BILL_MANAGEMENT }">
              Bills Management
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="navbar-end">
        <template v-if="loggedIn">
          <div class="dropdown dropdown-end ring-0">
            <label tabindex="0" class="btn btn-circle avatar border-2 border-slate-900/10 hover:border-base-900">
              <div class="avatar placeholder rounded-full">
                <div class="bg-base-100">
                  <span class="text-4xl">{{ placeHolder }}</span>
                </div>
              </div>
            </label>
            <ul tabindex="0"
              class="mt-2 z-2 p-0 shadow-2xl menu menu-md border-2 border-base-content dropdown-content
              bg-base-100 rounded-box w-52">
              <li>
                <RouterLink :to="{ name: ROUTE_USER_PROFILE }"><a class="justify-between">
                    Profile
                  </a></RouterLink>
              </li>
              <!-- <li>
                <a class="justify-between">
                  Profile
                  <span class="badge badge-warning">1</span>
                </a>
              </li> -->
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </template>
        <template v-else>
          <RouterLink :to="{ name: ROUTE_LOGIN }" class="btn">
            Login
          </RouterLink>
        </template>
      </div>

    </div>

  </header>
</template>

<style scoped>
.navbar-center {
  position: relative;

  .menu>li>a {
    @apply border-b-2 border-transparent;
  }

  .menu>li>a {
    @apply w-full px-8;
  }

  .menu>li>a:hover {
    @apply border-black;
  }

  .menu>li>a .active {
    @apply border-b-2 border-black;
  }
}

/** This fails on the home page */
.router-link-exact-active,
.router-link-active {
  @apply border-b-2 border-black !important;
  /* Your styles for exact active link */
  /* @apply font-bold; */
  /* Apply bold font-weight*/
  /* @apply text-red-500; */
  /* For example, change the link text color to red */
}
</style>
