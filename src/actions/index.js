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
export const deleteBucket = bucket => {
  return {
    type: 'DELETE_BUCKET',
    bucket
  }
}
export const updateBucket = bucket => {
  return {
    type: 'UPDATE_BUCKET',
    bucket
  }
}
export const currentUser = (userData) => {
  return {
    type: "CURRENT_USER",
    userData
  }
}