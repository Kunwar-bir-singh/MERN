/* eslint-disable react/prop-types */
import React, { useState , useEffect} from "react";
import UnLinkProfession from "@/app/services/provider/unlinkProfessions";
import LinkProfessionFunc from "@/app/services/provider/linkProfession";
const { default: ToastNotification } = require("@/app/utils/toastNotification");
import "./LinkOrUnlink.css";

const LinkOrUnlinkProfession = ({params, unLink,setUnLink, loggedUserData,professionID,}) => {
  const [linkUnlinkRes, setLinkUnlinkRes]= useState({
    code: null,
    msg: null,
  });

  const callbackFunc = (data) =>{
    setLinkUnlinkRes({...linkUnlinkRes, code: data.code, msg: data.msg });
  }
  const triggerAction =()=>{
    unLink
      ? UnLinkProfession(loggedUserData.userID, professionID, callbackFunc)
      : LinkProfessionFunc(params, loggedUserData.userID, callbackFunc);
  }
  useEffect(()=>{
    if(linkUnlinkRes.code!=null){
      ToastNotification(linkUnlinkRes.code, linkUnlinkRes.msg);}
  },[linkUnlinkRes])

  useEffect(()=>{
    if(linkUnlinkRes.code == 1){
      setUnLink(!unLink)}
  },[linkUnlinkRes])

  return (
    <div className="response_above-text" onClick={triggerAction}>
      Want To {unLink ? `UnLink` : `Link`} With This Profession?
      {console.log("Is Provider Linked : ", unLink)}
    </div>
  );
};

export default LinkOrUnlinkProfession;
