'use client'
import React, { useEffect, useState } from "react";
// import { cookies } from "next/headers";
const LinkProfession = ({ params, onResponse }) => {

  const result = async () => {
    console.log(params);
    const cookie = document.cookie.slice(6);
    const api = await fetch(
      `http://localhost:3001/api/authProfession/editProfession/?city=${params.city}&name=${params.name}`,
      {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
      }
    );
    const response = await api.json();
    onResponse(response);
    console.log(response);
  };

  useEffect(() => {
    result();
  }, []);


  return (
    // <div>
    //   <button onClick={result}>Want To Link With The Profession?</button>
    // </div>
    null
  );
};

export default LinkProfession;
