"use client";
import React, { useState } from "react";
import "./register.css";
const page = () => {
const [input, setInput] = useState({
    profession: "",
    username: "",
    password: "",
    phone: "",
    city: "",
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
    // console.log(input);
    try {
      const response = await fetch("http://localhost:3001/api/authProvider/registerProvider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const res = await response.json();
      console.log(res);
      if (response.ok) {
        // const res_data = await response.json();
        console.log("Registration Successfull");
        // setInput({
        //   profession: "",
        //   username: "",
        //   phone: "",
        //   password: "",
        //   city: "",
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
    </>
  );
};

export default page;
