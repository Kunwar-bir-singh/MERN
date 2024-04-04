"use client";
import React, { useEffect, useState } from "react";
import "./createProfession.css";
import Link from "next/link";

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

  const linkProfession = async () =>{
    try {
        const api = await fetch ()
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    console.log(apiResponse);
  }, [apiResponse]);

  const submit = async (e) => {
    e.preventDefault();
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
    <div>
      <form action="" className="createProfession" onSubmit={submit}>
        Enter Name
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={getInput}
          id=""
        />
        Enter City
        <input
          type="text"
          name="city"
          value={input.city}
          onChange={getInput}
          id=""
        />
        <button type="submit">Submit </button>
      </form>
      <div>
        <div>{apiResponse.msg}</div>
        <div>
          {apiResponse.success == "true" ? (
            <button >Want to link with that profesison?</button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
