import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import MapBuckets from './MapBuckets'
import { Header } from 'semantic-ui-react'

class Buckets extends Component {
  state = {}

  handleChange = (e, { value }) => {
    this.setState({ value })

  }

  render() {
    if (!this.props.user.user){
      this.props.history.push('/login')
      return null
    }
    const newBuckets = this.props.buckets.map(b => {
      const course = this.props.courses.find(c => c.id === b.course_id)
      return {...b, course_lat: course.lat, course_lng: course.lng}
    })
    return (
      
      <div className="courses">
        <Navbar/>
        <Header inverted size='small'>Bucket List Courses</Header> 
        {/* {this.props.buckets.map(bucket => <BucketCard bucket={bucket} key={bucket.id}/>)} */}
        <MapBuckets buckets={newBuckets}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    buckets: state.buckets,
    user: state.users,
    courses: state.courses
   }
}

export default connect(mapStateToProps)(Buckets)
