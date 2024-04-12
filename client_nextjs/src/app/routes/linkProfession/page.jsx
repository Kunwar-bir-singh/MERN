'use client'
import React, { useEffect } from "react";

const LinkProfession = ({ params , onResponse }) => {
    const result = async () => {
    console.log(params);
      const api = await fetch(
        `http://localhost:3001/api/authProfession/editProfession/?city=${params.city}&name=${params.name}`,
        {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await api.json();
      onResponse(response);
      console.log(response);
    };

    useEffect(() => {
        result();
    }, [])
    
  return (
    // <div>
    //   <button onClick={result}>Want To Link With The Profession?</button>
    // </div>
    null
  );
};

export default LinkProfession;
