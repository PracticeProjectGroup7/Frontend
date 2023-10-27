const FILENAME = 'stores/userAuth';

import { defineStore } from 'pinia';

const AUTH_TOKEN = 'auth_token';
const AUTH_INFO = 'auth_info';

import { USER_AUTH_STORE_NAME } from './storeNames';

import { UserAuthAPIClient } from '../api/userAuth';

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

    async login({ email, password }) {
      console.log(FILENAME, 'login', 'start');

      const resposne = await UserAuthAPIClient.login({ email, password });

      if (resposne.done) {
        // TODO STORE
      }

      return resposne;
    },
  },
});
