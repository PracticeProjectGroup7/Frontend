import { mount, flushPromises } from '@vue/test-utils';
import { ref } from 'vue';
import { expect, test, vi, beforeEach } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';

import { routes } from '../../../router';
import App from '../../../App.vue';
import { USER_AUTH_STORE_INJECT_TESTING } from '../../../config/injectKeys';


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

  const _wrapper = mount(App,
    {
      global: {
        plugins: [
          router,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
        provide: {
          [USER_AUTH_STORE_INJECT_TESTING]: ref({ authInfo: { loggedIn: true, role: '', userInfo: { name: '' } } }),
        },
      },
    });

  await flushPromises();

  expect(router.currentRoute.value.path).toBe('/');
});


test('Does not redirect from login if not loggedin', async () => {
  router.push('/login');
  await router.isReady();

  const _wrapper = mount(App,
    {
      global: {
        plugins: [
          router,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
        provide: {
          [USER_AUTH_STORE_INJECT_TESTING]: ref({ authInfo: { loggedIn: false, role: '', userInfo: { name: '' } } }),
        },
      },
    });

  await flushPromises();

  expect(router.currentRoute.value.path).toBe('/login');
});
