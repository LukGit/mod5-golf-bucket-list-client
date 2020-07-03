import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { joinFoursome } from '../actions'
import { Header, Segment, Button, Grid, Form, Modal, GridRow, Icon, Label } from 'semantic-ui-react'



class ShowFoursome extends Component {
  state = {
    cantJoin: false
  }
  
  componentDidMount () {
    // const bucketSelect = this.props.buckets.find(bucket => bucket.id === parseInt(this.props.match.params.id))
    // this.setState({
    //   bucket: bucketSelect
    // })
    console.log ("in showfoursome", this.props)
    if (this.props.user.userId === this.props.foursome.player1_id) {
      this.setState({
        cantJoin: true
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }

 
  // this fucntion delete a bucket item from bucket list
  // deleteThisBucket = (bucket) => {
  //   const BUCKET_URL = `http://localhost:3000/buckets/${bucket.id}`
  //   console.log("delete link is", BUCKET_URL)
  //   const reqObj = {
  //     method: 'delete',
  //     headers: {
  //       'content-type': 'application/json',
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`
  //     }
  //   }
  //   fetch(BUCKET_URL, reqObj)
  //     .then(resp => resp.json())
  //     .then(data => {
  //       this.props.history.push('/buckets')
  //       this.props.deleteBucket(data)
  //     })
  // }

  joinThisFoursome = () => {
    console.log("*** join foursome")
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


    return (
      <div>
          <Segment style={{width: 400}} className="segmentT">
            <Header as='h5'> Course: {this.props.foursome.course.name} </Header>
          </Segment>
          <Segment style={{width: 400}} inverted color="olive">
            <Header as='h5'> Foursome date: {fmtDate}</Header>
          </Segment>
          <Segment style={{width: 400}} inverted color="olive">
            <Header as='h5'> Min Handicape: {this.props.foursome.handicap}</Header>
          </Segment>
          <Segment style={{width: 400}} inverted color="olive">
            <Header as='h5'> Player 1: {this.props.foursome.player1_name}</Header>
          </Segment>
          <Segment style={{width: 400}} inverted color="olive">
            <Header as='h5'> Player 2: {this.props.foursome.player2_name ? this.props.foursome.player2_name : "Available"}</Header>
          </Segment> 
          <Segment style={{width: 400}} inverted color="olive">
            <Header as='h5'> Player 3: {this.props.foursome.player3_name ? this.props.foursome.player3_name : "Available"}</Header>
          </Segment> 
          <Segment style={{width: 400}} inverted color="olive">
            <Header as='h5'> Player 4: {this.props.foursome.player4_name ? this.props.foursome.player4_name : "Available"}</Header>
          </Segment> 
          <Segment style={{width: 400}} inverted color="olive">
            <Button animated='fade' onClick={this.joinThisFoursome} size='medium' inverted color="grey" disabled={this.state.cantJoin}>
              <Button.Content visible>
              <Icon name='add user'/>
              </Button.Content>
              <Button.Content hidden>
                Foursome
              </Button.Content>
            </Button>

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

export default connect(mapStateToProps, {joinFoursome})(ShowFoursome)
