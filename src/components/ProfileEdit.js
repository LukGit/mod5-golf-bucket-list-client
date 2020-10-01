import React, { Component } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { updateUser } from '../actions';
import { Form, Grid, GridRow, Icon, Label, Segment, Button } from 'semantic-ui-react'

export class ProfileEdit extends Component {
  state = {
    email: "",
    handicap: 0
  }

  // this is to set local state with played on date and score when component is initally loaded
  componentDidMount () {
    if (!this.props.userId){
      this.props.history.push('/login')
      return null
    } else {
      console.log(this.props.email)
      this.setState({
        email: this.props.email,
        handicap: this.props.handicap
      })
    }
  }

  handleOnChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  // this is to send updated bucket info to backend to update
  handleOnSubmit = event => {
    event.preventDefault();
    const USER_URL = `http://localhost:3000/users/${this.props.userId}`
    const reqObj = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        email: this.state.email,
        my_handicap: this.state.handicap
      })
    }
    fetch(USER_URL, reqObj)
    .then(resp => resp.json(console.log("updated resp", resp)))
    .then(userData => {
      this.props.updateUser(userData)
      this.props.history.push('/buckets')
    })
  }

  render() {
    return (
      <div>
        <Navbar />
        <Grid>
          <GridRow centered>
          <Segment inverted color="olive">
          <Form onSubmit={this.handleOnSubmit} style={{width: 400}}>
          <Label inverted color='olive'>Email Address</Label>
            <Form.Field>
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleOnChange}
                />
            </Form.Field>
            <Label inverted color='olive'>My Handicap</Label>
            <Form.Field>
              
                <input
                  type="text"
                  name="handicap"
                  value={this.state.handicap}
                  onChange={this.handleOnChange}
                />
            </Form.Field>
            <Form.Field>
            <Button animated='fade' inverted color="grey" size='medium'>
              <Button.Content visible>
              <Icon name='user circle'/>
              </Button.Content>
              <Button.Content hidden>
                Update
              </Button.Content>
            </Button>
           </Form.Field>
          </Form>
          </Segment>
          </GridRow>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    userId: state.users.userId,
    email: state.users.email,
    handicap: state.users.handicap,
    buckets: state.buckets 
  }
}

export default connect(mapStateToProps, {updateUser})(ProfileEdit)
