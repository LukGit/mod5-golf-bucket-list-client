import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  render() {
   
    return (
      // <Map google={this.props.google} zoom={16}
      // initialCenter={this.props.gps}
      // >

      //   <Marker position={this.props.gps} 
      //           name='Riverbend Golf Complex'>
      //   </Marker>
      //   <InfoWindow >
      //       <div>
      //         <h1>Riverbend Golf Complex</h1>
      //       </div>
      //   </InfoWindow>
      // </Map>
      <Map google={this.props.google} 
        initialCenter={{lat: 30.194642, lng: -81.390868}}
        mapTypeId={'terrain'}
        zoom={18}>
        <Marker position={{lat: 30.194642, lng: -81.390868}} 
                name='Hole 17'>
        </Marker>  
    
        <InfoWindow >
            <div>
              <h1>Riverbend Golf Complex</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDAAA0HEZLvUa2hQ-54gAG5TXheH1-pEZY'
})(MapContainer)