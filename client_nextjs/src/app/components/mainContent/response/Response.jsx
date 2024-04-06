import React from "react";
import "./Response.css";
import Link from "next/link";

const Response = ({ res }) => {
  console.log(res);
  return (
    <>
      <div className="response_area">
        {res == null ? (
          <div>
            <h2>Enter The Profession To Be Searched.</h2>
          </div>
        ) : res.hasOwnProperty("name") ? (
          <div className="response_card">
            <div className="response_border"></div>
            <div className="response_content">
                  <h2>Profession Found!</h2>
              <span className="response_logo-bottom-text">
                <div>
                  <Link
                    href={`/routes/profession/${encodeURIComponent(
                      res.name
                    )}/${encodeURIComponent(res.city)}`}
                  >
                      List of providers
                  </Link>
                </div>
              </span>
            </div>
            <span className="response_bottom-text">Number of providers : {res.provider.length}</span>
          </div>
        ) : (
          <div>
            <>
              <div className="text-center	">{res.msg.slice(0, 17)}</div>
              <div>{res.msg.slice(18, 47)}</div>
              <Link href={"/routes/createProfession"}>{res.msg.slice(47)}</Link>
            </>
          </div>
        )}
      </div>
    </>
  );
};

export default Response;
