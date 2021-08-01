import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import "../../styles/ItemForm.css";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import UploadWidget from "../Untils/UploadWidget";
import { buildFormData } from "../Untils/index";
import FormPhoneNumber from "../Forms/FormPhoneNumber";
import Alert from "react-bootstrap/Alert";

class FormItemEdit extends Component {
  state = {
    httpResponse: null,
    error: null,
    displayFormPhone: false,
  };

  static contextType = UserContext;
  imageRef = React.createRef();
  // formRef = React.createRef();
  // locationRef = React.createRef();

  handleChange = (event) => {
    const key = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({ [key]: value });
  };

  handleFileSelect = (temporaryURL) => {
    this.setState({ selectedFile: temporaryURL });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    const { httpResponse, error, selectedFile, ...data } = this.state;
    buildFormData(fd, data);
    console.log(this.imageRef.current.files[0]);
    this.imageRef.current.files[0] &&
      fd.append("image", this.imageRef.current.files[0]);

    apiHandler
      .updateItems(this.props.item._id, fd)
      .then((res) => {
        console.log(res);
        this.props.updateItem(res);
        // this.formRef.current.reset();
        this.setState({
          httpResponse: {
            status: "success",
            message: "Item successfully added.",
          },
        });
        // this.locationRef.current.handleReset(); //reset the state in the child component
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 2000);
      })
      .catch((err) => {
        this.setState({
          httpResponse: {
            status: "danger",
            message: "An error occured, try again later.",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 2000);
      });
  };

  handlePlace = (place) => {
    this.setState({
      address: place.place_name,
      location: place.geometry,
    });
  };

  render() {
    const { httpResponse } = this.state;
    const { name, category, quantity, description, contact, address, image } =
      this.props.item;

    return (
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit} ref={this.formRef}>
          <p onClick={this.props.handleClose} className="close-link">
            X
          </p>
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
              defaultValue={name}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select
              id="category"
              onChange={this.handleChange}
              name="category"
              defaultValue={category[0]}
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
              defaultValue={quantity}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <LocationAutoComplete
              onSelect={this.handlePlace}
              ref={this.locationRef}
              defaultAddress={address}
            />
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
              defaultValue={description}
            ></textarea>
          </div>

          <div
            className="form-group"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <UploadWidget
              ref={this.imageRef}
              name="image"
              onFileSelect={this.handleFileSelect}
              className="UploadWidget-control"
            >
              Change a picture to upload
            </UploadWidget>
            <div className="upload-thumbnail-control uploaded">
              <p>Preview: current picture</p>
              {this.state.selectedFile ? (
                <img src={this.state.selectedFile} alt="selectedImage" />
              ) : (
                <img src={image} alt="selectedImage" />
              )}
            </div>
          </div>

          <h2 style={{ marginTop: "5%" }}>Contact information</h2>
          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input
                type="radio"
                name="contact"
                onChange={this.handleChange}
                // checked={this.state.contact === this.context.user.email}
                defaultChecked={contact === this.context.user.email}
                value={this.context.user.email}
              />
              <label>{this.context.user.email}</label>
            </div>
            {this.context.user.phoneNumber && (
              <div>
                <input
                  type="radio"
                  name="contact"
                  //   checked={this.state.contact === this.context.user.phoneNumber}
                  defaultChecked={contact === this.context.user.phoneNumber}
                  onChange={this.handleChange}
                  value={this.context.user.phoneNumber}
                />
                <label>{this.context.user.phoneNumber}</label>
              </div>
            )}
          </div>

          {!this.context.user.phoneNumber && (
            <Alert variant="info">
              Want to be contacted by phone?
              <button
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ displayFormPhone: true });
                }}
              >
                Add now
              </button>
              {this.state.displayFormPhone && (
                <FormPhoneNumber
                  handleChange={this.props.handleChange}
                  addPhoneNumber={this.props.addPhoneNumber}
                  phoneNumber={this.props.phoneNumber}
                />
              )}
            </Alert>
          )}
          {httpResponse && (
            <Alert variant={httpResponse.status}>{httpResponse.message}</Alert>
          )}

          <button className="btn-submit">Update Item</button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormItemEdit);
