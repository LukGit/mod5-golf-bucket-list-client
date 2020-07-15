import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../actions'
import { currentUser } from '../actions'
import { addCourse } from  '../actions'
import { addAllFoursomes } from '../actions'
import { Form, Header, Icon } from 'semantic-ui-react'


class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  // this function is called when component is initially loaded
  // it checks to see if there is a token in local storage.
  // if token exists it fetch the user by sending the token to the current_user path
  componentDidMount () {
    const token = localStorage.getItem('token')
    if(!token) {
      this.props.history.push('/login')
    }else {
      const reqObj = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      fetch('http://localhost:3000/current_user', reqObj)
      .then(resp => resp.json())
      .then(user => {
        if (user.error) {
          this.props.history.push('/login')
        } else {
          this.props.currentUser(user)
          this.getCourses(user.jwt)
          this.getFoursomes(user.jwt)
        }
      })
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

  // this handles regular login by sending username and password to users path
  // returned token is stored in local storage
  // if username is not found, user is redirected to signup page
  loginUser = (e) => {
    e.preventDefault()
    console.log(this.state.username, this.state.password)
    const USER_URL = 'http://localhost:3000/users'
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
        if (userData.error === "Invalid username"){
          this.props.history.push('/signup')
        } else {
        alert(userData.error)
        }
      }else {
        localStorage.setItem("token", userData.jwt)      
        this.props.addUser(userData)
        this.getCourses(userData.jwt)
        this.getFoursomes(userData.jwt)
      }
    })
  }

  // this function retrieves all the courses from backend and load them to store
  getCourses = (token) => {
    const COURSE_URL = 'http://localhost:3000/courses'
    fetch(COURSE_URL, {headers: {'Authorization': `Bearer ${token}`}})
      .then(resp => resp.json())
      .then(courses => {
        this.props.addCourse(courses)
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
        // this.props.history.push('/foursomes')
    })
  }

  render() {
    return (
      <div className="login">
      <Header className="pageTitle" as="h1" size="huge" icon inverted>
        <Icon name="golf ball"/>
        Welcome To The Golf Bucket List
      </Header>
        <Form onSubmit={this.loginUser}>
        <Form.Group widths='equal' inline >
          <Form.Input placeholder="User name" onChange={this.handleChangeUser} type='text' value={this.state.username} />
          <Form.Input placeholder="Password" onChange={this.handleChangePw} type='password' value={this.state.password} />
          <Form.Input type='submit' value='Login'/>
        </Form.Group>        
       </Form>
      </div>
    )
  }
}

export default connect(null, {addUser, addCourse, currentUser, addAllFoursomes})(Login)
