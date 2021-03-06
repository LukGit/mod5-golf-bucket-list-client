import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper, Polyline, InfoWindow} from 'google-maps-react';
import TeeIcon from '../img/tee.png'
import FlagIcon from '../img/flag.png'
import ClubIcon from '../img/club.png'
import CartIcon from '../img/golfcart.png'
import GolferIcon from '../img/golfer.png'
import { Item } from 'semantic-ui-react'

export class MapContainer extends Component {
  state = {
    lat: 0,
    lng: 0,
    toTee: 0,
    toFlag: 0,
    icon: CartIcon,
    polyPath: [],
    showInfo: false
  }

  // this is to clear last hole's marker, polyline, and the infowindow flag
  componentDidUpdate (preProps) {
    
    if (this.props.gps1 !== preProps.gps1){
      this.setState({
        lat: 0,
        lng: 0,
        polyPath: [],
        showInfo: false
      })
    }

  }

  // this function calculate distance between 2 gps locations in yards
  getDistanceBetweenPoints = (mk1, mk2) => {
    // The radius of the planet earth in meters
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
      const markerIcon = (dToFlag > 45 ? CartIcon : GolferIcon)
      this.setState({
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng(),
        toTee: dToTee,
        toFlag: dToFlag,
        polyPath: [teeGps, clickLoc, flagGps],
        icon: markerIcon
      })
    }
  }

  // this function is for setting the infowindow flag to true when user mouseover the marker
  mouseMarker = (props, marker, e) => {
    this.setState({
      showInfo: true
    })
  }

  render() {
    const opt = this.props.init
    const center = {lat: (Number(this.props.gps1.lat) + Number(this.props.gps2.lat)) / 2, lng: (Number(this.props.gps1.lng) + Number(this.props.gps2.lng)) / 2}
    return (
      <Map google={this.props.google} 
      zoom={this.props.zoomLevel}
      initialCenter={center}
      center={center}
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
          null : 
          <Marker position={this.props.gps2} 
            name=' '
            icon={FlagIcon}
            >
          </Marker>
        }
        {/* this marker will display when a point on map is clicked. it displays the distaince to tee and green */}
        {/* use mouseover event to display the from tee and to flag yardage */}
        <Marker position={this.state}
          icon={this.state.icon}
          onMouseover={this.mouseMarker}
          />
        {/* this polyline connects the click point to tee and green marker */}
        <Polyline
        path={this.state.polyPath} 
        options={{
          geodesic: true,
          strokeColor: '#669DF6',
          strokeOpacity: 1.0,
          strokeWeight: 2,
        }}/> 
        <InfoWindow
          position={this.state}
          visible={this.state.showInfo}
          >
            <Item.Group>
              <Item>
               <Item.Content> 
                <Item.Header>To Flag:</Item.Header>
              </Item.Content>
              <Item.Content content={` ${Math.floor(this.state.toFlag)} yd`}/>
              </Item>
              <Item>
               <Item.Content> 
              <Item.Header>From Tee:</Item.Header>
              </Item.Content>
              <Item.Content content={` ${Math.floor(this.state.toTee)} yd`}/>
              </Item>
              </Item.Group>
            </InfoWindow>
      </Map>
    );
  }
}

// this is the apiKey generated on goople for maps
// api key in .env file
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer)