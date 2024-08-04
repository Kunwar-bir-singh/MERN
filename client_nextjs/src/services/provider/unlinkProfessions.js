const UnLinkProfession = async (userID, professionID) =>{
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
        // if (data.code === 0) {
        //         toast.error("You are already linked!");
        //       } else if (data.code === 1) {
        //         toast.success("Successfully Linked");
        //       } else {
        //         toast.error("Some Error Has Occcured.");
        //       }
        console.log("UNLINKED RESPONSE !!" , data);
    }

module.exports = UnLinkProfession;