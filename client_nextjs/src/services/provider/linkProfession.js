const LinkProfession = async (params , providerID)=>{
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
        const response = await api.json();
        // onResponse(response);
        // if (response.code === 0) {
        //   toast.error("You are already linked!");
        // } else if (response.code === 1) {
        //   toast.success("Successfully Linked");
        // } else {
        //   toast.error("Some Error Has Occcured.");
        // }
        console.log("Response : " , response);
      };
