<script setup>

import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  appName: {
    type: String,
    required: true,
    value: 'hms',
  },
  loggedIn: {
    type: Boolean,
    required: false,
    value: 'false',
  },
  userInfo: {
    type: Object,
    required: false,
    default(rawProps) {
      return { 'fullName': 'Arpit Jain' };
    },
  },
});

const placeHolder = computed(() => {
  return props.userInfo.fullName.split(' ').map((splitName) => splitName[0]).join('');
});

</script>

<template data-theme="corporate">
  <header
    class="sticky top-0 z-40 py-1 border-b-2 border-b-slate-900/10 backdrop-blur duration-500 supports-[backdrop-blur]:bg-white/95 transition-colors shadow-sm bg-white/95">
    <div class="w-3/4 max-w-screen-xl mx-auto py-1 navbar text-base-content">
      <div class="navbar-start">
        <div class="dropdown">

          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 w-52">
            <li><a>Item 1</a></li>
            <li>
              <a>Parent</a>
              <ul class="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>

        <RouterLink :to="{ name: 'home' }" class="btn btn-ghost normal-case text-2xl">
          {{ appName }}
        </RouterLink>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a>Item 1</a></li>
          <li tabindex="0">
            <details>
              <summary>Parent</summary>
              <ul class="p-2 border-solid border-base-content border">
                <li class="border-solid border-base-content border"><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </details>
          </li>
          <li><a>Item 3</a></li>
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
            <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
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
