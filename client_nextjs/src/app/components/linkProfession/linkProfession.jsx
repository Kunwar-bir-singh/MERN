"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CookieValue from "../cookieValue/CookieValue";

const LinkProfession = ({ params, onResponse }) => {
  const [cookieValue, setCookieValue] = useState(null);
  const result = async () => {
    const handleCookieValue = (value) => {
      setCookieValue(value);
      console.log("Value Of Cookie : ", value);
    };
    <CookieValue CookieValueProp={handleCookieValue} />;

    const api = await fetch(
      `http://localhost:3001/api/authProfession/editProfession/?city=${params.city}&name=${params.name}`,
      {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${123}`,
        },
      }
    );
    const response = await api.json();
    onResponse(response);
    if (response.code === 0) {
      toast.warn("You are already linked!");
    } else if (response.code === 1) {
      toast.success("Successfully Linked");
    } else {
      toast.error("Some Error Has Occcured.");
    }
    console.log("Response : " , response);
  };

  useEffect(() => {
    result();
  }, []);

  return null;
};

export default LinkProfession;
