import { mount, flushPromises } from '@vue/test-utils';
import { ref } from 'vue';
import { vi, test, beforeEach, expect } from 'vitest'; // Import createSpy from Vitest

import { createRouter, createWebHistory } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';

import { routes } from '../../../router';
import BookingManagementView from '../../bookingManagement/BookingManagementView.vue';

let router;

beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });
});

test('Renders BookingManagementView component', async () => {
  router.push('/appointment-management');
  await router.isReady();

  const searchStatus = ref(''); // Initialize searchStatus as a ref

  const wrapper = mount(BookingManagementView, {
    global: {
      plugins: [
        router,
        createTestingPinia({
          createSpy: vi.fn, // Use createSpy from Vitest
        }),
      ],
    },
  });

  await flushPromises();
  await wrapper.vm.$nextTick();

  expect(wrapper.exists()).toBe(true);
  // Add more specific assertions here
});

test('Displays filtered bookings', async () => {
  router.push('/appointment-management');
  await router.isReady();

  const searchStatus = ref(''); // Initialize searchStatus as a ref

  const wrapper = mount(BookingManagementView, {
    global: {
      plugins: [
        router,
        createTestingPinia({
          createSpy: vi.fn, // Use createSpy from Vitest
        }),
      ],
    },
  });

  await flushPromises();
  await wrapper.vm.$nextTick();

  searchStatus.value = 'pending'; // Update the value directly without .value
  await wrapper.vm.$nextTick();

  expect(wrapper.find('tr').exists()).toBe(true);
});
