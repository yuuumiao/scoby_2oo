import React from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

// Programatically create image objects with js that we'll pass later to the layers.
// The reason we need this is because the Layer component <images> prop takes as argument
// an array with as first argument a key, an HTMLImageElement.
// https://github.com/alex3165/react-mapbox-gl/blob/master/docs/API.md#layer
// images: [imageKey: string, image: HTMLImageElement, options: object] Also accepts array of the previous image tuple.
// Add images for use in layout with prop icon-image. The value should be the imageKey string of the tuple.
// Alternatively, use mapbox studio to upload the image, it will be fetched with the map style object. (see map.addImage options for the tuple options).

class AppMap extends React.PureComponent {
  state = {
    lng: 2.349014, // Default lng and lat set to the center of paris.
    lat: 48.864716,
    zoom: 12, // used for map zoom level
  };

  componentDidMount() {
    // Get users geo location and set it as the state so the map centers relative to the users current location. :)
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.setState({ lat: latitude, lng: longitude });
    };

    const error = () => {
      console.log("An error occured geolocating user");
    };

    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  handleClick = (selectedItem) => {
    // Pass the selectedItem back to the parent.
    this.props.handleSelectItem(selectedItem);
  };

  filterAndProductMarkersByCategroy = (arg) => {
    const Arg = arg.slice(0, 1).toUpperCase() + arg.slice(1).toLowerCase();
    return this.props.items
      .filter((item) => item.category[0] === Arg)
      .map((p) => (
        <Marker
          key={p._id}
          onClick={(event) => this.handleClick(p)}
          coordinates={p.location.coordinates}
          scale={3}
        >
          <button>
            <img
              src={`/media/${arg}.svg`}
              alt={`${arg}-marker`}
              style={{ width: "3vw", height: "auto" }}
            />
          </button>
        </Marker>
      ));
  };

  render() {
    const plantsMarkers = this.filterAndProductMarkersByCategroy("plant");
    return (
      <Map
        // eslint-disable-next-line
        style="mapbox://styles/mapbox/light-v10"
        zoom={[12]}
        containerStyle={{
          top: 1,
          left: 0,
          bottom: 1,
          right: 0,
          height: "100vh",
          width: "100vw",
        }}
        center={[this.state.lng, this.state.lat]}
      >
        {plantsMarkers}
        {/* {kombuchaLayer}
        {kefirLayer}
        {vinegarLayer} */}
      </Map>
    );
  }
}

export default AppMap;
