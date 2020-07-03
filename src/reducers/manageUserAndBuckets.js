import { combineReducers } from "redux";

// this combined reducer contains three redux store items
// users contains the logged in user info
// buckets contains the bucket items of the logged in user
// courses contains all the available golf courses
const rootReducer = combineReducers({
  users: usersReducer,
  buckets: bucketsReducer,
  courses: coursesReducer,
  foursomes: foursomesReducer
});

export default rootReducer;

function usersReducer(state = { user: '', userId: 0 }, action) {
  switch (action.type) {
    // when login and current_user return the username and id
    case "LOGIN":
    case "CURRENT_USER":
      return {
        user: action.userData.username,
        userId: action.userData.id
      }
    // when logout clear store
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
    // when login and current_user return all bucket items for the user
    case "LOGIN":
    case "CURRENT_USER":
    //  add course name to the store
      const bucketCourses = action.userData.buckets.map((b, idex) => {
        const matchCourse = action.userData.courses.find(c => c.id === b.course_id)
        return {...b, course: matchCourse.name}
      })
      return bucketCourses
    // when logout clear store
    case "LOGOUT":
        return []
    // when add_bucket attach new bucket plus ccourse name to store
    case "ADD_BUCKET":
        const newBucket = {...action.bucket, course: action.courseName}
        return state.concat(newBucket)
    // when delete_bucket find bucket deleted and remove from store
    case 'DELETE_BUCKET':
      const indexD = state.findIndex(bucket => bucket.id === action.bucket.id)
      return [
        ...state.slice(0, indexD),
        ...state.slice(indexD + 1)
        ]
    // when update_bucket find updated bucket and update store
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
    // then add_course return all courses to store
    case "ADD_COURSE":
      return [...action.courses]
    // when logout clear store
    case "LOGOUT":
        return []
    default:
      return state
  }
}

function foursomesReducer(state = [], action) {
  console.log("in foursome reducer", action)
  switch (action.type) {
    // when login and current_user return all foursome items for the user
    case "LOGIN":
    case "CURRENT_USER":
      console.log("in current user foursome reducer", action.foursomes)
      // return action.foursomes
    // when logout clear store
    case "LOGOUT":
      return []
    // when add_bucket attach new bucket plus ccourse name to store
    case "ADD_FOURSOME":
      return state.concat(action.foursome)
    // when delete_bucket find bucket deleted and remove from store
    case 'DELETE_FOURSOME':
      const indexD = state.findIndex(foursome => foursome.id === action.foursome.id)
      return [
        ...state.slice(0, indexD),
        ...state.slice(indexD + 1)
        ]
    // when update_bucket find updated bucket and update store
    case 'UPDATE_FOURSOME':
      const indexU = state.findIndex(foursome => foursome.id === action.foursome.id)
      return [
        ...state.slice(0, indexU),
        action.foursome,
        ...state.slice(indexU + 1)
      ]
    // then add_course return all courses to store
    case "ADD_ALL_FOUR":
      return [...action.foursomes]
    default:
      return state
  }
}