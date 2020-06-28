import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Segment, Grid, Button, Header, Icon } from 'semantic-ui-react'



class BucketCard extends Component {

  render() {
    const bucket = this.props.bucket
    const link = `/buckets/${bucket.id}`
    const linkedit = `/buckets/edit/${bucket.id}`
    return (
      <div>
       <Grid>
         <Grid.Row centered verticalAlign="middle">
         <Segment style={{width: 800}} inverted color="olive">
         <Header as="h3">{bucket.course} {bucket.played_on ? <Icon name="check circle"/> : null}</Header> 
            <Link to={link}>
            <Button size='mini' floated='center' inverted color="grey">
              <p>View</p>
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