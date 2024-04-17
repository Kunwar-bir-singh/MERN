"use client";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import "./Buttons.css";
import Link from "next/link";
import Logout from "@/app/routes/logout/page";
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
      {/* <nav className="menu">
          <div classNameName="navbar">
            <a href="/">
              <div classNameName="logo">SOME LOGO</div>
            </a>
            {loggedIn ? (
                <ol>
                  <li className="menu-item">
                    <a href="#">
                        {" "}
                        <img
                          src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                          alt=""
                        />
                      </a>
                    <ol className="sub-menu">
                      <li className="menu-item">
                        <a href="#0">My Profile</a>
                      </li>
                      <li className="menu-item">
                      <button onClick={logUserOut}>Logout</button>
                      </li>
                      <li className="menu-item">
                        <a href="#0">Huge Widgets</a>
                      </li>
                    </ol>
                  </li>
                </ol>
                // <div classNameName="profile">
                //   <ul>
                //     <li classNameName="dropdown">
                      
                //       <ul classNameName="dropdown-menu">
                //         <a href="">
                //           <button classNameName="cssbuttons-io">
                //             <span>My Profile</span>
                //           </button>
                //         </a>
                //         <li>
                          
                //         </li>
                //       </ul>
                //     </li>
                //   </ul>
                // </div>
            ) : (
              <button classNameName="profile_login_button">
                <Link href={"/routes/choose"}>Login</Link>
              </button>
            )}
          </div>
        </nav> */}
      <nav className="menu">
        <ol>
          <li className="menu-item">
            <a href="#0">Contact</a>
          </li>
          <li className="menu-item">
          </li>
          <li className="menu-item">
          </li>
          <li className="menu-item">
          </li>
          <li className="menu-item">
          </li>
          <li className="menu-item">
          </li>
          <li className="menu-item" id="profile_img">
            <a href="#0"><a href="#">
                        {" "}
                        <img
                          src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                          alt=""
                        />
                      </a></a>
            <ol className="sub-menu">
              <li className="menu-item">
                <a href="#0">Big Widgets</a>
              </li>
              <li className="menu-item">
                <a href="#0">Bigger Widgets</a>
              </li>
              <li className="menu-item">
                <a href="#0">Huge Widgets</a>
              </li>
            </ol>
          </li>
        </ol>
      </nav>
    </>
  );
};

export default Navbar;
