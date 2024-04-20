"use client";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import "./Buttons.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const router = useRouter();

  const logUserOut = () => {
    router.push("http://localhost:3000/routes/logout");
  };

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
      <nav className="menu">
        <div className="home_page_logo">
          SOME LOGO
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
