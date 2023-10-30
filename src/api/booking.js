import { API_BASE_PATH } from '../config/apiPaths';
import { easyGet } from './easyFetch';
const FILENAME = 'api/booking';

export async function fetchDoctorSlots(serviceId, selectedDate) {
  const path = `${API_BASE_PATH}/api/v1/services/bookings/${serviceId}/schedules?date=${selectedDate}`;
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
