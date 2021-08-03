import React from "react";
import withUser from "../Auth/withUser";

function FormPhoneNumber(props) {
  const { handleChange, addPhoneNumber, phoneNumber, context } = props;
  return (
    <div className="user-contact">
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
          {context.user.phoneNumber
            ? "Change phone number"
            : "Add phone number"}
        </button>
      </form>
    </div>
  );
}

export default withUser(FormPhoneNumber);
