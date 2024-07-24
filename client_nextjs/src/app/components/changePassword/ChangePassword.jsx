import React, { useEffect, useState } from "react";
import "./ChangePassword.css";
import Popup from 'reactjs-popup'
import { EyeSvg } from "@/app/assets/svgs/EyeSvg";
import { toast } from "sonner";
import JwtVerify from "../jwtVerify/JwtVerify";

const ChangePassword = () => {
  const [decodedData, setDecodedData] = useState(null);
  const handleDecodedData = (value) => {
    setDecodedData(value);
  };
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

  const toastHandler = (code, msg) => {
    if (code === 1) {
        toast.success(msg);
        close();
    }
    else if (code == 2) toast.warning(msg);
    else toast.error(msg);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password.firstPass !== password.reTypedPass) {
      toastHandler(2, "Please Enter the same password");
    } else {
      (async () => {
        try {
          const data = await fetch(
            "http://localhost:3001/api/auth/changePassword",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                newPassword: password.firstPass,
                isProvider: decodedData.isProvider,
                userID: decodedData.userID,
              }),
            }
          );

          const res = await data.json();
          toastHandler(res.code, res.msg);
        } catch (error) {
          console.error("Error changing password:", error);
          toastHandler("Failed to change password");
        }
      })();
    }
  };

  useEffect(() => {
    console.log("User Logged Info :", decodedData);
  }, [decodedData]);

  return (
    <>
    <JwtVerify setDecodedData={handleDecodedData} />
      <Popup
        trigger={<button className="button"> Change Password</button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="actions">
              <ChangePasswordForm  toggleEye={toggleEye} SetToggleEye={SetToggleEye} getInput={getInput} password={password} submitHandler={submitHandler} />
            </div>
          </div>
        )}
      </Popup>
    </>
  );
};

function ChangePasswordForm({toggleEye ,SetToggleEye , getInput, password ,submitHandler}) {
  return (
    <form className="changePassform" onSubmit={submitHandler}>
      <div className="changePassheader">
        <h1>Change Password</h1>
      </div>
      <div className="changePassFlex-column">
        <label>Enter your new password.</label>
      </div>
      <div className="changePassInputForm">
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

      <div className="changePassFlex-column">
        <label>Re-enter your new password.</label>
      </div>
      <div className="changePassInputForm">
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

      <button className="changePassButton-submit">Change Password</button>
    </form>
  );
}
export default ChangePassword;
