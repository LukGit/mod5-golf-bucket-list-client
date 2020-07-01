import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import TeeIcon from '../img/tee.png'
import FlagIcon from '../img/flag.png'
import ClubIcon from '../img/club.png'

export class MapContainer extends Component {
  state = {
    lat: 0,
    lng: 0,
    toTee: 0,
    toFlag: 0,
    polyPath: []
  }

  // this function calculate distance between 2 gps locations in yards
  getDistanceBetweenPoints = (mk1, mk2) => {
    // The radius of the planet earth in meters
    console.log("calc dist", mk1, mk2)
    const lat1 = mk1.lat
    const lng1 = mk1.lng
    const lat2 = mk2.lat
    const lng2 = mk2.lng
    let R = 3958.8; //radius of earth in miles
    let dLat = (Math.PI/180)*(lat2 - lat1);
    let dLong = (Math.PI/180)*(lng2 - lng1);
    let a = Math.sin(dLat / 2)
            *
            Math.sin(dLat / 2) 
            +
            Math.cos((Math.PI/180)*(lat1)) 
            * 
            Math.cos((Math.PI/180)*(lat1)) 
            *
            Math.sin(dLong / 2) 
            * 
            Math.sin(dLong / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    return distance * 1760;
  }

  // this function handles when a point on map is clicked
  // if a hole was selected, it set local state with gps of the click point, the distance to tee and green, and polyline gps coordinances
  handleClick = (mapProps, map, clickEvent) => {
    if (this.props.init === "h"){
      const clickLoc = {lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng()}
      const dToTee = this.getDistanceBetweenPoints(this.props.gps1, clickLoc)
      const dToFlag = this.getDistanceBetweenPoints(this.props.gps2, clickLoc)
      const teeGps = {lat: Number(this.props.gps1.lat), lng: Number(this.props.gps1.lng)}
      const flagGps = {lat: Number(this.props.gps2.lat), lng: Number(this.props.gps2.lng)}
      
      this.setState({
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng(),
        toTee: dToTee,
        toFlag: dToFlag,
        polyPath: [teeGps, clickLoc, flagGps]
      })
    }
  }

  render() {
    const opt = this.props.init
    const d = this.getDistanceBetweenPoints(this.props.gps1, this.props.gps2)
    return (
      <Map google={this.props.google} 
      zoom={this.props.zoomLevel}
      initialCenter={this.props.gps1}
      center={this.props.gps1}
      onClick={this.handleClick}
      >
        {opt === "c" ? 
          <Marker position={this.props.gps1} 
            name=' '
            icon={ClubIcon}
            >
          </Marker> : 
          <Marker position={this.props.gps1} 
            name=' '
            icon={TeeIcon}
          >
          </Marker>
        }
        {opt === "c" ? 
          <Marker position={this.props.gps2} 
            name=' '
            icon={ClubIcon}
            >
          </Marker> : 
          <Marker position={this.props.gps2} 
            name=' '
            icon={FlagIcon}
            >
          </Marker>
        }
        {/* this marker will display when a point on map is clicked. it displays the distaince to tee and green */}
        <Marker position={this.state}
          label={`From tee: ${Math.floor(this.state.toTee)}yd \n To flag: ${Math.floor(this.state.toFlag)}yd`}/>
        {/* this polyline connects the click point to tee and green marker */}
        <Polyline 
        path={this.state.polyPath} 
        options={{
          geodesic: true,
          strokeColor: '#669DF6',
          strokeOpacity: 1.0,
          strokeWeight: 2,
        }}/>
        
        <InfoWindow >
            <div>
              <h1> </h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

// this is the apiKey generated on goople for maps
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDAAA0HEZLvUa2hQ-54gAG5TXheH1-pEZY'
})(MapContainer)