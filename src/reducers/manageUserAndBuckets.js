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
    case "CURRENT_USER":
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
    case "CURRENT_USER":
      console.log("bucketReducer", action)
      const bucketCourses = action.userData.buckets.map((b, idex) => {
        const matchCourse = action.userData.courses.find(c => c.id === b.course_id)
        console.log("matched course =", matchCourse.name)
        return {...b, course: matchCourse.name}
      })
      // return [...action.userData.buckets]
      return bucketCourses
    case "LOGOUT":
        return []
    case "ADD_BUCKET":
        console.log("***add bucket", action)
        const newBucket = {...action.bucket, course: action.courseName}
        return state.concat(newBucket)
    case 'DELETE_BUCKET':
      const indexD = state.findIndex(bucket => bucket.id === action.bucket.id)
      return [
        ...state.slice(0, indexD),
        ...state.slice(indexD + 1)
        ]
     case 'UPDATE_BUCKET':
      const indexU = state.findIndex(bucket => bucket.id === action.bucket.id)
      const updatedBucket = {...action.bucket, course: state[indexU].course}
      return [
        ...state.slice(0, indexU),
        updatedBucket,
        ...state.slice(indexU + 1)
      ]
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