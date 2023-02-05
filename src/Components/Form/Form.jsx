import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Form.css";

export const Form = ({ updateProfiles }) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    uniqueID: uuidv4(),
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [allowSubmit, setAllowSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValues({ ...formValues, uniqueID: uuidv4() });
    setFormErrors(validate(formValues));
  };

  if (allowSubmit) {
    updateProfiles(formValues);
    setFormValues(initialValues);
    setAllowSubmit(false);
  }

  const validate = (input) => {
    let err = {};
    const REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const { firstName, lastName, email } = input;

    if (!firstName.trim()) {
      err.firstNameError = "first name is required";
    }
    if (!lastName.trim()) {
      err.lastNameError = "last name is required";
    }
    if (!email) {
      err.emailError = "Email is required!";
    }
    if (!REGEX.test(email)) {
      err.emailError = "This is not a valid email format!";
    }
    if (Object.keys(err).length === 0) {
      setAllowSubmit(true);
    }
    return err;
  };

  const { firstNameError, lastNameError, emailError } = formErrors;
  const { firstName, lastName, email } = formValues;

  return (
    <form className="col-3" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="inputFirstName">First Name</label>
        <br></br>
        <input
          type="text"
          name="firstName"
          className="form-control"
          id="inputFirstName"
          placeholder="Your Name"
          value={firstName}
          onChange={handleChange}
        />
      </div>
      {firstNameError && <p className="errorStatement">{firstNameError}</p>}
      <br></br>
      <div className="form-group">
        <label htmlFor="inputLastName">Last Name</label>
        <br></br>
        <input
          type="text"
          name="lastName"
          className="form-control"
          id="inputLastName"
          placeholder="Your Last Name"
          value={lastName}
          onChange={handleChange}
        />
      </div>
      {lastNameError && <p className="errorStatement">{lastNameError}</p>}
      <br></br>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <br></br>
        <input
          type="text"
          name="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={email}
          onChange={handleChange}
        />
      </div>
      {emailError && <p className="errorStatement">{emailError}</p>}
      <br></br>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
