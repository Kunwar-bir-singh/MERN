import React from "react";
import "./ChangePassword.css";
import { LockSvg } from "@/app/assets/svgs/LockSvg";
import { EyeSvg } from "@/app/assets/svgs/EyeSvg";
import { AtTheRateSvg } from "@/app/assets/svgs/AtTheRateSvg";

const ChangePassword = () => {
  return (
    <form className="form">
        <div className="header">
          <h1>Change Password</h1>

        </div>
      <div className="flex-column">
        <label>Enter your new password.</label>
      </div>
      <div className="inputForm">
      <LockSvg/>

        <input type="text" className="input" placeholder="Enter your Password" />
        <EyeSvg/>

      </div>

      <div className="flex-column">
        <label>Re-enter your new password.</label>
      </div>
      <div className="inputForm">
        <LockSvg/>
        <input
          type="password"
          className="input"
          placeholder="Re-enter your new password"
        />
       <EyeSvg/>
      </div>


      <button className="button-submit">Change Password</button>
     
    </form>
  );
};

export default ChangePassword;
