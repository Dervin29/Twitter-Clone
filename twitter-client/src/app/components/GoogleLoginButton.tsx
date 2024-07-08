// components/GoogleLoginComponent.tsx
"use client";

import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { graphqlClient } from "../../../clients/api";
import { verifyGoogleTokenQuery } from "../../../graphql/queries/user";


const GoogleLoginComponent = () => {
  const handleGoogleLogin = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;

    if (!googleToken) return toast.error("Google Login Failed");

    try {
      const {verifyGoogleToken} = await graphqlClient.request(verifyGoogleTokenQuery, { token: googleToken });

      toast.success("Google Login Successful");
      console.log(verifyGoogleToken);
      if(verifyGoogleToken) window.localStorage.setItem("__token__", verifyGoogleToken);

    } catch (error) {
      toast.error("Google Login Failed");
      console.error(error);
    }
  }, []);

  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
    />
  );
};

export default GoogleLoginComponent;
