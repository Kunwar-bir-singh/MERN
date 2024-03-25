"use client";
import ProvidersDetail from "@/app/components/providersDetails/ProvidersDetail";
import { useEffect, useState } from "react";

const page =  ({ params }) => {
  const [providers, setProviders] = useState([])
  const handleProviders = (providers)=>{
    setProviders(providers)
  }
   console.log(providers);
  return <div>
    <ProvidersDetail params={params} onResult = {handleProviders} />
    {providers.length == 0 ? (
      <h1>Loading Data...</h1>
      ):(
      providers.map((item , index)=>(
          <div key={index}> 
            <h3>{item.fullname}</h3>
            <h4>{item.profession}</h4>
          </div>
      )) 
    )}
  </div>;
};

export default page;
