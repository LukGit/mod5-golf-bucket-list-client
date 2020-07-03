import React, { Component } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { deleteBucket } from '../actions';
import { addFoursome } from '../actions'
import { Header, Segment, Button, Grid, Form, Modal, GridRow, Icon, Label } from 'semantic-ui-react'



class ShowBucket extends Component {
  state = {
    email: "",
    emailSuccess: false,
    bucket: {},
    pDate: "",
    handicap: ""
  }
  
  componentDidMount () {
    const bucketSelect = this.props.buckets.find(bucket => bucket.id === parseInt(this.props.match.params.id))
    this.setState({
      bucket: bucketSelect
    })
  }

  handleChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handleChangeDate = (e) => {
    this.setState({
      pDate: e.target.value
    })
  }

  handleChangeHand = (e) => {
    this.setState({
      handicap: e.target.value
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

  // addFoursome = () => {
  //   console.log("add Foursome")
  // }

  createFoursome = (e, bucket) => {
    console.log("create foursome", bucket, this.state.pDate, this.state.handicap)
    const FOURSOME_URL = 'http://localhost:3000/foursomes'
    const pDate = new Date(this.state.pDate)
    const handi = parseInt(this.state.handicap)
    const reqObj1 = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        course_id: this.state.bucket.course_id,
        user_id: this.state.bucket.user_id,
        play_date: pDate,
        handicap: handi,
        player1_id: this.state.bucket.user_id,
        player1_name: this.props.user.user
      })
    }
    console.log("forusome obj", reqObj1)
    // post course id and user id to buckets path to add bucket
    fetch(FOURSOME_URL, reqObj1)
    .then(resp => resp.json())
    .then(data => {
      console.log("**** added foursome", data)
      this.props.addFoursome(data)
      this.props.history.push('/foursomes')
    })
    
  }
  
  render() {
    if (!this.props.user.user){
      this.props.history.push('/login')
      return null
    }
    const bucketSelect = this.props.buckets.find(bucket => bucket.id === parseInt(this.props.match.params.id))
    const linkedit = `/buckets/edit/${this.state.bucket.id}`
    let played
    
    // this is to check if the bucket course has been played
    let fmtDate
    if (this.state.bucket.played_on){
      played = true
      const date = new Date(this.state.bucket.played_on)
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
            <Header as='h3'> Course: {this.state.bucket.course} {this.state.bucket.played_on ? <Icon name="check circle"/> : null}</Header>
          </Segment>
          <Segment style={{width: 650}} inverted color="olive">
            <Header as='h3'> Played on: {this.state.bucket.played_on ? fmtDate : "Not played yet"}</Header>
          </Segment>
          <Segment style={{width: 650}} inverted color="olive">
            <Header as='h3'> Score: {this.state.bucket.played_on ? this.state.bucket.score : "No score"}</Header>
          </Segment>
          <Segment style={{width: 650}} inverted color="olive">
            {/* disable the remove button if course is alreadt played */}
            <Button icon onClick={() => this.deleteThisBucket(this.state.bucket)} size='medium' inverted color="grey" disabled={played}>
              <Icon name='trash alternate'/>
              {/* <p>Remove</p> */}
            </Button>
            <Modal size='medium' trigger={
          <Button animated='fade' size='medium' inverted color="grey">
            <Button.Content visible>
              Create
              </Button.Content>
            <Button.Content hidden>
              Foursome
            </Button.Content>
          </Button>} closeIcon>
          <Modal.Content>
            <Label>{this.state.bucket.course}</Label>
            <Segment raised inverted color="olive">
             <Form onSubmit={(event) => this.createFoursome(event, this.state.bucket)}>
             <Form.Group widths='equal' inline>
               <Form.Input placeholder="Date" onChange={this.handleChangeDate} type='date' value={this.state.pDate} />
               <Form.Input placeholder="handicap" onChange={this.handleChangeHand} type='text' value={this.state.handicap} />
               <Form.Input type='submit' size='medium' value='Create' />
             </Form.Group>
             </Form>
           </Segment>  
          </Modal.Content>
        </Modal>
  
            {/* display checkoff button only if course is not played. Otherwise show email form */}
            {!played ?
            <Link to={linkedit} size='mini' >
            <Button icon size='medium' inverted color="grey">
              <Icon name='check circle'/>
              {/* <p>Check off</p> */}
            </Button>
            
            </Link> : 
             <Segment raised inverted color="olive">
             <Form onSubmit={(event) => this.sendEmail(event, this.state.bucket)}>
             <Form.Group widths='equal' inline>
               <Form.Input placeholder="E-mail Addresses" onChange={this.handleChange} type='text' value={this.state.email} />
               <Form.Input icon type='submit' size='massive' value='Share'>
                 <Icon name='mail outline'/>
               </Form.Input>
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

export default connect(mapStateToProps, {deleteBucket, addFoursome})(ShowBucket)
