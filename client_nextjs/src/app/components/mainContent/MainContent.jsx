import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Response from "./response/Response";
import "./mainContent.scss";

const MainContent = () => {
  const [professionRes, setProfessionRes] = useState(null);

  const search = async () => {
    try {
      let queryString = `name=${input.name
        .toLowerCase()
        .trim()}&city=${input.city.toLowerCase().trim()}`;
      const api = await fetch(
        `http://localhost:3001/api/authProfession/getProfession?${queryString}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({userID : '663de36996c61e09d67447e0'})
        }
      );
      const response = await api.json();
      setProfessionRes(response);
    } catch (error) {
      console.log(error);
    }
  };

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
            <button className="searchBtn" onClick={search}>
              Search
            </button>
            <button
            className="searchBtn"
            id="resetBtn"
              type="reset"
              onClick={() => {
                setInput({
                  name: "",
                  city: "",
                });
                toast.success("Input Cleared");
              }}
            >
               {" "}
              Reset
            </button>
          </div>
        </div>
        <Response inputData={input} res={professionRes} />
      </div>
    </>
  );
};

export default MainContent;
