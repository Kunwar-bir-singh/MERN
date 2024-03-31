import React from 'react'

  const handleClick = async ()=>{
    try {
      const reponse = await fetch('http://localhost:3001/api/auth/clearCookies' , {
        credentials: 'include'
      });
      const log = await reponse.json();
      console.log(log);
    } catch (error) {
      console.log(error);
    }
  }

const Logout = () => {
  return (
    <>
    </>
  )
}

export default Logout