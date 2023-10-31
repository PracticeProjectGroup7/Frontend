<script setup>
const FILENAME = 'TheStaticFooter.vue';

defineProps({
  buildInfo: {
    type: String,
    required: false,
  },
});

</script>

<template>
  <footer class="footer footer-center py-8 text-base-content bg-slate-400">
    <aside>
      <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
      <p v-if="buildInfo != undefined">{{ buildInfo }}</p>
    </aside>
  </footer>
</template>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  height: 15vh;
}
</style>
