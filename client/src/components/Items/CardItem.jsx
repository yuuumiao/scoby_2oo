import React from 'react'

const CardItem = () => {
    return (
        <div className="CardItem">
        <h3>Your items</h3>
        <div className="item">
          <div className="round-image">
            <img
              src="https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100"
              alt="item"
            />
          </div>
          <div className="description">
            <h2>Name of item</h2>
            <h4>Quantity: 1 </h4>
            <p>Description of the item</p>
            <div className="buttons">
              <span>
                <button className="btn-secondary">Delete</button>
              </span>
              <span>
                <button className="btn-primary">Edit</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CardItem
