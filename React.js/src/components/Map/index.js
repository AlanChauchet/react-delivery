// @flow

import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { compose } from 'redux';

const Map = compose(
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 48.86982, lng: 2.334579 }}
  >
    {!!props.markers && props.markers.map(({ id, ...markerProps }) => (
      <Marker {...markerProps} key={`marker-${id}`} />
    ))}
  </GoogleMap>
);

export default (props: any) => (
  <Map
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDpZRrw_D9XuzCiVLbUML-pOery7mWoOso"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100vh` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    {...props}
  />
)
