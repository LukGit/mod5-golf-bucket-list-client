import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import MapBuckets from './MapBuckets'
import { Header, Icon } from 'semantic-ui-react'

class Buckets extends Component {
  state = {}

  handleChange = (e, { value }) => {
    this.setState({ value })

  }

  // this shows the NavBar and the MapBuckets which is also passed the bucket items to display on map
  render() {
    if (!this.props.user.user){
      this.props.history.push('/login')
      return null
    }
    // the bucket items are modified to include the course clubhouse gps
    const newBuckets = this.props.buckets.map(b => {
      const course = this.props.courses.find(c => c.id === b.course_id)
      return {...b, course_lat: course.lat, course_lng: course.lng}
    })
    return (
      
      <div className="courses">
        <Navbar/>
        <Header inverted size='medium'> 
        <Icon name='bitbucket square'/>
        {this.props.user.user}, {this.props.buckets.length > 0 ? "Your Bucket List Courses!" : "No Course in Your Bucket!"}
        </Header> 
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
