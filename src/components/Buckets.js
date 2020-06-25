import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import BucketCard from './BucketCard'
// import { Radio, Segment } from 'semantic-ui-react'
// import { sortNotes } from '../actions'

class Buckets extends Component {
  state = {}

  handleChange = (e, { value }) => {
    this.setState({ value })
    // this.props.sortNotes(value)
  }

  render() {
    if (!this.props.user.user){
      this.props.history.push('/login')
      return null
    }
    return (
      
      <div className="courses">
        <Navbar/>
     
        {this.props.buckets.map(bucket => <BucketCard bucket={bucket} key={bucket.id}/>)}
    
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    buckets: state.buckets,
    user: state.users
   }
}

export default connect(mapStateToProps)(Buckets)
