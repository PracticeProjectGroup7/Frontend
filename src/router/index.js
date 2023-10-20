import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/accounts/LoginView.vue';
import RegisterView from '../views/accounts/RegisterView.vue';
import AppointmentHistoryView from '../views/AppointmentHistory.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/_internal/login',
    name: 'internal_login',
    component: LoginView,
    props: { internal: true },
  },
  {
    path: '/appointment-history',
    name: 'appointment_history_self',
    component: AppointmentHistoryView,
  },
  {
    path: '/appointment-history/:patientId',
    name: 'appointment_history_others',
    component: AppointmentHistoryView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export { routes };

export default router;
