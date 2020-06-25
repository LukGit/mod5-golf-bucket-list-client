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
export const addBucket = (bucket, courseName) => {
  return {
    type: 'ADD_BUCKET',
    bucket,
    courseName
  };
};