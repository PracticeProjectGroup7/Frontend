const FILENAME = 'stores/userAuth';

import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

const AUTH_TOKEN = 'auth_token';
const AUTH_INFO = 'auth_info';

import { USER_AUTH_STORE_NAME } from './storeNames';

import { UserAuthAPIClient } from '../api/userAuth';


const getItem = (name) => {
  return window.localStorage.getItem(name);
};

export const userAuthStore = defineStore(USER_AUTH_STORE_NAME, {
  state: () => {
    return {
      _loginToken: getItem(AUTH_TOKEN),
      _authInfo: getItem(AUTH_INFO) != null ? JSON.parse(getItem(AUTH_INFO)) : null,
      _intervalId: null,
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

    _clearIfExpired() {
      // console.log(FILENAME, 'clearIfExpired', 'checking');
      if (this._authInfo == null) {
        // console.log(FILENAME, 'clearIfExpired', 'no need to check');
        return;
      }

      const expireAt = this._authInfo['exp'] * 1000;

      if (expireAt > Date.now()) {
        // console.log(FILENAME, 'clearIfExpired', 'exp', this._authInfo['exp'], 'not expired');
        return;
      }

      // console.log(FILENAME, 'clearIfExpired', 'exp', this._authInfo['exp'], 'expired');

      this._setAuthToken(null);
      this._setauthInfo(null);
      this.logout();
    },

    initRefresh() {
      // console.log(FILENAME, 'initRefresh', 'start');
      this._intervalId = setInterval(() => {
        // console.log(FILENAME, 'initRefresh', 'reloading');
        this._loginToken = getItem(AUTH_TOKEN);
        this._authInfo = getItem(AUTH_INFO) != null ? JSON.parse(getItem(AUTH_INFO)) : null;

        // console.log(FILENAME, 'this._loginToken', this._loginToken);
        // console.log(FILENAME, 'this._authInfo', this._authInfo);

        this._clearIfExpired();
      }, 10_000);
    },

    async login({ email, password }) {
      console.log(FILENAME, 'login', 'start');

      const response = await UserAuthAPIClient.login({ email, password });

      if (response.done) {
        console.log('login', 'response.body.data.token', response.body.data.token);
        const token = jwtDecode(response.body.data.token);
        console.log('login', 'token', token);
        this._setAuthToken(response.body.data.token);
        this._setauthInfo(token);

        response.body['authInfo'] = token;
      }

      return response;
    },
  },
});
