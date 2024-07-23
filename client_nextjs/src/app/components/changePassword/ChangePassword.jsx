import React, { useState } from "react";
import "./ChangePassword.css";
import { LockSvg } from "@/app/assets/svgs/LockSvg";
import { EyeSvg } from "@/app/assets/svgs/EyeSvg";
import { toast } from "sonner";

const ChangePassword = () => {
  const [toggleEye, SetToggleEye] = useState(false);
  const [password, setPassword] = useState({
    firstPass: "",
    reTypedPass: "",
  });
  const getInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setPassword({ ...password, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if(password.firstPass !== password.reTypedPass){
        toast.warning("Please Enter the same password");
    }
    else{
        toast.success("Password Changed Successfully");
    }
  };
  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="header">
        <h1>Change Password</h1>
      </div>
      <div className="flex-column">
        <label>Enter your new password.</label>
      </div>
      <div className="inputForm">
        {/* <LockSvg /> */}

        <input
          type={toggleEye ? "text" : "password"}
          className="input"
          autoComplete=""
          value={password.firstPass}
          name="firstPass"
          onChange={(event) => getInput(event)}
          placeholder="Enter your Password"
        />
        <EyeSvg toggleEye={toggleEye} SetToggleEye={SetToggleEye} />
      </div>

      <div className="flex-column">
        <label>Re-enter your new password.</label>
      </div>
      <div className="inputForm">
        {/* <LockSvg /> */}
        <input
          type={toggleEye ? "text" : "password"}
          className="input"
          autoComplete=""
          value={password.reTypedPass}
          name="reTypedPass"
          onChange={(event) => getInput(event)}
          placeholder="Re-enter your new password"
        />
        <EyeSvg toggleEye={toggleEye} SetToggleEye={SetToggleEye} />
      </div>

      <button className="button-submit">Change Password</button>
    </form>
  );
};

export default ChangePassword;
