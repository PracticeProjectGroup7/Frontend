import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/accounts/LoginView.vue';
import RegisterView from '../views/accounts/RegisterView.vue';
import BookingHistoryView from '../views/BookingHistory.vue';
import BookingBillView from '../views/BookingBill.vue';
import ServicesCatalogView from '../views/catalog/ServicesCatalogView.vue';
import StaffView from '../views/admin/StaffView.vue';
import StaffProfileView from '../views/admin/StaffProfileView.vue';
import UserProfileView from '../views/accounts/UserProfileView.vue';
import BookingManagementView from '../views/bookingManagement/BookingManagementView.vue';
import BookingDetailsView from '../views/bookingManagement/BookingDetailsView.vue';
import ManageBillsView from '../views/receptionist/ManageBillsView.vue';
import ReceptionBookingBillView from '../views/receptionist/ReceptionBookingBill.vue';
import { BOOKING_TYPE_DOCTOR, BOOKING_TYPE_LAB } from '../config/constants';

const ROUTE_HOME = 'ROUTE_HOME';
const ROUTE_LOGIN = 'ROUTE_LOGIN';
const ROUTE_REGISTER = 'ROUTE_REGISTER';
const ROUTE_LOGIN_INTERNAL = 'ROUTE_LOGIN_INTERNAL';

const ROUTE_BOOKING_HISTORY_SELF = 'ROUTE_BOOKING_HISTORY_SELF';
const ROUTE_BOOKING_HISTORY_OTHERS = 'ROUTE_BOOKING_HISTORY_OTHERS';
const ROUTE_BOOKING_BILL = 'ROUTE_BOOKING_BILL';

const ROUTE_SERVICE_CATALOG = 'ROUTE_SERVICE_CATALOG';
const ROUTE_USER_PROFILE = 'ROUTE_USER_PROFILE';
const ROUTE_LABTEST_MANAGEMENT = 'ROUTE_LABTEST_MANAGEMENT';
const ROUTE_LABTEST_DETAILS = 'ROUTE_LABTEST_DETAILS';
const ROUTE_APPOINTMENT_MANAGEMENT = 'ROUTE_APPOINTMENT_MANAGEMENT';
const ROUTE_APPOINTMENT_DETAILS = 'ROUTE_APPOINTMENT_DETAILS';
const ROUTE_BILL_MANAGEMENT = 'ROUTE_BILL_MANAGEMENT';
const ROUTE_BOOKING_BILL_RECEPTION = 'ROUTE_BOOKING_BILL_RECEPTION';

const ROUTE_STAFF_LIST = 'ROUTE_STAFF_LIST';
const ROUTE_STAFF_PROFILE = 'ROUTE_STAFF_PROFILE';

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
  {
    path: '/services',
    name: ROUTE_SERVICE_CATALOG,
    component: ServicesCatalogView,
    props: true,
  },
  {
    path: '/user-profile',
    name: ROUTE_USER_PROFILE,
    component: UserProfileView,
    props: true,
  },
  {
    path: '/_internal/staff',
    name: ROUTE_STAFF_LIST,
    component: StaffView,
  },
  {
    path: '/_internal/staff-profile/:staffId',
    name: ROUTE_STAFF_PROFILE,
    component: StaffProfileView,
  },
  {
    path: '/test-management',
    name: ROUTE_LABTEST_MANAGEMENT,
    component: BookingManagementView,
    props: { bookingType: BOOKING_TYPE_LAB },
  },
  {
    path: '/test-management/:testId',
    name: ROUTE_LABTEST_DETAILS,
    component: BookingDetailsView,
    props: { bookingType: BOOKING_TYPE_LAB },
  },
  {
    path: '/appointment-management',
    name: ROUTE_APPOINTMENT_MANAGEMENT,
    component: BookingManagementView,
    props: { bookingType: BOOKING_TYPE_DOCTOR },
  },
  {
    path: '/appointment-management/:appointmentId',
    name: ROUTE_APPOINTMENT_DETAILS,
    component: BookingDetailsView,
    props: { bookingType: BOOKING_TYPE_DOCTOR },
  },
  {
    path: '/bill-management',
    name: ROUTE_BILL_MANAGEMENT,
    component: ManageBillsView,
    props: true,
  },
  {
    path: '/bill-management/:billId',
    name: ROUTE_BOOKING_BILL_RECEPTION,
    component: ReceptionBookingBillView,
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
  ROUTE_USER_PROFILE,

  ROUTE_SERVICE_CATALOG,
  ROUTE_LABTEST_MANAGEMENT, ROUTE_LABTEST_DETAILS,
  ROUTE_APPOINTMENT_MANAGEMENT, ROUTE_APPOINTMENT_DETAILS,
  ROUTE_STAFF_LIST, ROUTE_STAFF_PROFILE,
  ROUTE_BILL_MANAGEMENT, ROUTE_BOOKING_BILL_RECEPTION,
};

export default router;
