import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../actions'
import { Form } from 'semantic-ui-react'


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
      this.props.addUser(userData)
      console.log("login", userData)
      // this.props.history.push('/buckets')
    })
  }

  render() {
    return (
      <div className={`app`}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
       <Form onSubmit={this.loginUser}>
        <Form.Group widths='equal' inline>
          <Form.Input label="User name" onChange={this.handleChangeUser} type='text' value={this.state.username} />
          <Form.Input label="Password" onChange={this.handleChangePw} type='password' value={this.state.password} />
          <Form.Input type='submit' value='Login'/>
        </Form.Group>

       </Form>
      </div>
    )
  }
}

export default connect(null, {addUser})(Login)
