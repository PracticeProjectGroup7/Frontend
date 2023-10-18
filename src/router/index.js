import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/accounts/LoginView.vue';
import RegisterView from '../views/accounts/RegisterView.vue';
import AppointmentHistoryView from '../views/AppointmentHistory.vue';
import AppointmentBillView from '../views/AppointmentBill.vue';

const ROUTE_HOME = 'ROUTE_HOME';
const ROUTE_LOGIN = 'ROUTE_LOGIN';
const ROUTE_REGISTER = 'ROUTE_REGISTER';
const ROUTE_LOGIN_INTERNAL = 'ROUTE_LOGIN_INTERNAL';
const ROUTE_APPT_HISTORY_SELF = 'ROUTE_APPT_HISTORY_SELF';
const ROUTE_APPT_HISTORY_OTHERS = 'ROUTE_APPT_HISTORY_OTHERS';
const ROUTE_APPT_BILL = 'ROUTE_APPT_BILL';

const routes = [
  {
    path: '/',
    name: ROUTE_HOME,
    component: HomeView,
  },
  {
    path: '/login',
    name: ROUTE_LOGIN,
    component: LoginView,
  },
  {
    path: '/register',
    name: ROUTE_REGISTER,
    component: RegisterView,
  },
  {
    path: '/_internal/login',
    name: ROUTE_LOGIN_INTERNAL,
    component: LoginView,
    props: { internal: true },
  },
  {
    path: '/appointment-history',
    name: ROUTE_APPT_HISTORY_SELF,
    component: AppointmentHistoryView,
  },
  {
    path: '/appointment-history/:patientId',
    name: ROUTE_APPT_HISTORY_OTHERS,
    component: AppointmentHistoryView,
    props: true,
  },
  {
    path: '/appointment-bill/:billId',
    name: ROUTE_APPT_BILL,
    component: AppointmentBillView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export {
  routes,
  ROUTE_HOME,
  ROUTE_LOGIN, ROUTE_LOGIN_INTERNAL, ROUTE_REGISTER,
  ROUTE_APPT_HISTORY_SELF, ROUTE_APPT_HISTORY_OTHERS,
  ROUTE_APPT_BILL,
};

export default router;
