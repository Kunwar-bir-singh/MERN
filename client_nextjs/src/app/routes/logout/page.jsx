'use client'
import React from 'react'

const logout =()=>{
    localStorage.removeItem('token');
    console.log("Token Removed Successfully;")
}

const Logout = () => {
  return (
    <button className='p-2 bg-orange-600 text-white border-2' onClick={logout}>
        Logout
    </button>
  )
}

export default Logout