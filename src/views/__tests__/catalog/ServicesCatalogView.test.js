import { mount, flushPromises } from '@vue/test-utils';
import { ref } from 'vue';
import { expect, test, vi, beforeEach } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';

import { routes } from '../../../router';
import ServicesCatalogView from '../../catalog/ServicesCatalogView.vue';
import { USER_AUTH_STORE_INJECT_TESTING } from '../../../config/injectKeys';

let router;
beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });
});

test('Renders DoctorAppointments component by default', async () => {
  router.push('/services');
  await router.isReady();

  const wrapper = mount(ServicesCatalogView, {
    global: {
      plugins: [
        router,
        createTestingPinia({
          createSpy: vi.fn(),
        }),
      ],
      provide: {
        [USER_AUTH_STORE_INJECT_TESTING]: ref({ authInfo: { loggedIn: true, role: '', userInfo: { name: '' } } }),
      },
    },
  });

  await flushPromises();

  expect(wrapper.findComponent({ name: 'DoctorAppointments' }).exists()).toBe(true);
  expect(wrapper.findComponent({ name: 'LabTests' }).exists()).toBe(false);
});

test('Switches to LabTests component when the Lab Tests link is clicked', async () => {
  router.push('/services');
  await router.isReady();

  const wrapper = mount(ServicesCatalogView, {
    global: {
      plugins: [
        router,
        createTestingPinia({
          createSpy: vi.fn(),
        }),
      ],
      provide: {
        [USER_AUTH_STORE_INJECT_TESTING]: ref({ authInfo: { loggedIn: true, role: '', userInfo: { name: '' } } }),
      },
    },
  });

  await flushPromises();

  const labTestsLink = wrapper.find('#lab-tests');
  await labTestsLink.trigger('click');

  expect(wrapper.findComponent({ name: 'LabTests' }).exists()).toBe(true);
  expect(wrapper.findComponent({ name: 'DoctorAppointments' }).exists()).toBe(false);
});

