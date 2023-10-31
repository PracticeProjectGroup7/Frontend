import { API_BASE_PATH } from '../config/apiPaths';
import { easyGet, easyPost } from './easyFetch';
const FILENAME = 'api/booking';

export async function fetchDoctorSlots(serviceId, selectedDate) {
  const path = `${API_BASE_PATH}/services/bookings/${serviceId}/schedules?date=${selectedDate}`;
  const response = await easyGet({
    url: path,
  });
  if (response.done) {
    console.log(`${FILENAME} - Fetching doctor slots`);
    return response.body.data.availableSlots;
  } else {
    console.error(`${FILENAME} - Error doctor slots`);
    return null;
  }
}

export async function bookServices({ bookingInfo }) {
  const url = '/services/booking';
  const response = await easyPost({
    url: API_BASE_PATH + url,
    body:
      {
        ...bookingInfo,
      },
  });
  if (response.done) {
    console.log(`${FILENAME} - Booking successful`, response.body);
  } else {
    console.error(`${FILENAME} - Error in booking`);
  }
}
