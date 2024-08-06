const LinkProfession = async (params , providerID, callbackFunc)=>{
        const api = await fetch(
          `http://localhost:3001/api/authProfession/editProfession/?city=${params.city}&name=${params.name}`,
          {
            credentials: "include",
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body : JSON.stringify({providerID : providerID}),
          }
        );
        const data = await api.json();
        callbackFunc(data);
        console.log("Response : " , data);
      };

module.exports = LinkProfession;