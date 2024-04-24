"use client";
import React, { useState } from "react";
import "./register.css";
import HalfDetails from "./halfDetails";

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

  const joinRegisterData = (data) => {
    setInput({
      ...input,
      data,
    });
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await fetch(
    //     "http://localhost:3001/api/authProvider/registerProvider",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(input),
    //     }
    //   );
    //   const res = await response.json();
    //   console.log(res);
    //   if (response.ok) {
    //     // const res_data = await response.json();
    //     console.log("Registration Successfull");
    //     // setInput({
    //     //   profession: "",
    //     //   username: "",
    //     //   phone: "",
    //     //   password: "",
    //     //   city: "",
    //     // });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    setHalfDetailCheck(true);
    console.log(input);
  };
  return (
    <>
      {halfDetailCheck ? (
        <HalfDetails onRegister={joinRegisterData} />
      ) : (
        <div className="user_form_container">
          <form onSubmit={submitHandler}>
            <h3>Register Here</h3>
            <label htmlFor="username">Profession</label>
            <input
              type="text"
              placeholder="Profession Name"
              id="profession"
              onChange={inputHandler}
              name="profession"
              value={input.profession}
            />

            <label htmlFor="username">City</label>
            <input
              type="text"
              placeholder="City"
              id="city"
              onChange={inputHandler}
              name="city"
              value={input.city}
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              id="email"
              onChange={inputHandler}
              name="email"
              value={input.email}
            />
            <button>Register</button>
          </form>
        </div>
      )}
    </>
  );
};

export default page;
