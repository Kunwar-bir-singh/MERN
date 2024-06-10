"use client";
import ProvidersDetail from "@/app/components/providersDetails/ProvidersDetail";
import { useEffect, useState } from "react";
import ProviderDisplayBox from "@/app/components/providerDisplayBox/ProviderDisplayBox";
import JwtVerify from "@/app/components/jwtVerify/JwtVerify";

const page = ({ params }) => {
  const [providers, setProviders] = useState([]);
  const handleProviders = (providers) => {
    setProviders(providers);
  };
  const [decodedData, setDecodedData] = useState(null);
  const handleDecodedData = (value) => {
    setDecodedData(value);
  };

  useEffect(()=>{console.log(providers);},[providers])
  return (
    <div>
      <JwtVerify setDecodedData={handleDecodedData} />
      <ProvidersDetail params={params} onResult={handleProviders} />
      <ProviderDisplayBox providers={providers} decodedData={decodedData} setProviders={setProviders} h1Title={"searchProvider"} />
      
    </div>
  );
};
export default page;
