const FILENAME = 'userAuth.js';

import { easyPost } from './easyFetch';
import { ROLE_PATIENT, ROLE_TO_BACKEND } from '../config/constants';
import { ACCOUNTS_API_BASE } from '../config/apiPaths';

class UserAuthAPIClient {
  static async registerPatient({ patientInfo }) {
    console.log(FILENAME, 'registerPatient', 'start');

    return await easyPost({
      url: ACCOUNTS_API_BASE + '/sign-up',
      body: {
        ...patientInfo,
        'type': ROLE_TO_BACKEND[ROLE_PATIENT],
      },
    });
  }

  static async login({ email, password }) {
    console.log(FILENAME, 'login', 'start');

    return await easyPost({
      url: ACCOUNTS_API_BASE + '/login',
      body: {
        'email': email,
        'password': password,
      },
    });
  }

  static async privelegedLogin({ email, password }) {
    console.log(FILENAME, 'privelegedLogin', 'start');

    return await easyPost({
      url: ACCOUNTS_API_BASE + '/login',
      body: {
        'email': email,
        'password': password,
      },
    });
  }
}

export {
  UserAuthAPIClient,
};
