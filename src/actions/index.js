export const addUser = userData => {
  return {
    type: 'LOGIN',
    userData
  };
};
export const logoutUser = () => {
  return {
    type: 'LOGOUT'
  };
};
export const addCourse = courses => {
  return {
    type: 'ADD_COURSE',
    courses
  };
};