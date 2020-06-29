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
    courseList:[]
  }
  componentDidMount () {
    const cSelect = this.props.courses.map(c => {
      return {key: `${c.id}`, text: c.name, value: `${c.id}`}
    })
    this.setState({
      courseList: cSelect
    })
  }

  handleLogout = event => {
    localStorage.removeItem('token')
    this.props.logoutUser()
  }

  selectCourse = (e, { value }) => {
    console.log("Courses****", value)
    this.props.history.push(`/courses/${value}`)
    // this.forceUpdate()
  }

  render() {
    return (
      <Menu inverted size='mini'>
        <Menu.Item >
          {/* <Link to={'/courses'} className="item">
            Courses
          </Link> */}
          <Dropdown 
          fluid
          selection
          onChange={this.selectCourse}
          options={this.state.courseList}
          style={{width: 200}}
          size='medium'
          placeholder='Research Course'/>
           
        </Menu.Item>
        <Menu.Item >
          <Link to={'/buckets'} className="item">
            My List
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
// export default connect(mapStateToProps, { logoutUser } )(Navbar);
export default connect(mapStateToProps, { logoutUser } )(withRouter(Navbar))