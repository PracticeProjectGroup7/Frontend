<script setup>
const FILENAME = 'BookingList.vue';

import { computed, onBeforeMount, ref, inject, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';

import BookingListItem from './BookingListItem.vue';
import BookingDetailsModal from '../Modals/BookingDetailsModal.vue';

// =====

const props = defineProps({
  bookingList: {
    type: Array,
    required: true,
    default: () => [],
  },
});

// =====

const selectedBooking = ref(null);
const modalOpen = ref(false);

onBeforeMount(() => {
  console.log(FILENAME, 'beforeMount', 'start');

  console.log(FILENAME, 'beforeMount', 'end');
});

function _handleOpenModal({ bookingId }) {
  console.log(FILENAME, '_handleOpenModal', bookingId);

  for (let i = 0; i < props.bookingList.length; i++) {
    if (props.bookingList[i].bookingId === bookingId) {
      selectedBooking.value = props.bookingList[i];
      break;
    }
  }

  modalOpen.value = true;
}

</script>

<template data-theme="corporate">
  <div class="w-1/2 mx-auto">
    <table class="table">
      <tbody>
        <template v-for="(booking) in bookingList" :key="booking.id">
          <BookingListItem :bookingInfo="booking" @openModal="_handleOpenModal" />
        </template>
      </tbody>
    </table>
  </div>
  <BookingDetailsModal :bookingDetails="selectedBooking" v-if="modalOpen" v-model:modalOpen="modalOpen" />
</template>

<style>
</style>
