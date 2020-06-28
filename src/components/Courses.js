// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import Navbar from './Navbar';
// import CourseCard from './CourseCard'
// // import { Radio, Segment } from 'semantic-ui-react'
// // import { sortNotes } from '../actions'

// class Courses extends Component {
//   state = {}

//   handleChange = (e, { value }) => {
//     this.setState({ value })
//     // this.props.sortNotes(value)
//   }

//   render() {
//     if (!this.props.user.user){
//       this.props.history.push('/login')
//       return null
//     }
//     return (
      
//       <div className="courses">
//         <Navbar/>
     
//         {this.props.courses.map(course => <CourseCard course={course} key={course.id}/>)}
    
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return { 
//     courses: state.courses,
//     user: state.users
//    }
// }

// export default connect(mapStateToProps)(Courses)
