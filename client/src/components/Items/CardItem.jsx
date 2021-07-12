import React from "react";

const CardItem = ({
  name,
  quantity,
  description,
  image,
  handleDelete,
  handleEdit,
  id,
}) => {
  return (
    <div className="CardItem">
      {/* <h3>Your items</h3> */}
      <div className="item">
        <div className="round-image">
          <img src={image} alt="item" />
        </div>
        <div className="description">
          <h2>{name}</h2>
          <h4>Quantity: {quantity}</h4>
          <p>{description}</p>
          <div className="buttons">
            <span>
              <button className="btn-secondary" onClick={handleDelete(id)}>
                Delete
              </button>
            </span>
            <span>
              <button className="btn-primary" onClick={() => handleEdit(id)}>
                Edit
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
