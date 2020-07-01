import React, { Component } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { deleteBucket } from '../actions';
import { Header, Segment, Button, Grid, Form, Modal, GridRow, Icon, Label } from 'semantic-ui-react'



class ShowBucket extends Component {
  state = {
    email: "",
    emailSuccess: false
  }
  
  handleChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  // this function is to send email via EmailJS service
  sendEmail = (event, bucket) => {
    event.preventDefault()
    
    const serviceID = 'ivan.luk028@gmail.com'
    const templateID = 'luk_email_for_react'
    let fmtD 
    const date1 = new Date(bucket.played_on)
    fmtD = (date1.getMonth() + 1) + '/' + date1.getDate() + '/' +  date1.getFullYear()
    const content = `I played ${bucket.course} on ${fmtD} and my score was ${bucket.score}!`
    // this object contains dynamic variables on EmailJS template
    // to: destination email address(es)
    // subject: subkect of email
    // html: content of email
    // from: sender name
    const templateParams = {
      to: this.state.email,
      subject: bucket.course,
      html: content,
      from: this.props.user.user
    }
    this.setState({
        email: '',
        emailSuccess: true
      })
    
    // sends email via emailjs
    window.emailjs.send(
      serviceID, templateID, 
      templateParams
      ).then(res => {
        console.log('Email successfully sent!')
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }

  // this fucntion delete a bucket item from bucket list
  deleteThisBucket = (bucket) => {
    const BUCKET_URL = `http://localhost:3000/buckets/${bucket.id}`
    console.log("delete link is", BUCKET_URL)
    const reqObj = {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    fetch(BUCKET_URL, reqObj)
      .then(resp => resp.json())
      .then(data => {
        this.props.history.push('/buckets')
        this.props.deleteBucket(data)
      })
  }

  // this function sent the state so that the modal will close
  closeModal = () => {
    this.setState({
      emailSuccess: false
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
    
    // this is to check if the bucket course has been played
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
      {/* display modal after email sent. click ok to change state which closes modal */}
      {this.state.emailSuccess ? 
      <Modal open={this.state.emailSuccess} basic size='tiny'>
        <Label>email sent</Label>
        <Modal.Actions>
        <Button size='mini' inverted color='grey' onClick={this.closeModal}>
          OK
        </Button>
        </Modal.Actions>
      </Modal> : null}
      <Grid>
        <GridRow centered>
          <Segment style={{width: 650}} className="segmentT">
            <Header as='h3'> Course: {bucketSelect.course} {bucketSelect.played_on ? <Icon name="check circle"/> : null}</Header>
          </Segment>
          <Segment style={{width: 650}} inverted color="olive">
            <Header as='h3'> Played on: {bucketSelect.played_on ? fmtDate : "Not played yet"}</Header>
          </Segment>
          <Segment style={{width: 650}} inverted color="olive">
            <Header as='h3'> Score: {bucketSelect.played_on ? bucketSelect.score : "No score"}</Header>
          </Segment>
          <Segment style={{width: 650}} inverted color="olive">
            {/* disable the remove button if course is alreadt played */}
            <Button onClick={() => this.deleteThisBucket(bucketSelect)} size='mini' inverted color="grey" disabled={played}>
              <p>Remove</p>
            </Button>
            {/* display checkoff button only if course is not played. Otherwise show email form */}
            {!played ?
            <Link to={linkedit} size='mini' >
            <Button size='mini' inverted color="grey">
              <p>Check off</p>
            </Button>
            
            </Link> : 
             <Segment raised inverted color="olive">
             <Form onSubmit={(event) => this.sendEmail(event, bucketSelect)}>
             <Form.Group widths='equal' inline>
               <Form.Input placeholder="E-mail Addresses" onChange={this.handleChange} type='text' value={this.state.email} />
               <Form.Input type='submit' value='Share'/>
             </Form.Group>
             </Form>
           </Segment>           
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
