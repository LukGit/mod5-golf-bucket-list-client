import React, { Component } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { updateBucket } from '../actions';
import { Form, Grid, GridRow } from 'semantic-ui-react'

export class BucketEdit extends Component {
  state = {
    played_on: '',
    score: 0
  }

  // this is to set local state with played on date and score when component is initally loaded
  componentDidMount () {
    if (!this.props.userId){
      this.props.history.push('/login')
      return null
    } else {
      const bucketSelect = this.props.buckets.find(bucket => bucket.id === parseInt(this.props.match.params.id))
      this.setState({
        played_on: bucketSelect.played_on,
        score: bucketSelect.score
      })
    }
  }

  handleOnChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  // this is to send updated bucket info to backend to update
  handleOnSubmit = event => {
    event.preventDefault();
    const BUCKET_URL = `http://localhost:3000/buckets/${this.props.match.params.id}`
    const reqObj = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        played_on: this.state.played_on,
        score: this.state.score
      })
    }
    fetch(BUCKET_URL, reqObj)
    .then(resp => resp.json())
    .then(bucketData => {
      this.props.updateBucket(bucketData)
      this.props.history.push('/buckets')
    })
  }

  render() {
    return (
      <div>
        <Navbar />
        <Grid>
          <GridRow centered>
          <Form onSubmit={this.handleOnSubmit} style={{width: 600}}>
            <Form.Field>
              <label>Played On</label>
                <input
                  type="date"
                  name="played_on"
                  value={this.state.played_on}
                  onChange={this.handleOnChange}
                />
            </Form.Field>
            <Form.Field>
              <label>Score</label>
                <input
                  type="text"
                  name="score"
                  value={this.state.score}
                  onChange={this.handleOnChange}
                />
            </Form.Field>
            <Form.Button inverted color="grey">
              Check off
            </Form.Button>
          </Form>
          </GridRow>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    userId: state.users.userId,
    buckets: state.buckets 
  }
}

export default connect(mapStateToProps, {updateBucket})(BucketEdit)

