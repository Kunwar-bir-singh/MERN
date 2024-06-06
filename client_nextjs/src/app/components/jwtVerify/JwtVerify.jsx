import React, { useEffect, useState } from "react";
import CookieValue from "../cookieValue/CookieValue";

const JwtVerify = ({ setDecodedData }) => {
    const [cookieValue, setCookieValue] = useState(null)
    const handleCookieValue = (value) =>{
        setCookieValue(value);
    }

  const verify = async () => {
    const response = await fetch("http://localhost:3001/api/auth/jwtVerify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieValue}`,
      },
    }).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setDecodedData(data.decoded);
      }
    });
  };
  useEffect(()=>{
    if(cookieValue !=null){
        verify()
    }
  },[cookieValue])
  return <>
  <CookieValue CookieValueProp={handleCookieValue} />;
  </>
};

export default JwtVerify;
