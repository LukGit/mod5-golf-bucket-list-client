import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import { withRouter } from 'react-router-dom'
import { Menu, Dropdown } from 'semantic-ui-react'


class Navbar extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    courseList:[],
    courseName: ""
  }
  // when component is initially loaded, set local set with courses from store with course name and id
  componentDidMount () {
    const cSelect = this.props.courses.map(c => {
      return {key: `${c.id}`, text: c.name, value: `${c.id}`}
    })
    this.setState({
      courseList: cSelect
    })
  }

  // this handles logout by remocing the token in local storage and calling logoutUser in reducer
  handleLogout = event => {
    localStorage.removeItem('token')
    this.props.logoutUser()
  }

  // this redirects the user to the course selected
  selectCourse = (e, { value }) => {
    const cName = this.props.courses.find(f => f.id === parseInt(value)).name
    this.setState({
      courseName: cName
    })
    this.props.history.push(`/courses/${value}`)
    // this.forceUpdate()
  }

  render() {
    return (
      <Menu inverted color='brown' size='mini'>
        <Menu.Item >
          {/* this dropdown list all the courses available */}
          <Dropdown 
          fluid
          selection
          search
          onChange={this.selectCourse}
          options={this.state.courseList}
          style={{width: 200}}
          size='medium'
          placeholder='Research Course'
          /> 
        </Menu.Item>
        <Menu.Item >
          <Link to={'/buckets'} className="item">
            My List
          </Link>
        </Menu.Item>
        <Menu.Item >
          <Link to={'/foursomes'} className="item">
            Foursomes
          </Link>
        </Menu.Item>
        <Menu.Item position='right'>
          <Link onClick={this.handleLogout}to={'/login'} className="item">
            Sign Out
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.courses,
    user: state.users
  }
}
// withRouter is need to route to course page because NavBar is not a component under BrowserRouter in App.js
export default connect(mapStateToProps, { logoutUser } )(withRouter(Navbar))