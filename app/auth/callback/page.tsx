"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/utils/supabaseClient";
import { useToastContext } from "@/contexts/toastContext";

const Callback = () => {
  const router = useRouter();
  const { invokeToast } = useToastContext();

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data: userData, error: authError } = await supabase
        .from("users")
        .select("*")
        .eq("email", user?.email)
        .single();

      if (!userData) {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (sessionData?.session?.access_token) {
          const mainURL = `${process.env.NEXT_PUBLIC_APP_URL}/onboarding`;
          const accessTokenURL = `access_token=${sessionData?.session?.access_token}`;
          const expiresAtURL = `expires_at=${sessionData.session.expires_at}`;
          const expiresInURL = `expires_in=${sessionData.session.expires_in}`;
          const providerTokenURL = `provider_token=${sessionData.session.provider_token}`;
          const refreshTokenURL = `refresh_token=${sessionData.session.refresh_token}`;
          const tokenTypeURL = `token_type=${sessionData.session.token_type}`;

          router.push(
            `${mainURL}#${accessTokenURL}&${expiresAtURL}&${expiresInURL}&${providerTokenURL}&${refreshTokenURL}&${tokenTypeURL}`
          );
        } else {
          console.error("No access token found in session");
        }
      } else {
        router.replace(`/profile`);
      }
    } catch (error) {
      console.error("Error during callback:", error);
    }
  };

  return null;
};

export default Callback;
