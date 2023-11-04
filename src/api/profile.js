
import { easyGet, easyPatch } from './easyFetch';
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

export async function editUserProfileData( { userInfo } ) {
  const response = await easyPatch({
    url: USER_PROFILE_API,
    body: {
      ...userInfo,
    },
  });
  if (response.done) {
    console.log(`${FILENAME} - Edited user profile`);
  } else {
    console.error(`${FILENAME} - Error editing user profile`);
    return null;
  }
}
