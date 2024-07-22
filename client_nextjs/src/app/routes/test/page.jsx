'use client'
import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import './css.css' 
import ChangePassword from '@/app/components/changePassword/ChangePassword'

const page = () => {
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
        body : JSON.stringify({ email : "www.kunwarbirsingh24@gmail.com" })
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
        console.log("Email Verification Successful");
      }else{
        console.log("Invalid Email Code");
      }
    }

  return (
    <Popup
    trigger={<button className="button"> Change Password   </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        {/* <div className="header"> Verify your email </div>
        <div className="content">
          Press the "Send Code" button below and a verification code will be sent to your registered email.<br/>
          Kindly enter that code in the below input field and press "Verify".
          <br />
          <span> Note : The code will be sent to www.kunwarbirsingh24@gmail.com</span>
        </div> */}
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
          {/* <form action="" onSubmit={(e)=>e.preventDefault()} >

          <button className="button" onClick={sendEmailCode} > Send Code </button> <br/>
          <input type="number"  placeholder="Enter Code" id="" name="inputCode" value={inputCode} onChange={getInputCode} />
          <button onClick={verifyCode}>
            Verify
          </button>
          </form> */}
          <ChangePassword/>
        </div>
      </div>
    )}
  </Popup>
  )

}
export default page