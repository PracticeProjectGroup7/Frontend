const FILENAME = 'staffManagement.js';

import { easyPost, easyGet, easyDelete, easyPatch } from './easyFetch';
import { STAFF_MANAGEMENT_API_BASE, API_BASE_PATH } from '../config/apiPaths';


class StaffManagementAPIClient {
  static async deleteStaff(staffId) {
    return easyDelete({
      url: STAFF_MANAGEMENT_API_BASE + `/${staffId}`,
    });
  }

  static async getAllStuff({ from, size }) {
    let res = await easyGet({
      url: API_BASE_PATH + `/staff?page=${from+1}&pageSize=${size}`,
    });

    console.log(res.done, res.body.data.content);

    return res;
  }

  /**
   *
   * @param {String} staffId
   * @return {*}
   */
  static async getStaff(staffId) {
    return easyGet({
      url: API_BASE_PATH + `/staff/${staffId}`,
    });
  }

  static async newStaff({ newStaffInfo }) {
    console.log(FILENAME, 'newStaff', newStaffInfo);
    return await easyPost({
      url: STAFF_MANAGEMENT_API_BASE,
      body: {
        ...newStaffInfo,
      },
    });
  }

  /**
   *
   * @param {String} userId **NOT staffId**
   * @param {Object} staffInfoPatch
   */
  static async updateStaff(userId, staffInfoPatch) {
    return await easyPatch({
      url: API_BASE_PATH + `/staff/${userId}`,
      body: {
        ...staffInfoPatch,
      },
    });
  }
}

export {
  StaffManagementAPIClient,
};
