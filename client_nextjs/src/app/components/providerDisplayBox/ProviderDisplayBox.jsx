'use client'
import React, { useEffect, useState } from "react";
import "./css.css";
import JwtVerify from "@/app/components/jwtVerify/JwtVerify";
import { toast } from "sonner";

const ProviderDisplayBox = ({providers , decodedData, setProviders , h1Title}) => {
    // console.log( h1Title);
    const bookmarkProvider = async (providerPhone, index) => {
        const api = await fetch(
          `http://localhost:3001/api/authProvider/bookmarkProfession`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userID: decodedData.userID,
              providerPhone: providerPhone,
              isProvider: decodedData.isProvider,
            }),
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
        console.log("Response : ", response);
    
        setProviders((prevProviders) => {
          const updatedProviders = [...prevProviders];
          const provider = updatedProviders[index];
          console.log("Provider : " , provider);
          if (response.code === 0) {
            provider.bookmarkedWith = provider.bookmarkedWith.filter((id) => id !== decodedData.userID);
          } else if (response.code === 1) {
            provider.bookmarkedWith = [...provider.bookmarkedWith, decodedData.userID];
          }
          return updatedProviders;
        });
      }

      
  const isBookmarked = (array) => {
    return array.includes(decodedData.userID) ? "#36F45B" : "#F44336";
  };

    useEffect(() => {
      console.log("ProviderDisplayBox");
    }, [])
    
  return (
      <div>
        {providers.length == 0 ? (
          <div className="loading_svg_div">
            <svg viewBox="25 25 50 50" className="loading_svg">
              <circle r="20" cy="50" cx="50"></circle>
            </svg>
          </div>
        ) : (
          <>
            <h1 className="provider_title">
              {providers.length} {h1Title == "searchProvider" ? "Providers Found!" : "Bookmarked Providers"} 
            </h1>
            <div className="container">
              {providers.map((item, index) => (
                <div key={index}>
                  <div className="box">
                    <div className="provider_image">
                      <img
                        src={item.image.url}
                        alt="Provider Image"
                        srcSet=""
                      />
                    </div>
                    <div className="provider_details">
                      {decodedData && (
                        <div
                          className="bookmark_div"
                          onClick={() => bookmarkProvider(item.phone, index)}
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
                              fill={isBookmarked(item.bookmarkedWith)}
                              d="M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z"
                            ></path>
                          </svg>
                        </div>
                      )}
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

export default ProviderDisplayBox;
