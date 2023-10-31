/*
To fetch the service catalog from the API:
*/
import { SERVICE_CATALOG_API } from '../config/apiPaths';
import { BOOKING_TYPE_DOCTOR } from '../config/constants';
import { easyGet, easyPost } from './easyFetch';
const FILENAME = 'api/serviceCatalog';

export async function fetchCatalog(bookingType) {
  const url = bookingType === BOOKING_TYPE_DOCTOR ? '/doctors' : '/lab-tests';
  const response = await easyGet({
    url: SERVICE_CATALOG_API + url,
  });
  if (response.done) {
    console.log(`${FILENAME} - Fetching service catalog`);
    return response.body.data.items;
  } else {
    console.error(`${FILENAME} - Error fetching service catalog`);
    return null;
  }
}
