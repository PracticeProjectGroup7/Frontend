import { titlize } from '../utils/utils';


const BOOKING_TYPE_LAB = 'lab';
const BOOKING_TYPE_DOCTOR = 'doctor';


const ROLE_PATIENT = 'ROLE_PATIENT';
const ROLE_STAFF = 'ROLE_STAFF';
const ROLE_DOCTOR = 'ROLE_DOCTOR';
const ROLE_ADMIN = 'ROLE_ADMIN';

const ROLE_TO_BACKEND = {
  [ROLE_PATIENT]: 'PATIENT',
  [ROLE_STAFF]: 'ROLE_STAFF',
  [ROLE_DOCTOR]: 'ROLE_DOCTOR',
  [ROLE_ADMIN]: 'ROLE_ADMIN',
};

const ROLE_TO_DISPLAY = Object.keys(ROLE_TO_BACKEND).reduce(
  (current, role) => (
    { ...current, [role]: titlize(role.split('_')[1]) }
  )
  , {});
console.debug('ROLE_TO_DISPLAY', ROLE_TO_DISPLAY);

const PAYMENT_STATS_PAID = 'paid';
const PAYMENT_STATS_UNPAID = 'unpaid';

export {
  BOOKING_TYPE_DOCTOR, BOOKING_TYPE_LAB,

  ROLE_PATIENT, ROLE_STAFF, ROLE_DOCTOR, ROLE_ADMIN,
  ROLE_TO_BACKEND, ROLE_TO_DISPLAY,

  PAYMENT_STATS_PAID, PAYMENT_STATS_UNPAID,
};

