import { userAuthStore } from '../stores/userAuth';

/**
 * @param {Number} N Nxx
 * @return {Function}
 */
function _likeNxx(N) {
  return (status) => ((status / 100).toFixed(0) == N);
};

const like2xx = _likeNxx(2);
const like4xx = _likeNxx(4);
const like5xx = _likeNxx(5);

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
  if (like2xx(response.status)) {
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

