import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import ShowFoursome from './ShowFoursome'
import { Header, Grid, Menu, Button, Checkbox, Dropdown } from 'semantic-ui-react'
// import NumberPicker from 'semantic-ui-react-numberpicker'
import { DatesRangeInput } from 'semantic-ui-calendar-react'

class Foursomes extends Component {
  state = {
    foursomes: [],
    meOnly: false,
    courseList:[],
    datesRange: "",
    sCourse: "",
    applyHandicap: false
  }

  // this is to load all the foursomes and the available courses in state when component is mounted
  componentDidMount () {
    const cSelect = this.props.courses.map(c => {
      return {key: `${c.id}`, text: c.name, value: `${c.id}`}
    })
    this.setState({
      foursomes: this.props.foursomes,
      courseList: cSelect
    })
  }
  // this handle the change in date range values
  handleChange = (event, {name, value}) => {
      this.setState({ [name]: value });
  }

  // this function executes when user is off focus from date range picker
  // it filters the foursome list by the date range
  blurDates = () => {
    
    const dateRanges = this.state.datesRange.split(" - ")
    const fromADate = new Date(dateRanges[0])
    let userTimezoneOffset = fromADate.getTimezoneOffset() * 60000
    const offsetfromADate = new Date(fromADate.getTime() + userTimezoneOffset)
    const toADate = new Date(dateRanges[1])
    userTimezoneOffset = toADate.getTimezoneOffset() * 60000
    const offsettoADate = new Date(toADate.getTime() + userTimezoneOffset)
    
    const myDates = this.props.foursomes.filter(f => {
      const fDate = new Date(f.play_date) 
      userTimezoneOffset = fDate.getTimezoneOffset() * 60000
      const offsetfDate = new Date(fDate.getTime() + userTimezoneOffset)
      if (offsetfDate > offsetfromADate && offsetfDate <= offsettoADate){
        return f
      } else {
        return null
      }
    })
    this.setState({
      foursomes: myDates
    })
}

  // this reset the filtered foursome lists to all
  resetFilter = () => {
    this.setState({
      foursomes: this.props.foursomes,
      meOnly: false,
      datesRange: "",
      sCourse: "Filter Course",
      applyHandicap: false
    })
  }

  // this filtered the list to those user is playing
  handleMeOnly = (e, { checked }) => {
    let newFour = this.props.foursomes
    if (checked) {
      newFour = this.props.foursomes.filter(f => (f.player1_id === this.props.user.userId || f.player2_id === this.props.user.userId || f.player3_id === this.props.user.userId || f.player4_id === this.props.user.userId))
    }
    this.setState({
      foursomes: newFour,
      meOnly: checked
    })
  }

  // this filter the list by the selected course
  selectCourse = (e, { value }) => {
    console.log("event", e, "value", value)
    let filterF = []
    filterF = this.props.foursomes.filter(f => f.course_id === parseInt(value))
    const courseSelect = this.props.courses.filter(c => c.course_id === value)
    this.setState({
      foursomes: filterF,
      sCourse: courseSelect.name
    })
  }

  // this filter the list by handicap value - 3 of either side of handicap
  selectHandicap = (e, { checked }) => {
    let myHandiFour = this.props.foursomes
    if (checked) {
      myHandiFour = this.props.foursomes.filter(f => Math.abs(f.handicap - this.props.user.handicap) <= 3)
    }
    this.setState({
      foursomes: myHandiFour,
      applyHandicap: checked
    })
  }

  // this update the foursome in the list when user join or leave
  // this function is passed to the ShowFoursome class as prop
  updateThisFoursome = (updatedFoursome) => {
    const indexU = this.state.foursomes.findIndex(foursome => foursome.id === updatedFoursome.id)
    const newF = [
      ...this.state.foursomes.slice(0, indexU),
      updatedFoursome,
      ...this.state.foursomes.slice(indexU + 1)
    ]
    let newFour = []
    if (this.state.meOnly) {
      newFour = newF.filter(f => (f.player1_id === this.props.user.userId || f.player2_id === this.props.user.userId || f.player3_id === this.props.user.userId || f.player4_id === this.props.user.userId))
    } else {
      newFour = newF
    }
    this.setState({
      foursomes: newFour
    })
  }

  // this remove the foursome from the list after user clicks remove
  // this function is passed to the ShowFoursome class as prop
  removeThisFoursome = (removedFoursome) => {
    const indexU = this.state.foursomes.findIndex(foursome => foursome.id === removedFoursome.id)
    const newF = [
      ...this.state.foursomes.slice(0, indexU),
      ...this.state.foursomes.slice(indexU + 1)
    ]
    this.setState({
      foursomes: newF
    })
  }


  // this shows the NavBar and the MapBuckets which is also passed the bucket items to display on map
  render() {
    if (!this.props.user.user){
      this.props.history.push('/login')
      return null
    }
    const sortedF = this.state.foursomes.sort((a,b) => {
      let dateA = a.play_date
      let dateB = b.play_date
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    })
    return (
      
      <div className="courses">
        <Navbar/>
        <Menu size='mini' inverted color='olive'>
          <Menu.Item>
            <Checkbox 
              checked={this.state.meOnly}
              label='Me playing'
              onClick={this.handleMeOnly}
            />
          </Menu.Item>
          <Menu.Item >
          {/* this dropdown list all the courses available */}
          <Dropdown 
          fluid
          selection
          search
          onChange={this.selectCourse}
          options={this.state.courseList}
          style={{width: 200}}
          size='mini'
          placeholder='Filter Course'
          value={this.state.sCourse}
          />
        </Menu.Item> 
        {/* <Menu.Item>
          <NumberPicker style={{width: 100}} min={0} placeholder='min handicap'/>
        </Menu.Item> */}
         <Menu.Item >
          {/* this dropdown list all the courses available */}
          <Checkbox 
              checked={this.state.applyHandicap}
              label='Apply handicap'
              onClick={this.selectHandicap}
            />
          </Menu.Item>
          <Menu.Item>
            <DatesRangeInput
            name="datesRange"
            placeholder="From - To"
            value={this.state.datesRange}
            iconPosition="left"
            onChange={this.handleChange}
            dateFormat={"MM/DD/YYYY"}
            onBlur={this.blurDates}
            style={{width: 180}}
          />
          </Menu.Item>
          <Menu.Item>
            <Button size='mini' onClick={this.resetFilter} inverted color='grey'>
              Reset
             </Button> 
          </Menu.Item>  
        </Menu>
        {sortedF.length > 0 ? 
        <Header inverted size='medium'> 
        {/* <Icon name='add user'/> */}
        {this.props.user.user}, Here are the foursomes!
        </Header> : 
        <Header inverted size='medium'> 
        {/* <Icon name='add user'/> */}
        There are no foursomes found!
        </Header>
        }
        <br></br> 
        {/* {this.props.buckets.map(bucket => <BucketCard bucket={bucket} key={bucket.id}/>)} */}
        <Grid columns="4">
        {sortedF.map(fSome => {
          return <ShowFoursome foursome={fSome} key={fSome.id} updateThisFoursome={this.updateThisFoursome} removeThisFoursome={this.removeThisFoursome}/>
        })}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    courses: state.courses,
    foursomes: state.foursomes,
    user: state.users
   }
}

export default connect(mapStateToProps)(Foursomes)
