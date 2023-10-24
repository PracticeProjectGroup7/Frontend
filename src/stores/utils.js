/**
 *
 * @param {Number} status a
 * @return {Number}
 */
function like4xx(status) {
  return (status / 100).toFixed(0) == 4;
};

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


export {
  like4xx, like5xx,

  commonHeaders,
};

