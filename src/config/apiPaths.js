import { API_BASE_PATH } from '../config';


const ACCOUNTS_API_BASE = API_BASE_PATH + '/auth';
const STAFF_MANAGEMENT_API_BASE = API_BASE_PATH + '/hospital-staff';

const BILL_MANAGEMENT_API_BASE = API_BASE_PATH + '/admin/bills';

const SERVICE_CATALOG_API = API_BASE_PATH + '/available-services';

const USER_PROFILE_API = API_BASE_PATH + '/user/profile';

export {
  API_BASE_PATH,
  ACCOUNTS_API_BASE,
  STAFF_MANAGEMENT_API_BASE,
  SERVICE_CATALOG_API,

  BILL_MANAGEMENT_API_BASE,
  USER_PROFILE_API,
};
