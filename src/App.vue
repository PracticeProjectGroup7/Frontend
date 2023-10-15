<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';

import StaticFooter from './components/StaticFooter.vue';
import NavBar from './components/NavBar.vue';


import { HOME_NAME } from './config';
import { BUILD_INFO } from './config';
</script>

<template>
  <NavBar :appName=HOME_NAME />

  <RouterView class="mx-auto min-h-screen bg-base-100" :key="$route.fullPath"/>

  <StaticFooter :buildInfo="BUILD_INFO"/>
</template>

