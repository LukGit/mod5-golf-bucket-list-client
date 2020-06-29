import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../actions'
import { addCourse } from  '../actions'
import { Form, Header, Icon } from 'semantic-ui-react'


class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChangeUser = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  handleChangePw = (e) => {
    console.log("password is", e.target.value)
    this.setState({
      password: e.target.value
    })
  }

  loginUser = (e) => {
    e.preventDefault()
    console.log(this.state.username, this.state.password)
    const USER_URL = 'http://localhost:3000/users'
    const COURSE_URL = 'http://localhost:3000/courses'
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
      this.props.addUser(userData)
      console.log("login", userData)
      fetch(COURSE_URL)
      .then(resp => resp.json())
      .then(courses => {
        this.props.addCourse(courses)
        console.log("golf courses", courses)
        this.props.history.push('/buckets')
      })
    }
    })
  }

  render() {
    return (
      <div className="login">
      <Header className="pageTitle" as="h1" size="huge" icon inverted color="white">
        <Icon name="golf ball"/>
        Welcome To Golf Bucket List
      </Header>

       <Form onSubmit={this.loginUser}>
        <Form.Group widths='equal' inline>
          <Form.Input label="User name" onChange={this.handleChangeUser} type='text' value={this.state.username} />
          <Form.Input label="Password" onChange={this.handleChangePw} type='password' value={this.state.password} />
          <Form.Input type='submit' value='Login' />
        </Form.Group>

       </Form>
      </div>
    )
  }
}

export default connect(null, {addUser, addCourse})(Login)
