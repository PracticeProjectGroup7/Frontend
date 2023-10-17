<script setup>
const FILENAME = 'TheNavBar.vue';

import { onBeforeMount } from 'vue';
import { computed, ref } from 'vue';
import { inject } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

import { userAuthStore as _userAuthStore } from '../stores/userAuth';
import { USER_AUTH_STORE_INJECT } from '../config/injectKeys';

const { authInfo } = inject(USER_AUTH_STORE_INJECT);
const { loggedIn, role: userRole, userInfo } = authInfo.value;

const props = defineProps({
  appName: {
    type: String,
    required: true,
    default: 'hms',
  },
});

const placeHolder = computed(() => {
  return userInfo.name.split(' ').map((splitName) => splitName[0]).join('');
});

</script>

<template data-theme="corporate">
  <header
    class="sticky top-0 z-40 py-1 border-b-2 border-b-slate-900/10 backdrop-blur supports-[backdrop-blur]:bg-white/95 shadow bg-white/95">

    <div class="w-full md:w-3/4 max-w-screen-xl mx-auto pt-1 pb-0 navbar text-base-content">

      <div class="navbar-start">
        <RouterLink :to="{ name: 'home' }" class="btn btn-ghost normal-case text-2xl">
          {{ appName }}
        </RouterLink>
      </div>

      <div class="navbar-center flex">
        <ul class="menu menu-horizontal text-lg">
          <li><a>Services</a></li>
          <!-- <li class="active"><a>Patient Management</a></li> -->
          <li v-if="loggedIn && (userRole == 'admin' || userRole == 'staff')"><a>Patient Management</a></li>
          <li v-if="loggedIn && userRole == 'admin'"><a>Staff Management</a></li>
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
              class="mt-2 z-2 p-0 shadow-2xl menu menu-md border-2 border-base-content dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a class="justify-between">
                  Profile
                  <span class="badge">New</span>
                </a>
              </li>
              <li>
                <a class="justify-between">
                  Profile
                  <span class="badge badge-warning">1</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </template>
        <template v-else>
          <RouterLink :to="{ name: 'login' }" class="btn">
            Login
          </RouterLink>
        </template>
      </div>

    </div>

  </header>
</template>

<style>
.navbar-center {
  position: relative;

  .menu>li {
    @apply border-b-2 border-transparent;
  }

  .menu>li:hover {
    @apply border-b-2 border-black;
  }

  .menu>li>a {
    @apply w-full px-8;
  }

  .menu>li>a:hover {
    @apply border-black;
  }


  .menu>li.active {
    @apply font-bold border-b-2 border-black;
  }
}

/* .dropdown-content > li {
  @apply border-b-2 border-transparent;
} */
</style>
