import React, { Component } from 'react';
import Navbar from './Navbar';
import MapContainer from './MapContainer'
import { connect } from 'react-redux';
import { addBucket } from '../actions';
import Golfimg from '../img/golf.jpg'
import { Icon, Label, Menu, Dropdown, Button, Modal, Embed } from 'semantic-ui-react'


class ShowCourse extends Component {
  state = {
    thisCourse: {},
    gps1: {},
    gps2: {},
    zoom: 0,
    desc: "",
    init: "c",
    weather: "",
    inBkt: false
  }

  // when the component is initially loaded, set local state with course, gps, weather, and other info
  componentDidMount () {
    if (!this.props.user.user){
      this.props.history.push('/login')
      return null
    }
    const courseSelect = this.props.courses.find(course => course.id === parseInt(this.props.match.params.id))
    // see if course is already in bucket list
    const foundB = this.inBucket(courseSelect)
    this.setState({
      thisCourse: courseSelect,
      gps1: {lat: courseSelect.lat, lng: courseSelect.lng},
      gps2: {lat: courseSelect.lat, lng: courseSelect.lng},
      zoom: 19,
      desc: "",
      init: "c",
      weather: "",
      inBkt: foundB
    })
  }

  // this is called when user select a different course from dropdown
  componentDidUpdate (prevProps) {
    // if a different course, reload state with correct information
    if (parseInt(this.props.match.params.id) !== parseInt(prevProps.match.params.id)){
      const courseSelect = this.props.courses.find(course => course.id === parseInt(this.props.match.params.id))
      const foundB = this.inBucket(courseSelect)
      this.setState({
        thisCourse: courseSelect,
        gps1: {lat: courseSelect.lat, lng: courseSelect.lng},
        gps2: {lat: courseSelect.lat, lng: courseSelect.lng},
        zoom: 19,
        desc: "",
        init: "c",
        weather: "",
        inBkt: foundB
      })
    }
  }

  // this is called when use select different hole from the dropdown
  selectFilter = (e, { value }) => {
    if (value === 'Clubhouse'){
      // set clubhose gps
      this.setState({
        gps1: {lat: this.state.thisCourse.lat, lng: this.state.thisCourse.lng},
        gps2: {lat: this.state.thisCourse.lat, lng: this.state.thisCourse.lng},
        zoom: 19,
        desc: "",
        init: "c"
      })
    } else {
      //set tee and green gps
      const hole = parseInt(value)
      console.log("hole selected", hole - 1)
      console.log(this.state.thisCourse.holes[hole - 1])
      const teeGps = {lat: this.state.thisCourse.holes[hole - 1].tee_lat, lng: this.state.thisCourse.holes[hole - 1].tee_lng}
      const greenGps = {lat: this.state.thisCourse.holes[hole - 1].green_lat, lng: this.state.thisCourse.holes[hole - 1].green_lng}
      const desc = ` Hole: ${hole}    Par  ${this.state.thisCourse.holes[hole - 1].par}   ${this.state.thisCourse.holes[hole - 1].yardage} yds`
      this.setState({
        gps1: teeGps,
        gps2: greenGps,
        zoom: 17,
        desc: desc,
        init: "h"
      })
    }
  }

  // this is called when user add the course to bucket list
  addToBucket = () => {
    const BUCKET_URL = 'http://localhost:3000/buckets'
    const reqObj = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        course_id: this.state.thisCourse.id,
        user_id: this.props.user.userId
      })
    }
    // post course id and user id to buckets path to add bucket
    fetch(BUCKET_URL, reqObj)
    .then(resp => resp.json())
    .then(data => {
      this.props.addBucket(data, this.state.thisCourse.name)
      this.props.history.push('/buckets')
    })
    
  }

  // this is called to obtain weather data from api based on gps location
  getWeather = (gps) => {
    const W_URL = "http://api.weatherapi.com/v1/current.json?key=0def2099dc364881957133838202806&q=" + gps
    fetch(W_URL)
    .then(resp => resp.json())
    .then(weather => {
      const weather_desc = `Temp: ${weather.current.temp_f}F | ${weather.current.condition.text} | Humidity: ${weather.current.humidity}% | Wind: ${weather.current.wind_mph}mph ${weather.current.wind_dir} | Gust: ${weather.current.gust_mph}mph`
      this.setState({
        weather: weather_desc
      })
    })
  }

  // this function determines if the course is already in bucket list
  inBucket = (course) => {
    if (this.props.buckets.find(b =>  b.course_id === course.id)) {
      return true
    } else {
      return false
    }
  }

  render () {
    if (!this.props.user.user){
      this.props.history.push('/login')
      return null
    }
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
      <Menu size='mini' inverted color="olive"> 
        <Menu.Item>
        <Label size="large">
        <Icon name='golf ball'/> 
          {this.state.desc}
        </Label>
        </Menu.Item>
        <Menu.Item>
        <Dropdown onChange={this.selectFilter} placeholder='Select Hole'
        fluid
        selection
        options={holeSeletion}
        style={{width: 140}}
        size='mini'
        value={this.state.init === "c" ? "Clubhouse" : null}
        />
        </Menu.Item>
        <Menu.Item>
        <Button
          animated='fade'
          disabled={this.state.inBkt}
          inverted color="grey"
          size='medium'
          onClick={this.addToBucket}>
          <Button.Content visible>
            <Icon name='bitbucket square'/>
          </Button.Content>
          <Button.Content hidden>
          Add
          </Button.Content>
        </Button> 
        </Menu.Item>
  
        <Modal size='tiny' trigger={<Menu.Item>
          <Button animated='fade' onClick={() => this.getWeather(`${this.state.thisCourse.lat},${this.state.thisCourse.lng}`)} size='medium' floated='right' inverted color="grey">
            <Button.Content visible>
              <Icon name='sun'/>
              </Button.Content>
            <Button.Content hidden>
            Weather
            </Button.Content>
          </Button></Menu.Item>} closeIcon>
          <Modal.Content>
            <Label>{this.state.weather}</Label>
          </Modal.Content>
        </Modal>
        
        <Modal trigger={<Menu.Item>
          <Button animated='fade' size='medium' position='right' inverted color="grey">
            <Button.Content visible>
              <Icon name='video camera'/>
              </Button.Content>
            <Button.Content hidden>
            Video
            </Button.Content>
          </Button></Menu.Item>} closeIcon>
          <Modal.Content>
          <Embed
            id={this.state.thisCourse.video_id}
            placeholder={Golfimg}
            source='youtube'
            />
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
    user: state.users,
    buckets: state.buckets
   }
}

export default connect(mapStateToProps, {addBucket})(ShowCourse) 