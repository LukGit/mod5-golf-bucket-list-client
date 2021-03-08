import React, { Component } from 'react';
import Navbar from './Navbar';
import MapContainer from './MapContainer'
import { connect } from 'react-redux';
import { addBucket } from '../actions';
import Golfimg from '../img/golf.jpg'
import { Icon, Label, Menu, Dropdown, Button, Modal, Embed, Segment, Divider, Grid, Header, Item, Popup } from 'semantic-ui-react'

class ShowCourse extends Component {
  state = {
    thisCourse: {},
    gps1: {},
    gps2: {},
    zoom: 0,
    desc: "",
    init: "c",
    hole: "",
    inBkt: false,
    weatherLine1: [],
    weatherLine2: [],
    weatherLine3: [],
    weatherLine4: [],
    weatherLine5: [],
    weatherLine6: []
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
      const teeGps = {lat: this.state.thisCourse.holes[hole - 1].tee_lat, lng: this.state.thisCourse.holes[hole - 1].tee_lng}
      const greenGps = {lat: this.state.thisCourse.holes[hole - 1].green_lat, lng: this.state.thisCourse.holes[hole - 1].green_lng}
      const desc = ` Hole: ${hole} | Par  ${this.state.thisCourse.holes[hole - 1].par}   ${this.state.thisCourse.holes[hole - 1].yardage} yds`
      const holeInfo = `Hole ${hole}`
      this.setState({
        gps1: teeGps,
        gps2: greenGps,
        zoom: 17,
        desc: desc,
        init: "h",
        hole: holeInfo
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
  // https also works
  getWeather = (gps) => {
    // api key in .env file
    const W_URL = "https://api.weatherapi.com/v1/forecast.json?key=" + process.env.REACT_APP_WEATHER_API_KEY + "&days=3&q=" + gps
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    fetch(W_URL)
    .then(resp => resp.json())
    .then(weather => {
      let d = new Date(weather.forecast.forecastday[2].date)
      let n = d.getDay()
      const weatherLine1 = ["Current", "Today", "Tomorrow", weekdays[n]]
      const weatherLine2 = [weather.current.condition.text, weather.forecast.forecastday[0].day.condition.text,
      weather.forecast.forecastday[1].day.condition.text, weather.forecast.forecastday[2].day.condition.text]
      const weatherLine3 = [weather.current.condition.icon, weather.forecast.forecastday[0].day.condition.icon,
      weather.forecast.forecastday[1].day.condition.icon, weather.forecast.forecastday[2].day.condition.icon]
      const weatherLine4 = [`Wind: ${weather.current.wind_mph} ${weather.current.wind_dir}`, `Max wind: ${weather.forecast.forecastday[0].day.maxwind_mph}mph`,
      `Max wind: ${weather.forecast.forecastday[1].day.maxwind_mph}mph`, `Max wind: ${weather.forecast.forecastday[2].day.maxwind_mph}mph`]
      const weatherLine5 = [`Temp: ${weather.current.temp_f}F`, `High: ${weather.forecast.forecastday[0].day.maxtemp_f}F Low: ${weather.forecast.forecastday[0].day.mintemp_f}F`,
      `High: ${weather.forecast.forecastday[1].day.maxtemp_f}F Low: ${weather.forecast.forecastday[1].day.mintemp_f}F`,
      `High: ${weather.forecast.forecastday[2].day.maxtemp_f}F Low: ${weather.forecast.forecastday[2].day.mintemp_f}F`]
      const weatherLine6 = [`Feels like: ${weather.current.feelslike_f}F`, `Rain: ${weather.forecast.forecastday[0].day.daily_chance_of_rain}%`,
      `Rain: ${weather.forecast.forecastday[1].day.daily_chance_of_rain}%`, `Rain: ${weather.forecast.forecastday[2].day.daily_chance_of_rain}%`]
      this.setState({
        weatherLine1: weatherLine1,
        weatherLine2: weatherLine2,
        weatherLine3: weatherLine3,
        weatherLine4: weatherLine4,
        weatherLine5: weatherLine5,
        weatherLine6: weatherLine6
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
        value={this.state.init === "c" ? "Clubhouse" : this.state.holeInfo}
        />
        </Menu.Item>
        <Menu.Item>
        <Popup content='Click to add to bucket list' trigger={
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
        </Button>} /> 
        </Menu.Item>
  
        <Modal size='tiny' trigger={<Menu.Item>
          <Popup content='Click to see area weather forecast' trigger={
          <Button animated='fade' 
          onClick={() => this.getWeather(`${this.state.thisCourse.lat},${this.state.thisCourse.lng}`)} size='medium' floated='right' inverted color="grey">
            <Button.Content visible>
              <Icon name='sun'/>
              </Button.Content>
            <Button.Content hidden>
            Weather
            </Button.Content>
          </Button>} /></Menu.Item>} closeIcon>
          <Modal.Content>
            <Segment placeholder>
              <Grid columns={4} stackable textAlign='center'>
              <Divider vertical hidden ></Divider>
              <Grid.Row verticalAlign='middle'>
                <Grid.Column>
                  <Header>
                    {this.state.weatherLine1[0]}
                    </Header>
                  <Label>
                    {this.state.weatherLine2[0]}
                    </Label>
                  <Item>
                    <Item.Image src={this.state.weatherLine3[0]} size="tiny" />
                    </Item>  
                  <Label>
                    {this.state.weatherLine4[0]}
                    </Label>
                  <Label>
                    {this.state.weatherLine5[0]}
                    </Label>
                  <Label>
                    {this.state.weatherLine6[0]}
                    </Label>
                  </Grid.Column>
                <Grid.Column>
                  <Header>
                    {this.state.weatherLine1[1]}
                    </Header>
                  <Label>
                    {this.state.weatherLine2[1]}
                    </Label>
                  <Item>
                    <Item.Image src={this.state.weatherLine3[1]} size="tiny" />
                    </Item>  
                  <Label>
                    {this.state.weatherLine4[1]}
                    </Label>
                  <Label>
                    {this.state.weatherLine5[1]}
                    </Label>
                  <Label>
                    {this.state.weatherLine6[1]}
                    </Label>
                  </Grid.Column>
                <Grid.Column>
                  <Header>
                    {this.state.weatherLine1[2]}
                    </Header>
                  <Label>
                    {this.state.weatherLine2[2]}
                    </Label>
                  <Item>
                    <Item.Image src={this.state.weatherLine3[2]} size="tiny" />
                    </Item>  
                  <Label>
                    {this.state.weatherLine4[2]}
                    </Label>
                  <Label>
                    {this.state.weatherLine5[2]}
                    </Label>
                  <Label>
                    {this.state.weatherLine6[2]}
                    </Label>
                  </Grid.Column>
                <Grid.Column>
                  <Header>
                    {this.state.weatherLine1[3]}
                    </Header>
                  <Label>
                    {this.state.weatherLine2[3]}
                    </Label>
                  <Item>
                    <Item.Image src={this.state.weatherLine3[3]} size="tiny" />
                    </Item>  
                  <Label>
                    {this.state.weatherLine4[3]}
                    </Label>
                  <Label>
                    {this.state.weatherLine5[3]}
                    </Label>
                  <Label>
                    {this.state.weatherLine6[3]}
                    </Label>
                  </Grid.Column>
              </Grid.Row>
                </Grid>
             </Segment> 
          </Modal.Content>
        </Modal>
        
        <Modal trigger={<Menu.Item>
          <Popup content='Click to see a video of the course' trigger={
          <Button animated='fade' size='medium' position='right' inverted color="grey">
            <Button.Content visible>
              <Icon name='video camera'/>
              </Button.Content>
            <Button.Content hidden>
            Video
            </Button.Content>
          </Button>}/></Menu.Item>} closeIcon>
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