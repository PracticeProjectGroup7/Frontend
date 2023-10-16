import { mount, flushPromises } from '@vue/test-utils';
import { expect, test, vi, beforeEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { createRouter, createWebHistory } from 'vue-router';

import { routes } from '../router';
import { USER_AUTH_STORE_NAME } from '../stores/index';
import App from '../App.vue';

let router;
beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });
});

test('Redirects from login if loggedin', async () => {
  router.push('/login');
  await router.isReady();

  const wrapper = mount(App,
    {
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: {
              [USER_AUTH_STORE_NAME]: { _loginToken: "null" },
            },
            createSpy: vi.fn(),
          }),
        ],
      },
    });

  await flushPromises();

  expect(router.currentRoute.value.path).toBe('/');
});


test('Does not redirect from login if not loggedin', async () => {
  router.push('/login');
  await router.isReady();

  const wrapper = mount(App,
    {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              [USER_AUTH_STORE_NAME]: { _loginToken: null },
            },
            createSpy: vi.fn(),
          }),
          router,
        ],
      },
    });

  await flushPromises();

  expect(router.currentRoute.value.path).toBe('/login');
});
