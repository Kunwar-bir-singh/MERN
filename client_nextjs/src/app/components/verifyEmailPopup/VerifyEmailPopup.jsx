/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
'use client'
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './Popup.css';

const VerifyEmail = ({ popupHeading, userEmail, setEmailVerifyRes }) => {
  const [emailVerifyCode, setEmailVerifyCode] = useState(null);
  const [inputCode, setInputCode] = useState('');

  const getInputCode = (e) => {
    const { value } = e.target;
    setInputCode(value);
  };

  const sendEmailCode = async () => {
    const api = await fetch('http://localhost:3001/api/auth/emailVerification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userEmail: userEmail }),
    });
    const data = await api.json();
    setEmailVerifyCode(data.emailCode);
  };

  const verifyCode = () => {
    if (Number(inputCode) === emailVerifyCode) {
      setEmailVerifyRes(1);
    } else {
      setEmailVerifyRes(0);
    }
  };

  return (
    <Popup
      trigger={<button className="verify-email-button">{popupHeading}</button>}
      modal
      nested
    >
      {(close) => (
        <div className="verify-email-modal">
          <button className="verify-email-close" onClick={close}>
            &times;
          </button>
          <div className="verify-email-header">Verify your email</div>
          <div className="verify-email-content">
            Press the "Send Code" button below and a verification code will be sent to your registered email.<br />
            Kindly enter that code in the below input field and press "Verify".<br />
            <span>Note: The code will be sent to {userEmail}</span>
          </div>
          <div className="verify-email-actions">
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <div className="verify-email-input-row">
                <input
                  type="number"
                  placeholder="Enter Code"
                  value={inputCode}
                  onChange={getInputCode}
                />
              </div>
              <div className="verify-email-button-row">
                <button className="verify-email-button" onClick={sendEmailCode}>
                  Send Code
                </button>
                <button className="verify-email-button" onClick={verifyCode}>
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default VerifyEmail;
