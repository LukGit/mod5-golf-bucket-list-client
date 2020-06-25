import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Segment, Grid, Button } from 'semantic-ui-react'



class BucketCard extends Component {

  render() {
    const bucket = this.props.bucket
    const link = `/buckets/${bucket.id}`
    const linkedit = `/bucket/edit/${bucket.id}`
    return (
      <div>
       <Grid>
         <Grid.Row centered>
          <Segment style={{width: 800}} inverted color="grey">
            <Segment raised inverted color="olive">
              {bucket.course}
          </Segment>   
          <Link to={link}>
            <Button size='mini'>
              <p>View</p>
            </Button>
          </Link> 
          <Link to={linkedit}>
            <Button size='mini'>
              <p>Edit</p>
            </Button>
          </Link> 
          </Segment>
          </Grid.Row>
          </Grid>
      </div>
    
    )
  }
}

export default BucketCard