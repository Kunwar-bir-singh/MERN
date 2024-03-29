'use client'
import React, { useState } from "react";
import "./login.css";
const page = () => {
    const [input, setInput] = useState({
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

    const submitHandler = async (e)=>{
        e.preventDefault();
        console.log(input)
        
        try {
            const response  = await fetch("http://localhost:3001/api/auth/loginProvider" , {
                method :"POST",
                headers :{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(input)
            })
            if(response.ok){
                localStorage.setItem("token", res_data.token);
                console.log("User Login Successfull")
                setInput({
                    phone:"",
                    password:""
                })
            }
            else{
                console.log("Some Error Has Occured.");
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
    <form onSubmit={submitHandler}>
        <h3>Login Provider</h3>
        <label htmlFor="phone">Phone</label>
        <input type="number" placeholder="Phone" id="phone" onChange={inputHandler} name="phone" value={input.phone}/>

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
