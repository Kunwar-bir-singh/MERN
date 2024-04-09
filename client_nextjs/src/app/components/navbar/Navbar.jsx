"use client";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import "./Buttons.css";
import Link from "next/link";
import Logout from "@/app/routes/logout/page";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(null);

  const logUserOut = () =>{
    <Logout/>
  }
  useEffect(() => {
    // Check if JWT token cookie exists
    const tokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    if (tokenCookie) {
      // User is logged in
      setLoggedIn(true);
    } else {
      // User is not logged in
      setLoggedIn(false);
    }
  }, []);
  return (
    <>
      <nav>
        <div className="navbar">
          <a href="/">
          <div className="logo">SOME LOGO</div>
          </a>
          {loggedIn ? (
            <>
              <div className="profile">
                <ul>
                  <li className="dropdown">
                    <a href="#">
                      {" "}
                      <img
                        src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                        alt=""
                      />
                    </a>
                    <ul className="dropdown-menu">
                      <a href="" >
                          <button className="cssbuttons-io">
                            <span>My Profile</span>
                          </button>
                      </a>
                      <li>
                        <button onClick={logUserOut}>Logout
                          </button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <button className="profile_login_button">
              <Link href={"/routes/choose"}>Login</Link>
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
