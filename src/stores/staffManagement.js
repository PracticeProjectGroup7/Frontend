const FILENAME = 'stores/staffManagement';

import { defineStore } from 'pinia';

import { STAFF_MANAGEMENT_API_BASE } from '../config/apiPaths';

import { STAFF_MANAGEMENT_STORE_NAME } from './storeNames';
import { ROLE_PATIENT, ROLE_TO_BACKEND } from '../config/constants';

import { like4xx, like5xx, commonHeaders } from './utils';

export const staffManagementStore = defineStore(STAFF_MANAGEMENT_STORE_NAME, {
  state: () => {
    return {};
  },
  getters: {},

  actions: {
    async deleteStaff(staffId) {
      const fnName = 'deleteStaff';
      console.log(FILENAME, fnName, 'start');

      try {
        const response = await fetch(STAFF_MANAGEMENT_API_BASE + `/${staffId}`, {
          method: 'DELETE',
          ...commonHeaders(),
        });

        if (response.status == 200) {
          const _r = await response.json();
          console.log(FILENAME, fnName, 'response 200', _r);
          return { 'done': true };
        } else if (like4xx(response.status)) {
          const r = await response.json();
          console.log(FILENAME, fnName, 'response 400', r);
          return { 'done': false, 'user_error': true, 'errorMessage': r['errorMessage'] };
        } else {
          console.log(FILENAME, fnName, 'end');
          return { 'done': false, 'user_error': false };
        }
      } catch (error) {
        console.log(FILENAME, fnName, error);
        return { 'done': false, 'user_error': false };
      }
    },


    async getStaff(staffId) {
      const fnName = 'getStaff';
      console.log(FILENAME, fnName, 'start');

      try {
        const response = await fetch(ACCOUNTS_API_BASE + `/${staffId}`, {
          method: 'GET',
          ...commonHeaders(),
        });

        if (response.status == 200) {
          const _r = await response.json();
          console.log(FILENAME, fnName, 'response 200', _r);
          return { 'done': true };
        } else if (like4xx(response.status)) {
          const r = await response.json();
          console.log(FILENAME, fnName, 'response 400', r);
          return { 'done': false, 'user_error': true, 'errorMessage': r['errorMessage'] };
        } else {
          console.log(FILENAME, fnName, 'end');
          return { 'done': false, 'user_error': false };
        }
      } catch (error) {
        console.log(FILENAME, fnName, error);
        return { 'done': false, 'user_error': false };
      }
    },

    async newStaff({ staffInfo }) {
      const fnName = 'getStaff';
      console.log(FILENAME, fnName, 'start');

      try {
        const response = await fetch(STAFF_MANAGEMENT_API_BASE, {
          method: 'POST',
          ...commonHeaders(),
          body: {
            ...staffInfo,
          },
        });

        if (response.status == 200) {
          const _r = await response.json();
          console.log(FILENAME, fnName, 'response 200', _r);
          return { 'done': true };
        } else if (like4xx(response.status)) {
          const r = await response.json();
          console.log(FILENAME, fnName, 'response 400', r);
          return { 'done': false, 'user_error': true, 'errorMessage': r['errorMessage'] };
        } else {
          console.log(FILENAME, fnName, 'end');
          return { 'done': false, 'user_error': false };
        }
      } catch (error) {
        console.log(FILENAME, fnName, error);
        return { 'done': false, 'user_error': false };
      }
    },

    async updateStaff(staffId, { staffInfoPatch }) {
      const fnName = 'deletePatient';
      console.log(FILENAME, fnName, 'start');

      try {
        const response = await fetch(STAFF_MANAGEMENT_API_BASE + `/${staffId}`, {
          method: 'PATCH',
          ...commonHeaders(),
          body: {
            ...staffInfoPatch,
          },
        });

        if (response.status == 200) {
          const _r = await response.json();
          console.log(FILENAME, fnName, 'response 200', _r);
          return { 'done': true };
        } else if (like4xx(response.status)) {
          const r = await response.json();
          console.log(FILENAME, fnName, 'response 400', r);
          return { 'done': false, 'user_error': true, 'errorMessage': r['errorMessage'] };
        } else {
          console.log(FILENAME, fnName, 'end');
          return { 'done': false, 'user_error': false };
        }
      } catch (error) {
        console.log(FILENAME, fnName, error);
        return { 'done': false, 'user_error': false };
      }
    },

  },
});
