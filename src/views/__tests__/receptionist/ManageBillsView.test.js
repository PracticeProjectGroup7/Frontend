import { vi, test, beforeEach, expect } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';
import ManageBillsView from '../../receptionist/ManageBillsView.vue';
import { routes } from '../../../router';
import { mount } from '@vue/test-utils';

let router;

beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });
});

test('Renders ManageBillsView component', async () => {
  router.push('/bill-management'); // Replace with the appropriate route
  await router.isReady();

  const wrapper = mount(ManageBillsView, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn, // Use createSpy from Vitest
        }),
      ],
    },
  });

  await wrapper.vm.$nextTick();

  expect(wrapper.find('.view-bill-button').exists()).toBe(true);
});
