import { vi, test, beforeEach, expect } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';
import { routes } from '../../../router';
import { mount } from '@vue/test-utils';
import BookingDetailsView from '../../bookingManagement/BookingDetailsView.vue';

let router;

beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });
});

test('Renders BookingDetailsView component', async () => {
  // Push a router state to simulate a route
  router.push('/test-management'); // Replace with the appropriate route
  await router.isReady();

  const wrapper = mount(BookingDetailsView, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn, // Use createSpy from Vitest
        }),
      ],
    },
    mocks: {
      $route: {
        params: {
          bookingId: 'your-booking-id', // Replace with a valid booking ID
        },
      },
    },
  });

  await wrapper.vm.$nextTick(); // Wait for the next tick (update) to complete

  // Add specific assertions here
  // For example, check if important elements or data is rendered
  expect(wrapper.element).toMatchSnapshot(); // Use snapshot testing if available
});
