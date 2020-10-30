import { combineReducers } from "redux";

// this combined reducer contains four redux store items
// users contains the logged in user info
// buckets contains the bucket items of the logged in user
// courses contains all the available golf courses 
// foursomes contains all the foursomes created by users
const rootReducer = combineReducers({
  users: usersReducer,
  buckets: bucketsReducer,
  courses: coursesReducer,
  foursomes: foursomesReducer
});

export default rootReducer;

function usersReducer(state = { user: '', userId: 0, email: '', handicap: 0 }, action) {
  switch (action.type) {
    // when login and current_user return the username and id
    case "LOGIN":
    case "CURRENT_USER":
      return {
        user: action.userData.username,
        userId: action.userData.id,
        email: action.userData.email,
        handicap: action.userData.handicap,
        clubs: action.userData.clubs
      }
    case 'UPDATE_USER':
      // return [action.userProfile]
      return {
        user: action.userProfile.username,
        userId: action.userProfile.id,
        email: action.userProfile.email,
        handicap: action.userProfile.my_handicap
      }
    // when logout clear store
    case "LOGOUT":
      return {
        user: '',
        userId: 0
      }
    case "ADD_CLUBS":
      //add clubs to user in store
      let newUserClubs = [{club1: action.clubsUser.clubs.club_1, club1Carry: action.clubsUser.clubs.club1_carry,
        club2: action.clubsUser.clubs.club_2, club2Carry: action.clubsUser.clubs.club2_carry,
        club3: action.clubsUser.clubs.club_3, club3Carry: action.clubsUser.clubs.club3_carry,
        club4: action.clubsUser.clubs.club_4, club4Carry: action.clubsUser.clubs.club4_carry,
        club5: action.clubsUser.clubs.club_5, club5Carry: action.clubsUser.clubs.club5_carry,
        club6: action.clubsUser.clubs.club_6, club6Carry: action.clubsUser.clubs.club6_carry,
        club7: action.clubsUser.clubs.club_7, club7Carry: action.clubsUser.clubs.club7_carry,
        club8: action.clubsUser.clubs.club_8, club8Carry: action.clubsUser.clubs.club8_carry,
        club9: action.clubsUser.clubs.club_9, club9Carry: action.clubsUser.clubs.club9_carry,
        club10: action.clubsUser.clubs.club_10, club10Carry: action.clubsUser.clubs.club10_carry,
        club11: action.clubsUser.clubs.club_11, club11Carry: action.clubsUser.clubs.club11_carry,
        club12: action.clubsUser.clubs.club_12, club12Carry: action.clubsUser.clubs.club12_carry,
        club13: action.clubsUser.clubs.club_13, club13Carry: action.clubsUser.clubs.club13_carry}]
      console.log("add club payload", newUserClubs)
      return {
        user: this.props.users.user,
        userId: this.props.users.userId,
        email: this.props.users.email,
        handicap: this.props.users.handicap,
        clubs: newUserClubs
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
    // case "LOGIN":
    // case "CURRENT_USER":
    //   console.log("in current user foursome reducer", action.foursomes)
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