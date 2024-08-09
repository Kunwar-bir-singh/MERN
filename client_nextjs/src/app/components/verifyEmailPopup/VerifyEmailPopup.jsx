'use client'
import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import './Popup.css'

const VerifyEmail = ({userEmail ,emailVerifyRes, setEmailVerifyRes}) => {
  console.log("User Email", userEmail);
  const [emailVerifyCode, setEmailVerifyCode] = useState(null);
  const [inputCode, setInputCode] = useState('');

  const getInputCode=(e)=>{
    const {value} = e.target;
    console.log( value);
    setInputCode(value)
  } 

  const sendEmailCode = async () =>{
    const api = await fetch ("http://localhost:3001/api/auth/emailVerification" ,
      {
        method :"POST",
        headers : { "Content-Type": "application/json" },
        body : JSON.stringify({ userEmail : userEmail })
      }
    )
      const data = await api.json();
      setEmailVerifyCode(data.emailCode)
      console.log("Email Code : " , data);
    }
  
    const verifyCode = () =>{
      console.log(inputCode , emailVerifyCode);
      console.log(typeof inputCode , typeof emailVerifyCode);
      if(Number(inputCode) === emailVerifyCode){
        setEmailVerifyRes(1);
        console.log("Email Verification Successful");
      }else{
        console.log("Invalid Email Code");
        setEmailVerifyRes(0);
      }
    }

  return (
    <Popup
    trigger={<button className="button"> Verify Email </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Verify your email </div>
        <div className="content">
          Press the "Send Code" button below and a verification code will be sent to your registered email.<br/>
          Kindly enter that code in the below input field and press "Verify".
          <br />
          <span> Note : The code will be sent to {userEmail}</span>
        </div>
        <div className="actions">
          {/* <Popup
            trigger={<button className="button"> Send C </button>}
            position="top center"
            nested
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup> */}
          <form action="" onSubmit={(e)=>e.preventDefault()} >

          <button className="button" onClick={sendEmailCode} > Send Code </button> <br/>
          <input type="number"  placeholder="Enter Code" id="" name="inputCode" value={inputCode} onChange={getInputCode} />
          <button onClick={verifyCode}>
            Verify
          </button>
          </form>
        </div>
      </div>
    )}
  </Popup>
  )

}
export default VerifyEmail