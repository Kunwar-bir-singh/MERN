"use client";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Link from "next/link";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    // Check if JWT token cookie exists
    const tokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    console.log(tokenCookie);
    if (tokenCookie) {
      // User is logged in
      setLoggedIn(true);
    } else {
      // User is not logged in
      setLoggedIn(false);
    }
  }, []);
  console.log(loggedIn);
  return (
    <>
      <nav>
        <div className="navbar">
          <div className="logo">SOME LOGO</div>
          <div className="login_button">
            {loggedIn ? (
              <>
                <div className="profile">
                  <img
                    src="https://media.istockphoto.com/id/1432690812/photo/old-wooden-dock-at-the-lake-sunset-shot.jpg?s=612x612&w=0&k=20&c=A9cpzCCO_nN2B0pCpcOGBBzr9WXooLCEOzNB4IE-KNM="
                    alt="Adam argyle"
                  />
                </div>
              </>
            ) : (
              <button>
                <Link href={"./routes/choose"}>Login</Link>
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
