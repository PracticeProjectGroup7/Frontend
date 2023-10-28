import { commonHeaders, simplifyResponse } from './utils';


async function _easyWithBody(method, url, body) {
  try {
    const response = await fetch(url, {
      method: method,
      ...commonHeaders(),
      body: JSON.stringify(body),
    });
    return simplifyResponse(response);
  } catch (error) {
    return { 'done': false, 'userError': false };
  }
}

async function _easyWithoutBody(method, url) {
  try {
    const response = await fetch(url, {
      method: method,
      ...commonHeaders(),
    });
    return simplifyResponse(response);
  } catch (error) {
    return { 'done': false, 'userError': false };
  }
}

async function easyPost({ url, body }) {
  return _easyWithBody('POST', url, body);
};

async function easyPatch({ url, body }) {
  return _easyWithBody('PATCH', url, body);
};

async function easyGet({ url }) {
  return _easyWithoutBody('GET', url);
};

async function easyDelete({ url }) {
  return _easyWithoutBody('DELETE', url);
};


export {
  easyPost,
  easyGet,
  easyPatch,
  easyDelete,
};
