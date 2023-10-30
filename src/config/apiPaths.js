// import { API_BASE_PATH } from '../config';
const API_BASE_PATH = 'http://localhost:9000';

const ACCOUNTS_API_BASE = API_BASE_PATH + '/api/v1/auth';
const STAFF_MANAGEMENT_API_BASE = API_BASE_PATH + '/api/v1/hospital-staff';

const SERVICE_CATALOG_API = API_BASE_PATH + '/api/v1/available-services';

export {
  API_BASE_PATH,
  ACCOUNTS_API_BASE,
  STAFF_MANAGEMENT_API_BASE,
  SERVICE_CATALOG_API,
};
