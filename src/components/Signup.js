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

  // componentDidMount () {
  //   const token = localStorage.getItem('token')
  //   if(!token) {
  //     this.props.history.push('/login')
  //   }else {
  //     const reqObj = {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     }
  //     fetch('http://localhost:3000/current_user', reqObj)
  //     .then(resp => resp.json())
  //     .then(user => {
  //       if (user.error) {
  //         this.props.history.push('/login')
  //       } else {
  //         console.log("===current user====", user)
  //         this.props.currentUser(user)
  //         this.getCourses(user.jwt)
  //       }
  //     })
  //   }
  // }

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
  handleRetype = (e) => {
    console.log("retype is", e.target.value)
    this.setState({
      retype: e.target.value
    })
  }

  signupUser = (e) => {
    e.preventDefault()
    console.log(this.state.username, this.state.password)
    if (this.state.password !== this.state.retype) {
      this.setState({
        badpw: true,
        password: "",
        retype: ""
      })
    } else {
    const USER_URL = 'http://localhost:3000/signup'
    const reqObj = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({username: this.state.username, password: this.state.password})
    }
    console.log("going to signup user", reqObj)
    fetch(USER_URL, reqObj)
    .then(resp => resp.json())
    .then(userData => {
      if (userData.error) {
        alert(userData.error)
      } else {
        localStorage.setItem("token", userData.jwt)      
        this.props.addUser(userData)
        console.log("***login with token***", userData)
        this.getCourses(userData.jwt)
      }
    })
  }
  }

  getCourses = (token) => {
    const COURSE_URL = 'http://localhost:3000/courses'
    fetch(COURSE_URL, {headers: {'Authorization': `Bearer ${token}`}})
      .then(resp => resp.json())
      .then(courses => {
        console.log(courses)
        this.props.addCourse(courses)
        console.log("golf courses", courses)
        this.props.history.push('/buckets')
    })
  }

  render() {
    // if (!this.props.user.user){
    //   this.props.history.push('/login')
    //   return null
    // }
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
