import React, { useState } from 'react'
import './register.css'

const HalfDetails = ({onRegister}) => {

    const [userDetails, setUserDetails] = useState({
        profession : "",
        city:"",
        email:"",
    })    

    const inputHandler = (e)=>{
        const {name, value} = e.target;
        setUserDetails({
            ...userDetails,
            [name] :  value
        });
    }
    const submitHandler = (e) =>{
        e.preventDefault();

        onRegister(userDetails);
    }

  return (
    <>
      <div className="user_form_container">
        <form onSubmit={submitHandler}>
          <h3>Register Here</h3>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Email or Phone"
            id="username"
            onChange={inputHandler}
            name="username"
            value={userDetails.username}
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            placeholder="Phone"
            id="phone"
            onChange={inputHandler}
            name="phone"
            value={userDetails.phone}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={inputHandler}
            name="password"
            value={userDetails.password}
          />

          <button>Next</button>
          {/* <div className="social">
          <div className="go">
          <i className="fab fa-google"></i> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
        </div> */}
        </form>
      </div>
    </>
  )
}

export default HalfDetails