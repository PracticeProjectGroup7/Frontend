import { BOOKING_TYPE_DOCTOR } from '../config/constants';

function isDoctorType(bookingType) {
  return bookingType === BOOKING_TYPE_DOCTOR;
}

export {
  isDoctorType,
};
