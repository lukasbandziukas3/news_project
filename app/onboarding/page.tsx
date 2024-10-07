"use client";

import { useState } from "react";
import HeaderImage from "@/app/components/HeaderImage";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { useToastContext } from "@/contexts/toastContext";
import { Loading } from "../components";

const Onboarding = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { invokeToast } = useToastContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProfile = async () => {
    const { firstName, lastName } = formData;

    if (!firstName || !lastName) {
      invokeToast("error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { error: insertError } = await supabase.from("users").insert([
        {
          id: user?.id,
          email: user?.email,
          first_name: firstName,
          last_name: lastName,
        },
      ]);

      if (insertError) throw insertError;

      invokeToast("success", "Profile created successfully");
      router.replace("/profile");
    } catch (error: any) {
      console.error("Error creating profile:", error);
      invokeToast("error", error.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <HeaderImage />
      <div className="m-auto p-10 w-[30rem] bg-white">
        <h1 className="text-2xl font-bold mb-10 text-center">Create Profile</h1>
        <div className="text-lg space-y-8">
          <div className="flex items-center gap-3">
            <div>
              <strong>First Name:</strong>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="p-2 border bg-gray-50 mt-1 rounded w-full"
              />
            </div>
            <div>
              <strong>Last Name:</strong>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="p-2 border bg-gray-50 mt-1 rounded w-full"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleCreateProfile}
              className={`w-40 py-2 flex items-center justify-center h-12 bg-blue-500 text-white rounded ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loading size={5} color="white" />
              ) : (
                "Create Profile"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
