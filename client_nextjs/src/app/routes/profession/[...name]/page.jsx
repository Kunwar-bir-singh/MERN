"use client";
import ProvidersDetail from "@/app/components/providersDetails/ProvidersDetail";
import "./page.css";
import { useEffect, useState } from "react";
import CookieValue from "@/app/components/cookieValue/CookieValue";
import JwtVerify from "@/app/components/jwtVerify/JwtVerify";
import { toast } from "sonner";


const page = ({ params }) => {
  const [providers, setProviders] = useState([]);
  const handleProviders = (providers) => {
    setProviders(providers);
  };

  const [decodedData, setDecodedData] = useState(null);
  const handleDecodedData = (value) => {
    setDecodedData(value);
  };
  
  const bookmarkProvider = async (providerPhone)=>{
    const api = await fetch(
      `http://localhost:3001/api/authProvider/bookmarkProfession`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userID : decodedData.userID ,providerPhone :  providerPhone}),
      }
    );
    const response = await api.json();
    if (response.code === 0) {
      toast.warning(response.msg);
    } else if (response.code === 1) {
      toast.success(response.msg);
    } else {
      toast.error("Some Error Has Occcured.");
    }
    console.log("Response : " , response);
  };
  

  return (
    <div>
      <JwtVerify setDecodedData={handleDecodedData} />
      <ProvidersDetail params={params} onResult={handleProviders} />
      {providers.length == 0 ? (
        <div className="loading_svg_div">
          <svg viewBox="25 25 50 50" className="loading_svg">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        </div>
      ) : (
        <>
          <h1 className="provider_title">
            {providers.length} Providers Found!{" "}
          </h1>
          <div className="container" key={10}>
            {providers.map((item, index) => (
              <div key={index}>
                <div className="box">
                  <div className="provider_image">
                    <img src={item.image.url} alt="Provider Image" srcSet="" />
                  </div>
                  <div className="provider_details">
                    <div
                      className="bookmark_div"
                      onClick={() => bookmarkProvider(item.phone)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="100"
                        height="100"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#F44336"
                          d="M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z"
                        ></path>
                        {/* #36F45B Code For green bookmark  */}
                      </svg>
                    </div>
                    <h5>Username : {item.username}</h5>
                    <h5>Fullname : {item.fullname}</h5>
                    <h6>Profession : {item.profession}</h6>
                    <h6>Phone : {item.phone}</h6>
                    <h6>Address : {item.address}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default page;
