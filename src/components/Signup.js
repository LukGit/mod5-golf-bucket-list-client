import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../actions'
import { currentUser } from '../actions'
import { addCourse } from  '../actions'
import { addAllFoursomes } from  '../actions'
import { Form, Header, Icon, Label} from 'semantic-ui-react'


class Signup extends Component {
 
  state = {
      username: '',
      password: '',
      retype: "",
      email: '',
      badpw: false,
      bademail: false
  }

  handleChangeUser = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  handleChangePw = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  handleRetype = (e) => {
    this.setState({
      retype: e.target.value
    })
  }
  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }
  signupUser = (e) => {
    e.preventDefault()
    if (this.state.password !== this.state.retype) {
      // clear state when passwords don't matach
      this.setState({
        badpw: true,
        password: "",
        retype: ""
      })
    } else {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)) {
        // post to the signup endpoint 
          const USER_URL = 'http://localhost:3000/signup'
          const reqObj = {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({username: this.state.username, password: this.state.password, email: this.state.email})
          }
          fetch(USER_URL, reqObj)
          .then(resp => resp.json())
          .then(userData => {
            if (userData.error) {
              alert(userData.error)
            } else {
              // save the return token
              localStorage.setItem("token", userData.jwt) 
              // add user to the redux store
              this.props.addUser(userData)
              // get all courses from backend
              this.getCourses(userData.jwt)
              this.getFoursomes(userData.jwt)
            }
          })
        } else {
          this.setState ({
            bademail: true
          })
        }
      }
  }

  // this function is to use provided token to retrieve all courses from backend
  getCourses = (token) => {
    const COURSE_URL = 'http://localhost:3000/courses'
    fetch(COURSE_URL, {headers: {'Authorization': `Bearer ${token}`}})
      .then(resp => resp.json())
      .then(courses => {
        // add all courses to the store
        this.props.addCourse(courses)
        // redirect to the buckets page
        this.props.history.push('/buckets')
    })
  }

  getFoursomes = (token) => {
    const FOUR_URL = 'http://localhost:3000/foursomes'
    fetch(FOUR_URL, {headers: {'Authorization': `Bearer ${token}`}})
      .then(resp => resp.json())
      .then(foursomes => {
        console.log("fetch foursomes", foursomes)
        this.props.addAllFoursomes(foursomes)
        })
  }

  render() {
    return (
      <div className="login">
      <Header className="pageTitle" as="h1" size="huge" icon inverted>
        <Icon name="golf ball"/>
        Please sign up
      </Header>
        <Form onSubmit={this.signupUser}>
        <Form.Group widths='equal' inline >
          <Form.Input placeholder="User name" onChange={this.handleChangeUser} type='text' value={this.state.username} autoFocus/>
          <Form.Input placeholder="Password" onChange={this.handleChangePw} type='password' value={this.state.password} />
          <Form.Input placeholder="Retype password" onChange={this.handleRetype} type='password' value={this.state.retype}/>
          <Form.Input placeholder="Email address" onChange={this.handleChangeEmail} type='text' value={this.state.email} />
          <Form.Input type='submit' value='Signup'/>
        </Form.Group>        
       </Form>
       {this.state.badpw ? <Label inverted color='red' pointing>Passwords not matched. Try again.</Label> : null}
       {this.state.bademail ? <Label inverted color='red' pointing>Please enter valid email address.</Label> : null}
      </div>
    )
  }
}

export default connect(null, {addUser, addCourse, currentUser, addAllFoursomes})(Signup)
