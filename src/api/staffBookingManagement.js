import { DOCTOR_APPOINTMENT_MANAGE_API, TEST_BOOKING_MANAGE_API, BOOKING_DETAILS_API } from '../config/apiPaths';
import { easyGet, easyPost } from './easyFetch';
const FILENAME = 'api/staffBookingManagement';

export async function fetchBookings(isDoctorTypeBooking) {
  const path = isDoctorTypeBooking ? DOCTOR_APPOINTMENT_MANAGE_API : TEST_BOOKING_MANAGE_API;
  const response = await easyGet({
    url: path,
  });
  if (response.done) {
    console.log(`${FILENAME} - Fetching bookings`);
    return response.body.data.items;
  } else {
    console.error(`${FILENAME} - Error fetching bookings`);
    return null;
  }
}

export async function fetchBookingDetails( bookingId ) {
  const path = BOOKING_DETAILS_API + `/${bookingId}`;
  const response = await easyGet({
    url: path,
  });
  if (response.done) {
    console.log(`${FILENAME} - Fetching booking details`, response.body);
    return response.body.data;
  } else {
    console.error(`${FILENAME} - Error in fetching booking details`);
    return null;
  }
}
