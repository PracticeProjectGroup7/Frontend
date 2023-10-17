import { defineStore } from 'pinia';

import { API_BASE_PATH } from '../config';

const FILENAME = 'stores/userAuth';


const AUTH_TOKEN = 'auth_token';
const AUTH_INFO = 'auth_info';

import { USER_AUTH_STORE_NAME } from './index';

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

    async getLoginToken() {
      console.log(FILENAME, 'getLoginToken', 'start');

      try {
        const response = await fetch(ACCOUNTS_API_BASE + '/login', {
          ...this._commonHeaders(),
        });
        const r = await response.json();

        return r['response']['csrf_token'];
      } catch (error) {
        console.error(FILENAME, error, 'getLoginToken');
        return error;
      }
    },


    // async getSignupToken() {
    //   console.log(FILENAME, 'getSignupToken', 'start');

    //   try {
    //     let response = await fetch(ACCOUNTS_API_BASE + '/register', {
    //       ...this._commonHeaders(),
    //     });
    //     let r = await response.json();

    //     return r['response']['csrf_token'];
    //   } catch (error) {
    //     console.error(FILENAME, error, 'getLoginToken');
    //     return error;
    //   }
    // },

    async login(email, password) {
      console.log(FILENAME, 'login', 'start');

      // if (this._csrfToken == null) {
      //   try {
      //     this._csrfToken = await this.getLoginToken();
      //   } catch (e) {
      //     return { 'done': false, 'user_error': false };
      //   }
      // }

      try {
        const response = await fetch(ACCOUNTS_API_BASE + '/login?include_auth_token=true', {
          method: 'POST',
          ...this._commonHeaders(),
          body: JSON.stringify({
            'email': email,
            'password': password,
          }),
        });

        if (response.status == 200) {
          const r = await response.json();
          this._setAuthToken(r['response']['user']['authentication_token']);
          return { 'done': true };
        } else if (response.status == 400) {
          return { 'done': false, 'user_error': true };
        } else {
          return { 'done': false, 'user_error': false };
        }
      } catch (error) {
        console.log(FILENAME, error);
        return { 'done': false, 'user_error': false };
      }
    },

    async privelegedLogin(email, password) {
      console.log(FILENAME, 'login', 'start');

      // if (this._csrfToken == null) {
      //   try {
      //     this._csrfToken = await this.getLoginToken();
      //   } catch (e) {
      //     return { 'done': false, 'user_error': false };
      //   }
      // }

      try {
        const response = await fetch(ACCOUNTS_API_BASE + '/login?include_auth_token=true', {
          method: 'POST',
          ...this._commonHeaders(),
          body: JSON.stringify({
            'email': email,
            'password': password,
          }),
        });

        if (response.status == 200) {
          const r = await response.json();
          this._setAuthToken(r['response']['user']['authentication_token']);
          return { 'done': true };
        } else if (response.status == 400) {
          return { 'done': false, 'user_error': true };
        } else {
          return { 'done': false, 'user_error': false };
        }
      } catch (error) {
        console.log(FILENAME, error);
        return { 'done': false, 'user_error': false };
      }
    },

    async signup(email, password, name) {
      console.log(FILENAME, 'signup', 'start');

      // if (this._csrfToken == null) {
      //   try {
      //     this._csrfToken = await this.getSignupToken();
      //   } catch (error) {
      //     return { 'done': false, 'user_error': false };
      //   }
      // }

      try {
        const response = await fetch(ACCOUNTS_API_BASE + '/register?include_auth_token=true', {
          method: 'POST',
          ...this._commonHeaders(),
          body: JSON.stringify({
            'email': email,
            'password': password,
            'name': name,
          }),
        });

        if (response.status == 200) {
          const _r = await response.json();
          return { 'done': true };
        } else if (response.status == 400) {
          return { 'done': false, 'user_error': true };
        } else {
          return { 'done': false, 'user_error': false };
        }
      } catch (error) {
        return { 'done': false, 'user_error': false };
      }
    },

    _commonHeaders() {
      return {
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      };
    },
  },
});
