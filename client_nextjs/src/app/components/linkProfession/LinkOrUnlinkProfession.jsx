import { useState , useEffect} from "react";
import UnLinkProfession from "@/app/services/provider/unlinkProfessions";
import LinkProfessionFunc from "@/app/services/provider/linkProfession";
const { default: ToastNotification } = require("@/app/utils/toastNotification");
import "./LinkOrUnlink.css";

const LinkOrUnlinkProfession = ({params, unLink, loggedUserData,professionID,}) => {
  const [linkUnlinkRes, setLinkUnlinkRes]= useState({
    code: null,
    msg: null,
  });

  const callbackFunc = (data) =>{
    console.log("Data From CALLBACK");
    setLinkUnlinkRes({...linkUnlinkRes, code: data.code, msg: data.msg });
  }
  const triggerAction =()=>{
    unLink
      ? UnLinkProfession(loggedUserData.userID, professionID, callbackFunc)
      : LinkProfessionFunc(params, loggedUserData.userID, callbackFunc);
  }
  useEffect(()=>{
    if(linkUnlinkRes.code){
      ToastNotification(linkUnlinkRes.code, linkUnlinkRes.msg);}
  },[linkUnlinkRes])

  return (
    <div className="response_above-text" onClick={triggerAction}>
      Want To {unLink ? `UnLink` : `Link`} With This Profession?
      {console.log("Is Provider Linked : ", unLink)}
    </div>
  );
};

export default LinkOrUnlinkProfession;
