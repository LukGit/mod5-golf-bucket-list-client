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
    handiNum: ""
  }

  componentDidMount () {
    const cSelect = this.props.courses.map(c => {
      return {key: `${c.id}`, text: c.name, value: `${c.id}`}
    })
    this.setState({
      foursomes: this.props.foursomes,
      courseList: cSelect
    })
  }
  handleChange = (event, {name, value}) => {
      console.log("*** date range", value)
      this.setState({ [name]: value });
  }

  blurDates = () => {
    
    const dateRanges = this.state.datesRange.split(" - ")
    const fromADate = new Date(dateRanges[0])
    const toADate = new Date(dateRanges[1])
    
    const myDates = this.props.foursomes.filter(f => {
      const fDate = new Date(f.play_date) 
      if (fDate >= fromADate && fDate <= toADate){
        return f
      }
    })
    this.setState({
      foursomes: myDates
    })

    // this.setState({ [name]: value });
}

  resetFilter = () => {
    this.setState({
      foursomes: this.props.foursomes,
      meOnly: false,
      datesRange: "",
      sCourse: "",
      handiNum: ""
    })
  }

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

  selectCourse = (e, { value }) => {
    // const cName = this.props.courses.find(f => f.id === parseInt(value)).name
    let filterF = []
    // if (this.state.meOnly) {
    //   const myFour = this.props.foursomes.filter(f => (f.player1_id === this.props.user.userId || f.player2_id === this.props.user.userId || f.player3_id === this.props.user.userId || f.player4_id === this.props.user.userId))
    //   filterF = myFour.filter(f => f.course_id === parseInt(value)) 
    // } else {
      filterF = this.props.foursomes.filter(f => f.course_id === parseInt(value))
    // }
    this.setState({
      foursomes: filterF
    })
  }

  selectHandicap = (e, { value }) => {
    const myHandiFour = this.props.foursomes.filter(f => Math.abs(f.handicap - parseInt(value)) <= 5)
    this.setState({
      foursomes: myHandiFour,
      handiNum: value
    })
  }

  updateThisFoursome = (updatedFoursome) => {
    console.log("updating foursome")
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

  removeThisFoursome = (removedFoursome) => {
    console.log("updating foursome")
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
    const handicapMin = [
      {
        key: '0',
        text: '0',
        value: '0'
      },
      {
        key: '5',
        text: '5',
        value: '5'
      },
      {
        key: '10',
        text: '10',
        value: '10'
      },
      {
        key: '15',
        text: '15',
        value: '15'
      },
      {
        key: '20',
        text: '20',
        value: '20'
      },
      {
        key: '25',
        text: '25',
        value: '25'
      }
    ]
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
          <Dropdown 
          fluid
          selection
          onChange={this.selectHandicap}
          options={handicapMin}
          style={{width: 120}}
          size='mini'
          placeholder='Min handicap'
          value={this.state.handiNum}
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
