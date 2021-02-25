import React from 'react';

const geoData = (props) => {
    return (
      <div className="spatialInfo">
        <p>Latitude: {props.lat}</p>
        <p>Longitude: {props.long}</p>
        <p>Altitude: {props.alt} meters (RSL)</p>
        <p>Accuracy: {props.acc} meters</p>
        <p>Altitude Accuracy: {props.altAcc} meters</p>
        <p>Heading: {props.head}</p>
        <p>Speed: {props.speed} m/s</p>
        <p>Distance to Texas Capitol Building: {props.distTexasCap} km</p>
        <p>Distance to Starlight Cafe in Terlingua: {props.distStarCafe} km</p>
        <p>Distance to the Great Sphinx: {props.distSphinx} km</p>
        <p />
        <em>Distances calculated using Haversine formula</em>
        <p />
      </div>
    );
};

export default geoData;
