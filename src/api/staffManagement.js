const FILENAME = 'staffManagement.js';

import { easyPost, easyGet, easyDelete, easyPatch } from './easyFetch';
import { STAFF_MANAGEMENT_API_BASE } from '../config/apiPaths';


class StaffManagementAPIClient {
  static async deleteStaff(staffId) {
    return easyDelete({
      url: STAFF_MANAGEMENT_API_BASE + `/${staffId}`,
    });
  }

  static async getStaff(staffId) {
    return easyGet({
      url: STAFF_MANAGEMENT_API_BASE + `/${staffId}`,
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

  static async updateStaff(staffId, { staffInfoPatch }) {
    return await easyPatch({
      url: STAFF_MANAGEMENT_API_BASE + `/${staffId}`,
      body: {
        ...staffInfoPatch,
      },
    });
  }
}

export {
  StaffManagementAPIClient,
};
