
import { easyGet } from './easyFetch';
import { USER_PROFILE_API } from '../config/apiPaths';
const FILENAME = 'api/serviceCatalog';

export async function fetchUserProfileData() {
  const response = await easyGet({
    url: USER_PROFILE_API,
  });
  if (response.done) {
    console.log(`${FILENAME} - Fetching user profile`);
    return response.body.data;
  } else {
    console.error(`${FILENAME} - Error fetching user profile`);
    return null;
  }
}
