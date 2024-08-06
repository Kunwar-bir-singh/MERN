
const UnLinkProfession = async (userID, professionID, callbackFunc) =>{
    // console.log("professionID in UnLinkProfession COMPONENET" , professionID);

        const res = await fetch("http://localhost:3001/api/authProfession/unLinkProvider",{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userID: userID,
                professionID :professionID
            })
        })
        const data = await res.json();
        callbackFunc(data);
        console.log("UNLINKED RESPONSE !!" , data);
    }

module.exports = UnLinkProfession;