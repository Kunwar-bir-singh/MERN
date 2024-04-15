"use client";
import React, { useEffect, useState } from "react";
import "./createProfession.css";
import LinkProfession from "@/app/components/linkProfession/LinkProfession";
import CookieValue from "@/app/components/cookieValue/CookieValue";

const page = () => {
  const [linkClicked, setLinkClicked] = useState(false);
  const linkClickedOrNot = () => {
    setLinkClicked(true);
    setTimeout(()=>{
      setLinkClicked(false);
    },1000)
  };
  
  const [input, setInput] = useState({
    name: "",
    city: "",
  });
  
  const getInput = async (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value.toLowerCase(),
    });
  };

  const [apiResponse, setApiResponse] = useState({});

  const [responseStatus, setResponseStatus] = useState({});
  
  const handleStatus = (status) => {
    setResponseStatus(status);
  };

  useEffect(() => {
    console.log("responseStatus.msg : ", responseStatus.msg);
    console.log("responseStatus.code", responseStatus.code);
  }, [responseStatus]);
  
  const submit = async (e) => {
    e.preventDefault();
    if ((input.name || input.city) == "") {
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
    console.log("The Result of the api ", result);
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
            <>
              <div className="" onClick={linkClickedOrNot}>
                Want To Link With This Profession?
              </div>
              <div>
                {linkClicked && (
                  <LinkProfession params={input} onResponse={handleStatus} />
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
