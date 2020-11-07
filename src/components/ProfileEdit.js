import React, { Component } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { updateUser, addClubs } from '../actions';
import { Form, Grid, GridRow, Icon, Label, Segment, Button } from 'semantic-ui-react'

export class ProfileEdit extends Component {
  state = {
    email: "",
    handicap: 0,
    clubId: null,
    club1: "",
    club1Carry: 0,
    club2: "",
    club2Carry: 0,
    club3: "",
    club3Carry: 0,
    club4: "",
    club4Carry: 0,
    club5: "",
    club5Carry: 0,
    club6: "",
    club6Carry: 0,
    club7: "",
    club7Carry: 0,
    club8: "",
    club8Carry: 0,
    club9: "",
    club9Carry: 0,
    club10: "",
    club10Carry: 0,
    club11: "",
    club11Carry: 0,
    club12: "",
    club12Carry: 0,
    club13: "",
    club13Carry: 0
  }

  // this is to set local state with played on date and score when component is initally loaded
  componentDidMount () {
    if (!this.props.userId){
      this.props.history.push('/login')
      return null
    } else {
      console.log(this.props.clubs)
      let clubsState = (this.props.clubs.length > 0 ?
        {clubdId: this.props.clubs[0].id, 
        club1: this.props.clubs[0].club_1, club1Carry: this.props.clubs[0].club1_carry,
        club2: this.props.clubs[0].club_2, club2Carry: this.props.clubs[0].club2_carry,
        club3: this.props.clubs[0].club_3, club3Carry: this.props.clubs[0].club3_carry,
        club4: this.props.clubs[0].club_4, club4Carry: this.props.clubs[0].club4_carry,
        club5: this.props.clubs[0].club_5, club5Carry: this.props.clubs[0].club5_carry,
        club6: this.props.clubs[0].club_6, club6Carry: this.props.clubs[0].club6_carry,
        club7: this.props.clubs[0].club_7, club7Carry: this.props.clubs[0].club7_carry,
        club8: this.props.clubs[0].club_8, club8Carry: this.props.clubs[0].club8_carry,
        club9: this.props.clubs[0].club_9, club9Carry: this.props.clubs[0].club9_carry,
        club10: this.props.clubs[0].club_10, club10Carry: this.props.clubs[0].club10_carry,
        club11: this.props.clubs[0].club_11, club11Carry: this.props.clubs[0].club11_carry,
        club12: this.props.clubs[0].club_12, club12Carry: this.props.clubs[0].club12_carry,
        club13: this.props.clubs[0].club_13, club13Carry: this.props.clubs[0].club13_carry} 
        : {clubId: null,
        club1: "", club1Carry: 0,
        club2: "", club2Carry: 0,
        club3: "", club3Carry: 0,
        club4: "", club4Carry: 0,
        club5: "", club5Carry: 0,
        club6: "", club6Carry: 0,
        club7: "", club7Carry: 0,
        club8: "", club8Carry: 0,
        club9: "", club9Carry: 0,
        club10: "", club10Carry: 0,
        club11: "", club11Carry: 0,
        club12: "", club12Carry: 0,
        club13: "", club13Carry: 0})
      console.log(clubsState)
      this.setState({
        email: this.props.email,
        handicap: this.props.handicap,
        club1: clubsState.club1,
        club1Carry: clubsState.club1Carry,
        club2: clubsState.club2,
        club2Carry: clubsState.club2Carry,
        club3: clubsState.club3,
        club3Carry: clubsState.club3Carry,
        club4: clubsState.club4,
        club4Carry: clubsState.club4Carry,
        club5: clubsState.club5,
        club5Carry: clubsState.club5Carry,
        club6: clubsState.club6,
        club6Carry: clubsState.club6Carry,
        club7: clubsState.club7,
        club7Carry: clubsState.club7Carry,
        club8: clubsState.club8,
        club8Carry: clubsState.club8Carry,
        club9: clubsState.club9,
        club9Carry: clubsState.club9Carry,
        club10: clubsState.club10,
        club10Carry: clubsState.club10Carry,
        club11: clubsState.club11,
        club11Carry: clubsState.club11Carry,
        club12: clubsState.club12,
        club12Carry: clubsState.club12Carry,
        club13: clubsState.club13,
        club13Carry: clubsState.club13Carry
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
      this.updateClubs(this.props.userId)
      this.props.history.push('/buckets')
    })
  }

  updateClubs = (userId) => {
    console.log("update clubs start", this.state.clubId)
    if (this.state.clubId !== null) {
      const CLUB_URL = `http://localhost:3000/clubs/${this.state.clubId}`
      const reqObj = {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          user_id: userId, 
          club_1: this.state.club1,
          club1_carry: this.state.club1Carry,
          club_2: this.state.club2,
          club2_carry: this.state.club2Carry,
          club_3: this.state.club3,
          club3_carry: this.state.club3Carry,
          club_4: this.state.club4,
          club4_carry: this.state.club4Carry,
          club_5: this.state.club5,
          club5_carry: this.state.club5Carry,
          club_6: this.state.club6,
          club6_carry: this.state.club6Carry,
          club_7: this.state.club7,
          club7_carry: this.state.club7Carry,
          club_8: this.state.club8,
          club8_carry: this.state.club8Carry,
          club_9: this.state.club9,
          club9_carry: this.state.club9Carry,
          club_10: this.state.club10,
          club10_carry: this.state.club10Carry,
          club_11: this.state.club11,
          club11_carry: this.state.club11Carry,
          club_12: this.state.club12,
          club12_carry: this.state.club12Carry,
          club_13: this.state.club13,
          club13_carry: this.state.club13Carry
        })
      }
    } else {
      const CLUB_URL = `http://localhost:3000/clubs`
      const reqObj = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          user_id: userId, 
          club_1: this.state.club1,
          club1_carry: this.state.club1Carry,
          club_2: this.state.club2,
          club2_carry: this.state.club2Carry,
          club_3: this.state.club3,
          club3_carry: this.state.club3Carry,
          club_4: this.state.club4,
          club4_carry: this.state.club4Carry,
          club_5: this.state.club5,
          club5_carry: this.state.club5Carry,
          club_6: this.state.club6,
          club6_carry: this.state.club6Carry,
          club_7: this.state.club7,
          club7_carry: this.state.club7Carry,
          club_8: this.state.club8,
          club8_carry: this.state.club8Carry,
          club_9: this.state.club9,
          club9_carry: this.state.club9Carry,
          club_10: this.state.club10,
          club10_carry: this.state.club10Carry,
          club_11: this.state.club11,
          club11_carry: this.state.club11Carry,
          club_12: this.state.club12,
          club12_carry: this.state.club12Carry,
          club_13: this.state.club13,
          club13_carry: this.state.club13Carry
        })
      }
  }
    fetch(CLUB_URL, reqObj)
    .then(resp => resp.json(console.log("***added clubs after fetch", this.props)))
    .then(clubsData => {
        const userData = {
          user: this.props.user,
          userId: this.props.userId,
          email: this.props.email,
          handicap: this.props.handicap
        }
        this.props.addClubs(clubsData, userData)
    })
  }

  render() {
    return (
      <div>
        <Navbar />
        
        <Grid divided='vertically'>
          <GridRow centered>
          <Segment inverted color="olive">
          <Form onSubmit={this.handleOnSubmit} style={{width: 600}}>
            <Form.Group widths='equal'>
            <Form.Field>
                <lablel>Email Address</lablel>
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleOnChange}
                />
            </Form.Field>
            <Form.Field>
                <lablel>My Handicap</lablel>
                <input
                  type="text"
                  name="handicap"
                  value={this.state.handicap}
                  onChange={this.handleOnChange}
                />
            </Form.Field>
            </Form.Group>
            <Label inverted color='olive' size='large'>My Clubs Profile</Label>
            <Form.Group widths='equal'>
              <Form.Field>
              <lablel>Club 1</lablel>  
              <input
                  type="text"
                  name="club1"
                  value={this.state.club1}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
              <Form.Field>
              <lablel>Club 1 Carry</lablel>  
              <input
                  type="text"
                  name="club1Carry"
                  value={this.state.club1Carry}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
              <lablel>Club 2</lablel>  
              <input
                  type="text"
                  name="club2"
                  value={this.state.club2}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
              <Form.Field>
              <lablel>Club 2 Carry</lablel>  
              <input
                  type="text"
                  name="club2Carry"
                  value={this.state.club2Carry}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
              <lablel>Club 3</lablel>  
              <input
                  type="text"
                  name="club3"
                  value={this.state.club3}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
              <Form.Field>
              <lablel>Club 3 Carry</lablel>  
              <input
                  type="text"
                  name="club3Carry"
                  value={this.state.club3Carry}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
              <lablel>Club 4</lablel>  
              <input
                  type="text"
                  name="club4"
                  value={this.state.club4}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
              <Form.Field>
              <lablel>Club 4 Carry</lablel>  
              <input
                  type="text"
                  name="club4Carry"
                  value={this.state.club4Carry}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
              <lablel>Club 5</lablel>  
              <input
                  type="text"
                  name="club5"
                  value={this.state.club5}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
              <Form.Field>
              <lablel>Club 5 Carry</lablel>  
              <input
                  type="text"
                  name="club5Carry"
                  value={this.state.club5Carry}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
              <lablel>Club 6</lablel>  
              <input
                  type="text"
                  name="club6"
                  value={this.state.club6}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
              <Form.Field>
              <lablel>Club 6 Carry</lablel>  
              <input
                  type="text"
                  name="club6Carry"
                  value={this.state.club6Carry}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
              <lablel>Club 7</lablel>  
              <input
                  type="text"
                  name="club7"
                  value={this.state.club7}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
              <Form.Field>
              <lablel>Club 7 Carry</lablel>  
              <input
                  type="text"
                  name="club7Carry"
                  value={this.state.club7Carry}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
              <lablel>Club 8</lablel>  
              <input
                  type="text"
                  name="club8"
                  value={this.state.club8}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
              <Form.Field>
              <lablel>Club 8 Carry</lablel>  
              <input
                  type="text"
                  name="club8Carry"
                  value={this.state.club8Carry}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
              <lablel>Club 9</lablel>  
              <input
                  type="text"
                  name="club9"
                  value={this.state.club9}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
              <Form.Field>
              <lablel>Club 9 Carry</lablel>  
              <input
                  type="text"
                  name="club9Carry"
                  value={this.state.club9Carry}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
              <lablel>Club 10</lablel>  
              <input
                  type="text"
                  name="club10"
                  value={this.state.club10}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
              <Form.Field>
              <lablel>Club 10 Carry</lablel>  
              <input
                  type="text"
                  name="club10Carry"
                  value={this.state.club10Carry}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
              <lablel>Club 11</lablel>  
              <input
                  type="text"
                  name="club11"
                  value={this.state.club11}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
              <Form.Field>
              <lablel>Club 11 Carry</lablel>  
              <input
                  type="text"
                  name="club11Carry"
                  value={this.state.club11Carry}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
              <lablel>Club 12</lablel>  
              <input
                  type="text"
                  name="club12"
                  value={this.state.club12}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
              <Form.Field>
              <lablel>Club 12 Carry</lablel>  
              <input
                  type="text"
                  name="club12Carry"
                  value={this.state.club12Carry}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
              <lablel>Club 13</lablel>  
              <input
                  type="text"
                  name="club13"
                  value={this.state.club13}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
              <Form.Field>
              <lablel>Club 13 Carry</lablel>  
              <input
                  type="text"
                  name="club13Carry"
                  value={this.state.club13Carry}
                  onChange={this.handleOnChange}
                />
              </Form.Field>
            </Form.Group>
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
    user: state.users.user,
    userId: state.users.userId,
    email: state.users.email,
    handicap: state.users.handicap,
    buckets: state.buckets,
    clubs: state.users.clubs
  }
}

export default connect(mapStateToProps, {updateUser, addClubs})(ProfileEdit)
