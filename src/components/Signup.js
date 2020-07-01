import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../actions'
import { currentUser } from '../actions'
import { addCourse } from  '../actions'
import { Form, Header, Icon, Label} from 'semantic-ui-react'


class Signup extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      retype: "",
      badpw: false
    }
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
        // post to the signup endpoint 
        const USER_URL = 'http://localhost:3000/signup'
        const reqObj = {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({username: this.state.username, password: this.state.password})
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
          }
        })
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

  render() {
    return (
      <div className="login">
      <Header className="pageTitle" as="h1" size="huge" icon inverted>
        <Icon name="golf ball"/>
        Please sign up
      </Header>
        <Form onSubmit={this.signupUser}>
        <Form.Group widths='equal' inline >
          <Form.Input placeholder="User name" onChange={this.handleChangeUser} type='text' value={this.state.username} />
          <Form.Input placeholder="Password" onChange={this.handleChangePw} type='password' value={this.state.password} />
          <Form.Input placeholder="Retype password" onChange={this.handleRetype} type='password' value={this.state.retype} />
          <Form.Input type='submit' value='Signup'/>
        </Form.Group>        
       </Form>
       {this.state.badpw ? <Label>Passwords not matched. Try again.</Label> : null}
      </div>
    )
  }
}

export default connect(null, {addUser, addCourse, currentUser})(Signup)