  'use client'
  import { useRouter } from "next/navigation";
  import React, { useEffect } from "react";
  const Logout = () => {
    const router = useRouter();

    const handleClick = async () => {
      try {
        const reponse = await fetch("http://localhost:3001/api/auth/clearCookies", {
          credentials: "include",
        });
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    };
    
    useEffect(() => {
      handleClick();
    }, []);
    return (
      // <button className='p-2 bg-orange-600 text-white border-2' onClick={handleClick }>
      //     Logout
      // </button>
      null
    );
  };

  export default Logout;
