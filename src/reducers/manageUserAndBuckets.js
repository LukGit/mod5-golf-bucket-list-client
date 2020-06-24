import { combineReducers } from "redux";

const rootReducer = combineReducers({
  users: usersReducer,
  buckets: bucketsReducer,
  courses: coursesReducer
});

export default rootReducer;

function usersReducer(state = { user: '', userId: 0 }, action) {
  switch (action.type) {
    case "LOGIN":
      console.log("userReducer", action)
      return {
        user: action.userData.username,
        userId: action.userData.id
      }
    case "LOGOUT":
      return {
        user: '',
        userId: 0
      }
    default:
      return state
  }
}

function bucketsReducer(state = [], action) {
  switch (action.type) {
    case "LOGIN":
      console.log("bucketReducer", action)
      const bucketCourses = action.userData.buckets.map((b, idex) => {
        return {...b, course: action.userData.courses[idex].name}
      })
      // return [...action.userData.buckets]
      return bucketCourses
    case "LOGOUT":
        return []
    default:
      return state
  }
}

function coursesReducer(state = [], action) {
  switch (action.type) {
    case "ADD_COURSE":
      console.log("courseReducer", action)
      return [...action.courses]
    case "LOGOUT":
        return []
    default:
      return state
  }
}