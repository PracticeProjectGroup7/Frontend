<script setup>
import { RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';

import TheStaticFooter from './components/TheStaticFooter.vue';
import TheNavBar from './components/TheNavBar.vue';


import { HOME_NAME } from './config';
import { BUILD_INFO } from './config';
</script>

<template>
  <TheNavBar :appName=HOME_NAME />

  <RouterView class="mx-auto min-h-screen bg-base-100" :key="$route.fullPath"/>

  <TheStaticFooter :buildInfo="BUILD_INFO"/>
</template>

