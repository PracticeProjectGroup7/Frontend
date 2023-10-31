const FILENAME = 'patientManagement.js';

import { easyPost, easyGet, easyDelete, easyPatch } from './easyFetch';
import { STAFF_MANAGEMENT_API_BASE, API_BASE_PATH } from '../config/apiPaths';


class PatientManagementAPIClient {
  static async deletePatient(patientId) {
    return easyDelete({
      url: STAFF_MANAGEMENT_API_BASE + `/${patientId}`,
    });
  }

  static async getAllStuff({ from, size }) {
    let res = await easyGet({
      url: API_BASE_PATH + `/patients?page=${from+1}&pageSize=${size}`,
    });

    console.log(res.done, res.body.data.items);
    if (res.done && res.body.data.items) {
      for (let i = 0; i < res.body.data.items.length; i++) {
        res.body.data.items[i]['firstName'] = res.body.data.items[i]['firstname'];
      }
    }

    return res;
  }

  /**
   *
   * @param {String} patientId
   * @return {*}
   */
  static async getPatient(patientId) {
    return easyGet({
      url: API_BASE_PATH + `/patient/${patientId}`,
    });
  }

  static async newPatient({ newPatientInfo }) {
    console.log(FILENAME, 'newPatient', newPatientInfo);
    return await easyPost({
      url: STAFF_MANAGEMENT_API_BASE,
      body: {
        ...newPatientInfo,
      },
    });
  }

  /**
   *
   * @param {String} userId **NOT patientId**
   * @param {Object} patientInfoPatch
   */
  static async updatePatient(userId, patientInfoPatch) {
    return await easyPatch({
      url: API_BASE_PATH + `/patient/${userId}`,
      body: {
        ...patientInfoPatch,
      },
    });
  }
}

export {
  PatientManagementAPIClient,
};
