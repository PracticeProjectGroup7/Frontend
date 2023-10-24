const FILENAME = 'stores/userAuth';

import { defineStore } from 'pinia';

import { ACCOUNTS_API_BASE } from '../config/apiPaths';

const AUTH_TOKEN = 'auth_token';
const AUTH_INFO = 'auth_info';

import { USER_AUTH_STORE_NAME } from './storeNames';
import { ROLE_PATIENT, ROLE_TO_DISPLAY } from '../config/constants';

import { like4xx, like5xx, commonHeaders } from './utils';

export const userAuthStore = defineStore(USER_AUTH_STORE_NAME, {
  state: () => {
    return {
      _loginToken: window.localStorage.getItem(AUTH_TOKEN),
      _authInfo: window.localStorage.getItem(AUTH_INFO) != null ? JSON.parse(window.localStorage.getItem(AUTH_INFO)) : null,
      _csrfToken: null,
    };
  },
  getters: {
    loggedIn(state) {
      console.log(FILENAME, 'loggedIn', state._loginToken, state._loginToken != null);
      return state._loginToken != null;
    },
    authInfo(state) {
      return state._authInfo;
    },
    authToken(state) {
      return state._loginToken;
    },
  },

  actions: {
    _setAuthToken(token) {
      this._loginToken = token;
      window.localStorage.setItem(AUTH_TOKEN, token);
    },

    _setauthInfo(info) {
      this._authInfo = info;
      window.localStorage.setItem(AUTH_INFO, JSON.stringify(this._authInfo));
    },

    logout() {
      window.localStorage.removeItem(AUTH_INFO);
      window.localStorage.removeItem(AUTH_TOKEN);
      this._loginToken = null;
      this._authInfo = null;
    },

    async checkUserState(component) {
      console.log(FILENAME, 'checkUserState', 'start');

      if (component == null || component == undefined) {
        return;
      }

      if (!this.loggedIn) {
        if (component.$router && component.$router.push) {
          component.$router.push('/login');
        }
      }

      console.log(FILENAME, 'checkUserState', 'end');
    },

    async login({ email, password }) {
      console.log(FILENAME, 'login', 'start');

      try {
        const response = await fetch(ACCOUNTS_API_BASE + '/login', {
          method: 'POST',
          ...commonHeaders(),
          body: JSON.stringify({
            'email': email,
            'password': password,
          }),
        });

        if (response.status == 200) {
          const r = await response.json();
          console.log(FILENAME, 'login', 'response 300', _r);
          this._setAuthToken(r['response']['user']['authentication_token']);
          return { 'done': true };
        } else if (like4xx(response.status)) {
          const r = await response.json();
          console.log(FILENAME, 'login', 'response 400', _r);
          return { 'done': false, 'user_error': true, 'errorMessage': _r['errorMessage'] };
        } else {
          return { 'done': false, 'user_error': false };
        }
      } catch (error) {
        console.log(FILENAME, error);
        return { 'done': false, 'user_error': false };
      }
    },

    async registerPatient({ patientInfo }) {
      console.log(FILENAME, 'registerPatient', 'start');

      try {
        const response = await fetch(ACCOUNTS_API_BASE + '/sign-up', {
          method: 'POST',
          ...commonHeaders(),
          body: JSON.stringify({
            ...patientInfo,
            'type': ROLE_TO_DISPLAY[ROLE_PATIENT],
          }),
        });

        if (response.status == 200) {
          const _r = await response.json();
          console.log(FILENAME, 'registerPatient', 'response', _r);
          return { 'done': true };
        } else if (like4xx(response.status)) {
          const _r = await response.json();
          console.log(FILENAME, 'registerPatient', 'response', _r);
          return { 'done': false, 'user_error': true, 'errorMessage': _r['errorMessage'] };
        } else {
          return { 'done': false, 'user_error': false };
        }
      } catch (error) {
        return { 'done': false, 'user_error': false };
      }
    },
  },
});
