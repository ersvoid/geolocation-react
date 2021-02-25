import React, { Component } from 'react';
import './App.css';
import GeoData from './SpatialData/SpatialData';

class App extends Component {
  state = {
    gpsData: {
      lat: "",
      long: "",
      alt: "",
      acc: "",
      altAcc: "",
      head: "",
      speed: "",
      distTexasCap: "",
      distStarCafe: "",
      distSphinx: ""
    }
  }

  updateGPS = (lat, long, alt, acc, altAcc, head, speed) => {
    const distance = (lat1, lon1, lat2, lon2) => {
      const p = 0.017453292519943295;    // Math.PI / 180
      const c = Math.cos;
      const a = 0.5 - c((lat2 - lat1) * p)/2 +
              c(lat1 * p) * c(lat2 * p) *
              (1 - c((lon2 - lon1) * p))/2;

      return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }
    const distTexasCap = distance(lat, long, 30.274712, -97.740179).toFixed(2)
    const distStarCafe = distance(lat, long, 29.321298, -103.616760).toFixed(2)
    const distSphinx = distance(lat, long, 29.975287, 31.137818).toFixed(2)
    this.setState( {
      gpsData: {
        lat: lat,
        long: long,
        alt: alt,
        acc: acc,
        altAcc: altAcc,
        head: head,
        speed: speed,
        distTexasCap: distTexasCap,
        distStarCafe: distStarCafe,
        distSphinx: distSphinx
      }
    } )
  }

  geoFindMe = () => {

    const status = document.querySelector('.status');
    const mapLink = document.querySelector('.map-link');

    mapLink.href = '';
    mapLink.textContent = '';

    const success = (position) => {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      let altitude = position.coords.altitude;
      if (!altitude) {
        altitude = "---";
      }
      const accuracy = position.coords.accuracy;
      let altitudeAccuracy = position.coords.altitudeAccuracy;
      if (!altitudeAccuracy) {
        altitudeAccuracy = "---";
      }
      let heading = position.coords.heading;
      if (!heading) {
        heading = "---"
      } else {
        heading = String(heading) + " degrees";
      }
      let speed = position.coords.speed;
      if (!speed) {
        speed = "---";
      }

      status.textContent = '';
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
      this.updateGPS(latitude, longitude, altitude, accuracy, altitudeAccuracy,
        heading, speed);
    }

    const error = () => {
      status.textContent = 'Unable to retrieve your location';
    }

    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  render() {
  return (
    <div className="App">
      <h1>Geolocation React App</h1>
      <h2></h2>
      <button onClick={() => this.geoFindMe()}>Find Me</button>
      <p className= "status"></p>
      <a className= "map-link" target="_blank"></a>
      <GeoData
        lat={this.state.gpsData.lat}
        long={this.state.gpsData.long}
        alt={this.state.gpsData.alt}
        acc={this.state.gpsData.acc}
        altAcc={this.state.gpsData.altAcc}
        head={this.state.gpsData.head}
        speed={this.state.gpsData.speed}
        distTexasCap={this.state.gpsData.distTexasCap}
        distStarCafe={this.state.gpsData.distStarCafe}
        distSphinx={this.state.gpsData.distSphinx}
        />
    </div>
    );
  }
}

export default App;
