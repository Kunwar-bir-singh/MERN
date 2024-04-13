import React, { useEffect, useState } from "react";
import "./Response.css";
import Link from "next/link";
import LinkProfession from "../../LinkProfession/LinkProfession";

const Response = ({ inputData, res }) => {

  console.log("Response of Response.jsx " ,res);
  const [linkClicked, setLinkClicked] = useState(false);
  const [linkProfesRes, setLinkProfesRes] = useState(null)

  const linkClickedOrNot = () => {
     setLinkClicked(true);
  };

  const onResponse = (response) =>{
    console.log('Response received:', response);
    setLinkProfesRes(response);
  }

  useEffect(() => {
    console.log("Value of linkProfesRes " ,linkProfesRes);
  }, [linkProfesRes])

  
  return (
    <>
      <div className="response_area">
        {res == null ? (
          <div>
            <h2>Enter The Profession To Be Searched.</h2>
          </div>
        ) : res.code === 1 ? (
          <div className="response_card">
            <div className="response_above-text" onClick={linkClickedOrNot}>
              Want To Link With This Profession?
            </div>
            {linkClicked && (<LinkProfession params={inputData} onResponse={onResponse} />)}
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
            <span className="response_bottom-text">
              Number of providers : {res.professionExists.provider.length}
            </span>
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
