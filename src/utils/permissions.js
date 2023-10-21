import { ROLE_PATIENT, ROLE_STAFF, ROLE_DOCTOR, ROLE_ADMIN } from '../config/constants';

function isPrivilegedUser(userRole) {
  return userRole == ROLE_ADMIN || userRole == ROLE_STAFF || userRole == ROLE_DOCTOR;
};

/**
 * @param {String} userRole
 * @param {Set} allowedRoles
 * @return {Boolean}
 */
function isAllowed(userRole, allowedRoles) {
  return allowedRoles.has(userRole);
}

export {
  isPrivilegedUser,
};
