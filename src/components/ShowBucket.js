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

  sendEmail = (event, bucket) => {
    event.preventDefault()
    
    const serviceID = 'ivan.luk028@gmail.com'
    const templateID = 'luk_email_for_react'
    let fmtD 
    const date1 = new Date(bucket.played_on)
    fmtD = (date1.getMonth() + 1) + '/' + date1.getDate() + '/' +  date1.getFullYear()
    const content = `I played ${bucket.course} on ${fmtD} and my score was ${bucket.score}!`
    const templateParams = {
      to: this.state.email,
      subject: bucket.course,
      html: content
    }
    this.setState({
        email: '',
        emailSuccess: true
      })
    
    window.emailjs.send(
      serviceID, templateID, 
      templateParams
      ).then(res => {
        console.log('Email successfully sent!')
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }

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
            
            </Link> : 
             <Segment raised inverted color="grey">
             <Form onSubmit={(event) => this.sendEmail(event, bucketSelect)}>
             <Form.Group widths='equal' inline>
               <Form.Input label="E-mail Address" onChange={this.handleChange} type='text' value={this.state.email} />
               <Form.Input inverted type='submit' value='Share'/>
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
