import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/accounts/LoginView.vue';
import RegisterView from '../views/accounts/RegisterView.vue';
import BookingHistoryView from '../views/BookingHistory.vue';
import BookingBillView from '../views/BookingBill.vue';

const ROUTE_HOME = 'ROUTE_HOME';
const ROUTE_LOGIN = 'ROUTE_LOGIN';
const ROUTE_REGISTER = 'ROUTE_REGISTER';
const ROUTE_LOGIN_INTERNAL = 'ROUTE_LOGIN_INTERNAL';
const ROUTE_BOOKING_HISTORY_SELF = 'ROUTE_BOOKING_HISTORY_SELF';
const ROUTE_BOOKING_HISTORY_OTHERS = 'ROUTE_BOOKING_HISTORY_OTHERS';
const ROUTE_BOOKING_BILL = 'ROUTE_BOOKING_BILL';

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
    path: '/booking-history',
    name: ROUTE_BOOKING_HISTORY_SELF,
    component: BookingHistoryView,
  },
  {
    path: '/booking-history/:patientId',
    name: ROUTE_BOOKING_HISTORY_OTHERS,
    component: BookingHistoryView,
    props: true,
  },
  {
    path: '/booking-bill/:billId',
    name: ROUTE_BOOKING_BILL,
    component: BookingBillView,
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
  ROUTE_BOOKING_HISTORY_SELF, ROUTE_BOOKING_HISTORY_OTHERS,
  ROUTE_BOOKING_BILL,
};

export default router;
