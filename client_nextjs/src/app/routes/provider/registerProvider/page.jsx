"use client";
import React, { useState } from "react";
import "./register.css";
import OtherDetails from "./OtherDetails";


const page = () => {
  const [halfDetailCheck, setHalfDetailCheck] = useState(false);
  const [input, setInput] = useState({
    username: "",
    password: "",
    phone: "",
    profession: "",
    city: "",
    email: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
   
    setHalfDetailCheck(true);
    
  };
  return (
    <>
    {halfDetailCheck ?(<div>
        <OtherDetails firstHalfInput={input} /> 
    </div>) : (  <div className="user_form_container">
        <form onSubmit={submitHandler}>
          <h3>Register Here</h3>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Email or Phone"
            id="username"
            onChange={inputHandler}
            name="username"
            value={input.username}
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            placeholder="Phone"
            id="phone"
            onChange={inputHandler}
            name="phone"
            value={input.phone}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={inputHandler}
            name="password"
            value={input.password}
          />

          <button>Next</button>
          {/* <div className="social">
          <div className="go">
          <i className="fab fa-google"></i> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
        </div> */}
        </form>
      </div>) }
    </>
  );
};

export default page;
