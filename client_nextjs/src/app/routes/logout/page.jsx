'use client'
import React from 'react'

  const handleClick = async ()=>{
    try {
      const reponse = await fetch('http://localhost:3001/api/auth/clearCookies' , {
        credentials: 'include'
      });
    } catch (error) {
      console.log(error);
    }
  }

const Logout = () => {
  return (
    <button className='p-2 bg-orange-600 text-white border-2' onClick={handleClick }>
        Logout
    </button>

  )
}

export default Logout