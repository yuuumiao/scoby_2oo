import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import "../../styles/form.css";

import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import { objectToFormData } from "../Untils/formDataHelper";

class ItemForm extends Component {
  state = {
    name: "",
    description: "",
    category: "",
    quantity: 0,
  };

  static contextType = UserContext;
  imageRef = React.createRef();

  handleChange = (event) => {
    const key = event.target.name;
    let value =
      key == "quantity" ? parseInt(event.target.value) : event.target.value;
    this.setState({ [key]: value });
    // if the state is arranged in a deeper level to access, setState like this
    // this.setState({user: { ...this.state.user, [key]: value }});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    Object.entries(this.state).forEach(([key, value]) => {
      console.log("key-value", key, value);
      if (key === "location")
        fd.append(key["coordinates"], value["coordinates"]);
      else fd.append(key, value);
    });
    // for (const key in this.state) {

    // }

    // function buildFormData(formData, data, parentKey) {
    //   if (
    //     data &&
    //     typeof data === "object" &&
    //     !(data instanceof Date) &&
    //     !(data instanceof File)
    //   ) {
    //     Object.keys(data).forEach((key) => {
    //       buildFormData(
    //         formData,
    //         data[key],
    //         parentKey ? `${parentKey}[${key}]` : key
    //       );
    //     });
    //   } else {
    //     const value = data == null ? "" : data;
    //     formData.append(parentKey, value);
    //   }
    // }

    // buildFormData(fd, this.state, "location");
    // fd.append("location"["coordinates"], this.state.location.coordinates);

    fd.append("imageUrl", this.imageRef.current.files[0]);
    // for (var value of fd.values()) {console.log("-->", value);}
    // This is for check the data that submit in the form data

    apiHandler
      .createItems(fd)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // In order to send back the data to the client, since there is an input type file you have to send the
    // data as formdata.
    // The object that you'll be sending will maybe be a nested object, in order to handle nested objects in our form data
    // Check out the stackoverflow solution below : )

    // Nested object into formData by user Vladimir "Vladi vlad" Novopashin @stackoverflow : ) => https://stackoverflow.com/a/42483509
  };

  handlePlace = (place) => {
    // This handle is passed as a callback to the autocomplete component.
    // Take a look at the data and see what you can get from it.
    // Look at the item model to know what you should retrieve and set as state.
    // console.log(place);
    //   this.setState({
    //     user: {
    //       ...this.state.user,
    //       address: place.place_name,
    //       location: place.geometry,
    //     },
    //   });
    // }; //it worked for the nested arrangement, got modified after
    this.setState({
      address: place.place_name,
      location: place.geometry,
    });
  };

  render() {
    return (
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2 className="title">Add Item</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Item name
            </label>
            <input
              id="name"
              name="name"
              className="input"
              type="text"
              onChange={this.handleChange}
              placeholder="What are you giving away ?"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select
              id="category"
              defaultValue="-1"
              onChange={this.handleChange}
              name="category"
            >
              <option value="-1" disabled>
                Select a category
              </option>
              <option value="Plant">Plant</option>
              <option value="Kombucha">Kombucha</option>
              <option value="Vinegar">Vinegar</option>
              <option value="Kefir">Kefir</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="input"
              id="quantity"
              name="quantity"
              type="number"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <LocationAutoComplete onSelect={this.handlePlace} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="text-area"
              placeholder="Tell us something about this item"
              onChange={this.handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload image
            </label>
            <input
              className="input"
              id="image"
              type="file"
              name="image"
              ref={this.imageRef}
            />
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input type="radio" />
              user email
            </div>
            <input type="radio" />
            contact phone number
          </div>

          <p className="message">
            <img src="/media/info.svg" alt="info" />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>

          <button className="btn-submit">Add Item</button>
        </form>
      </div>
    );
  }
}

export default withRouter(ItemForm);
