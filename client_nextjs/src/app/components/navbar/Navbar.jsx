"use client";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import "./Buttons.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CookieValue from "../cookieValue/CookieValue";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const router = useRouter();
  const [cookieValue, setCookieValue] = useState(null);
  const [userAuthorization, setUserAuthorization] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
    }).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setUserAuthorization(data.decoded);
        setLoggedIn(true);
        return;
      }
      setLoggedIn(false);
    });
  };

  useEffect(() => {
    if (cookieValue !== null) {
      jwtVerify();
    }
  }, [cookieValue]);

  useEffect(() => {
    console.log(userAuthorization);
  }, [userAuthorization]);

  return (
    <>
      <CookieValue CookieValueProp={handleCookieValue} />
      <nav>
        <div className="navbar">
          <div className="container nav-container">
            <input
              className="checkbox"
              type="checkbox"
              name=""
              id=""
            />
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
            <div className="logo" onClick={()=>{router.push("http://localhost:3000/routes/myProfile");}}>
              {loggedIn ? (
                <li className="menu-item" id="profile_img">
                  {" "}
                  <img
                    src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                    alt=""
                  />
                </li>
              ) : (
                <Link href={"/routes/choose"}>
                  <button className="profile_login_button">Login</button>
                </Link>
              )}
            </div>
            <div className="menu-items">
              <Link href={"/"}>Home </Link>
              {loggedIn ? (
                <>
                  <Link href={"/routes/myProfile"}>My Profile</Link>
                  <Link href={"/routes/logout"}>Logout</Link>
                </>
              ) : (
                <Link href={"/routes/choose"}>Login</Link>
              )}
              {userAuthorization ? (
                <Link href={"/routes/createProfession"}>Create Profession</Link>
              ) : (
                <li>
                  <a href="#">contact</a>
                </li>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
