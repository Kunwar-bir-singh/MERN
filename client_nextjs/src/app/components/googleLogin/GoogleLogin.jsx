'use client';

import { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";


const GoogleSignInButton = () => {
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
    console.log('Encoded JWT ID token: ' + response.credential);
    const decodedToken = jwtDecode(response.credential);
    console.log('Decoded JWT ID token: ' , decodedToken);


    // Handle the response (e.g., send it to your server or decode the JWT token)
  };

  return <span id="googleSignInDiv"></span>;
};

export default GoogleSignInButton;
