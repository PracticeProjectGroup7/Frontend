
import { easyGet } from './easyFetch';
import { API_BASE_PATH } from '../config/apiPaths';
const FILENAME = 'api/serviceCatalog';

export async function fetchUserProfileData() {
  const url = '/api/v1/user/profile';
  const response = await easyGet({
    url: API_BASE_PATH + url,
  });
  if (response.done) {
    console.log(`${FILENAME} - Fetching user profile`);
    return response.body.data;
  } else {
    console.error(`${FILENAME} - Error fetching user profile`);
    return null;
  }
}
