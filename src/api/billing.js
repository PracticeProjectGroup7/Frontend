const FILENAME = 'billing.js';

import { easyPost, easyGet, easyDelete, easyPatch } from './easyFetch';
import { BILL_MANAGEMENT_API_BASE } from '../config/apiPaths';


class BillingAPIClient {
  static async getBill(billId) {
    return easyGet({
      url: STAFF_MANAGEMENT_API_BASE + `/${staffId}`,
    });
  }

  static async updateBill(billId, { billDetailsPatch }) {
    return await easyPatch({
      url: STAFF_MANAGEMENT_API_BASE + `/${staffId}`,
      body: {
        ...staffInfoPatch,
      },
    });
  }
}

export {
  BillingAPIClient,
};
