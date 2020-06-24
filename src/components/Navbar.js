import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
// import { withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'


class Navbar extends Component {
  // constructor(props) {
  //   super(props);
  // }

  handleLogout = event => {
    this.props.logoutUser()
  }

  render() {
    return (
      <Menu inverted size='mini'>
        <Menu.Item>
          <Link to={'/courses'} className="item">
            Courses
          </Link>
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
  return {}
}
export default connect(mapStateToProps, { logoutUser } )(Navbar);
// export default connect(mapStateToProps, { logoutUser } )(withRouter(Navbar))