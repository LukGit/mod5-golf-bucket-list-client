import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Segment, Grid, Button } from 'semantic-ui-react'



class CourseCard extends Component {

  render() {
    const course = this.props.course
    const link = `/courses/${course.id}`
    // const linkedit = `/bucket/edit/${bucket.id}`
    return (
      <div>
       <Grid>
         <Grid.Row centered>
          <Segment style={{width: 800 }} inverted color="light grey">
            <Segment raised inverted color="olive">
              {course.name}
            </Segment>   
          
          <Link to={link}>
            <Button size='mini' inverted color="olive">
              <p>Research</p>
            </Button>
          </Link> 
          {/* <Link to={linkedit}>
            <Button size='mini'>
              <p>Edit</p>
            </Button>
          </Link>  */}
          </Segment>
          </Grid.Row>
          </Grid>
      </div>
    
    )
  }
}

export default CourseCard