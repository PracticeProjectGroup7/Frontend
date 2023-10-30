/*
To fetch the service catalog from the API:
*/
import { SERVICE_CATALOG_API } from '../config/apiPaths';
import { BOOKING_TYPE_DOCTOR } from '../config/constants';
import { easyGet, easyPost } from './easyFetch';
const FILENAME = 'api/serviceCatalog';

export async function fetchCatalog(bookingType) {
  /* await easyPost(
    {
      url: 'http://localhost:9000/api/v1/hospital-staff',
      body: {
        'email': 'dummy583@yopmail.com',
        'firstName': 'Sherlockhh',
        'lastName': 'Holmes',
        'gender': 'F',
        'phoneNumber': '986965432',
        'nric': 'S6524412G',
        'address': '123 sesame street',
        'dateOfBirth': '2001-01-01',
        'role': 'DOCTOR',
        'specialty': 'ONCOLOGY',
        'consultationFees': 26.50,
        'yearsOfExperience': 4,
        'password': '12345abcdA!!%b',
      },
    },
  ); */
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
