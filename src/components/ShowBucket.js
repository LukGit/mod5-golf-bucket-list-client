import React, { Component } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { deleteBucket } from '../actions';
import { Divider, Header, Segment, Button, Grid, Message, Form, Modal, GridRow, Icon } from 'semantic-ui-react'



class ShowBucket extends Component {
  
  deleteThisBucket = (bucket) => {
    
    const NOTE_URL = `http://localhost:3000/buckets/${bucket.id}`
    fetch(NOTE_URL, {method: 'delete'})
      .then(resp => resp.json())
      .then(data => {
        this.props.history.push('/bucket')
        this.props.deleteBucket(data)
      })
  }


  render() {
    if (!this.props.user.user){
      this.props.history.push('/login')
      return null
    }
    const bucketSelect = this.props.buckets.find(bucket => bucket.id === parseInt(this.props.match.params.id))
    const linkedit = `/bucket/edit/${bucketSelect.id}`
    
    return (
      <div>
      <Navbar/>
      <Grid>
        <GridRow centered>
          <Segment style={{width: 800}} className="segmentT">
            <Header as='h3'> Course: {bucketSelect.course} {bucketSelect.played_on ? <Icon name="check circle"/> : null}</Header>
          </Segment>
          <Segment style={{width: 800}} inverted color="olive">
            <Header as='h3'> Played on: {bucketSelect.played_on ? bucketSelect.played_on : "Not played yet"}</Header>
          </Segment>
          <Segment style={{width: 800}} inverted color="olive">
            <Header as='h3'> Score: {bucketSelect.played_on ? bucketSelect.score : "No score"}</Header>
          </Segment>
          <Segment style={{width: 800}} inverted color="olive">
          {bucketSelect.played_on ?
            <Button onClick={() => this.deleteThisBucket(bucketSelect)} size='mini' inverted color="grey">
              <p>Remove</p>
            </Button> :
            <Link to={linkedit} size='mini'>
            <Button size='mini' inverted color="grey">
              <p>Check off</p>
            </Button>
          </Link>
           }
          </Segment> 
         
        </GridRow>
      </Grid>
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

export default connect(mapStateToProps)(ShowBucket)
