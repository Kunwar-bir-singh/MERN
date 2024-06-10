'use client'
import JwtVerify from '@/app/components/jwtVerify/JwtVerify'
import ProviderDisplayBox from '@/app/components/providerDisplayBox/ProviderDisplayBox'
import React, { useEffect, useState } from 'react'
import './bookmark.css'
const page = () => {
  const [decodedData, setDecodedData] = useState(null);
  const [providers, setProviders] = useState(null)
  const handleDecodedData = (value) => {
    setDecodedData(value);
  };
    // api call for bookmarked provider
    useEffect(()=>{
      if(decodedData){
        const api = async () =>{
          const res = await fetch('http://localhost:3001/api/authProvider/getBookmarkProviders' , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({userID : decodedData.userID , isProvider : decodedData.isProvider})
          })
          const data = await res.json()
          setProviders(data.providers);
        }
        api();
      }
    },[decodedData])
    
  return (
    <>
    <JwtVerify setDecodedData={handleDecodedData} />
    {providers && providers.length > 0 ? <><ProviderDisplayBox providers={providers} setProviders={setProviders} decodedData={decodedData} /></> : <><h1 className='provider_title'>No Bookmarked Provider</h1></> }
    </>
  )
}

export default page