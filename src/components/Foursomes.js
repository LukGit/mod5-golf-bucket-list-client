import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import ShowFoursome from './ShowFoursome'
import { Header, Icon, Grid } from 'semantic-ui-react'

class Foursomes extends Component {
  state = {
    foursomes: []
  }

  componentDidMount () {
    this.setState({
      foursomes: this.props.foursomes
    })
  }
  // handleChange = (e, { value }) => {
  //   this.setState({ value })

  // }

  // this shows the NavBar and the MapBuckets which is also passed the bucket items to display on map
  render() {
    if (!this.props.user.user){
      this.props.history.push('/login')
      return null
    }
    // the bucket items are modified to include the course clubhouse gps
    // const newBuckets = this.props.buckets.map(b => {
    //   const course = this.props.courses.find(c => c.id === b.course_id)
    //   return {...b, course_lat: course.lat, course_lng: course.lng}
    // })
    return (
      
      <div className="courses">
        <Navbar/>
        <Header inverted size='medium'> 
        <Icon name='bitbucket square'/>
        {this.props.user.user}, Here are the foursomes!
        </Header> 
        {/* {this.props.buckets.map(bucket => <BucketCard bucket={bucket} key={bucket.id}/>)} */}
        <Grid columns="4">
        {this.state.foursomes.map(fSome => {
          return <ShowFoursome foursome={fSome}/>
        })}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    foursomes: state.foursomes,
    user: state.users
   }
}

export default connect(mapStateToProps)(Foursomes)
