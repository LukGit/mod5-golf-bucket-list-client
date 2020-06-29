import React, { Component } from 'react';
import Navbar from './Navbar';
import MapContainer from './MapContainer'
import { connect } from 'react-redux';
import { addBucket } from '../actions';
import TeeIcon from '../img/tee.png'
import { Icon, Label, Menu, Dropdown, Button, Modal, Embed } from 'semantic-ui-react'


class ShowCourse extends Component {
  state = {
    thisCourse: {},
    gps1: {},
    gps2: {},
    zoom: 0,
    desc: "",
    init: "c",
    weather: ""
  }

  componentDidMount () {
    console.log("**did mount**")
    const courseSelect = this.props.courses.find(course => course.id === parseInt(this.props.match.params.id))
    this.setState({
      thisCourse: courseSelect,
      gps1: {lat: courseSelect.lat, lng: courseSelect.lng},
      gps2: {lat: courseSelect.lat, lng: courseSelect.lng},
      zoom: 18,
      desc: "",
      init: "c",
      weather: ""
    })
  }

  componentDidUpdate (prevProps) {
    console.log("*** did update**")
    if (parseInt(this.props.match.params.id) !== parseInt(prevProps.match.params.id)){
      const courseSelect = this.props.courses.find(course => course.id === parseInt(this.props.match.params.id))
      this.setState({
        thisCourse: courseSelect,
        gps1: {lat: courseSelect.lat, lng: courseSelect.lng},
        gps2: {lat: courseSelect.lat, lng: courseSelect.lng},
        zoom: 18,
        desc: "",
        init: "c",
        weather: ""
      })
    }
  }

  selectFilter = (e, { value }) => {
    console.log("****", value)
    if (value === 'Clubhouse'){
      this.setState({
        gps1: {lat: this.state.thisCourse.lat, lng: this.state.thisCourse.lng},
        gps2: {lat: this.state.thisCourse.lat, lng: this.state.thisCourse.lng},
        zoom: 19,
        desc: "",
        init: "c"
      })
    } else {
      const hole = parseInt(value)
      console.log("hole selected", hole - 1)
      console.log(this.state.thisCourse.holes[hole - 1])
      const teeGps = {lat: this.state.thisCourse.holes[hole - 1].tee_lat, lng: this.state.thisCourse.holes[hole - 1].tee_lng}
      const greenGps = {lat: this.state.thisCourse.holes[hole - 1].green_lat, lng: this.state.thisCourse.holes[hole - 1].green_lng}
      const desc = ` Hole: ${hole}    Par  ${this.state.thisCourse.holes[hole - 1].par}   ${this.state.thisCourse.holes[hole - 1].yardage} yds`
      this.setState({
        gps1: teeGps,
        gps2: greenGps,
        zoom: 18,
        desc: desc,
        init: "h"
      })
    }
  }

  addToBucket = () => {
    const BUCKET_URL = 'http://localhost:3000/buckets'
    const reqObj = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        course_id: this.state.thisCourse.id,
        user_id: this.props.user.userId
      })
    }
    console.log("adding to bucket", this.props)
    fetch(BUCKET_URL, reqObj)
    .then(resp => resp.json())
    .then(data => {
      this.props.addBucket(data, this.state.thisCourse.name)
      this.props.history.push('/buckets')
    })
    
  }

  getWeather = (gps) => {
    const W_URL = "http://api.weatherapi.com/v1/current.json?key=0def2099dc364881957133838202806&q=" + gps
    fetch(W_URL)
    .then(resp => resp.json())
    .then(weather => {
      console.log("**weather**", weather)
      const weather_desc = `Temp: ${weather.current.temp_f}F | ${weather.current.condition.text} | Wind: ${weather.current.wind_mph}mph ${weather.current.wind_dir}`
      this.setState({
        weather: weather_desc
      })
    })
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
        value: '1'
      },  
      {
        key: 'Hole 2',
        text: 'Hole 2',
        value: '2'
      },   
      {
        key: 'Hole 3',
        text: 'Hole 3',
        value: '3'
      },   
      {
        key: 'Hole 4',
        text: 'Hole 4',
        value: '4'
      },   
      {
        key: 'Hole 5',
        text: 'Hole 5',
        value: '5'
      },   
      {
        key: 'Hole 6',
        text: 'Hole 6',
        value: '6'
      },   
      {
        key: 'Hole 7',
        text: 'Hole 7',
        value: '7'
      },   
      {
        key: 'Hole 8',
        text: 'Hole 8',
        value: '8'
      },   
      {
        key: 'Hole 9',
        text: 'Hole 9',
        value: '9'
      },   
      {
        key: 'Hole 10',
        text: 'Hole 10',
        value: '10'
      },   
      {
        key: 'Hole 11',
        text: 'Hole 11',
        value: '11'
      },   
      {
        key: 'Hole 12',
        text: 'Hole 12',
        value: '12'
      },  
      {
        key: 'Hole 13',
        text: 'Hole 13',
        value: '13'
      },
      {
        key: 'Hole 14',
        text: 'Hole 14',
        value: '14'
      },   
      {
        key: 'Hole 15',
        text: 'Hole 15',
        value: '15'
      },   
      {
        key: 'Hole 16',
        text: 'Hole 16',
        value: '16'
      },   
      {
        key: 'Hole 17',
        text: 'Hole 17',
        value: '17'
      },   
      {
        key: 'Hole 18',
        text: 'Hole 18',
        value: '18'
      },
    ]
    return (
      <div className="courses">
      <Navbar/>
      <Menu inverted color="olive"> 
   
        <Label size="medium">
        <Icon name='golf ball'/> 
          {this.state.desc}
        </Label>
      
        <Dropdown onChange={this.selectFilter} placeholder='Select Hole'
        fluid
        selection
        options={holeSeletion}
        style={{width: 140}}
        size='mini'
        value={this.state.init === "c" ? "Clubhouse" : null}
        />
        
        <Button
          inverted color="grey"
          size='mini'
          onClick={this.addToBucket}>
          Add to Bucket
        </Button> 
     
        <Modal trigger={<Button size='mini' floated='right' inverted color="grey">Watch video</Button>} closeIcon>
          <Modal.Content>
          <Embed
            id={this.state.thisCourse.video_id}
            placeholder={TeeIcon}
            source='youtube'
            />
          </Modal.Content>
        </Modal>
   
        <Modal size='tiny' trigger={<Button onClick={() => this.getWeather(`${this.state.thisCourse.lat},${this.state.thisCourse.lng}`)} size='mini' floated='right' inverted color="grey">Weather</Button>} closeIcon>
          <Modal.Content>
            <Label>{this.state.weather}</Label>
          </Modal.Content>
        </Modal>

        </Menu> 
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

export default connect(mapStateToProps, {addBucket})(ShowCourse) 