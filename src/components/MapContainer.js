import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    console.log("******in map", this.props)
    const opt = this.props.init ? "initalCenter" : "center"
    return (
      <Map google={this.props.google} 
      zoom={this.props.zoomLevel}
      initialCenter={this.props.gps1}
      center={this.props.gps1}
      >

        <Marker position={this.props.gps1} 
                name=' '>
        </Marker>
        <Marker position={this.props.gps2} 
                name=' '>
        </Marker>
        <InfoWindow >
            <div>
              <h1> </h1>
            </div>
        </InfoWindow>
      </Map>
      // <Map google={this.props.google} 
      //   initialCenter={{lat: 30.194642, lng: -81.390868}}
      //   mapTypeId={'terrain'}
      //   zoom={18}>
      //   <Marker position={{lat: 30.194642, lng: -81.390868}} 
      //           name='Hole 17'>
      //   </Marker>  
    
      //   <InfoWindow >
      //       <div>
      //         <h1>Riverbend Golf Complex</h1>
      //       </div>
      //   </InfoWindow>
      // </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDAAA0HEZLvUa2hQ-54gAG5TXheH1-pEZY'
})(MapContainer)