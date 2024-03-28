import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./mainContent.scss";
import Response from "./response/Response";

const MainContent = () => {
  const [res, setRes] = useState(null);
  const search = async () => {
    try {
      let queryString = `name=${input.name
        .toLowerCase()
        .trim()}&city=${input.city.toLowerCase().trim()}`;
      const api = await fetch(
        `http://localhost:3001/api/authProfession/getProfession?${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await api.json();
      setRes(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [res]);

  const [input, setInput] = useState({
    name: "",
    city: "",
  });

  const getInput = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };
  return (
    <>
      <div className="content_container">
        <div className="card">
          <label className="input">
            <input
              className="input__field mb-5"
              type="text"
              name="name"
              onChange={getInput}
              value={input.name}
              id=""
              placeholder=" "
            />
            <span className="input__label">Profession</span>
          </label>
          <label className="input">
            <input
              className="input__field"
              type="text"
              name="city"
              onChange={getInput}
              value={input.city}
              id=""
              placeholder=" "
            />
            <span className="input__label">City</span>
          </label>
          <div className="button-group">
            <button onClick={search}>Send</button>
            <button
              type="reset"
              onClick={() => {
                setInput({
                  name: "",
                  city: "",
                });
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <Response res={res} />
      </div>
    </>
  );
};

export default MainContent;
