// get user when login
export const addUser = userData => {
  return {
    type: 'LOGIN',
    userData
  };
};
// for logout
export const logoutUser = () => {
  return {
    type: 'LOGOUT'
  };
};
// get all courses
export const addCourse = courses => {
  return {
    type: 'ADD_COURSE',
    courses
  };
};
// add bucker item
export const addBucket = (bucket, courseName) => {
  return {
    type: 'ADD_BUCKET',
    bucket,
    courseName
  };
};
// delete bucket item
export const deleteBucket = bucket => {
  return {
    type: 'DELETE_BUCKET',
    bucket
  }
}
// update bucket item
export const updateBucket = bucket => {
  return {
    type: 'UPDATE_BUCKET',
    bucket
  }
}
// to get current user via token
export const currentUser = (userData) => {
  return {
    type: "CURRENT_USER",
    userData
  }
}