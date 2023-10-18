function isPrivelegedUser(userRole) {
  return userRole == 'admin' || userRole == 'staff';
};


export {
  isPrivelegedUser,
};
