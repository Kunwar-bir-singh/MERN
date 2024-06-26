"use client";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import "./Buttons.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CookieValue from "../cookieValue/CookieValue";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [profileImgUrl , setProfileImgUrl] = useState(null);
  const [cookieValue, setCookieValue] = useState(null);
  const [userAuthorization, setUserAuthorization] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

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
    if(userAuthorization){
      const api = async () => {
        try {
          const response = await fetch(
            "http://localhost:3001/api/auth/getImage",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userAuthorization),
            }
          );
          const jsonResponse = await response.json();
          setProfileImgUrl(jsonResponse);
        } catch (error) {
          console.log(error);
        }
      };
      api();
    }
    console.log(userAuthorization);
  }, [userAuthorization]);

  return (
    <>
      <CookieValue CookieValueProp={handleCookieValue} />
      <nav>
        <div className="navbar">
          <div className="nav_container nav-container">
            <input
              className="checkbox"
              type="checkbox"
               id=""
            checked={menuOpen}
            onChange={toggleMenu}
            />
            <div className="hamburger-lines"  onClick={toggleMenu}>
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
            <div className="logo" onClick={() => router.push(loggedIn ? "/routes/myProfile" : "/routes/choose")}>
              {loggedIn ? (
                <li className="menu-item" id="profile_img">
                  {" "}
                  <img
                    src={profileImgUrl}
                    alt=""
                  />
                </li>
              ) : (
                <span className="navbar_logo_link"> Login</span>
              )}
            </div>
            <div className={`menu-items ${menuOpen ? '' : 'closed'}`}>
              <Link  href={"/"} onClick={closeMenu}>Home </Link>
              {loggedIn ? (
                <>
                  <Link href={"/routes/myProfile"} onClick={closeMenu}>My Profile</Link>
                  <Link href={"/routes/bookmarks"} onClick={closeMenu}>Bookmarks</Link>
                  <Link href={"/routes/logout"} onClick={closeMenu}>Logout</Link>
                </>
              ) : (
                <Link href={"/routes/choose"} onClick={closeMenu}>Login</Link>
              )}
              {userAuthorization ? (
                <Link href={"/routes/createProfession"} onClick={closeMenu}>Create Profession</Link>
              ) : (
               <></>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
