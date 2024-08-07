'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { toast } from 'sonner';

const GoogleSignInButton = ({isProvider = false}) => {
  const [email, setEmail ] = useState(null);
  const google_Id =  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        /* global google */
        google.accounts.id.initialize({
          client_id: google_Id ,
          callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
          document.getElementById('googleSignInDiv'),
          { theme: 'outline', size: 'large' }
        );
      };
    };

    loadScript();

    return () => {
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);
 
  const handleCredentialResponse = (response) => {
    const googleEmail = jwtDecode(response.credential).email;

    const api = async () => {
      const res = await fetch("http://localhost:3001/api/auth/googleLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', 
        body: JSON.stringify({
          email: googleEmail,
          isProvider: isProvider,
        }),
      });
      const data = await res.json();
      console.log("Response : ", data);
      resCodeHandler(data);
    }
    api();
  };
  const resCodeHandler = (data) => {
    if (data.code === 1) {
      toast.success(data.msg);
      console.log("Google Login Successfull");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else if (data.code === 0) {
      toast.warning(data.msg);
      console.log("Incorrect Credentials.");
    } else {
      toast.error(data.msg);
      console.log("Some Error Has Occured!");
    }
  }

  return <span id="googleSignInDiv"></span>;
};

export default GoogleSignInButton;
