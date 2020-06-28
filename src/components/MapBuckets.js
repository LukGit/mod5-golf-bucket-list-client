import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import TeeIcon from '../img/tee.png'
import FlagIcon from '../img/flag.png'
import ClubIcon from '../img/club.png'
import { withRouter } from 'react-router-dom'

export class MapBuckets extends Component {
  state = {
    lat: 0,
    lng: 0,
    toTee: 0,
    toFlag: 0,
    polyPath: []
  }

  
  handleClick = (b_id) => {
    console.log("*******Clicked bucket map with id", b_id)
    this.props.history.push(`/buckets/${b_id}`)
  }

  render() {
    console.log("******in map", this.props)
    const opt = this.props.init

    return (
      <Map google={this.props.google} 
      zoom={4}
      initialCenter={{lat: 35.189631, lng: -79.467843}}
      >
        {this.props.buckets.map(b => {
          return <Marker
          position={{lat: b.course_lat, lng: b.course_lng }}
          onClick={() => this.handleClick(b.id)}
          ></Marker>
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