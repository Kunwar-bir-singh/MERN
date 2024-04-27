"use client";
import React, { useEffect, useState } from "react";
import "./myProfile.css";
import './EditDetails.css';
import CookieValue from "@/app/components/cookieValue/CookieValue";

const Page = () => {
  const [cookieValue, setCookieValue] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  let [checkDetailsSaved, setCheckDetailsSaved] = useState(0);
  const toggleEditMode = () => {
    setEditMode(!editMode);
    setCheckDetailsSaved(++checkDetailsSaved);
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
      const data = await res.json();
      const getDetails = async () => {
        const api = await fetch(
          "http://localhost:3001/api/auth/getUserDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const userData = await api.json();
        setUserDetails(userData.user);
      };
      getDetails();
    });
  };

  useEffect(()=>{
    console.log(checkDetailsSaved);
  },[checkDetailsSaved])
  useEffect(() => {
    console.log("User Details : ", userDetails);
  }, [userDetails]);

  useEffect(() => {
    if (cookieValue !== null) {
      console.log("Cookie Value in Profile : ", cookieValue);
      jwtVerify();
    }
  }, [cookieValue]);

 

  return userDetails != null ? (
    <div className="myProfile_body">
      <div className="myProfile_container">
        <div className="profile_user_img">
          <div className="user-avatar">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              alt="Maxwell Admin"
            />
          </div>
          <div className="user_deatils_view">
            <div>
              <h5 className="user-name">{userDetails.username}</h5>
              <h6 className="user-email">{userDetails.email}</h6>
            </div>
            <div>
              <h5 className="user-name">
                {" "}
                <strong>Profession :</strong> {userDetails.profession}
              </h5>
              <h6 className="user-email">
                <strong>City :</strong> {userDetails.city}
              </h6>
            </div>
          </div>
        </div>

        <div className="profile_user_details">
          <button className={editMode ? "btn_save" : "btn"}  onClick={toggleEditMode}>
            <span className="edit_button_text">
        {editMode ? 'Save ' : 'Edit'}</span>
          </button>

          <form action="#">
            <div className="form-row">
              <div className="input-data">
                <input
                  type="text"
                  className={editMode ? "non_greyed_out" : "grayed-out"}
                  value={userDetails.username}
                  required
                />
                <div className="underline"></div>
                <label htmlFor="">Username</label>
              </div>
              <div className="input-data">
                <input type="text" value={userDetails.fullname}
                 className={editMode ? "non_greyed_out" : "grayed-out"} required />
                <div className="underline"></div>
                <label htmlFor="">Fullname</label>
              </div>
            </div>
            {userDetails.isProvider ? (
              <div className="form-row">
                <div className="input-data">
                  <input type="text" value={userDetails.profession}   className={editMode ? "non_greyed_out" : "grayed-out"}/>
                  <div className="underline"></div>
                  <label htmlFor="">Profession</label>
                </div>
                <div className="input-data">
                  <input type="text" value={userDetails.city} className={editMode ? "non_greyed_out" : "grayed-out"} required />
                  <div className="underline"></div>
                  <label htmlFor="">City</label>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="form-row">
              <div className="input-data">
                <input type="number" value={userDetails.phone}  className={editMode ? "non_greyed_out" : "grayed-out"} required />
                <div className="underline"></div>
                <label htmlFor="">Phone Number</label>
              </div>
              <div className="input-data">
                <input type="text" value={userDetails.email} className={editMode ? "non_greyed_out" : "grayed-out"} />
                <div className="underline"></div>
                <label htmlFor="">E-Mail</label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-data textarea">
                <textarea
                  rows="8"
                  cols="80"
                  value={userDetails.address}
                  className={editMode ? "non_greyed_out" : "grayed-out"}
                ></textarea>
                <br />
                <div className="underline"></div>
                <label htmlFor="">Address</label>
                <br />
                {/* <div className="form-row submit-btn">
             <div className="input-data">
                <div className="inner"></div>
                <input type="submit" value="submit"/>
             </div>
          </div> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <CookieValue CookieValueProp={handleCookieValue} />
      Loading
    </div>
  );
};

export default Page;
