import React from "react";

import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Home = (props) => {
  // Implement react map box here.
  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN
  });
  return (
    <div>
      <h1>MAPBOX MAP HERE</h1>
      <p>On home /</p>

      <Map
  style="mapbox://styles/mapbox/streets-v9"
  containerStyle={{
    height: '100vh',
    width: '100vw'
  }}
>
  <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
    <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
  </Layer>
</Map>;
    </div>
  );
};

export default Home;
