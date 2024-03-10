'use client'
import React, { useState } from "react";
import "./register.css";
const page = () => {
    const [input, setInput] = useState({
        username:"",
        email:"",
        phone:"",
        password:""
    })

    const inputHandler = (e)=>{
        const {name , value} = e.target
        setInput({
            ...input,
            [name]:value
        })
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        console.log(input)
        setInput({
            username:"",
        email:"",
        phone:"",
        password:""
        })
    }
  return (
    <>
    <form onSubmit={submitHandler}>
        <h3>Register Here</h3>
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" onChange={inputHandler} name="username" value={input.username}/>
        
        <label htmlFor="email">Email</label>
        <input type="text" placeholder="Email" id="email" onChange={inputHandler} name="email" value={input.email}/>
        
        <label htmlFor="phone">Phone</label>
        <input type="text" placeholder="Phone" id="phone" onChange={inputHandler} name="phone" value={input.phone}/>

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" onChange={inputHandler} name="password" value={input.password}/>

        <button>Log In</button>
        <div className="social">
          <div className="go"><i className="fab fa-google"></i>  Google</div>
          <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
        </div>
    </form>
    </>
  );
};

export default page;
