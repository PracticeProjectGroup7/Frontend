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
  <footer class="footer footer-center py-2 text-base-content bg-slate-400 mt-6">
    <aside>
      <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
      <p v-if="buildInfo != undefined">{{ buildInfo }}</p>
    </aside>
  </footer>
</template>

<style scoped>
footer {
  position: static;
  bottom: 0;
}
</style>
