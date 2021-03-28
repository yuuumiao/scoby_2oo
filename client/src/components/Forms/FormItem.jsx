import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import "../../styles/form.css";

import apiHandler from "../../api/apiHandler"
import { withRouter } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider"

class ItemForm extends Component {
  state = {
    user: {
        name: "",
        description: "",
        category: "",
        quantity: 0, 

    }
  };


  static contextType = AuthContext; 
  // Subscribe to the context from a class
  imageRef = React.createRef();


  handleChange = (event) => {
    let value

    const key = event.target.name
    // if (key == "quantity"){
    //   value = Number(event.target.value)
    // }else if (key == "catagory"){
    //   value = event.target.value.split()
    // }
    value = event.target.value

    this.setState({
      user: {...this.state.user, [key]: value}
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Wax On Wax Off");

    const fd = new FormData();

    // for (let key in this.state.user) {
    //   fd.append(key, this.state[key]);
    // }

    fd.append("name", this.state.user.name);
    fd.append("quantity", Number(this.state.user.quantity));
    fd.append("desciption", this.state.user.desciption);
    fd.append("address", this.state.user.address);

    this.state.user.category === undefined ? fd.append("category", ["Plant"])
    : fd.append("category", this.state.user.category.split())

    fd.append("imageUrl", this.imageRef.current.files[0]);
    // console.log("submitting", this.context)
    
    console.log(this.imageRef.current.files[0]);
  //   for (var value of fd.values()) {
  //     console.log("-->",value);
  //  }

    apiHandler.createItems(fd)
    .then((res) => console.log(res))
    .catch(err => console.log(err))

 
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
    console.log(place);
    this.setState({user:
      {...this.state.user, address: place.place_name}
    })

  };

  render() {
    return (
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2 className="title">Add Item</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
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

            <select id="category" defaultValue="-1" onChange={this.handleChange} name="category">
              <option value="-1" disabled  
>
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
            <input className="input" id="quantity"  name="quantity" type="number" onChange={this.handleChange}/>
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
            <input className="input" id="image" type="file"  name="image" ref={this.imageRef} />
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

export default withRouter (ItemForm);
