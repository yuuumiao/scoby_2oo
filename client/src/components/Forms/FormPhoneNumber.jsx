import React from "react";

function FormPhoneNumber({ handleChange, addPhoneNumber, phoneNumber }) {
  return (
    <div className="user-contact">
      <h4>{phoneNumber ? "Change phone number" : "Add phone number"}</h4>

      <form className="form" onSubmit={addPhoneNumber}>
        <div className="form-group">
          <label className="label" htmlFor="phoneNumber">
            Phone number
          </label>
          <input
            className="input"
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            placeholder="Add phone number"
            value={phoneNumber}
            onChange={handleChange}
          />
        </div>
        <button className="form__button">
          {phoneNumber ? "Change phone number" : "Add phone number"}
        </button>
      </form>
    </div>
  );
}

export default FormPhoneNumber;
