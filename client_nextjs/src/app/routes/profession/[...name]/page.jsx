"use client";
import ProvidersDetail from "@/app/components/providersDetails/ProvidersDetail";
import "./page.css";
import { useEffect, useState } from "react";

const page = ({ params }) => {
  const [providers, setProviders] = useState([]);
  const handleProviders = (providers) => {
    setProviders(providers);
  };
  console.log(providers);
  return (
    <div>
      <ProvidersDetail params={params} onResult={handleProviders} />
      {providers.length == 0 ? (
        <h1>Loading Data...</h1>
      ) : (
        <>
          <h1 className="provider_title">
            {providers.length} Providers Found!{" "}
          </h1>
          <div className="container">
            {providers.map((item, index) => (
              <>
              <div className="box">
                <div className="provider_image">
                  <img
                    src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.1395991368.1711584000&semt=sph"
                    alt=""
                    srcSet=""
                    />
                </div>
                <div className="provider_details">
                  <h5>Username : {item.username}</h5>
                  <h5>Fullname : {item.fullname}</h5>
                  <h6>Profession : {item.profession}</h6>
                  <h6>Phone : {item.phone}</h6>
                  <h6>Address : {item.address}</h6>
                </div>
                    </div>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default page;
