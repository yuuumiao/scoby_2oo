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
      <div className="item">
        <div className="round-image">
          <img src={image} alt="item" />
        </div>
        <div className="item-empty">
          <h2 className="description">{name}</h2>
          <h2 className="description">Quantity: {quantity}</h2>
          <p className="description">{description}</p>
          <div className="buttons">
            <span className="buttons">
              <button
                className="btn-secondary"
                onClick={() => handleDelete(id)}
              >
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
