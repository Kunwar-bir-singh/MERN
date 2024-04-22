"use client";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import "./Buttons.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CookieValue from "../cookieValue/CookieValue";


const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const router = useRouter()
  const logUserOut = () => {
    router.push("http://localhost:3000/routes/logout");
  };
  const [cookieValue, setCookieValue] = useState(null);
  const [userAuthorization , setUserAuthorization] = useState(null);

  const handleCookieValue = (value) => {
    setCookieValue(value);
  };
  const jwtVerify = async () => {
    const response = await fetch("http://localhost:3001/api/auth/jwtVerify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieValue}`,
      },
    }).then(async (res) =>{
      if(res.ok){
        const data = await res.json();
        setUserAuthorization(data.decoded);
        setLoggedIn(true);
        return;
      }
      setLoggedIn(false);
    })
  };
  
  useEffect(() => {
    if (cookieValue !== null) {
      jwtVerify();
    }
  }, [cookieValue]);

  useEffect(()=>{
    console.log(userAuthorization);
  },[userAuthorization])
  return (
    <>
    <CookieValue CookieValueProp={handleCookieValue}/>
      <nav className="menu">
        <div className="home_page_logo">
          <Link href={'/'}>
          SOME LOGO
          </Link>
        </div>

        <div className="profile_login">
        {loggedIn ? 
        (<ol>
          <li className="menu-item" id="profile_img">
                        {" "}
                        <img
                          src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                          alt=""
                        />
            <ol className="sub-menu">
              <li className="menu-item">
                <Link href={'/routes/myProfile'}>
                My Profile
                </Link>
              </li>
              <li className="menu-item">
              <div onClick={logUserOut}>Logout</div>
              </li>
            </ol>
          </li>
        </ol>):(
          <Link href={"/routes/choose"}>
          <button className="profile_login_button">Login</button>
          </Link>
        )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
