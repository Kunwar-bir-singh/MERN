"use client";
import UnLinkProfession from "@/services/provider/unlinkProfessions";
import LinkProfessionFunc from "@/services/provider/linkProfession";
// import { useEffect } from "react";
// import { toast } from "sonner";

const LinkProfession = ({ params, unLink, loggedUserData, professionID }) => {
// console.log("professionID in LINKPROFESSION COMPONENET" , professionID);
  {unLink ? UnLinkProfession(loggedUserData.userID, professionID) : LinkProfessionFunc(params, loggedUserData.userID)}
  // const result = async () => {
  //   const api = await fetch(
  //     `http://localhost:3001/api/authProfession/editProfession/?city=${params.city}&name=${params.name}`,
  //     {
  //       credentials: "include",
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body : JSON.stringify({providerID : loggedUserData.userID}),
  //     }
  //   );
  //   const response = await api.json();
  //   onResponse(response);
  //   if (response.code === 0) {
  //     toast.error("You are already linked!");
  //   } else if (response.code === 1) {
  //     toast.success("Successfully Linked");
  //   } else {
  //     toast.error("Some Error Has Occcured.");
  //   }
  //   console.log("Response : " , response);
  // };

  // useEffect(() => {
  //   result();
  // }, []);
  return null;
};


export default LinkProfession;
