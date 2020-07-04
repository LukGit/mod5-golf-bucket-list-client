import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateFoursome } from '../actions'
import { deleteFoursome } from '../actions'
import { withRouter, NavLink } from 'react-router-dom'
import { Header, Segment, Button, Icon } from 'semantic-ui-react'


class ShowFoursome extends Component {
  state = {
    
  }
  
  componentDidMount () {
    // const bucketSelect = this.props.buckets.find(bucket => bucket.id === parseInt(this.props.match.params.id))
    // this.setState({
    //   bucket: bucketSelect
    // })
    // console.log ("in showfoursome", this.props)
    // if ((this.props.user.userId === this.props.foursome.player1_id || 
    //   this.props.user.userId === this.props.foursome.player2_id ||
    //   this.props.user.userId === this.props.foursome.player3_id ||
    //   this.props.user.userId === this.props.foursome.player4_id) || 
    //   (this.props.foursome.player2_id && this.props.foursome.player3_id && this.props.foursome.player4_id ) ) {
    //   this.setState({
    //     cantJoin: true
    //   })
    // }
  }
  // componentDidUpdate () {
  //   const bucketSelect = this.props.buckets.find(bucket => bucket.id === parseInt(this.props.match.params.id))
  //   this.setState({
  //     bucket: bucketSelect
  //   })
  // }

  joinThisFoursome = () => {
    console.log("*** join foursome")
    const FOURSOME_URL = `http://localhost:3000/foursomes/${this.props.foursome.id}`
    let fourObj 
    if (!this.props.foursome.player2_id) {
      fourObj = {
        player2_id: this.props.user.userId,
        player2_name: this.props.user.user
      }
    } else {
      if (!this.props.foursome.player3_id) {
        fourObj = {
          player3_id: this.props.user.userId,
          player3_name: this.props.user.user
        } 
      } else {
          if (!this.props.foursome.player4_id) {
            fourObj = {
              player4_id: this.props.user.userId,
              player4_name: this.props.user.user
            } 
          }
      }
    }
    
    console.log("**** join 4some ***", fourObj)
  
    const reqObj = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(fourObj)
    }
    fetch(FOURSOME_URL, reqObj)
    .then(resp => resp.json())
    .then(foursomeData => {
      console.log('*** updated foursome', foursomeData)
      this.props.updateFoursome(foursomeData)
      this.props.history.push('/buckets')
    })
  }

  leaveThisFoursome = () => {
    console.log("*** join foursome")
    const FOURSOME_URL = `http://localhost:3000/foursomes/${this.props.foursome.id}`
    let fourObj 
    if (this.props.user.userId === this.props.foursome.player2_id) {
      fourObj = {
        player2_id: null,
        player2_name: null
      }
    } else {
      if (this.props.user.userId === this.props.foursome.player3_id) {
        fourObj = {
          player3_id: null,
          player3_name: null
        } 
      } else {
          if (this.props.user.userId === this.props.foursome.player4_id) {
            fourObj = {
              player4_id: null,
              player4_name: null
            } 
          }
      }
    }
    
    console.log("**** leave 4some ***", fourObj)
  
    const reqObj = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(fourObj)
    }
    fetch(FOURSOME_URL, reqObj)
    .then(resp => resp.json())
    .then(foursomeData => {
      console.log('*** updated foursome', foursomeData)
      this.props.updateFoursome(foursomeData)
      this.props.history.push('/buckets')
    })
  }

  removeThisFoursome = () => {
    const FOUR_URL = `http://localhost:3000/foursomes/${this.props.foursome.id}`
    console.log("delete link is", FOUR_URL)
    const reqObj = {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    fetch(FOUR_URL, reqObj)
      .then(resp => resp.json())
      .then(data => {
        this.props.history.push('/buckets')
        this.props.deleteFoursome(data)
      })    
  }

  render() {
    if (!this.props.user.user){
      this.props.history.push('/login')
      return null
    }
  
    // this is to check if the bucket course has been played
    let fmtDate
    const date = new Date(this.props.foursome.play_date)
    fmtDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()

    let cannotJoin = false
    if ((this.props.user.userId === this.props.foursome.player1_id || 
      this.props.user.userId === this.props.foursome.player2_id ||
      this.props.user.userId === this.props.foursome.player3_id ||
      this.props.user.userId === this.props.foursome.player4_id) || 
      (this.props.foursome.player2_id && this.props.foursome.player3_id && this.props.foursome.player4_id ) ) {
      cannotJoin = true
    }
    let canLeave = false
    if (this.props.user.userId === this.props.foursome.player2_id ||
      this.props.user.userId === this.props.foursome.player3_id ||
      this.props.user.userId === this.props.foursome.player4_id) {
        canLeave = true
    }

    return (
      <div>
          <Segment style={{width: 290}} className="segmentT">
            <Header as='h5'> {this.props.foursome.course.name} </Header>
          </Segment>
          <Segment style={{width: 290}} inverted color="olive">
            <Header as='h5'> Foursome date: {fmtDate}</Header>
            <Header as='h5'> Min Handicape: {this.props.foursome.handicap}</Header>
            <Header as='h5'> Player 1: {this.props.foursome.player1_name}</Header>
            <Header as='h5'> Player 2: {this.props.foursome.player2_name ? this.props.foursome.player2_name : "Available"}</Header>
            <Header as='h5'> Player 3: {this.props.foursome.player3_name ? this.props.foursome.player3_name : "Available"}</Header>
            <Header as='h5'> Player 4: {this.props.foursome.player4_name ? this.props.foursome.player4_name : "Available"}</Header>
          </Segment> 
          <Segment style={{width: 290}} inverted color="olive">
            <Button animated='fade' onClick={this.joinThisFoursome} size='medium' inverted color="grey" disabled={cannotJoin}>
              <Button.Content visible>
              <Icon name='add user'/>
              </Button.Content>
              <Button.Content hidden>
                Join
              </Button.Content>
            </Button>
            <Button animated='fade' onClick={this.leaveThisFoursome} size='medium' inverted color="grey" disabled={!canLeave}>
              <Button.Content visible>
              <Icon name='user times'/>
              </Button.Content>
              <Button.Content hidden>
                Leave
              </Button.Content>
            </Button>
            {this.props.user.userId === this.props.foursome.user_id ?
              <Button animated='fade' onClick={this.removeThisFoursome} size='medium' inverted color="grey" >
              <Button.Content visible>
              <Icon name='trash alternate'/>
              </Button.Content>
              <Button.Content hidden>
                Remove
              </Button.Content>
            </Button> : null
            }
          </Segment> 
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    user: state.users
   }
}

export default connect(mapStateToProps, {updateFoursome, deleteFoursome})(withRouter(ShowFoursome))
