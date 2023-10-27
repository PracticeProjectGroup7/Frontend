const FILENAME = 'userAuth.js';

import { easyPost } from './easyFetch';
import { ROLE_PATIENT, ROLE_TO_BACKEND } from '../config/constants';

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
    return await easyPost({
      url: ACCOUNTS_API_BASE + '/login',
      body: {
        'email': email,
        'password': password,
      },
    });
  }

  static async privelegedLogin({ email, password }) {
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
