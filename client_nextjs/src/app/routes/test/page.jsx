/* eslint-disable react/prop-types */
'use client'
import React, { useState, useEffect } from "react";
import "./css.css";
// import OtherDetails from "./OtherDetails";

const Page = () => {
  const [halfDetailCheck, setHalfDetailCheck] = useState(false);
  const [input, setInput] = useState({
    username: "",
    password: "",
    phone: "",
    profession: "",
    city: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const errors = validate(input);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setHalfDetailCheck(true); // This sets the state to show the next step
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!values.phone) {
      errors.phone = "Phone Number is required.";
    } else if (values.phone.length !== 10) {
      errors.phone = "Phone Number must be of 10 digits.";
    }
    if (!values.password) {
      errors.password = "Password is required.";
    }
    if (!values.username) {
      errors.username = "Username is required.";
    } else if (values.username.length < 3) {
      errors.username = "Username must be at least 3 characters long.";
    }
    return errors;
  };

  return (
    <div className="register_provider_bg">
    <div className="multiStepForm-container">
      <header className="multiStepForm-header">Register Here</header>
      <div className={`multiStepForm-progress-bar ${halfDetailCheck ? 'active' : ''}`}>
        {["Personal Details", "Professional Details"].map((step, index) => (
          <div
            className={`multiStepForm-step ${
              index === 0 && !halfDetailCheck ? "active" : (index === 1 && halfDetailCheck ? "active" : "")
            }`}
            key={index}
          >
            <p>{step}</p>
            <div
              className={`multiStepForm-bullet ${
                index === 0 && !halfDetailCheck ? "active" : (index === 1 && halfDetailCheck ? "next" : "")
              }`}
            >
              <span>{index + 1}</span>
            </div>
            <div
              className={`multiStepForm-check fas fa-check ${
                (index === 0 && !halfDetailCheck) || (index === 1 && halfDetailCheck) ? "active" : ""
              }`}
            ></div>
          </div>
        ))}
      </div>
      <div className="multiStepForm-form-outer">
        {Object.keys(formErrors).length === 0 && halfDetailCheck ? (
          <div>
            <OtherDetails firstHalfInput={input} />
          </div>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="multiStepForm-page active">
              {/* <div className="multiStepForm-title">Basic Info:</div> */}
              <div className="multiStepForm-field">
                <div className="multiStepForm-label">Username</div>
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  className="multiStepForm-input"
                  onChange={inputHandler}
                  name="username"
                  value={input.username}
                />
                <p className="formErrors">{formErrors.username}</p>
              </div>
              <div className="multiStepForm-field">
                <div className="multiStepForm-label">Phone</div>
                <input
                  type="number"
                  placeholder="Phone"
                  id="phone"
                  className="multiStepForm-input"
                  onChange={inputHandler}
                  name="phone"
                  value={input.phone}
                />
                <p className="formErrors">{formErrors.phone}</p>
              </div>
              <div className="multiStepForm-field">
                <div className="multiStepForm-label">Password</div>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="multiStepForm-input"
                  onChange={inputHandler}
                  name="password"
                  value={input.password}
                />
                <p className="formErrors">{formErrors.password}</p>
              </div>
              <div className="multiStepForm-field">
                <button type="submit" className="multiStepForm-button next">
                  Next
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
    </div>
  );
};

const OtherDetails = ({ firstHalfInput }) => {
  const [input, setInput] = useState(firstHalfInput);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validate(input));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!values.city) {
      errors.city = "City is required.";
    } else if (values.city.length < 3) {
      errors.city = "City must be at least 3 characters long.";
    }
    if (!values.email) {
      errors.email = "Email is required.";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is invalid.";
    }
    if (!values.profession) {
      errors.profession = "Profession is required.";
    } else if (values.profession.length < 3) {
      errors.profession = "Profession must be at least 3 characters long.";
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const api = async () => {
        try {
          const response = await fetch(
            "http://localhost:3001/api/authProvider/registerProvider",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(input),
            }
          );
          const res = await response.json();
          if (res.code === 1) {
            toast.success("Registration Successful", {
              duration: 2000,
            });
            setTimeout(() => {
              window.location.href =
                "http://localhost:3000/routes/provider/loginProvider";
            }, 1500);
            setInput({
              profession: "",
              username: "",
              phone: "",
              password: "",
              city: "",
            });
          } else if (res.code === 0) {
            toast.error("Provider Already Exists", {
              duration: 2000,
            });
          }
        } catch (error) {
          toast.error("Something Went Wrong");
        }
      };
      api();
    }
  }, [formErrors]);

  return (
    <form onSubmit={submitHandler}>
      <div className="multiStepForm-page active">
        <div className="multiStepForm-title">Register Here:</div>

        <div className="multiStepForm-field">
          <div className="multiStepForm-label">Profession</div>
          <input
            type="text"
            placeholder="Profession Name"
            id="profession"
            className="multiStepForm-input"
            onChange={inputHandler}
            name="profession"
            value={input.profession}
          />
          <p className="formErrors">{formErrors.profession}</p>
        </div>

        <div className="multiStepForm-field">
          <div className="multiStepForm-label">City</div>
          <input
            type="text"
            placeholder="City"
            id="city"
            className="multiStepForm-input"
            onChange={inputHandler}
            name="city"
            value={input.city}
          />
          <p className="formErrors">{formErrors.city}</p>
        </div>

        <div className="multiStepForm-field">
          <div className="multiStepForm-label">Email</div>
          <input
            type="text"
            placeholder="Email"
            id="email"
            className="multiStepForm-input"
            onChange={inputHandler}
            name="email"
            value={input.email}
          />
          <p className="formErrors">{formErrors.email}</p>
        </div>

        <div className="multiStepForm-field">
          <button type="submit" className="multiStepForm-button register">
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default Page;
  