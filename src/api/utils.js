/**
 *
 * @param {Number} status HTTP Status Code
 * @return {Boolean}
 */
function like4xx(status) {
  return (status / 100).toFixed(0) == 4;
};

/**
 *
 * @param {Number} status HTTP Status Code
 * @return {Boolean}
 */
function like5xx(status) {
  return (status / 100).toFixed(0) == 5;
};

function commonHeaders() {
  return {
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

async function simplifyResponse(response) {
  if (response.status == 200) {
    const r = await response.json();
    return { 'done': true, 'body': r };
  } else if (like4xx(response.status)) {
    const r = await response.json();
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

