import React from "react";
import "../../styles/ItemDisplay.css";
import withUser from "../Auth/withUser";

const ItemDisplay = (props) => {
  const { item, handleClose } = props;
  return (
    <div className="Item-container">
      <p onClick={handleClose} className="close-link">
        X
      </p>
      <div className="round-image">
        <img className="user-img" src={item.image} alt="item" />
      </div>
      <h2 className="title">{item.name}</h2>
      <div className="info">
        <span>Quantity: {item.quantity}</span> | <span>{item.category}</span>
      </div>
      <p className="description">{item.description}</p>
      <p className="location">{item.formattedAddress}</p>
      <div className="user-info">
        <div className="round-image-user">
          <img src={item.id_user.profileImg} alt="user" />
        </div>
        <span>Given away by {item.id_user.firstName}</span>
      </div>
      <div className="contact-information">
        Contact {item.id_user.firstName} at <b>{item.contact}</b>
      </div>
    </div>
  );
};

export default withUser(ItemDisplay);
