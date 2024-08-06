import React, { useEffect, useState } from "react";
import Link from "next/link";
import LinkOrUnlinkProfession from "@/app/components/linkProfession/LinkOrUnlinkProfession";
import CookieValue from "../../cookieValue/CookieValue";
import "./Response.css";
import { toast } from "sonner";
import ToastNotification from "@/app/utils/toastNotification";


const Response = ({ inputData, res }) => {
  // console.log("Response of Response.jsx ", res);
  const [linkClicked, setLinkClicked] = useState(false);
  const [key, setKey] = useState(Date.now());

  // const linkClickedOrNot = () => {
  //   setLinkClicked(true);
  //   setTimeout(() => {
  //     setLinkClicked(false);
  //   }, 1000);
  // };

  const [cookieValue, setCookieValue] = useState(null);
  const [userAuthorization, setUserAuthorization] = useState(null);

  const handleCookieValue = (value) => {
    setCookieValue(value);
  };

  const jwtVerify = async () => {
    const response = await fetch("http://localhost:3001/api/auth/jwtVerify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieValue}`,
      },
    }).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setUserAuthorization(data.decoded);
        return;
      }
    });
  };
  useEffect(() => {
    if (cookieValue !== null) {
      jwtVerify();
    }
  }, [cookieValue]);

  useEffect(() => {
    if (res && res.code === 1) {
      setKey(Date.now()); // Update the key to force re-render
    }
  }, [res]);

  useEffect(() => {
    console.log(userAuthorization);
  }, [userAuthorization]);

  return (
    <>
      <CookieValue CookieValueProp={handleCookieValue} />
      <div className="response_area" key={key}>
        {res == null ? (
          <div>
            <h2>Enter The Profession To Be Searched.</h2>
          </div>
        ) : res.code === 1 ? (
          <div className="response_card">
            {userAuthorization && userAuthorization.isProvider !== false && (
              <>
                {/* <div className="response_above-text" onClick={linkClickedOrNot}>
                  Want To {res.ifProviderLinked ? `UnLink` : `Link`}  With This Profession?
                  {console.log("Is Provider Linked : ",res.ifProviderLinked)}
                </div>
                  {linkClicked && (
                    <LinkOrUnlinkProfession params={inputData} unLink={res.ifProviderLinked} loggedUserData={userAuthorization} professionID ={res.professionExists._id} />
                  )} */}
                <LinkOrUnlinkProfession
                  params={inputData}
                  unLink={res.ifProviderLinked}
                  loggedUserData={userAuthorization}
                  professionID={res.professionExists._id}
                />
                {/* {ToastNotification(1, "test")} */}
              </>
            )}
            <div className="response_border"></div>
            <div className="response_content">
              <h2>Profession Found!</h2>
              <span className="response_logo-bottom-text">
                <div>
                  <Link
                    href={`/routes/profession/${encodeURIComponent(
                      res.professionExists.name
                    )}/${encodeURIComponent(res.professionExists.city)}`}
                  >
                    List of providers
                  </Link>
                </div>
              </span>
            </div>
            <span className="response_bottom-text">
              Number of providers : {res.professionExists.provider.length}
            </span>
          </div>
        ) : (
          <div>
            <>
              {res.err ? (
                <>
                  <div className="text-center	">{res.msg}</div>
                </>
              ) : (
                <>
                  <div className="text-center	">{res.msg.slice(0, 17)}</div>
                  <div>{res.msg.slice(18, 47)}</div>
                  <Link
                    className="createProfLink"
                    href={"/routes/createProfession"}
                  >
                    <span>{res.msg.slice(47)}</span>
                  </Link>
                </>
              )}

              <p className="provider_note">
                Note: Only Providers could create a Profession
              </p>
            </>
          </div>
        )}
      </div>
    </>
  );
};

export default Response;
