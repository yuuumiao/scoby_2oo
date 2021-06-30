import React from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

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

const kombuchaImg = new Image(20, 30);
kombuchaImg.src = "/media/kombucha.svg";

const kefirImg = new Image(20, 30);
kefirImg.src = "/media/kefir.svg";

const vinegarImg = new Image(20, 30);
vinegarImg.src = "/media/vinegar.svg";

const plantImg = new Image(20, 30);
plantImg.src = "/media/plant.svg";

class AppMap extends React.PureComponent {
  state = {
    lng: 2.349014, // Default lng and lat set to the center of paris.
    lat: 48.864716,
    zoom: 12, // used for map zoom level
  };

  // componentDidMount() {
  //   // Get users geo location and set it as the state so the map centers relative to the users current location. :)
  //   const success = (position) => {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;
  //     this.setState({ lat: latitude, lng: longitude });
  //   };

  //   const error = () => {
  //     console.log("An error occured geolocating user");
  //   };

  //   if (!navigator.geolocation) {
  //     console.log("Geolocation not supported");
  //   } else {
  //     navigator.geolocation.getCurrentPosition(success, error);
  //   }
  // }

  handleClick = (selectedItem) => {
    // Pass the selectedItem back to the parent.
    this.props.handleSelectItem(selectedItem);
  };

  render() {
    const kombuchas = this.props.items.filter(
      (item) => item.category[0] === "Kombucha"
    );

    const vinegars = this.props.items.filter(
      (item) => item.category[0] === "Vinegar"
    );

    const plants = this.props.items.filter(
      (item) => item.category[0] === "Plant"
    );

    console.log("plants", plants);

    // const kefirs = this.props.items.filter(
    //   (item) => item.category[0] === "Kefir"
    // );

    // const vinegarLayer = (
    //   <Layer
    //     type="symbol"
    //     id="vinegars"
    //     images={["vinegar-icon", vinegarImg]}
    //     layout={{ "icon-image": "vinegar-icon" }}
    //   >
    //     {vinegars.map((item, index) => (
    //       <Feature
    //         key={index}
    //         onClick={(event) => this.handleClick(item)}
    //         coordinates={item.location.coordinates}
    //       />
    //     ))}
    //   </Layer>
    // );

    // const plantLayer = (
    //   <Layer
    //     type="symbol"
    //     id="plants"
    //     images={["plant-icon", plantImg]}
    //     layout={{ "icon-image": "plant-icon" }}
    //   >
    //     {plants.map((item, index) => (
    //       <Feature
    //         key={index}
    //         onClick={(event) => this.handleClick(item)}
    //         coordinates={item.location.coordinates}
    //       />
    //     ))}
    //   </Layer>
    // );

    // const kombuchaLayer = (
    //   <Layer
    //     type="symbol"
    //     id="kombuchas"
    //     images={["kombucha-icon", kombuchaImg]}
    //     layout={{ "icon-image": "kombucha-icon" }}
    //   >
    //     {kombuchas.map((item, index) => (
    //       <Feature
    //         key={index}
    //         onClick={(event) => this.handleClick(item)}
    //         coordinates={item.location.coordinates}
    //       />
    //     ))}
    //   </Layer>
    // );

    // const kefirLayer = (
    //   <Layer
    //     type="symbol"
    //     id="kefirs"
    //     images={["kefir-icon", kefirImg]}
    //     layout={{ "icon-image": "kefir-icon" }}
    //   >
    //     {kefirs.map((item, index) => (
    //       <Feature
    //         key={index}
    //         onClick={(event) => this.handleClick(item)}
    //         coordinates={item.location.coordinates}
    //       />
    //     ))}
    //   </Layer>
    // );

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
        {/* {kombuchaLayer}
        {kefirLayer}
        {vinegarLayer} */}
        {plants.map((i) => {
          return (
            <Marker key={i._id} coordinates={i.location.coordinates}>
              <button>
                <img src="/media/plant.svg" alt="mapbox-marker-plant" />
                <p>plant</p>
              </button>
            </Marker>
          );
        })}
      </Map>
    );
  }
}

export default AppMap;
