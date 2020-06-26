import React, { Component } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { deleteBucket } from '../actions';
import { Header, Segment, Button, Grid, Input, Form, Modal, GridRow, Icon } from 'semantic-ui-react'



class ShowBucket extends Component {
  
  deleteThisBucket = (bucket) => {
    const BUCKET_URL = `http://localhost:3000/buckets/${bucket.id}`
    console.log("delete link is", BUCKET_URL)
    fetch(BUCKET_URL, {method: 'delete'})
      .then(resp => resp.json())
      .then(data => {
        this.props.history.push('/buckets')
        this.props.deleteBucket(data)
      })
  }
  
  render() {
    if (!this.props.user.user){
      this.props.history.push('/login')
      return null
    }
    const bucketSelect = this.props.buckets.find(bucket => bucket.id === parseInt(this.props.match.params.id))
    const linkedit = `/buckets/edit/${bucketSelect.id}`
    let played
    
    let fmtDate
    if (bucketSelect.played_on){
      played = true
      const date = new Date(bucketSelect.played_on)
      fmtDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()
    } else {
      played = false
    } 

    
    
    return (
      <div>
      <Navbar/>
      <Grid>
        <GridRow centered>
          <Segment style={{width: 800}} className="segmentT">
            <Header as='h3'> Course: {bucketSelect.course} {bucketSelect.played_on ? <Icon name="check circle"/> : null}</Header>
          </Segment>
          <Segment style={{width: 800}} inverted color="olive">
            <Header as='h3'> Played on: {bucketSelect.played_on ? fmtDate : "Not played yet"}</Header>
          </Segment>
          <Segment style={{width: 800}} inverted color="olive">
            <Header as='h3'> Score: {bucketSelect.played_on ? bucketSelect.score : "No score"}</Header>
          </Segment>
          <Segment style={{width: 800}} inverted color="olive">
          
            <Button onClick={() => this.deleteThisBucket(bucketSelect)} size='mini' inverted color="grey" disabled={played}>
              <p>Remove</p>
            </Button>
            {!played ?
            <Link to={linkedit} size='mini' >
            <Button size='mini' inverted color="grey">
              <p>Check off</p>
            </Button>
            
            </Link> : null            
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

export default connect(mapStateToProps, {deleteBucket})(ShowBucket)
