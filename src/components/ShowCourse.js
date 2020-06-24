import React, { Component } from 'react';
import Navbar from './Navbar';
import MapContainer from './MapContainer'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { Icon, Label, Container, Grid, Segment, Dropdown } from 'semantic-ui-react'


class ShowCourse extends Component {
  state = {
    thisCourse: {},
    gps1: {},
    gps2: {},
    zoom: 0,
    desc: "",
    init: true
  }

  componentDidMount () {
    const courseSelect = this.props.courses.find(course => course.id === parseInt(this.props.match.params.id))
    this.setState({
      thisCourse: courseSelect,
      gps1: {lat: courseSelect.lat, lng: courseSelect.lng},
      gps2: {lat: courseSelect.lat, lng: courseSelect.lng},
      zoom: 18,
      desc: "",
      init: true
    })
  }

  selectFilter = (e, { key, value }) => {
    console.log("****", key, value)
    if (value === 'Clubhouse'){
      this.setState({
        gps1: {lat: this.state.thisCourse.lat, lng: this.state.thisCourse.lng},
        gps2: {lat: this.state.thisCourse.lat, lng: this.state.thisCourse.lng},
        zoom: 19,
        desc: "",
        init: false
      })
    } else {
      const hole = parseInt(value.split(" ")[1])
      console.log("hole selected", hole - 1)
      console.log(this.state.thisCourse.holes[hole - 1])
      const teeGps = {lat: this.state.thisCourse.holes[hole - 1].tee_lat, lng: this.state.thisCourse.holes[hole - 1].tee_lng}
      const greenGps = {lat: this.state.thisCourse.holes[hole - 1].green_lat, lng: this.state.thisCourse.holes[hole - 1].green_lng}
      const desc = ` Hole: ${hole}    Par: ${this.state.thisCourse.holes[hole - 1].par}    Yardage: ${this.state.thisCourse.holes[hole - 1].yardage}`
      this.setState({
        gps1: teeGps,
        gps2: greenGps,
        zoom: 18,
        desc: desc,
        init: false
      })
    }
  }

  render () {
    if (!this.props.user.user){
      this.props.history.push('/login')
      return null
    }
    // const courseSelect = this.props.courses.find(course => course.id === parseInt(this.props.match.params.id))
    // console.log("A Course", courseSelect)
    // const gps1 = {lat: courseSelect.lat, lng: courseSelect.lng}
    // const zoomLevel = 16
    const holeSeletion = [
      {
        key: 'Clubhouse',
        text: 'Clubhouse',
        value: 'Clubhouse'
      },
      {
        key: 'Hole 1',
        text: 'Hole 1',
        value: 'Hole 1'
      },  
      {
        key: 'Hole 2',
        text: 'Hole 2',
        value: 'Hole 2'
      },   
      {
        key: 'Hole 3',
        text: 'Hole 3',
        value: 'Hole 3'
      },   
      {
        key: 'Hole 4',
        text: 'Hole 4',
        value: 'Hole 4'
      },   
      {
        key: 'Hole 5',
        text: 'Hole 5',
        value: 'Hole 5'
      },   
      {
        key: 'Hole 6',
        text: 'Hole 6',
        value: 'Hole 6'
      },   
      {
        key: 'Hole 7',
        text: 'Hole 7',
        value: 'Hole 7'
      },   
      {
        key: 'Hole 8',
        text: 'Hole 8',
        value: 'Hole 8'
      },   
      {
        key: 'Hole 9',
        text: 'Hole 9',
        value: 'Hole 9'
      },   
      {
        key: 'Hole 10',
        text: 'Hole 10',
        value: 'Hole 10'
      },   
      {
        key: 'Hole 11',
        text: 'Hole 11',
        value: 'Hole 11'
      },   
      {
        key: 'Hole 12',
        text: 'Hole 12',
        value: 'Hole 12'
      },  
      {
        key: 'Hole 13',
        text: 'Hole 13',
        value: 'Hole 13'
      },
      {
        key: 'Hole 14',
        text: 'Hole 14',
        value: 'Hole 14'
      },   
      {
        key: 'Hole 15',
        text: 'Hole 15',
        value: 'Hole 15'
      },   
      {
        key: 'Hole 16',
        text: 'Hole 16',
        value: 'Hole 16'
      },   
      {
        key: 'Hole 17',
        text: 'Hole 17',
        value: 'Hole 17'
      },   
      {
        key: 'Hole 18',
        text: 'Hole 18',
        value: 'Hole 18'
      },
    ]
    return (
      <div>
      <Navbar/>
        <Grid>
        <Label>
        <Icon name='golf ball'/> 
          {this.state.thisCourse.name} {this.state.desc}
        </Label>
        <Dropdown onChange={this.selectFilter} placeholder='Select Hole'
        fluid
        selection
        options={holeSeletion}
        style={{width: 200}}
        />
        
        </Grid>
        <br></br>
        <MapContainer gps1={this.state.gps1} gps2={this.state.gps2} zoomLevel={this.state.zoom} init={this.state.init}/>
 
      </div> 
    )
  }
 
}

const mapStateToProps = state => {
  return { 
    courses: state.courses,
    user: state.users
   }
}

export default connect(mapStateToProps)(ShowCourse) 