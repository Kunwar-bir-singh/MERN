"use client";
import React, { useEffect, useState } from "react";
import "./createProfession.css";
import Link from "next/link";
import LinkProfession from '../../components/linkProfession/LinkProfession';

const page = () => {
  const [input, setInput] = useState({
    name: "",
    city: "",
  });
  const [apiResponse, setApiResponse] = useState({});
  const getInput = async (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const linkProfession = async () => {
    try {
      const api = await fetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(apiResponse);
  }, [apiResponse]);

  const submit = async (e) => {
    e.preventDefault();
    if((input.name || input.city)==""){
      return apiResponse;
    }
    const api = await fetch(
      "http://localhost:3001/api/authProfession/createProfession",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );
    const result = await api.json();
    console.log(result);
    setApiResponse(result);
  };

  return (
    <div className="createProfession_container">
      <div className="login-box">
        <h2>Create A Profession</h2>
        <form action="" className="createProfession" onSubmit={submit}>
          <div className="user-box">
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={getInput}
              id=""
            />
            <label>Enter Name:</label>
          </div>

          <div className="user-box">
            <input
              type="text"
              name="city"
              value={input.city}
              onChange={getInput}
              id=""
            />
            <label>Enter City:</label>
          </div>
          <button type="submit" className="createProfession_btn">
            <span className="button_top"> Button</span>
          </button>
        </form>
      </div>
      <div>
        <div>{apiResponse.msg}</div>
        <div>
          {apiResponse.success == "true" ? (
            <button onClick={<LinkProfession/>}> Want to link with that profesison?</button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
