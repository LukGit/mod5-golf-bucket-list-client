import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import TeeIcon from '../img/tee.png'
import { withRouter } from 'react-router-dom'
import { Label } from 'semantic-ui-react'

export class MapBuckets extends Component {
  state = {
    mouseMarker: '',
    showInfo: false,
    showName: ''
  }
  //this redirects to the bucket item page when bucket item on map is clicked
  handleClick = (b_id) => {
    this.props.history.push(`/buckets/${b_id}`)
  }

  onMouseoverMarker = (props, marker, e) => {
    this.setState({
      mouseMarker: marker,
      showInfo: true,
      showName: marker.label
    })
  }
  // this shows a map with all the bucket items as markers on map
  // each bucket item from store is mapped to a marker on map based on gps of item course
  render() {
    
    return (
      <Map google={this.props.google} 
      zoom={3}
      initialCenter={{lat: 25.014313, lng: -95.972535}}
      >
        {this.props.buckets.map(b => {
          return <Marker
          key={b.id}
          icon={TeeIcon}
          position={{lat: b.course_lat, lng: b.course_lng }}
          onClick={() => this.handleClick(b.id)}
          // commented out because onclick and onmousemove don't work well together.
          // onMouseover={this.onMouseoverMarker}
          label={b.course}>
          </Marker>
        })}
        {/* finally got infowindow to work. marker set the item infowindow will show for */}
        <InfoWindow
          marker={this.state.mouseMarker}
          visible={this.state.showInfo}
          >
            <Label>{this.state.showName}</Label>
            </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDAAA0HEZLvUa2hQ-54gAG5TXheH1-pEZY'
})(withRouter(MapBuckets))