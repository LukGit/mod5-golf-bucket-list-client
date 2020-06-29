import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import TeeIcon from '../img/tee.png'
import { withRouter } from 'react-router-dom'

export class MapBuckets extends Component {
  
  handleClick = (b_id) => {
    this.props.history.push(`/buckets/${b_id}`)
  }

  render() {
    console.log("******in map", this.props)

    return (
      <Map google={this.props.google} 
      zoom={3}
      initialCenter={{lat: 41.014313, lng: -95.972535}}
      >
        {this.props.buckets.map(b => {
          return <Marker
          key={b.id}
          icon={TeeIcon}
          position={{lat: b.course_lat, lng: b.course_lng }}
          onClick={() => this.handleClick(b.id)}
          label={b.course}
          >
          </Marker>
        })}
        <InfoWindow >
            <div>
              <h1> </h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDAAA0HEZLvUa2hQ-54gAG5TXheH1-pEZY'
})(withRouter(MapBuckets))