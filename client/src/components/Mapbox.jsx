import React, { useState, useEffect } from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

function AppMap({ items, handleStateItem }) {
  const [viewPoint, setViewPoint] = useState({
    latitude: 48.864716,
    longitude: 2.349014,
    height: "100vw",
    height: "100vh",
    zoom: 12,
  });

  return (
    <div>
      <ReactMapboxGl
        {...viewPoint}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        // mapStyle="mapbox://styles/yuuumiao/ckqi8cf160h5317mnmdf6f9z6"
        onViewportChange={(viewport) => setViewPoint(viewport)}
      >
        <Marker latitude={48.864716} longitude={2.349014}>
          <button className="marker-map">
            <img src="/media/plant.svg" alt="marker map" />
          </button>
        </Marker>
      </ReactMapboxGl>
    </div>
  );
}
