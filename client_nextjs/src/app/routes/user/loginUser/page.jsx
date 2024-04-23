'use client'
import React, { useState } from "react";
import "./login.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const page = () => {
    const router = useRouter();
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
        console.log(input);
        try {
            const response  = await fetch("http://localhost:3001/api/auth/loginUser" , {
                method :"POST",
                credentials: 'include',
                headers :{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(input)
            })
            const data = await response.json();
            console.log(data);
            if(data.code === 1){
                toast.success('User Login Successfull!')
                console.log("User Login Successfull");
                setTimeout(()=>{
                    window.location.href = "/";
                },2000)
                setInput({
                    phone:"",
                    password:""
                })
            }
            else if (data.code === 0){
                toast.warn("Incorrect Credentials")
                console.log("Incorrect Credentials.");
            }
            else{
                toast.error("Some Error Has Occured!")
                console.log("Some Error Has Occured!");
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
    <div className="user_form_container">
    <form onSubmit={submitHandler}>
        <h3>Login Here</h3>
        <label htmlFor="phone">Phone</label>
        <input type="number" placeholder="Phone" id="phone" onChange={inputHandler} name="phone" value={input.phone}/>

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" onChange={inputHandler} name="password" value={input.password}/>

        <button className="user_login_button">Log In</button>
        <div className="social">
          <div className="go"><i className="fab fa-google"></i>  Google</div>
          <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
        </div>
    </form>
    </div>
    </>
  );
};

export default page;
