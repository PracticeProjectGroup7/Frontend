import { userAuthStore } from '../stores/userAuth';

/**
 * @param {Number} status HTTP Status Code
 * @return {Boolean}
 */
function like4xx(status) {
  return (status / 100).toFixed(0) == 4;
};

/**
 * @param {Number} status HTTP Status Code
 * @return {Boolean}
 */
function like5xx(status) {
  return (status / 100).toFixed(0) == 5;
};

const done = false;
let _userAuthStore = null;

function commonHeaders() {
  if (!done) {
    _userAuthStore = userAuthStore();
  }
  return {
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      ...(
        _userAuthStore.authToken == null ?
          {} :
          { 'Authorization': `Bearer ${_userAuthStore.authToken}` }
      ),
    },
  };
}

async function simplifyResponse(response) {
  if (response.status == 200) {
    let r = null;
    try {
      r = await response.json();
    } catch { }
    return { 'done': true, 'body': r };
  } else if (like4xx(response.status)) {
    let r = null;
    try {
      r = await response.json();
    } catch { }
    return { 'done': false, 'userError': true, 'body': r };
  } else {
    return { 'done': false, 'userError': false };
  }
}


export {
  like4xx, like5xx,
  simplifyResponse,

  commonHeaders,
};

